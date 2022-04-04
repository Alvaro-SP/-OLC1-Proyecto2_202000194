import React, {Fragment, useEffect, useState} from 'react'
import './style2.css';
const API = 'http://localhost:4000';

export const ErrorT = (props)=>{
    
    return (
        <Fragment>
            <head>
        <meta charset="UTF-8"/>
        <title>CodePen - &lt;Table&gt; Responsive</title>
        {/* <link rel="stylesheet" href="./style2.css"/> */}
        </head>
        <body>

        
            {/* <!-- partial:index.partial.html --> */}
            <h1><span class="blue">&lt;</span>Reporte<span class="blue">&gt;</span> <span class="yellow"> de Errores</span></h1>
            <h2>  <a href="https://github.com/Alvaro-SP" target="_blank">Lista de Errores</a></h2>
            <table class="container">
                <thead>
                <tr>
                <th>No.</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Fila</th>
                <th>Columna</th>
                </tr>
                </thead>
                <tbody>
                {
                   
                    
                }
                </tbody>
            </table>
            </body>
        </Fragment>
        )
    }