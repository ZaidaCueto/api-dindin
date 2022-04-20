const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const app = express();
app.use(cors());
app.use(routes);

app.listen(4000, () => console.log("Servidor rodando na porta 4000"));