const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            apigpt: '/api'
        }

        //Middlewares
        this.middlewares();

        //Rutas de aplicación
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parsear body a json
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.paths.apigpt,require('../routes/chatgpt.route'));
    }

    listen(){
        this.app.listen(this.port,  ()=>{
            console.log('Servidor corriendo en puerto ',this.port);
        })
    }

}

module.exports = Server;