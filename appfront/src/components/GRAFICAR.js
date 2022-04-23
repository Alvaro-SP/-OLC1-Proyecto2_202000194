
//create a network
var container = document.getElementById("mynetwork");
var DOTstring = dotgen

// var DOTstring = "{1_Alvaro [label = \"Estructuras\nHola\nPrueba\nsocop2412@gmail.com\"];\n 1_Alvaro--2_Alvaro;2_Alvaro--3_Alvaro;}"

console.log(DOTstring)
// console.log("Holaa esta es una prueba.")

var parsedData = vis.parseDOTNetwork(DOTstring);
var data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges
}
var options = {
    nodes: {
        shape: 'box',
        borderWidth: 2,                
        color:"yellow",
    },        
    layout: {
        hierarchical: {
            levelSeparation: 150,
            nodeSpacing: 170,
            parentCentralization: false,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'directed',  // hubsize, directed
            shakeTowards: 'roots'  // roots, leaves                        
        },
    },                        
};
var network = new vis.Network(container, data, options);