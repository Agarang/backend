from src.interface.proto.chatbot_pb2 import (
    GetFetusResponseFromChatbotOutboundPortOutputDto,
)
from src.interface.proto import chatbot_pb2_grpc
from datetime import datetime


class ChatbotService(chatbot_pb2_grpc.ChatbotServiceServicer):
    def __init__(self):
        print("hi")

    def getFetusResponseFromChatbot(self, request, context):
        print("hi")

        input = request.input
        userId = request.userId

        createdAt = datetime.now().isoformat()

        return GetFetusResponseFromChatbotOutboundPortOutputDto(
            response="hi", createdAt=createdAt
        )
