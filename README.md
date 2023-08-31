# SKT FLY AI Challenger 3기 팀 "모두랑"

<br/>
<br/>



<div align="center">
  <img src="https://github.com/Agarang/.github/assets/27190776/9e7e0fc2-e1cc-4042-91b3-3a46cb886dfe" width="700px">
</div>


<br/>
<br/>

<div align="center">
<h2>  <img width="40px" src="https://github.com/Agarang/.github/assets/27190776/9ab3c1ea-c1f9-468b-a686-9709370ac162"> '아가랑' 만나는 순간! <img width="40px" src="https://github.com/Agarang/.github/assets/27190776/9ab3c1ea-c1f9-468b-a686-9709370ac162"></h2> 

### 💡 아가랑 : AI 아기 얼굴 생성 서비스

<p>미리 만나보는 우리 아가 </p>
<p>당신의 특별한 순간 아가랑 만들어요!</p>

</br>
</br>

### 📚 Tech Stack 📚
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">
<img src="https://img.shields.io/badge/Pytorch-EE4C2C?style=for-the-badge&logo=PyTorch&logoColor=white">
<img src="https://img.shields.io/badge/ChatGPT-28A08C?style=for-the-badge&logo=OpenAI&logoColor=white">

</br>

<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black">
<img src="https://img.shields.io/badge/React Native-61DAFB?style=for-the-badge&logo=React&logoColor=black">

</br>

<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/Nest.js-E0234E?style=for-the-badge&logo=NestJS&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=Prisma&logoColor=white">

</br>

<img src="https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=Microsoft Azure&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
<img src="https://img.shields.io/badge/Github Actions-2088FF?style=for-the-badge&logo=Github Actions&logoColor=white">
<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=NGINX&logoColor=white">


</div>

</br>
</br>

## Application


### 아기 얼굴 사진 생성 서비스

<div align="center">
태아의 3D 초음파 사진을 입력하여 아기의 얼굴 사진을 생성해주는 서비스

https://github.com/Agarang/.github/assets/27190776/c410eedc-2909-41b7-aad4-9e73ea52858f
</div>

### 챗봇

<div align="center">
AI 챗봇을 통해 산모에게 필요한 정보를 제공하고, 아이처럼 대화할 수 있는 서비스

https://github.com/Agarang/.github/assets/27190776/881f0e64-d610-4898-8eb2-2dac356fbfbe
</div>

</br>
</br>
</br>
</br>

# BackEnd

## First


- you should set `.env` file
- you should install nvidia driver for graphic card(only Window)
- you should install nvidia docker

## Install


```

docker-compose -f docker-compose.local.yml up -d

```

## Whenever you restart this service


- Bofore you work the command above, you should work this command.

```

docker-compose -f docker-compose.local.yml down

docker rmi backend-generate_fetus_grpc_server

docker rmi backend-api_gateway_server

docker rmi backend-nginx_server

docker rmi backend-chatbot_grpc_server



```
