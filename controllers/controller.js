import jwt from "jsonwebtoken";
import "dotenv/config";
import { results } from "../data/agentes.js";

const secretKey = process.env.JWT_SECRET_KEY;
export const loginPage = (req, res) => {
  res.render("login", { title: "Login" });
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;
    const agente = results.find(
      (a) => a.email === email && a.password === password
    );
    if (agente) {
      const token = jwt.sign({ email, password }, secretKey, {
        expiresIn: 120,
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 120000,
        })
        .render("hiperenlace", { email, title: "Welcome" });
    } else {
      res.status(401).send("No estás autorizado para ingresar");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const dashboard = (req, res) => {
  try {
    const { token } = req.cookies;
    const { email, password } = jwt.verify(token, secretKey);
    if (!email || !password) {
      return res.status(401).send("No estás autorizado para ingresar"); 
    }
    res.render("dashboard", { email, title: "Dashboard"
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
