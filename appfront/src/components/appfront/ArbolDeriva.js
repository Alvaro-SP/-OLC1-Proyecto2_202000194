
import React, { Fragment, useEffect, useState } from "react";
import { Image } from 'semantic-ui-react'
import "./style2.css";
// import Graph from "react-graph-vis";
// import "./styles.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";
// import "./vis-network.min.js";
const API = "http://localhost:4000";

export const Arbol = (props) => {
  // ESTO HACE LA MAGIA PARA QUE PODAMOS GENERAR LA GRAFICA
  // var svg_div = jQuery("#graphviz_svg_div");
  // function UpdateGraphviz(dot) {
  //   svg_div.html("");
  //   var data = dot;
  //   // Generate the Visualization of the Graph into "svg".
  //   var svg = Viz(data, "svg");
  //   svg_div.html("<hr>" + svg);
  // }
//   function Graficar(dotgen) {
//     //create a network
//   var container = document.getElementById("mynetwork");
//   var DOTstring = dotgen

//   var DOTstring = "{1_Alvaro [label = \"Estructuras\nHola\nPrueba\nsocop2412@gmail.com\"];\n 1_Alvaro--2_Alvaro;2_Alvaro--3_Alvaro;}"

//   console.log(DOTstring)
//   var parsedData = vis.parseDOTNetwork(DOTstring);
//   var data = {
//       nodes: parsedData.nodes,
//       edges: parsedData.edges
//   }
//   var options = {
//       nodes: {
//           shape: 'box',
//           borderWidth: 2,
//           color:"yellow",
//       },
//       layout: {
//           hierarchical: {
//               levelSeparation: 150,
//               nodeSpacing: 170,
//               parentCentralization: false,
//               direction: 'UD',        // UD, DU, LR, RL
//               sortMethod: 'directed',  // hubsize, directed
//               shakeTowards: 'roots'  // roots, leaves
//           },
//       },
//   };
//   var network = new vis.Network(container, data, options);
// }
var [currentText, setCurrentText] = useState("");
const getMetodo = async () => {
  const res = await fetch(`${API}`);
  const data = await res.json();
  setCurrentText(data["AST"]);
  // setParameter(String(props.match.params.id))
};
useEffect(() => {
  getMetodo();
  // eslint-disable-next-line
}, []);

  return (
    <Fragment>
      <head>
        <meta charset="UTF-8" />
        <title>CodePen - &lt;Table&gt; Responsive</title>
        {/* <link rel="stylesheet" href="./style2.css"/> */}
      </head>
      <body>
        {/* <!-- partial:index.partial.html --> */}
        <h1>
          <span class="blue">&lt;</span>Reporte<span class="blue">&gt;</span>{" "}
          <span class="yellow"> Arbol de Derivación</span>
        </h1>
        <h2>
          {" "}
          <a href="https://github.com/Alvaro-SP" target="_blank">
            Usando la Gramatica Independiente del Contexto
          </a>
        </h2>
        {/* <table class="container"> */}
        {/* <div align="center">
          <img src="Graficos_generados\graficoimagen_Arbol_Derivacion1.png" />
        </div> */}
        <h1>Reporte de AST</h1>
        <div align="center">
          {/* <p>{currentText}</p> */}
          {/* <img fluid src={props.AST}></img> */}
          {
            currentText!=null?(
              <Image fluid src={"data:image/png;base64,"+currentText} />
            ):(
              <Image fluid src="https://media.giphy.com/media/hStvd5LiWCFzYNyxR4/giphy.gif" />
            )
          }
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        {/* <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script> */}
        {/* <!-- partial --> */}
        <script src="./script.js"></script>
      </body>
    </Fragment>
  );
};
