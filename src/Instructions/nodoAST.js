
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodoAST = void 0;

class nodoAST{
    constructor(data) {
        this.childs = new Array();
        this.data = data;
    }

    setchilds(childs){
        this.childs=childs;
    }

    addChild(child) {
        if (child instanceof nodoAST) {
            this.hijos.append(child);
        } else {
            this.hijos.append(new nodoAST());
        }
    }

    addChilds(childs) {
        childs.forEach(childs => this.hijos.append(childs));
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