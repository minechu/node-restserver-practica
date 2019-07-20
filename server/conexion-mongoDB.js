const mongoose = require("mongoose");

const conectar = () => {
    
    mongoose.connect("mongodb://localhost:27017/cafe", (err, res) => {
        if(err)
            throw err;
        
        console.log('Base de datos ONLINE');
    });
}

module.exports = {
    conectar
}