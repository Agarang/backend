from src.interface.proto.generate_fetus_pb2 import (
    GenerateFetusGRPCOutboundPortInputDto,
    GenerateFetusGRPCOutboundPortOutputDto,
)
from src.interface.proto import generate_fetus_pb2_grpc


class GenerateFetusService(generate_fetus_pb2_grpc.GenerateFetusService):
    def __init__(self):
        print(1)
        # self.model = Model()
        # self.model.setup()
        # self.dirname = os.path.dirname(__file__)

    async def generateFetusImage(self, request, context):
        print(1)
        # return GenerateFetusGRPCOutboundPortOutputDto(url)
