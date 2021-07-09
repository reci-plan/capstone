// Import modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// import from config
const { PORT, API_KEY } = require("./config");

// import routes
const recipeRoutes = require("./routes/recipes");
const authRoutes = require("./routes/auth");

// import errors
const { NotFoundError } = require("./utils/errors");

// import middleware
const security = require("./middleware/security");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(security.extractUserFromJwt);
app.use("/recipes", recipeRoutes);
app.use("/auth", authRoutes);

// Error handlers
app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
