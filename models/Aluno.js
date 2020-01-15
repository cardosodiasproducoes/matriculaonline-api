'use strict'

const mongoose = require('mongoose');

class aluno extends mongoose.Schema{

    constructor(){
        super({

            nome: {
                type: String,
                required: true
            },
            cpf: {
                type: Number,
                required: true,
            },
            rg: {
                type: Number,
                required: true,
            },
            dataNasc: {
                type: String,
                required: true
            },
            telefone: {
                type: Number,
                required: true
            },
            cursos: {
                type: Array,
            },

        });

        //Registrando a criação do model no Mongoose
        mongoose.model('Aluno', this);
    }
}

module.exports = aluno