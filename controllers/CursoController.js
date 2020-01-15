'use strict'

const mongoose =  require('mongoose')
const curso =  mongoose.model('Curso')


class cursoController{

    // Metodos vigentes
    static async buscarTodosOsCursos(req, res){
        try{
            res.json(await curso.find({}))
        }catch(error){
            console.log("Erro ao buscar os cursos, o erro é: " + error)
            res.status(500).send("Erro ao buscar usuarios!")
        }
    }

    static async adicionarCurso(req, res){
        try{
            let novoCurso = await curso.create(req.body)
            res.status(200).json(novoCurso)
        } catch(error){
            console.log("Erro ao salvar curso: " + error)
            res.status(500).send("Erro ao adicionar curso!")
        }
    }

    static async deletarCurso(req, res){
        try{
            let cursoDeletado = await curso.findByIdAndDelete(req.body)
            res.status(200).json(cursoDeletado)
        } catch(error){
            console.log("Erro ao salvar curso: " + error)
            res.status(500).send("Erro ao adicionar curso!")
        }
    }

}

module.exports = cursoController