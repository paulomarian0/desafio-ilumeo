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

---
⌨️ com ❤️ por [Paulo Mariano](https://github.com/paulomarian0) 😊
