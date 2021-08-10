const app = require("./app");

// import from config
const { PORT } = require("./config");

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
