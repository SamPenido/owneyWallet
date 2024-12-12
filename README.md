Descrição do Projeto



Este repositório contém a implementação de uma aplicação web voltada para criação de contas e login de usuários, com autenticação básica, utilizando as tecnologias HTML, CSS e JavaScript.

Funcionalidades Implementadas:

Criação de Conta: O usuário pode criar uma conta fornecendo dados como nome, email e senha. A senha é validada para garantir um nível mínimo de segurança.
Login de Usuário: O usuário pode autenticar-se utilizando seu email e senha, com verificação dos dados cadastrados.
Armazenamento Local: Utilizando localStorage, os dados dos usuários são armazenados localmente no navegador, garantindo persistência entre as sessões.
Validação de Formulários: As entradas fornecidas pelo usuário, como email e senha, são validadas em tempo real, assegurando que atendem aos requisitos de formato e segurança.
Feedback ao Usuário: Mensagens de erro são exibidas caso o usuário insira dados inválidos ou incompletos, como um email já registrado ou uma senha com requisitos inadequados.

Tecnologias Utilizadas:

HTML: Responsável pela estruturação do conteúdo da página, incluindo os formulários para criação de conta e login.

CSS: Estilos aplicados aos formulários e elementos de interação, proporcionando uma experiência de uso mais intuitiva e agradável.

JavaScript: Lógica de autenticação, criação de conta, validação de dados e manipulação do localStorage.

Estrutura do Código:

index.html: Arquivo HTML que contém a estrutura das páginas de login e criação de conta.

styles.css: Arquivo CSS responsável pelos estilos visuais da interface, como os formulários, botões e mensagens de erro.

account.js: Contém a lógica relacionada à criação de contas, validação dos dados e armazenamento das informações no localStorage.

login.js: Gerencia o processo de login, realizando a validação das credenciais e fornecendo o devido feedback ao usuário.

validation.js: Implementa as funções de validação para os campos de email, senha e outros dados fornecidos nos formulários.

Funcionamento:
Modularização do Código: O código foi organizado em funções específicas, responsáveis por diferentes etapas do processo de criação de conta, login e validação dos campos de entrada.
Manipulação do DOM: A interação com os elementos da interface do usuário é realizada através do DOM (Document Object Model), utilizando eventos como submit e click para invocar as funções.
Persistência de Dados com localStorage: Os dados dos usuários são armazenados no localStorage, permitindo que as informações permaneçam disponíveis mesmo após o fechamento do navegador.
