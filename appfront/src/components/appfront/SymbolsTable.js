import React, {Fragment, useEffect, useState} from 'react'
import {Table } from 'semantic-ui-react'
import './style.css';
const API = "http://localhost:4000/";

export const Symbols = (props)=>{
    const getMetodo = async () => {
        const res = await fetch(`${API}`);
        const data = await res.json();
        props=data;
        // setParameter(String(props.match.params.id))
      };
    useEffect(() => {
        getMetodo();
        // eslint-disable-next-line
      }, []);
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
                    <th>Tipo</th>
                    <th>ambito</th>
                    <th>Fila</th>
                    <th>Columna</th>
                </tr>
            </thead>
        <tbody>
            {/* <tr>
                    <td>1</td>
                    <td>Primero</td>
                    <td>comentariomultilinea</td>
                    <td>2</td>
                    <td>27</td>
            </tr> 
            <tr>
                    <td>2</td>
                    <td>imprimir</td>
                    <td>imprimir</td>
                    <td>4</td>
                    <td>9</td>
                    </tr> <tr>
            </tr> */}
            {
            props.SIMBOLOS!=null?(
                props.SIMBOLOS.map((atributos,index)=>
                    <Table.Row>
                        <Table.Cell>{index+1}</Table.Cell>
                        <Table.Cell>{atributos.id}</Table.Cell>
                        <Table.Cell>{atributos.type}</Table.Cell>
                        <Table.Cell>{atributos.typeExp}</Table.Cell>
                        <Table.Cell>{atributos.entorno}</Table.Cell>
                        <Table.Cell>{atributos.fila}</Table.Cell>
                        <Table.Cell>{atributos.columna}</Table.Cell>
                    </Table.Row>
                    )
            ):(
                // <div><h1>No se encontro ningun simbolo que sirva durante la ejecucion.</h1></div>
                <Table.Row>
                    <Table.Cell>{0}</Table.Cell>
                    <Table.Cell>No se encontro ningun simbolo que sirva durante la ejecucion.</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                </Table.Row>
            )
        }
        </tbody>
    </table>
</body>

        </Fragment>
        )
    }