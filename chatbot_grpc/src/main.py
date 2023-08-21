import os
import asyncio
from grpc import aio
from dotenv import load_dotenv

from src.interface.proto import chatbot_pb2_grpc
from src.services import chatbot_service

load_dotenv()


async def serve():
    print("Server start...")

    server = aio.server()

    chatbot_pb2_grpc.add_ChatbotServiceServicer_to_server(
        chatbot_service.ChatbotService(), server
    )

    listen_addr = os.environ.get("LISTEN_ADDRESS")

    server.add_insecure_port(listen_addr)

    await server.start()

    print(f"Server start on {listen_addr} port")

    await server.wait_for_termination()


if __name__ == "__main__":
    asyncio.run(serve())
