var fs = require('fs'); 
const {exec} = require('child_process')
//! Mi Gramatica 
var parser = require('../Interpreter/myGrammar');
var interprete = require('../Interpreter/interprete')
var InstructionsAST = require('../Instructions/ASTGlobal/InstructionAST');
const { syncBuiltinESMExports } = require('module');
var arbolIns//= new InstructionsAST.InstructionAST();
var cadena=""
let base = "";
let basetemp = "";
var ac=0;
var erroreslexicos=0;
// ? ████████████████████████████████ INDEX GET ████████████████████████████████    
exports.index = async(req, res) => {
    //! SI LA CONSOLA NO ES VACIA, ENTONCES DEVUELVO LA CONSOLA
    // console.log("INDEX");
    // console.log(arbolIns)
    // console.log()
    var textonuevo
    
    if(arbolIns){
        for(var i=0;i<arbolIns.console.length;i++){
            textonuevo+=arbolIns.console[i].toString()+"";
        }//console.log(arbolIns)
        // console.log(arbolIns.error.length)
        // console.log(parser.erroreslexicos.length)
        if(arbolIns.error.length<1 && parser.erroreslexicos.length>0){
            for (var i = 0; i < parser.erroreslexicos.length; i++) {
                arbolIns.setError(parser.erroreslexicos[i]);
            }
        }
        try {
            var bitmap = fs.readFileSync('AST_ULTIMO.png');
        // paso a bin la imagen :v
        basetemp =  new Buffer.from(bitmap).toString('base64');
        } catch (error) {
            
        }
         
        res.send({
            CADENA:cadena,
            Salida: "COMPILADO",
            VARIABLES: arbolIns.variables ,
            ERRORES: arbolIns.error,
            Consola: textonuevo,
            
            SIMBOLOS: arbolIns.symbolTable,
            AST: basetemp
        });
        // res.send({"Salida2":interprete.instruccionesAPI.getConsole().toString(), "arbol": interprete.instruccionesAPI.getAST()});
    }else{
        res.send({
            CADENA:cadena,
            Salida: "COMPILADO",
            VARIABLES: [] ,
            ERRORES: [],
            Consola: ['Aun no se ejecuta NADA el BACKEND is READY !!!.'],
            SIMBOLOS: [],
            AST: basetemp,
        });
        // res.send({"Salida2": "Server Active: aun no se ha ejecutado nada", "arbol": interprete.instruccionesAPI.getAST()});
    }
    
    
    // res.send({Estado: interprete.instruccionesAPI.getActive(), Message: 'Server On Port todo fresh...'});
    // fs.readFile('./Public/entrada.txt', (err, data) => {
    //     if (err) res.send({state: false, err: err});

    //     res.send({Estado: interprete.instruccionesAPI.getActive(), Message: 'Server On Port todo fresh...'});
    // });
}
// ? ████████████████████████████████ ANALIZAR POST ████████████████████████████████
exports.analizar= async(req, res) => {
    // let basetemp=""
    console.log("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬REQUEST▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
    // console.log(req.body.codigo);
    // cadena = JSON.stringify(req.body.codigo);  //vere cual de los dos funcio
    cadena = req.body.codigo.toString()  //este jalo xdxd
    // const texto = req.body.text;
    // console.log("1. Cadena de Entrada (el codigo): " + texto);
    console.log("2. Cadena de Entrada (el codigo): \n" + cadena);
    try {
        arbolIns =  interprete.instruccionesAPI.setInsAST(cadena);
        //*GENERO LA IMAGEN LA CUAL SE VA A MOSTRAR EN EL FRONTEND DEL AST
        var imagenast= arbolIns.genDot();
        //* GENERO EL ARCHIVO DOT
        var datos = imagenast.node+"\n"+imagenast.enlace;
        var relleno="\nlayout=dot     \nfontcolor=\"black\"   \nlabel=\"ARBOL DE DERIVACI�N\"      \nlabelloc = \"t\"  \nbgcolor=\"orange:red\"      \nedge [weight=1000 color=black ]  \nnode [shape=ellipse style=\"filled\"  color=\"green:lightblue\" gradientangle=\"315\"]   "
        var data= "digraph G {\n"+ relleno + datos + "\n}";
        console.log("********************************************************");
        console.log(data)
        fs.writeFile('AST_ULTIMO.dot', data, function (err) {
            if (err) throw err;
        })
        fs.writeFile('AST_ULTIMO.dot', data, function (err) {
            if (err) throw err;
        })
        // ultimonombre= "AST_ULTIMO"+acc+".dot"
        exec('dot -Tpng AST_ULTIMO.dot -o AST_ULTIMO.png', (error, stdout,stderr)=>{
            if (error) {
                console.log("error: "+error.message)
                return
            }
            if (stderr) {
                console.log("error: "+stderr)
                return
            }
            console.log(stdout)
        })
        exec('dot -Tpng AST_ULTIMO.dot -o AST_ULTIMO.png', (error, stdout,stderr)=>{
            if (error) {
                console.log("error: "+error.message)
                return
            }
            if (stderr) {
                console.log("error: "+stderr)
                return
            }
            console.log(stdout)
        })
        exec('dot -Tpng AST_ULTIMO.dot -o AST_ACUMULADO'+ac+'.png', (error, stdout,stderr)=>{
            if (error) {
                console.log("error: "+error.message)
                return
            }
            if (stderr) {
                console.log("error: "+stderr)
                return
            }
            console.log(stdout)
        })
        ac++;
        try {
            await sleep(5000)
            var bitmap = fs.readFileSync('AST_ULTIMO.png');
            // paso a bin la imagen :v
            basetemp =  new Buffer.from(bitmap).toString('base64'); 
            base="";
            base=basetemp;
            arbolIns.ast= basetemp
        } catch (error) {
            // console.log(error);
        }
    } catch (error) {
        console.log("ENTRO AL ERROR QUE NO DEBE");
        // console.log(arbolIns)
        // arbolIns.console.push(error);
    }
    //* necesito retornar
    if(arbolIns){
        console.log('***************************CONSOLA*****************************');
        console.log(arbolIns.console.toString());
        var textonuevo="";
        for(var i=0;i<arbolIns.console.length;i++){
            textonuevo+=arbolIns.console[i].toString()+"";
        }
        res.send({
            CADENA:cadena,
            Salida: "COMPILADO",
            VARIABLES: arbolIns.variables ,
            ERRORES: arbolIns.error,
            Consola: textonuevo,
            SIMBOLOS: arbolIns.symbolTable,
            AST: arbolIns.ast
        });
    }else{
        
        res.send({
            CADENA:cadena,
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