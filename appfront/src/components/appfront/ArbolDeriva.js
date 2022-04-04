import React, { Fragment, useEffect, useState } from "react";
import "./style2.css";
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
        <div align="center">
          <img src="Graficos_generados\graficoimagen_Arbol_Derivacion1.png" />
        </div>
        <div style="overflow-x: scroll;" id="graphviz_svg_div"><h1>Reporte de AST</h1></div>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js'></script>

        {/* <!-- partial --> */}
        <script src="./script.js"></script>
      </body>
    </Fragment>
  );
};
