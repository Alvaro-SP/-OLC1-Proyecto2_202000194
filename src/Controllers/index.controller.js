var fs = require('fs'); 
const {exec} = require('child_process')
//! Mi Gramatica 
var parser = require('../Interpreter/myGrammar');
var interprete = require('../Interpreter/interprete')
var InstructionsAST = require('../Instructions/ASTGlobal/InstructionAST')

// ? ████████████████████████████████ INDEX GET ████████████████████████████████    
exports.index = async(req, res) => {
    //! SI LA CONSOLA NO ES VACIA, ENTONCES DEVUELVO LA CONSOLA

    if(interprete.instruccionesAPI.getAST().getConsole()== []){
        res.send({"Salida2":interprete.instruccionesAPI.getConsole().toString(), "interprete": interprete.instruccionesAPI.getAST().getConsole()});
    }else{
        res.send({"Salida2": "Server Active: aun no se ha ejecutado nada"});
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
    console.log(req.body.codigo);
    // cadena = JSON.stringify(req.body.codigo);  //vere cual de los dos funcio
    const cadena = req.body.codigo.toString()  //este jalo xdxd
    // const texto = req.body.text;
    // console.log("1. Cadena de Entrada (el codigo): " + texto);
    console.log("2. Cadena de Entrada (el codigo): " + cadena);
    const arbolIns =  interprete.instruccionesAPI.setInsAST(cadena);
    //*GENERO LA IMAGEN LA CUAL SE VA A MOSTRAR EN EL FRONTEND DEL AST
    var imagenast= arbolIns.genDot();
    //* GENERO EL ARCHIVO DOT
    var datos = imagenast.node+"\n"+imagenast.enlace;
    var relleno="\nlayout=dot     \nfontcolor=\"black\"   \nlabel=\"ARBOL DE DERIVACI�N\"      \nlabelloc = \"t\"  \nbgcolor=\"orange:red\"      \nedge [weight=1000 style=radial color=black ]  \nnode [shape=ellipse style=\"filled\"  color=\"green:lightblue\" gradientangle=\"315\"]   "
    var data= "digraph G {\n"+ relleno + datos + "\n}";
    console.log("********************************************************");
    console.log(data)

    fs.writeFile('ast.dot', data, function (err) {
        if (err) throw err;
    })
    exec('dot -Tpng ast.dot -o ast.png', (error, stdout,stderr)=>{
        if (error) {
            console.log(`error: ${error.message}`)
            return
        }
        if (stderr) {
            console.log(`error: ${stderr}`)
            return
        }
        console.log(stdout)
    })
    let base;
    try {
        var bitmap = fs.readFileSync('ast.png');
        // paso a bin la imagen :v
        base =  new Buffer.from(bitmap).toString('base64'); 
        // arbolIns.ast= base
    } catch (error) {
        console.log(error);
    }

    //* necesito retornar
    if(arbolIns ){
        res.send({
            cadena,
            Salida: "COMPILADO",
            VARIABLES: arbolIns.variables ,
            ERRORES: arbolIns.error,
            Consola: arbolIns.console,
            SIMBOLOS: arbolIns.symbolTable,
            AST: base
        });
    }else{
        res.send({
            cadena,
            Salida: "COMPILADO",
            VARIABLES: arbolIns.variables ,
            ERRORES: arbolIns.error,
            Consola: ['Existen errores es por eso de que no se pudo continuar, Revise el listado de errores para conocer a detalle donde se ubica su error y su tipo.'],
            SIMBOLOS: [],
            AST: [],
        });
    }
    
}
// ? ████████████████████████████████ POSTMAN ████████████████████████████████
exports.postman= async(req, res) => {
    console.log("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ POSTMANNNN ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");

    // res.send({Estado: ' el Server responde en True', Message: 'Todo en orden :)'});
    var texto='';
    // console.log('el dato:***********************************************');
    fs.readFile('./src/Public/entrada.txt', (err, data) => {
        // console.log('el dato:***********************************************');
        if (err) res.send({state: false, err: data});
        console.log('el dato:' +data.toString());
        texto=data.toString();
        // parser.parse(data.toString());
        res.send({valores:data})
    });

    console.log(texto);
    if(texto==''){
        res.send({state: false, err: 'No se ha cargado ningun archivo'});
    }
    try{
        var arbolIns =  interprete.instruccionesAPI.setInsAST(texto); 
        //* necesito retornar
        res.send({  Salida: "COMPILADO",
                    AST: arbolIns.variables ,
                    ListaErrores: arbolIns.error,
                    Consola: arbolIns.console
                });
    }catch(err){ 
        console.log(err);
        res.send({state: false, err: err});
    }
}

// ! Se envia la respuesta asi:
// app.get('/', (req, res) => {
//     res.send({"Saludo": "Hola OLC1"});
// });