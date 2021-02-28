# Movit.it - nlw4 [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

Repositório de estudo na nlw4 da RocketSeat

> Demo em: [https://moveit-dusky-three.vercel.app/auth](https://moveit-dusky-three.vercel.app/auth, 'https://moveit-dusky-three.vercel.app/auth')

## Instalaçao

Para obter uma cópia local do repositório

```shell
  git clone git@github.com:nandodutra/nlw4.git
  yarn
```

## Desenvolvimento 
Principais libs e frameworks utilizados:

- next@10.0.7
- react@17.0.1
- mongodb@3.6.4
- axios@^0.21.1
- js-cookie@^2.2.1

### Ambiente de desenvolvimento

Crie um arquivo .env na raiz do projeto baseado no template: 

```shell
  MONGODB_STRING_CONNECTION=your_mongodb_connection_string
  NEXT_PUBLIC_OAUTH_REDIRECT_URI=http://localhost:3000/api/auth-callback
  NEXT_PUBLIC_OAUTH_CLIENT_ID=app_auth_client_id
  OAUTH_CLIENT_SECRET=app_auth_client_secret
  NEXT_PUBLIC_OAUTH_SCOPE=xpto
```
Para obter o client_id e secret_id, é necessário habilitar seu aplicativo no
github em: Settings > Developer settings > OAuth Apps.

```shell
  cd nlw4/
  yarn dev
```