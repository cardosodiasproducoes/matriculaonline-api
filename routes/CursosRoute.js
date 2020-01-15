const curso = require('../models/Curso')
const cursoController = require('../controllers/CursoController')

class cursoRoute {
    constructor(app) {

        app.route('/cursos')
            .get(cursoController.buscarTodosOsCursos)
            .post(cursoController.adicionarCurso)
            
        app.route('/deletarcurso')
            .post(cursoController.deletarCurso)
    }
}

module.exports = cursoRoute