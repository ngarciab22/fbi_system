import express from "express";
import router from "./routes/router.js";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/", router);
//motor de plantillas
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
