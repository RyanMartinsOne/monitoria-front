# Sistema de Gestão de Monitorias — Frontend

Frontend da aplicação **Sistema de Gestão de Monitorias**, desenvolvido para fornecer a interface web utilizada por monitores e coordenadores no agendamento e acompanhamento de encontros de monitoria.

> 🎓 **Projeto acadêmico** desenvolvido no curso de Análise e Desenvolvimento de Sistemas da **UNINTER — Centro Universitário Internacional**.

### 🔗 Repositórios

* **Frontend:** este repositório
* **Backend:** [Extensionista-Painel-Monitoria](https://github.com/RyanMartinsOne/Extensionista-Painel-Monitoria)

O frontend consome a **API REST desenvolvida em Java e Spring Boot**, sendo responsável pela interface de interação com o sistema.

## 📌 Sobre o Projeto

A aplicação fornece uma interface web para que monitores e coordenadores possam utilizar as funcionalidades disponibilizadas pelo backend.

Entre os principais recursos estão:

* Autenticação de usuários
* Cadastro de usuários
* Gerenciamento de encontros de monitoria
* Agendamento de encontros
* Consulta e edição de encontros
* Cancelamento de encontros
* Dashboard com estatísticas
* Filtros para consulta de dados
* Interface responsiva para diferentes tamanhos de tela

## 🔧 Funcionalidades

### 🔐 Autenticação

* Tela de login
* Tela de cadastro
* Autenticação integrada à API
* Armazenamento do token de autenticação
* Controle de acesso às rotas protegidas
* Redirecionamento para login quando a sessão não está autenticada

### 📅 Gerenciamento de monitorias

* Listagem de encontros
* Agendamento de novos encontros
* Visualização dos detalhes
* Edição de encontros
* Exclusão de encontros
* Atualização do status
* Exibição das informações de monitoria de acordo com o usuário autenticado

### 📊 Dashboard

* Visualização de indicadores
* Total de encontros
* Encontros concluídos
* Encontros agendados
* Encontros cancelados
* Taxa de conclusão
* Filtros por período
* Visualização de estatísticas em gráficos

### 📱 Interface responsiva

A interface foi desenvolvida para se adaptar a diferentes tamanhos de tela, reorganizando informações e ações de acordo com o espaço disponível.

## 💻 Tecnologias

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* TanStack Query
* Axios
* React Hook Form
* Zod

### Ferramentas

* Git
* GitHub
* npm

## 🏗️ Arquitetura

A aplicação foi organizada em componentes e módulos, buscando separar responsabilidades e facilitar a manutenção do código.

Uma representação simplificada da estrutura é:

```text
Pages
  ↓
Components
  ↓
Hooks / Queries
  ↓
API
  ↓
Backend REST
```

### Principais responsabilidades

#### Pages

Responsáveis pela composição das telas e organização das funcionalidades de cada rota da aplicação.

#### Components

Componentes reutilizáveis utilizados na construção da interface, formulários, tabelas, diálogos e outros elementos da aplicação.

#### Hooks / Queries

Responsáveis pelo gerenciamento das operações de comunicação com a API e pelo controle dos dados utilizados pela interface.

#### API

Responsável pela comunicação com o backend por meio de requisições HTTP utilizando Axios.

## 🔄 Comunicação com o Backend

O frontend utiliza **Axios** para realizar as requisições HTTP à API REST.

A URL base da API pode ser configurada por meio da variável de ambiente:

```env
VITE_API_BASE_URL=http://localhost:8080
```

As requisições autenticadas utilizam o token JWT armazenado após o login.

O token é enviado no header:

```http
Authorization: Bearer <token>
```

Quando a API retorna uma resposta `401 Unauthorized`, a aplicação encerra a sessão local e redireciona o usuário para a tela de login.

## 🧭 Rotas da aplicação

| Rota          | Descrição                    | Acesso      |
| ------------- | ---------------------------- | ----------- |
| `/`           | Página inicial               | Público     |
| `/login`      | Login                        | Público     |
| `/register`   | Cadastro de usuário          | Público     |
| `/statistics` | Estatísticas sobre encontros | Autenticado |
| `/meetings`   | Gerenciamento de encontros   | Autenticado |
| `/dashboard`  | Dashboard administrativo     | Coordenador |

## ▶️ Como executar

### Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js
* npm

O backend da aplicação também deve estar em execução para que as funcionalidades que dependem da API funcionem corretamente.

### 1. Clone o repositório

```bash
git clone https://github.com/RyanMartinsOne/monitoria-front.git
```

### 2. Acesse a pasta

```bash
cd monitoria-front
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure a API

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### 5. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite no terminal.

## 📚 Objetivos de aprendizagem

O desenvolvimento deste projeto permitiu aplicar conceitos como:

* Desenvolvimento de interfaces com React
* Tipagem estática com TypeScript
* Criação de componentes reutilizáveis
* Gerenciamento de formulários
* Validação de dados
* Gerenciamento de estado assíncrono
* Consumo de APIs REST
* Autenticação utilizando JWT
* Proteção de rotas
* Responsividade
* Organização e modularização de componentes
* Versionamento de código com Git
