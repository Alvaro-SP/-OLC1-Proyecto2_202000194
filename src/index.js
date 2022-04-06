const indexRouter = require("./Routes/index.routes")
const express = require('express');//? crea el servidor
const morgan = require('morgan'); // monitorear el trafico
const cors = require('cors'); //hacer y recibir peticiones.

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); 
app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());

//* confirma el puerto que se quiere usar
app.listen(app.get('port'), () => {
    console.log('-------------------->Server On Port todo fresh...', app.get('port'))
});

app.use("/", indexRouter)

