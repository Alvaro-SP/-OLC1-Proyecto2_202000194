import React, {Fragment, useEffect, useState} from 'react'
import {Table } from 'semantic-ui-react'
import './style2.css';
const API = 'http://localhost:4000';

export const ErrorT = (props)=>{
    var [currentText2, setCurrentText2] = useState("");
    const getMetodo2 = async () => {
        const res = await fetch(`${API}`);
        const data = await res.json();
        // props=data;
        setCurrentText2(data["ERRORES"]);
        // setParameter(String(props.match.params.id))
      };
    useEffect(() => {
        getMetodo2();
        // eslint-disable-next-line
      }, []);
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
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Fila</th>
                <th>Columna</th>
                </tr>
                </thead>
                <tbody>
                {
                   currentText2?(
                    currentText2.map((atributos,index)=>
                        <Table.Row>
                            <Table.Cell>{index+1}</Table.Cell>
                            <Table.Cell>{atributos.tipo}</Table.Cell>
                            <Table.Cell>{atributos.error}</Table.Cell>
                            <Table.Cell>{atributos.fila}</Table.Cell>
                            <Table.Cell>{atributos.column}</Table.Cell>
                        </Table.Row>
                        )
                ):(
                    // <div><h1>No se encontro ningun simbolo que sirva durante la ejecucion.</h1></div>
                    <Table.Row>
                        <Table.Cell>{0}</Table.Cell>
                        <Table.Cell>{0}</Table.Cell>
                        <Table.Cell>No se encontraron ningun tipo de ERRRORES.</Table.Cell>
                        <Table.Cell>{0}</Table.Cell>
                        <Table.Cell>{0}</Table.Cell>
                    </Table.Row>
                )
                }
                </tbody>
            </table>
            </body>
        </Fragment>
        )
    }