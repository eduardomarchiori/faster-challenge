# My Drinks

Projeto desenvolvido com o objetivo de criar uma listagem de bebidas com informações de seu preparo para um processo seletivo.

## Setup

- Clone o projeto
- Entre no repositório

```bash
  cd faster-challenge
```

- Instale as dependencias

```bash
  yarn
```

ou

```bash
  yarn install
```

- Inicie a aplicação
  - Opções de inicialização
  ```bash
    yarn dev #inicializa em modo de desenvolvimento
  ```
  ```bash
    yarn preview #inicializa em modo de produção
  ```

## Funcionalidades

- Listagem de bebidas
- Filtro por categoria selecionada
- Filtro por nomes que contem letras digitadas
- Marcar bebidas como favoritas

## Decisões técnicas

- Utilizar **Nuxt3** com **Vue3** para aproveitar funcionaliades recentes e se manter atualizado com a ferramenta;
- Utilizar **Tailwind CSS** para facilitar o desenvolvimento do estilio e responsividaade da aplicação;
- Utilizar **Vuetify 3** para utilizar componentes de um Design System já pronto acelerando o desenvolvimento;
- Utilizar **local storage** para salvar status de item favoritado para evitar criar aplicação back-end e ganhar tempo;
- Componetizar o máximo possível para evitar código redundante e criar escalabilidade com reapoveitamento de componentes.
