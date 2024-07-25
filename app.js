require("express-async-errors")
const express = require('express');
require("dotenv").config()
require("./src/db/connection")
const cors = require('cors');
const corsOptions = require("./src/helpers/corsOptions");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");
const router = require("./src/routes");
const notFound = require("./src/middlewares/notFound");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Cors izinler
app.use(cors(corsOptions))
//Router
app.use("/api", router)
//Hata Yakalama
app.use(notFound);
app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})