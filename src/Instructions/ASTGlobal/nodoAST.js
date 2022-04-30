
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodoAST = void 0;
const Tipo= require("./tiponodo")

class nodoAST{
    constructor(data,childs) {
        this.childs = childs
        this.data = data;
    }

    setchilds(childs){
        this.childs=childs;
    }

    addChild(child) {
        if (child instanceof nodoAST) {
            this.hijos.push(child);
        } else {
            this.hijos.push(new nodoAST(child));
        }
    }

    addChilds(childs) {
        childs.forEach(childs => this.hijos.push(childs));
    }

    addFirstChild(firstchild) {
        if (firstchild instanceof nodoAST) {
            this.hijos.push(firstchild);
        }else if (firstchild instanceof String) {
            this.hijos.push(new nodoAST(firstchild));
        } 
    }

    setData(data) {
        this.data = data;
    }
    
    getData() {
        return this.data;
    }

    getchild(){
        return this.childs;
    }
    //!---------------------- METODOS PARA GENERAR DOT----------------------
    dotGen(num){
        if(this.childs==null){
            var retorno = {node: "node_"+num.num+"[label=\""+this.data+"\"]\n", data: this.data, enlace: ""}
            num.num++;
            return retorno;
        }else{
            var etiqueta= "node_"+num.num
            var temporalnum=num.num;
            let nodos = "node_"+num.num +"[label=\""+this.data+"\"]\n"
            num.num++
            let enlaces = ''
            //* aqui por cada hijo que exista 
            for (let i = 0; i < this.childs.length; i++) {
                try {
                    const child = this.childs[i];
                enlaces+=etiqueta+"->node_"+num.num+"\n"
                // console.log("El hijo child------------------------------")
                // console.log(child)
                let temporal = child.dotGen(num)
                nodos+=temporal.node
                enlaces+=temporal.enlace
                } catch (error) {
                    
                }
                
            }
            return {node: nodos, data:this.data, enlace:enlaces}
        }
    }
}
exports.nodoAST = nodoAST;