import asyncio
from grpc import aio
from dotenv import load_dotenv
import os

load_dotenv()


async def main():
    print("Server starting...")

    server = aio.server()

    listen_addr = os.environ.get("LISTEN_ADDRESS")

    server.add_insecure_port(listen_addr)

    await server.start()

    print(f"Server start on {listen_addr} port")

    await server.wait_for_termination()


if __name__ == "__main__":
    asyncio.run(main())
