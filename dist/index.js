"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promise_1 = __importDefault(require("mysql2/promise"));
const app = (0, express_1.default)();
// Configura EJS como a engine de renderização de templates
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
const connection = promise_1.default.createPool({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "pedro123",
    database: "unknow_peter_sql",
});
// Middleware para permitir dados no formato JSON
app.use(express_1.default.json());
// Middleware para permitir dados no formato URLENCODED
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/categories", async function (req, res) {
    const [rows] = await connection.query("SELECT * FROM categories");
    return res.render("categories/index", {
        categories: rows,
    });
});
app.get("/categories/form", async function (req, res) {
    return res.render("categories/form");
});
app.post("/categories/save", async function (req, res) {
    const body = req.body;
    const insertQuery = "INSERT INTO categories (name) VALUES (?)";
    await connection.query(insertQuery, [body.name]);
    res.redirect("/categories");
});
app.post("/categories/delete/:id", async function (req, res) {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM categories WHERE id = ?";
    await connection.query(sqlDelete, [id]);
    res.redirect("/categories");
});
app.listen("3000", () => console.log("Server is listening on port 3000"));
