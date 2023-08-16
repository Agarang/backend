## Install

---

```

docker-compose -f docker-compose.local.yml up -d

```

## Whenever you restart this service

---

- Bofore you work the command above, you should work this command.

```

docker-compose -f docker-compose.local.yml down

docker rmi backend-generate_fetus_grpc_server

docker rmi backend-api_gateway_server

```
