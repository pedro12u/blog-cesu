import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();

// Configura EJS como a engine de renderização de templates
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

const connection = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "process.env.MYSQL_USER",
  password: "process.env.MYSQL_PASSWORD",
  database: "process.env.MYSQL_DATABASE",
});

// Middleware para permitir dados no formato JSON
app.use(express.json());
// Middleware para permitir dados no formato URLENCODED
app.use(express.urlencoded({ extended: true }));

app.get("/categories", async function (req: Request, res: Response) {
  const [rows] = await connection.query("SELECT * FROM categories");
  return res.render("categories/index", {
    categories: rows,
  });
});

app.get("/categories/form", async function (req: Request, res: Response) {
  return res.render("categories/form");
});

app.post("/categories/save", async function (req: Request, res: Response) {
  const body = req.body;
  const insertQuery = "INSERT INTO categories (name) VALUES (?)";
  await connection.query(insertQuery, [body.name]);

  res.redirect("/categories");
});

app.post(
  "/categories/delete/:id",
  async function (req: Request, res: Response) {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM categories WHERE id = ?";
    await connection.query(sqlDelete, [id]);

    res.redirect("/categories");
  }
);

app.listen("3000", () => console.log("Server is listening on port 3000"));
