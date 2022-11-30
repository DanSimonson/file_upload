const express = require("express");
const app = express();

app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server Running on PORT... ${PORT}`));


