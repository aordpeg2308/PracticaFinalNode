const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();  


app.use(cors());

const animalRoutes = require("./v1/routes/animalRoutes"); 

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/animales", animalRoutes); 

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
