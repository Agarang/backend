# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from src.interface.proto import generate_fetus_pb2 as proto_dot_generate__fetus__pb2


class GenerateFetusServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.generateFetusImage = channel.unary_unary(
            "/generate_fetus.GenerateFetusService/generateFetusImage",
            request_serializer=proto_dot_generate__fetus__pb2.GenerateFetusGRPCOutboundPortInputDto.SerializeToString,
            response_deserializer=proto_dot_generate__fetus__pb2.GenerateFetusGRPCOutboundPortOutputDto.FromString,
        )


class GenerateFetusServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def generateFetusImage(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details("Method not implemented!")
        raise NotImplementedError("Method not implemented!")


def add_GenerateFetusServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
        "generateFetusImage": grpc.unary_unary_rpc_method_handler(
            servicer.generateFetusImage,
            request_deserializer=proto_dot_generate__fetus__pb2.GenerateFetusGRPCOutboundPortInputDto.FromString,
            response_serializer=proto_dot_generate__fetus__pb2.GenerateFetusGRPCOutboundPortOutputDto.SerializeToString,
        ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
        "generate_fetus.GenerateFetusService", rpc_method_handlers
    )
    server.add_generic_rpc_handlers((generic_handler,))


# This class is part of an EXPERIMENTAL API.
class GenerateFetusService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def generateFetusImage(
        request,
        target,
        options=(),
        channel_credentials=None,
        call_credentials=None,
        insecure=False,
        compression=None,
        wait_for_ready=None,
        timeout=None,
        metadata=None,
    ):
        return grpc.experimental.unary_unary(
            request,
            target,
            "/generate_fetus.GenerateFetusService/generateFetusImage",
            proto_dot_generate__fetus__pb2.GenerateFetusGRPCOutboundPortInputDto.SerializeToString,
            proto_dot_generate__fetus__pb2.GenerateFetusGRPCOutboundPortOutputDto.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
        )
