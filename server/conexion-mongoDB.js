const mongoose = require("mongoose");

const conectar = () => {
    
    mongoose.connect(process.env.URLDB, 
    {useNewUrlParser: true, useCreateIndex: true},
    (err, res) => {
        if(err)
            throw err;
        
        console.log('Base de datos ONLINE');
    });
}

module.exports = {
    conectar
}