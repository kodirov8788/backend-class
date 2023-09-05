const express = require("express");
const cors = require("cors");

const environments = require("./config/environments");
const routes = require("./routes");
const Client = require("./routes/clientRoute");
const User = require("./routes/user");
const Login = require("./routes/loginroute");
// const errorHandler = require("./middlewares/error-handler.middleware");

const app = express();

const PORT = environments.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);
app.use("/api/client", Client);
app.use("/api/user", User);
app.use("/api/auth", Login);

// app.use(errorHandler);

require("./config/database");

app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));
