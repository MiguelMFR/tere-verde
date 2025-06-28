# Site Terê Verde

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white)
![Json-Server](https://img.shields.io/badge/JSON--Server-0.17.4-FF4040?logo=json&logoColor=white)

O site **Terê Verde** tem como objetivo promover as atrações naturais de Teresópolis, destacando sua rica biodiversidade e as opções de ecoturismo disponíveis na região.

---

## 📌 Como Usar

Esta seção fornece instruções detalhadas para configurar e executar a aplicação.

---

## 🚀 Executando a Aplicação

### 💻 Configurando o JSON Server (API)

1. Crie uma pasta chamada `api` onde desejar no seu computador.

2. Crie um arquivo chamado `db.json` dentro da pasta `api` e adicione a seguinte estrutura: [db.json](./API/db.json)

3. Abra o terminal na pasta `api` e execute o comando para instalar as dependências da API:

```cmd 
npm install -g json-server
```

4. Agora, xecute o comando:

```cmd
json-server --watch db.json --port 3001
```


---

### 🖥️ Executando o site

1. Instale as dependências:

```cmd
npm install
```

2. Inicie o site:

```cmd
npm start
```

---

## 🗺️ Estrutura do Banco de Dados (`db.json`)

- **Trilhas:** Nome, dificuldade, duração, distância, altitude, descrição, imagem.

- **Cachoeiras:** Nome, dificuldade de acesso, altura, possui piscina natural, descrição, imagem, etc.

- **Biodiversidade:** Espécies da fauna e flora local, incluindo nome, tipo (ave, mamífero, flora), descrição, imagem, entre outros.

- **Eventos:** Nome do evento, data inicial, data final, local, tipo, preço, descrição, etc.

---

## 💡 Funcionalidades

- Visualização de trilhas ecológicas com informações como dificuldade, distância e altitude.

- Listagem de cachoeiras da região, com dados úteis para visitantes.

- Catálogo de animais e plantas da biodiversidade local.

- Página responsiva, com informações dinâmicas obtidas da API.

- Página de administração, onde usuários autorizados podem **cadastrar, editar e deletar** informações.

---

## 📄 Requisitos

protótipo: https://docs.google.com/document/d/1gjCweHioh7SrGMJeIUYr3FZjOIrDhjK8NnkQZKD2zl0/edit?usp=sharing

requisitos: https://docs.google.com/spreadsheets/d/1L0VfFNUSiv5XeJG-MPO1jtjKt6lzQ0woPM_P2PC0wd0/edit?usp=sharing

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.
