//
// DATOS DE CONFIGURACION
//

const config = {
    dev:{
        cadenaConexion: "mongodb://localhost:27017/cafe",
        puertoServidor: 3000
    },
    prod:{
        usuario: "admin",
        clave: "0HT9tcSEoHNF3P0W",
        cadenaConexion: "mongodb+srv://<usuario>:<clave>@cluster0-bwkgw.mongodb.net/cafe ",
        puertoServidor: 3000
    }
};

// =================================
// obteniendo datos de conexion
// =================================

((datosCongif) => {
    try
    {
        process.env.NODE_ENV = 'prod';
        const configuracion = datosCongif[process.env.NODE_ENV || 'dev'];
        process.env.PORT = configuracion.puertoServidor;
        //process.env.URLDB = configuracion.cadenaConexion;
        process.env.URLDB = configuracion.cadenaConexion
            .replace('<usuario>', configuracion.usuario)
            .replace('<clave>', configuracion.clave);

    }
    catch(error)
    {
        throw new Error("Verificar el entorno de desarrollo. " + error);
    }
})(config);