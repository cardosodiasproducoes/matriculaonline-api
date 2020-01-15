'use strict'

const Express = require('express')
const Cors = require('cors')

const Mongoose = require('mongoose')
const env = process.NODE_ENV || 'development'
const BodyParser = require('body-parser')
const config = require('./config.json')[env]

const aluno = require('./models/Aluno')
const curso = require('./models/Curso')

class App{

    constructor(){
        this.app
    }

    init(){
        //Instanciar o objeto do Express
        this.app = Express()

        this.app.use(BodyParser.json())

        this.app.use(Cors())

        //chamando o DB
        Mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@${config.db.url}/${config.db.name}`, { useNewUrlParser: true})

        //Chamando as entidades (inserir aqui todas as entidades: cliente, usuário, departamentos, etc...)
        new aluno()
        new curso()

        //Importando as rotas (inserir aqui todas as rotas das entidades: clienteRota, usuárioRota, etc...)
        const alunosRoute = require('./routes/AlunosRoute')
        const cursosRoute = require('./routes/CursosRoute')

        //instanciando o objeto responsável por definir as rotas (instanciar aqui todas os objetos que 
        // definem as rotas)
        new alunosRoute(this.app)
        new cursosRoute(this.app)

        //Define a rota e o handler da rota raiz (/) da API
        this.app.get('/', function(req, res){
            res.send('Seja bem-vindo a API da Loja HT!!')
        })

        //Listener
        this.app.listen( config.port, function(){
            console.log('API ouvindo porta ' + config.port)

        })

    }
    
}

new App().init()