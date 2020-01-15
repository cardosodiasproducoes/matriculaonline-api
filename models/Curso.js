'use strict'

const mongoose = require('mongoose');

class curso extends mongoose.Schema{

    constructor(){
        super({

            curso: {
                type: String,
                required: true
            },
            mensalidade: {
                type: Number,
                required: true,
            },
            matricula: {
                type: Number,
                required: true,
            },
            periodo: {
                type: String,
                required: true
            },
            tempo: {
                type: Number,
                required: true
            },
            

        });

        //Registrando a criação do model no Mongoose
        mongoose.model('Curso', this);
    }
}

module.exports = curso