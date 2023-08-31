import os
from src.interface.proto.chatbot_pb2 import (
    GetFetusResponseFromChatbotOutboundPortOutputDto,
)
from src.interface.proto import chatbot_pb2_grpc
from datetime import datetime
from src.services.schema import SCHEMA
import openai


class ChatbotService(chatbot_pb2_grpc.ChatbotServiceServicer):
    def __init__(self):
        self.openai = openai

        # key 넣어야함
        self.openai.api_key = os.environ.get("OPENAI_API_KEY")

    def getFetusResponseFromChatbot(self, request, context):
        messages = [{"role": "system", "content": SCHEMA}]

        input = request.input
        userId = request.userId

        self.add_user_input(input, messages)

        response = self.generate_answer(messages)

        createdAt = datetime.now().isoformat()

        return GetFetusResponseFromChatbotOutboundPortOutputDto(
            response=response, createdAt=createdAt
        )

    def generate_answer(self, messages, model_gpt="gpt-3.5-turbo"):
        answer_result = {}

        try:
            response = self.openai.ChatCompletion.create(
                model=model_gpt, messages=messages
            )
            answer_result["answer"] = response.choices[0].message["content"].strip()
        except Exception as err:
            print("[ERROR][GENERATE_ANSWER] : ", str(err))
            answer_result["answer"] = "죄송합니다. 답변을 생성하는 데 문제가 발생했습니다."

        return answer_result["answer"]

    def chat_bot(self, conversation, user_input):
        self.add_user_input(user_input)
        response = self.generate_answer(conversation.messages)
        return response

    def add_user_input(self, user_input, messages):
        return messages.append({"role": "user", "content": user_input})
