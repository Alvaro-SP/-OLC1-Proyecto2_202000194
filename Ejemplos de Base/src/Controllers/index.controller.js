var fs = require('fs'); 
//! Mi Gramatica 
var parser = require('../Interpreter/myGrammar');
var interprete = require('../Interpreter/interprete')

exports.index = async(req, res) => {
    // fs.readFile('./Public/entrada.txt', (err, data) => {
    //     if (err) res.send({state: false, err: err});

    //     parser.parse(data.toString());
    //     // console.log(interprete.instruccionesAPI.getOperations());
    //     res.send({Estado: interprete.instruccionesAPI.getActive(), Message: 'Server On Port todo fresh...'});
    // });
    if (err) res.send({Salida: false, err: err});
    res.send({Salida: 'hola probando salida', Salida2: 'Probando la salida 2 normalito'});
        
}
// ! Se envia la respuesta asi:
// app.get('/', (req, res) => {
//     res.send({"Saludo": "Hola OLC1"});
// });