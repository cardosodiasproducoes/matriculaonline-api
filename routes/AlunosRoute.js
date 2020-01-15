const aluno = require('../models/Aluno')
const alunoController = require('../controllers/AlunoController')

class AlunoRoute {
    constructor(app) {

        app.route('/alunos')
            .get(alunoController.buscarTodosOsAlunos)
            .post(alunoController.adicionarAluno)
            .delete(alunoController.deletarAluno)
            .put(alunoController.editar)

        app.route('/deletaraluno')
            .post(alunoController.deletarAluno)
        
        app.route('/matricular')
            .post(alunoController.matricularAluno)
    }
}

module.exports = AlunoRoute