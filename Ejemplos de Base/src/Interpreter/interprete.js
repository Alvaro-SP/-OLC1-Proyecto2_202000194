let operations = []

const instruccionesAPI = {	
	addOperation: function(valor) {
		operations.push({valor: valor});
	},

    getActive: function() {
		return true;
	}
}

module.exports.instruccionesAPI = instruccionesAPI;