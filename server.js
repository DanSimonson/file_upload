const path = require("path");
const express = require("express");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//const __dirname = path.resolve();
// Handle GET requests to /express_backend route
app.get("/express_backend", (req, res) => {
  res.send({ message: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});
//path.resolve
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));
//..
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server Running on PORT... ${PORT}`));
