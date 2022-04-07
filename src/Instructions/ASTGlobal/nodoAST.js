
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodoAST = void 0;
const Tipo= require("./tiponodo")

class nodoAST{
    constructor(data) {
        this.childs = [];
        this.data = data;
    }

    setchilds(childs){
        this.childs=childs;
    }

    addChild(child) {
        if (child instanceof nodoAST) {
            this.hijos.push(child);
        } else {
            this.hijos.push(new nodoAST());
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
}
exports.nodoAST = nodoAST;