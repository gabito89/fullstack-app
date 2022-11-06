const mongoose = require("mongoose");
const app=require('./app');
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`API E-Commerce corriendo en http://localhost:${PORT}`)
        });
        console.log("Conectado a DB Mongo");
    }).catch((err) => console.log(err));