var fs = require('fs'); 
//! Mi Gramatica 
var parser = require('../Interpreter/myGrammar');
var interprete = require('../Interpreter/interprete')
var InstructionsAST = require('../Instructions/ASTGlobal/InstructionAST')

// ? ████████████████████████████████ INDEX GET ████████████████████████████████    
exports.index = async(req, res) => {
    //! SI LA CONSOLA NO ES VACIA, ENTONCES DEVUELVO LA CONSOLA

    if(interprete.instruccionesAPI.getAST().getConsole()== []){
        res.send({"Message":interprete.instruccionesAPI.getConsole().toString(), "interprete": interprete.instruccionesAPI.getAST().getConsole()});
    }else{
        res.send({"Message": "Server Active: aun no se ha ejecutado nada"});
    }
    // res.send({Estado: interprete.instruccionesAPI.getActive(), Message: 'Server On Port todo fresh...'});
    // fs.readFile('./Public/entrada.txt', (err, data) => {
    //     if (err) res.send({state: false, err: err});

    //     res.send({Estado: interprete.instruccionesAPI.getActive(), Message: 'Server On Port todo fresh...'});
    // });
}
// ? ████████████████████████████████ ANALIZAR POST ████████████████████████████████
exports.analizar= async(req, res) => {
    console.log("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬REQUEST▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
    console.log(req.body);
    cadena = JSON.stringify(req.body);  //vere cual de los dos funcio
    const texto = req.body.text;
    console.log("1. Cadena de Entrada (el codigo): " + texto);
    console.log("2. Cadena de Entrada (el codigo): " + cadena);
    const arbolIns =  interprete.instruccionesAPI.setInsAST(cadena);
    //* necesito retornar 
    res.send({  Salida: "COMPILADO", 
                AST: arbolIns.variables , 
                ListaErrores: arbolIns.error, 
                Consola: arbolIns.console
            });
}
// ? ████████████████████████████████ POSTMAN ████████████████████████████████
exports.postman= async(req, res) => {
    console.log("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ POSTMAN ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");

    // res.send({Estado: ' el Server responde en True', Message: 'Todo en orden :)'});
    var texto;
    fs.readFile('././Public/entrada.cst', (err, data) => {
        if (err) res.send({state: false, err: err});
        console.log(data.toString());
        texto=data.toString();
        parser.parse(data.toString());
        // res.send({valores: interprete.instruccionesAPI.getOperations()})
    });


    console.log(texto);
    const arbolIns =  interprete.instruccionesAPI.setInsAST(texto);
    //* necesito retornar 
    res.send({  Salida: "COMPILADO",
                AST: arbolIns.variables ,
                ListaErrores: arbolIns.error,
                Consola: arbolIns.console
            });
}

// ! Se envia la respuesta asi:
// app.get('/', (req, res) => {
//     res.send({"Saludo": "Hola OLC1"});
// });