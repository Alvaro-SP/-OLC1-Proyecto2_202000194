var fs = require('fs'); 
//! Mi Gramatica 
var parser = require('../Interpreter/myGrammar');
var interprete = require('../Interpreter/interprete')
var interprete = require('../Instructions/InstructionAST')

exports.index = async(req, res) => {
    
    // let arbolIns = new InstructionAST();
    // este seria mi gran contenedor de instrucciones
    //************ EL AST*************** */
    var arbolIns=parser.parse(data.toString());
    //! PENDIENTE COMO VALIDAR EL RUN OSEA SI SE VA A EJECUTAR EL RUN POR cada metodo
    //! O SOLAMENTE VA A DECIR DONDE INICIAR.
    res.send({Estado: interprete.instruccionesAPI.getActive(), Message: 'Server On Port todo fresh...'});
    // fs.readFile('./Public/entrada.txt', (err, data) => {
    //     if (err) res.send({state: false, err: err});

    //     res.send({Estado: interprete.instruccionesAPI.getActive(), Message: 'Server On Port todo fresh...'});
    // });
}
// ! Se envia la respuesta asi:
// app.get('/', (req, res) => {
//     res.send({"Saludo": "Hola OLC1"});
// });