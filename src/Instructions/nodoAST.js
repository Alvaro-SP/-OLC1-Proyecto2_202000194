
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodoAST = void 0;

class nodoAST{
    constructor(data) {
        this.childs = new Array();
        this.data = data;
    }
    setchild(data){
        this.childs=data;
    }
}
exports.nodoAST = nodoAST;