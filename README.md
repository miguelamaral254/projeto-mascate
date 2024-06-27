# Gerenciador de Filas e Reservas - Restaurante Mascate - README

## Descrição

Este é um projeto de demonstração de um sistema de gerenciamento de filas e reservas para um restaurante, desenvolvido em Next.js. O projeto inclui uma API desenvolvida em Spring Boot e utiliza PostgreSQL para armazenamento de dados.

## Tecnologias Utilizadas

- **Next.js**: Framework para desenvolvimento de aplicações React.
- **TypeScript**: Linguagem de programação que é um superconjunto do JavaScript.
- **Tailwind CSS**: Biblioteca de utilitários CSS para estilização.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **Spring Boot**: Framework para desenvolvimento da API.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina as seguintes ferramentas:

- Node.js (recomendado a versão LTS)
- Yarn ou npm
- PostgreSQL
- Um gerenciador de banco de dados, como pgAdmin

## Clonando o Repositório

Para clonar o repositório do projeto, siga os passos abaixo:

1. **Clone o repositório**

   ```bash
   git clone git@github.com:miguelamaral254/projeto-mascate.git
   ```

2. **Navegue até o diretório do projeto**

   ```bash
   cd projeto-mascate-reservas
   ```

## Configurando a API Spring Boot

Para configurar a API Spring Boot, siga as instruções disponíveis no repositório [API Mascate](https://github.com/miguelamaral254/Api-Mascate).

## Configurando o Frontend Next.js

1. **Navegue até o diretório do projeto-mascate-reservas**

   ```bash
   cd projeto-mascate-reservas
   ```

2. **Instale as dependências do projeto Next.js**

   ```bash
   npm install
   ```

3. **Atualize o arquivo de configuração `config.ts` com a URL da API**

   ```typescript
   const config = {
     apiUrl: 'http://localhost:8080/api' // Atualize para a URL correta da porta que esta rodando a API
   };

   export default config;
   ```

4. **Execute o projeto Next.js**

   ```bash
   npm run dev
   ```

## Utilização

1. **Acesse a aplicação**

   Abra seu navegador e vá para `http://localhost:3000`.

2. **Funcionalidades**

   - **Home**: Página inicial com dashboard mostrando o total de reservas do dia atual e um gráfico com as reservas do mês atual.
   - **Nova Reserva**: Página para registrar uma nova reserva. Preencha o nome, CPF, telefone do cliente, ID do funcionário, data/horário (12:00 até 15:00), tamanho da mesa (pequena, média ou grande) e a mesa em si (podendo aumentar o número de cadeiras). Confirme os dados e finalize a reserva.
   - **Consultar Reservas**: Página para visualizar reservas. Possui três opções:
     - **Reservas para Hoje**: Mostra as reservas agendadas para o dia atual.
     - **Reservas em Andamento**: Mostra as reservas que estão em andamento.
     - **Reservas Finalizadas**: Mostra as reservas que já foram finalizadas.
   - **Configurações**: Página para ajustes e configurações da aplicação.
   - **Sair**: Opção para encerrar a sessão do usuário.
