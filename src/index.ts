import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mysql from "mysql2/promise";
import path from "path";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

let connection: mysql.Pool;
try {
  connection = mysql.createPool({
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
} catch (err) {
  console.error("Erro ao conectar ao banco de dados:", err);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Função para validar se o nome contém números
function hasNumbers(str: string) {
  return /\d/.test(str);
}

// 1. Endpoint: GET /
// Página inicial estática
app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

// 2. Endpoint: GET /users
// Listagem de todos os usuários
app.get("/users", async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query("SELECT * FROM users");
    res.render("users/index", { users: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar usuários");
  }
});

// 3. Endpoint: GET /users/add
// Formulário para adicionar novos usuários
app.get("/users/add", (req: Request, res: Response) => {
  res.render("users/add", { errorMessage: null });
});

// 4. Endpoint: POST /users
// Inserção de novos usuários no banco de dados
app.post("/users", async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword, role, active } = req.body;

  // Validações
  if (hasNumbers(name)) {
    return res.render("users/add", {
      errorMessage: "O nome não pode conter números.",
    });
  }

  if (password !== confirmPassword) {
    return res.render("users/add", {
      errorMessage: "As senhas não são idênticas.",
    });
  }

  if (!name || !email || !password || !role) {
    return res.render("users/add", {
      errorMessage: "Todos os campos são obrigatórios.",
    });
  }

  try {
    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const isActive = active ? 1 : 0;

    // Inserir no banco de dados
    const insertQuery =
      "INSERT INTO users (name, email, password, role, active) VALUES (?, ?, ?, ?, ?)";
    await connection.query(insertQuery, [
      name,
      email,
      hashedPassword,
      role,
      isActive,
    ]);

    // Redirecionar para a listagem de usuários
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao salvar usuário");
  }
});

// 5. Endpoint: POST /users/:id/delete
// Exclusão de um usuário específico pelo ID
app.post("/users/:id/delete", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sqlDelete = "DELETE FROM users WHERE id = ?";
    await connection.query(sqlDelete, [id]);
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir usuário");
  }
});

// 6. Endpoint: GET /users/:id/edit
// Formulário para editar um usuário
app.get("/users/:id/edit", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows]: any = await connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    const user = rows[0];
    if (!user) {
      return res.status(404).send("Usuário não encontrado.");
    }
    res.render("users/edit", { user, errorMessage: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar usuário.");
  }
});

// 7. Endpoint: POST /users/:id/edit
// Atualização de um usuário no banco de dados
app.post("/users/:id/edit", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, role, active } = req.body;

  if (!name || !email || !role) {
    return res.render("users/edit", {
      errorMessage: "Todos os campos são obrigatórios.",
      user: { id, name, email, role, active },
    });
  }

  try {
    const isActive = active ? 1 : 0;

    // Atualizar no banco de dados
    const updateQuery =
      "UPDATE users SET name = ?, email = ?, role = ?, active = ? WHERE id = ?";
    await connection.query(updateQuery, [name, email, role, isActive, id]);

    // Redirecionar para a listagem de usuários
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar usuário.");
  }
});

// 8. Endpoint: GET /login
// Página de login
app.get("/login", (req: Request, res: Response) => {
  res.render("login", { errorMessage: null });
});

// 9. Endpoint: POST /login
// Verificação de login
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Buscar usuário pelo email
    const [rows]: any = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    const user = rows[0];

    if (!user) {
      return res.render("login", { errorMessage: "Credenciais inválidas." });
    }

    // Verificar a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.render("login", { errorMessage: "Credenciais inválidas." });
    }

    // Redirect to the users list if it was sucess
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao fazer login");
  }
});

// Página de recuperação de senha (estática)
app.get("/forgot-password", (req: Request, res: Response) => {
  res.render("login/forgot", { errorMessage: null });
});

// Inicia o servidor
app.listen(3000, () => console.log("Servidor ouvindo na porta 3000"));
