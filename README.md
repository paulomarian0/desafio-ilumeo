# Desafio Ilumeo

Teste técnico realizado para empresa [ILUMEO](https://ilumeo.com.br)

## 🚀 Começando


Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### Clonando o projeto

```
git clone https://github.com/paulomarian0/desafio-ilumeo
```

### Abrindo a pasta
```
cd desafio-ilumeo
```

### Baixando o .env

Entre no link abaixo e faça o download do arquivo

https://drive.google.com/file/d/1uqjrj-U9UK2UIWk9VI7yCV2d2EddxuEX/view?usp=sharing

Mova esse arquivo baixado para o diretório: 

```
cd backend
```

### Rodando o backend (necessário docker instalado)

```
cd backend

docker-compose up -d --build

npm i

prisma generate

prisma db push

npm run start:dev
```

### Rodando o frontend

```
cd frontend

npm i

npm run dev
```

### 📋 Pré-requisitos

[Docker](https://docs.docker.com/desktop/install/windows-install/)

```
Necessário instalar o docker para rodar o banco de dados localmente
```
## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [NestJS](https://docs.docker.com/desktop/install/windows-install/) - O framework backend usado
* [ReactJS](https://pt-br.reactjs.org) - Framework frontend usado
* [Prisma.io](https://www.prisma.io) - ORM usado

## ➕ Extras

Vídeo no Youtube explicando um pouco do projeto:
<br/>
https://www.youtube.com/watch?v=y-2twCDgkA0
---
⌨️ com ❤️ por [Paulo Mariano](https://github.com/paulomarian0) 😊
