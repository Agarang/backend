import asyncio
from grpc import aio
from dotenv import load_dotenv
import os
from src.interface.proto import generate_fetus_pb2_grpc
from src.services import generate_fetus_service


load_dotenv()


async def main():
    print("Server starting...")

    server = aio.server()

    generate_fetus_pb2_grpc.add_GenerateFetusServiceServicer_to_server(
        generate_fetus_service.GenerateFetusService(), server
    )

    listen_addr = os.environ.get("LISTEN_ADDRESS")

    server.add_insecure_port(listen_addr)

    await server.start()

    print(f"Server start on {listen_addr} port")

    await server.wait_for_termination()


if __name__ == "__main__":
    asyncio.run(main())
