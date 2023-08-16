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


class GenerateFetusService(generate_fetus_pb2_grpc.GenerateFetusService):
    def __init__(self):
        print("Storage Setting...")
        self.blob_storage = BlobServiceClient(
            os.environ.get("AZURE_BLOB_STORAGE_ACCOUNT_URL"),
            credential=os.environ.get("AZURE_STORAGE_SAS_KEY"),
        )

        # url = "https://agarang.blob.core.windows.net/agarang-blob-storage/profile-skt fly ai challenge.PNG-2023-08-10T13:42:03.427Z"

        # res = requests.get(url)

        self.container_name = os.environ.get("AZURE_BLOB_STORAGE_CONTAINER")

        # print("complete")

        # print("Model Setting...")
        # self.model = Model()
        # self.model.setup()
        # self.dirname = os.path.dirname(__file__)

    async def generateFetusImage(self, request, context):
        url = request.url
        filename = request.filename
        ext = request.ext

        blob_client = self.blob_storage.get_blob_client(
            container=self.container_name,
            blob=f"generated-fetus-{parse.quote(filename)}-{datetime.now().isoformat()}.{ext}",
        )

        res = requests.get(url)

        img = res.content
        # img = np.frombuffer(res.content, dtype=np.uint8)
        # img = cv2.imdecode(img, cv2.IMREAD_COLOR)

        # img = cv2.resize(img, (32, 32))

        # generated_img = self.model.predict(img)

        # 생성된 이미지를 Azure blob storage에 저장
        blob_client.upload_blob(img)

        url = blob_client.primary_endpoint

        url = url.split("?")[0]

        return GenerateFetusGRPCOutboundPortOutputDto(url=url)
