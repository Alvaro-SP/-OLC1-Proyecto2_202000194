import React, {Fragment, useEffect, useState} from 'react'
import './style2.css';
const API = 'http://localhost:4200';

export const Arbol = (props)=>{
    
    return (
        <Fragment>
            <head>
            <meta charset="UTF-8"/>
            <title>CodePen - &lt;Table&gt; Responsive</title>
            {/* <link rel="stylesheet" href="./style2.css"/> */}
            </head>
            <body>
            {/* <!-- partial:index.partial.html --> */}
            <h1><span class="blue">&lt;</span>Reporte<span class="blue">&gt;</span> <span class="yellow"> Arbol de Derivación</span></h1>
            <h2>  <a href="https://github.com/Alvaro-SP" target="_blank">Usando la Gramatica Independiente del Contexto</a></h2>
            {/* <table class="container"> */}
            <div align="center"><img src="Graficos_generados\graficoimagen_Arbol_Derivacion1.png"/></div>
            
            {/* <!-- partial --> */}
            <script  src="./script.js"></script>
            </body> 

        </Fragment>
        )
    }