# Unicesumar Blog

<!-- ![Banner do Blog](path/to/banner.png) -->

![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green)
![Express.js](https://img.shields.io/badge/Express.js-4.17.1-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0.23-blue)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📖 Descrição

O **Unicesumar Blog** é um projeto desenvolvido para a instituição de ensino Unicesumar com o objetivo de criar um novo blog onde os alunos e colaboradores possam acessar as últimas informações sobre a instituição, além de conteúdos acadêmicos e administrativos.

## 🚀 Funcionalidades

- **Cadastro de Usuários**: Permite que apenas usuários cadastrados tenham acesso ao blog.
- **Página de Login**: Autenticação segura para acesso ao sistema.
- **Página Inicial**: Interface estática com informações e links relevantes.
- **Esqueci Minha Senha**: Simulação de funcionalidade com alerta informando que a recuperação de senha não está implementada.

## 🛠 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3 e Bootstrap 5 (estilização e responsividade)
- **Backend**: Node.js, Express.js, bcrypt(para criptografia de senhas)
- **Banco de Dados**: MySQL
- **Controle de Versão**: Git e GitHub

## 📝 Instalação

Siga os passos abaixo para configurar o projeto localmente:

### 1. Clone o Repositório

```bash
git clone https://github.com/rafael-labegalini/mysql-api-adsb.git
cd mysql-api-adsb
```

2. Instale as Dependências

Certifique-se de ter o Node.js e o MySQL instalados.

```bash
npm install
```

3. Configuração do Banco de Dados

   Crie um banco de dados no MySQL.

   Configure as variáveis de ambiente no arquivo sql.env com as credenciais do banco de dados:

```bash
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
```

4. Inicie o Servidor

```bash
npm start
```

5. Acesse a Aplicação

Abra o navegador e vá para http://localhost:3000.

📚 Uso

```bash
Cadastro de Usuários:
    Acesse /users para visualizar a lista de usuários.
    Acesse /users/add para adicionar novos usuários.

Login:
    Acesse /login para autenticar-se no sistema.

Página Inicial do Blog:
    Acesse / para visualizar a página inicial com os últimos posts do blog.
    Essa página exibe posts simulados com conteúdo fictício e links para visualizações detalhadas.

Esqueci Minha Senha:
    A funcionalidade de recuperação de senha não está implementada, mas ao acessar /forgot-password, um alerta será exibido indicando que esta é apenas uma simulação.
```

🔧 Melhorias e Funcionalidades Futuras

```bash
    Recuperação de Senha: Implementação real da funcionalidade "Esqueci Minha Senha", com envio de e-mail.
    Gerenciamento de Posts: Possibilidade de criar, editar e excluir postagens do blog diretamente na interface.
    Paginação: Implementação de paginação para navegação entre posts mais antigos.
```

🤝 Contribuição: Contribuições são bem-vindas! Para contribuir, siga os passos abaixo:

1. Faça um fork do projeto
2. Crie uma branch: git checkout -b minha-feature
3. Envie suas alterações: git commit -m 'Adicionando minha feature'
4. Faça um push para a branch: git push origin minha-feature
5. Abra um Pull Request

📝 Licença: Este projeto está licenciado sob a MIT License.

👤 Desenvolvido por Pedro Toscano [github.com/pedro12u](https://github.com/pedro12u)
