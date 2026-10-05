const express = require("express");
const app = express();
app.use(express.static("public"));
const PORT = 3000;
app.listen(PORT, () => {
  console.log(
    `Siis palvelin on käynnissä osoitteessa http://localhost:${PORT}`,
  );
});
