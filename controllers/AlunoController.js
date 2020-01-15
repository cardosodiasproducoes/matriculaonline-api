'use strict'

const mongoose =  require('mongoose')
const aluno =  mongoose.model('Aluno')
const curso = mongoose.model('Curso')


class alunoController{

    // Metodos vigentes
    static async buscarTodosOsAlunos(req, res){
        try{
            res.json(await aluno.find({}))
        }catch(error){
            console.log("Erro ao buscar os alunos, o erro é: " + error)
            res.status(500).send("Erro ao buscar usuarios!")
        }
    }

    static async adicionarAluno(req, res){
        try{
            let resultado = await aluno.create(req.body)
            res.status(200).json(resultado)
        } catch(error){
            console.log("Erro ao salvar aluno: " + error)
            res.status(500).send("Erro ao adicionar aluno!")
        }
    }

    static async deletarAluno(req, res){
        try{
            let idDeletar = req.body._id
            let resultado = await aluno.findByIdAndDelete(req.body)
            res.status(200).json(resultado)
        } catch(error){
            res.status(500).send("Erro ao deletar Aluno!")
        }
    }

    static async matricularAluno(req, res){
        try{
            let dadosDoCurso = {}
            let dadosDoAluno = {}
            if(req.body._idDoCurso != ''){
                let _id = req.body._idDoCurso
                dadosDoCurso = await curso.findById(_id)
            }
            if(req.body._idDoAluno != ''){
                let _id = req.body._idDoAluno
                dadosDoAluno = await aluno.findById(_id)
            }
            let arrayDosCursosDoAluno = dadosDoAluno.cursos
            arrayDosCursosDoAluno.push(dadosDoCurso)
            dadosDoAluno.cursos = arrayDosCursosDoAluno
            let alunoEditado = await aluno.findByIdAndUpdate(dadosDoAluno._id, dadosDoAluno)
            res.status(200).json(alunoEditado)
        }catch(error){
            res.status(500).send("Erro ao matricular Aluno no curso especificado!")
        }

    }

    // Metodos não vigentes

    static async buscarUsuarioComId(req, res){
        try{
            let _id = req.body._id
            let usuarioEncontrado = await Usuario.findOne({ _id })
            res.status(500).send(usuarioEncontrado)
        } catch(error){
            res.status(200).send("Erro ao buscar usuario com id especificado!")
        }
            
    }

    static async autenticar(req, res){
        try{
            let email = req.body.email
            let senha = req.body.senha

            let existeUsuario = await Usuario.findOne({ email, senha });
            
            if(existeUsuario == null){
                res.send("Usuário não encontrado")
            } else {
                res.status(200).send(existeUsuario)
            }

        }catch(error){
            console.log(error)
            res.status(500).send("Erro na autenticação!")
        }
    }

    static async autenticarNoLocalStorage(req, res){
        try{
            let email = req.body.email
            
            console.log("objetoRecebido tem isso no .email: " + email)

            let existeUsuario = await Usuario.findOne( { email } );
            
            if(existeUsuario == null){
                res.send("Usuário não encontrado")
            } else {
                res.status(200).send(existeUsuario)
            }

        }catch(error){
            console.log(error)
            res.status(500).send("Erro na autenticação!")
        }
    }

    static async deletar(req, res){
        try{
            let idDeletar = req.body._id
            let resultado = await Usuario.findByIdAndDelete(req.body)
            res.status(200).json(resultado)
        } catch(error){
            res.status(500).send("Erro ao deletar usuario!")
        }
    }

    static async editar(req, res){
        try{
            let resultado = await Usuario.findByIdAndUpdate(req.body._id, req.body)
            res.status(200).json(resultado)
        }catch(error){
            res.status(500).send("Erro ao editar usuario!")
        }
    }
}

module.exports = alunoController