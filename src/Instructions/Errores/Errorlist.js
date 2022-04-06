 class Errorlist{
        constructor(){
            this.principio=null;
            this.fin=null;
        }
        //Insertar un Error
        insertar(Error){
            if(this.principio==null){
                this.principio=Error;
                this.fin=Error;
                return;
            }
            this.fin.siguiente=Error;
            Error.anterior=this.fin;
            this.fin=Error;

        }

        getErrores(){
            var texto="";

            var muestra=this.principio;

            while(muestra!=null){
                texto+="ERROR: Tipo:"+muestra.tipo
                +" Descripcion: "+muestra.descripcion
                +" Fila: "+muestra.fila
                +" Columna: "+muestra.columna+" \n";
                muestra=muestra.siguiente;
            }

            return texto;
        }

        reiniciar(){
            this.principio=null;
            this.fin=null;
        }

    }




module.exports.Errorlist = Errorlist;