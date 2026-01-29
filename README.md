# 📝 Lista de Tarefas (React + Tailwind)

Gerenciador de tarefas moderno desenvolvido em **React**, focado em performance e experiência de usuário (UX). O projeto utiliza um **back-end simulado** (JSON Server) para realizar operações de CRUD completas (Criar, Ler, Atualizar e Deletar).

## 🚀 Tecnologias Utilizadas

* **React** (Vite)
* **Tailwind CSS** (Estilização e Modo Escuro)
* **Boxicons** (Ícones web components)
* **JSON Server** (API REST Fake para persistência de dados)
* **Fetch API** (Integração assíncrona com o backend)

## ✨ Funcionalidades

### ⚙️ Funcionais
* [x] **CRUD Completo:** Criação, Listagem, Edição e Exclusão de tarefas.
* [x] **Pesquisa em Tempo Real:** Filtragem de tarefas pelo título na barra superior.
* [x] **Persistência de Dados:** As tarefas ficam salvas no arquivo `api.json` via JSON Server.

### 🎨 Interface (UI/UX)
* [x] **Dark Mode:** Alternância de tema (Claro/Escuro) com persistência visual.
* [x] **Componente Gaveta (Drawer):** Formulários de cadastro e edição deslizam da lateral com animação suave, em vez de modais intrusivos.
* [x] **Responsividade:** Layout adaptável para Mobile e Desktop (Grid system).

## 📸 Demonstração


## 🛠️ Como rodar o projeto

Este projeto necessita de **dois terminais** rodando simultaneamente: um para o React (Front-end) e outro para o JSON Server (Back-end fake).

### 1. Preparação
Clone o repositório e instale as dependências:

```bash
git clone [https://github.com/camilarochatec/lista-de-tarefas-react.git](https://github.com/camilarochatec/lista-de-tarefas-react.git)
cd lista-de-tarefas-react
npm install

