import React, {Fragment, useEffect, useState} from 'react'
import './style.css';
const API = 'http://localhost:4000';

export const Symbols = (props)=>{
    
    return (
        <Fragment>
    <head>
        <meta charset="UTF-8"/>
        <title>CodePen - &lt;Table&gt; Responsive</title></head> 
        {/* <link rel="stylesheet" href="./style.css"/>*/}
        
        <body>
        <h1>
            <span class="blue">&lt;</span>Reporte<span class="blue">&gt;</span> 
            <span class="yellow"> de Tokens</span>
            </h1>
            <h2><a href="https://github.com/Alvaro-SP" target="_blank">Lista de Tokens</a></h2>
            <table class="container">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Lexema</th>
                    <th>Tipo</th>
                    <th>Fila</th>
                    <th>Columna</th>
                </tr>
            </thead>
        <tbody> 
            <tr>
                    <td>1</td>
                    <td>Primero</td>
                    <td>comentariomultilinea</td>
                    <td>2</td>
                    <td>27</td>
                    </tr> <tr>
                    <td>2</td>
                    <td>imprimir</td>
                    <td>imprimir</td>
                    <td>4</td>
                    <td>9</td>
                    </tr> <tr>
            </tr>
        </tbody>
    </table>
</body>

        </Fragment>
        )
    }