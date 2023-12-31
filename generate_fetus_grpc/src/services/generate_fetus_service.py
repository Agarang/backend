import pickle

import torch
import torch.nn.functional as F
from src.interface.proto import generate_fetus_pb2_grpc
import requests
import numpy as np
import cv2
from azure.identity import DefaultAzureCredential
from azure.storage.blob import (
    BlobServiceClient,
    BlobClient,
    ContainerClient,
    ContentSettings,
)
import os
from datetime import datetime
from src.interface.proto.generate_fetus_pb2 import (
    GenerateFetusGRPCOutboundPortOutputDto,
)
from urllib import parse
import io
from src.models.stylegan3 import legacy
import PIL.Image
import copy


class GenerateFetusService(generate_fetus_pb2_grpc.GenerateFetusService):
    def __init__(self):
        print("Storage Setting...")

        connect_str = os.environ.get("AZURE_STORAGE_CONNECTION_STRING")

        self.blob_service_client = BlobServiceClient.from_connection_string(connect_str)

        # self.blob_storage = BlobServiceClient(
        #     os.environ.get("AZURE_BLOB_STORAGE_ACCOUNT_URL"),
        #     credential=os.environ.get("AZURE_STORAGE_SAS_KEY"),
        # )

        self.dirname = os.path.dirname(__file__)

        self.image_container_name = os.environ.get("AZURE_BLOB_STORAGE_CONTAINER")

        weight_container_name = os.environ.get("AZURE_WEIGHT_CONTAINER")

        self.image_container_client = self.blob_service_client.get_container_client(
            container=self.image_container_name
        )

        weight_container_client = self.blob_service_client.get_container_client(
            container=weight_container_name
        )

        # stylegan_blob_client = self.blob_storage.get_blob_client(
        #     container=weight_container_name, blob="network-snapshot-000001.pkl"
        # )

        # vgg_blob_client = self.blob_storage.get_blob_client(
        #     container=weight_container_name, blob="vgg16.pt"
        # )

        download_file_path = os.path.join(self.dirname, "../models/stylegan3/weights")

        print("Get Weights...")

        with open(
            file=f"{download_file_path}/network-snapshot-000001.pkl", mode="wb"
        ) as f:
            f.write(
                weight_container_client.download_blob(
                    "network-snapshot-000001.pkl"
                ).readall()
            )

        with open(file=f"{download_file_path}/vgg16.pt", mode="wb") as f:
            f.write(weight_container_client.download_blob("vgg16.pt").readall())

        # with open(
        #     file=f"{download_file_path}/network-snapshot-000001.pkl", mode="wb"
        # ) as f:
        #     download_stream = stylegan_blob_client.download_blob()
        #     f.write(download_stream.readall())

        # with open(file=f"{download_file_path}/vgg16.pt", mode="wb") as f:
        #     download_stream = vgg_blob_client.download_blob()
        #     f.write(download_stream.readall())

        print("Store Setting complete")

        print(f" cuda available : {torch.cuda.is_available()}")

        print()

        print("Model Setting...")

        print()
        print("Import weights...")
        with open(
            file=f"{download_file_path}/network-snapshot-000001.pkl", mode="rb"
        ) as f:
            self.G = pickle.load(f)["G"].cuda()

        self.c = None

        print("Model Setting Complete")

    async def generateFetusImage(self, request, context):
        url = request.url
        filename = request.filename
        ext = request.ext

        blob_client = self.blob_service_client.get_blob_client(
            container=self.image_container_name,
            blob=f"generated-fetus-{parse.quote(filename)}-{datetime.now().isoformat()}.{ext}",
        )

        res = requests.get(url)

        img = res.content

        # print(type(img))

        print("Preprocessing...")

        # z = torch.randn([1, self.G.z_dim]).cuda()
        z = self.preprocessing(img).cuda()

        # print(z.shape)

        print("Generating...")

        # try:
        # img = self.G(z, self.c)
        # except Exception as e:
        # print(e)

        img = self.G(z, self.c)

        print("Generation Complete")

        # print(img.shape)

        # Denormalization
        img = (img + 1) * (255 / 2)

        # 차원 재배치
        img = img.permute(0, 2, 3, 1).clamp(0, 255).to(torch.uint8)[0].cpu().numpy()

        print(f"after pernute : {img.shape}")

        # 차원을 3차원으로 축소
        # img = img.squeeze(0)

        # print(f"squeeze : {img.shape}")

        # Tensor to numpy array
        # img = img.cpu().numpy()

        # Denormalization
        # img = (img + 1) * (255 / 2)

        # convert type to uint8
        # img = img.astype(np.uint8)

        # print(img)

        # print(f"tonumpy : {type(img)}")
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

        # encode to jpg, png, ... etc.
        img = cv2.imencode(f".{ext}", img)[1].tobytes()

        # print(f"encode : {type(img)}")

        # print(f"final : {type(img)}")

        # 생성된 이미지를 Azure blob storage에 저장
        blob_client.upload_blob(img)

        print("Saved")

        url = blob_client.primary_endpoint

        url = url.split("?")[0]

        return GenerateFetusGRPCOutboundPortOutputDto(url=url)

    def preprocessing(self, img):
        # random한 seed 설정
        seed = 42
        np.random.seed(seed)
        torch.manual_seed(seed)

        # Load networks.
        print("Loading networks")
        device = torch.device("cuda")
        with open(
            os.path.join(
                self.dirname, "../models/stylegan3/weights/network-snapshot-000001.pkl"
            ),
            "rb",
        ) as f:
            G = legacy.load_network_pkl(f)["G"].requires_grad_(False).to(device)

        # target_pil = PIL.Image.open(io.BytesIO(img)).convert("RGB")

        target_pil = PIL.Image.open(io.BytesIO(img))
        w, h = target_pil.size

        # center crop
        s = min(w, h)
        target_pil = target_pil.crop(
            ((w - s) // 2, (h - s) // 2, (w + s) // 2, (h + s) // 2)
        )
        target_pil = target_pil.resize(
            (self.G.img_resolution, self.G.img_resolution), PIL.Image.LANCZOS
        )
        target_uint8 = np.array(target_pil, dtype=np.uint8)

        # Optimize projection.-> 최적의 projection을 위한 학습을 진행
        projected_w_steps = self.project(
            G,
            target=torch.tensor(
                target_uint8.transpose([2, 0, 1]), device=device
            ),  # pylint: disable=not-callable
            device=device,
            verbose=True,
        )

        projected_w = projected_w_steps[-1]
        z = projected_w

        tensorz = torch.Tensor(z)
        tensorz_with_batch = tensorz

        return tensorz_with_batch

    def project(
        self,
        G,
        target: torch.Tensor,  # [C,H,W] and dynamic range [0,255], W & H must match G output resolution
        *,
        num_steps=400,
        w_avg_samples=2,
        initial_learning_rate=0.1,
        initial_noise_factor=0.05,
        lr_rampdown_length=0.25,
        lr_rampup_length=0.05,
        noise_ramp_length=0.75,
        regularize_noise_weight=1e5,
        verbose=False,
        device: torch.device,
    ):
        assert target.shape == (G.img_channels, G.img_resolution, G.img_resolution)

        def logprint(*args):
            if verbose:
                print(*args)

        G = copy.deepcopy(G).eval().requires_grad_(False).to(device)  # type: ignore

        # Compute w stats.
        logprint(f"Computing W midpoint and stddev using {w_avg_samples} samples...")
        z_samples = np.random.RandomState(123).randn(w_avg_samples, G.z_dim)
        w_samples = G.mapping(torch.from_numpy(z_samples).to(device), None)  # [N, L, C]
        w_samples = w_samples[:, :1, :].cpu().numpy().astype(np.float32)  # [N, 1, C]
        w_avg = np.mean(w_samples, axis=0, keepdims=True)  # [1, 1, C]
        w_std = (np.sum((w_samples - w_avg) ** 2) / w_avg_samples) ** 0.5

        # Setup noise inputs.
        noise_bufs = {
            name: buf
            for (name, buf) in G.synthesis.named_buffers()
            if "noise_const" in name
        }

        # Load VGG16 feature detector.
        # url = "https://nvlabs-fi-cdn.nvidia.com/stylegan2-ada-pytorch/pretrained/metrics/vgg16.pt"
        # with dnnlib.util.open_url(url) as f:
        #     vgg16 = torch.jit.load(f).eval().to(device)

        with open(
            os.path.join(self.dirname, "../models/stylegan3/weights/vgg16.pt"),
            "rb",
        ) as f:
            buffer = io.BytesIO(f.read())

        vgg16 = torch.jit.load(buffer).eval().to(device)

        # Features for target image.
        target_images = target.unsqueeze(0).to(device).to(torch.float32)
        if target_images.shape[2] > 256:
            target_images = F.interpolate(target_images, size=(256, 256), mode="area")
        target_features = vgg16(target_images, resize_images=False, return_lpips=True)

        w_opt = torch.tensor(
            w_avg, dtype=torch.float32, device=device, requires_grad=True
        )  # pylint: disable=not-callable
        w_out = torch.zeros(
            [num_steps] + list(w_opt.shape[1:]), dtype=torch.float32, device=device
        )
        optimizer = torch.optim.Adam(
            [w_opt] + list(noise_bufs.values()),
            betas=(0.9, 0.999),
            lr=initial_learning_rate,
        )

        # Init noise.
        for buf in noise_bufs.values():
            buf[:] = torch.randn_like(buf)
            buf.requires_grad = True

        for step in range(num_steps):
            # Learning rate schedule.
            t = step / num_steps
            w_noise_scale = (
                w_std
                * initial_noise_factor
                * max(0.0, 1.0 - t / noise_ramp_length) ** 2
            )
            lr_ramp = min(1.0, (1.0 - t) / lr_rampdown_length)
            lr_ramp = 0.5 - 0.5 * np.cos(lr_ramp * np.pi)
            lr_ramp = lr_ramp * min(1.0, t / lr_rampup_length)
            lr = initial_learning_rate * lr_ramp
            for param_group in optimizer.param_groups:
                param_group["lr"] = lr

            # Synth images from opt_w.
            w_noise = torch.randn_like(w_opt) * w_noise_scale
            ws = (w_opt + w_noise).repeat([1, G.mapping.num_ws, 1])
            synth_images = G.synthesis(ws, noise_mode="const")

            # Downsample image to 256x256 if it's larger than that. VGG was built for 224x224 images.
            synth_images = (synth_images + 1) * (255 / 2)
            if synth_images.shape[2] > 256:
                synth_images = F.interpolate(synth_images, size=(256, 256), mode="area")

            # Features for synth images.
            synth_features = vgg16(synth_images, resize_images=False, return_lpips=True)
            dist = (target_features - synth_features).square().sum()

            # Noise regularization.
            reg_loss = 0.0
            for v in noise_bufs.values():
                noise = v[None, None, :, :]  # must be [1,1,H,W] for F.avg_pool2d()
                while True:
                    reg_loss += (
                        noise * torch.roll(noise, shifts=1, dims=3)
                    ).mean() ** 2
                    reg_loss += (
                        noise * torch.roll(noise, shifts=1, dims=2)
                    ).mean() ** 2
                    if noise.shape[2] <= 8:
                        break
                    noise = F.avg_pool2d(noise, kernel_size=2)
            loss = dist + reg_loss * regularize_noise_weight

            # Step
            optimizer.zero_grad(set_to_none=True)
            loss.backward()
            optimizer.step()
            logprint(
                f"step {step+1:>4d}/{num_steps}: dist {dist:<4.2f} loss {float(loss):<5.2f}"
            )

            # Save projected W for each optimization step.
            w_out[step] = w_opt.detach()[0]

            # Normalize noise.
            with torch.no_grad():
                for buf in noise_bufs.values():
                    buf -= buf.mean()
                    buf *= buf.square().mean().rsqrt()

        return w_out.repeat([1, G.mapping.num_ws, 1])
