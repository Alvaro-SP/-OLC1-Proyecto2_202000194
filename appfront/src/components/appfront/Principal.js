import React, { Fragment, useEffect, useState } from "react";
// import { Button, Form, Grid, Header, Icon, Menu, Segment, TextArea } from 'semantic-ui-react'
import "./index.css";
// const axios = require('axios').default
const API = "http://localhost:4000/";

export const Home = (props) => {
  // const [Entrada, Salida, Salida2] = useState("");
  var [currentText, setCurrentText] = useState("");
  const [consola, setConsola] = useState("");
  const [errores, setErrores] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [ast, setAst] = useState(null);
  const [Salida, setSalida] = useState("");
  const [Salida2, setSalida2] = useState("");
  var compilar = (e) => {
    alert(currentText);
    e.preventDefault();
    fetch(`${API}` + 'analizar', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo: currentText,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentText(data["CADENA"]);
        setSalida2(data["Consola"]);
        setErrores(data["ERRORES"]);
        setSymbols(data["SIMBOLOS"]);
        setAst(data["AST"]);
      });
  };

  const getMetodo = async () => {
    const res = await fetch(`${API}`);
    const data = await res.json();
    console.log(data);
    setCurrentText(data["CADENA"]);
    setSalida2(data["Consola"]);
    setErrores(data["ERRORES"]);
    setSymbols(data["SIMBOLOS"]);
    setAst(data["AST"]);
    // setParameter(String(props.match.params.id))
  };
  const handleChange = (e) => {
    setCurrentText(e.target.value);
  };
  const setTextarea = () => {
    setCurrentText(currentText);
  };
  const handleChange2 = (event) => {
    setSalida2(event.target.Salida2);
  };

  useEffect(() => {
    getMetodo();
    // eslint-disable-next-line
  }, []);
  // const WriteToFile = (passForm) =>{

  //     let fso = CreateObject("Scripting.FileSystemObject");
  //     let s   = fso.CreateTextFile("<your Path>/filename.txt", true);

  //     var firstName = document.getElementById('FirstName');
  //     var lastName  = document.getElementById('lastName');

  //     s.writeline("First Name :" + firstName);
  //     s.writeline("Last Name :" + lastName);

  //     s.writeline("-----------------------------");
  //     s.Close();
  //  }

  // const TextFile = () => {
  //     console.log("sientra")
  //     const element = document.createElement("a");
  //     const file = new Blob([document.getElementById('textareaENTRADA').value], {type: 'text/plain'});
  //     element.href = URL.createObjectURL(file);
  //     element.download = "myFile.txt";
  //     document.body.appendChild(element); // Required for this to work in FireFox
  //     element.click();
  //   }
  return (
    <Fragment>
      {/* <!--! PRE LOADER --> */}

      {/* <!--! HEADER --> */}
      <title>202000194</title>

      <header>
        <div class="container">
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <p>
                BIENVENIDO PROYECTO 2 DEL CURSO DE LENGUAJES Y COMPILADORES 1,
                SECCION A, PRIMER SEMESTRE 2022
              </p>
            </div>
            <div class="col-md-8 col-sm-7 text-align-right">
              <span class="phone-icon">
                <i class="fa fa-phone"></i> 57707472
              </span>
              <span class="date-icon">
                <i class="fa fa-calendar-plus-o"></i> 6:00 AM - 10:00 PM
                (Lunes-Viernes)
              </span>
              <span class="email-icon">
                <i class="fa fa-envelope-o"></i>{" "}
                <a
                  href="mailto: 3034161730108@ingenieria.usac.edu.gt?subject= Hola Alvaro"
                  target="_blank"
                >
                  3034161730108@ingenieria.usac.edu.gt
                </a>
              </span>
            </div>
          </div>
        </div>
      </header>
      {/* <!--! SELECCIÓN DE ARCHIVO --> */}
      <section
        class="navbar navbar-default navbar-static-top"
        role="navigation"
      >
        <div class="container">
          <div class="navbar-collapse">
            <button
              class="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span class="icon icon-bar"></span>
              <span class="icon icon-bar"></span>
              <span class="icon icon-bar"></span>
            </button>

            {/* <!-- lOGO TEXT HERE --> */}
            {/* <a href="http://localhost:3000" class="navbar-brand"><i class="fa fa-h-square"></i>     PROYECTO 2 DEL CURSO DE LENGUAJES Y COMPILADORES 1, SECCION A, PRIMER SEMESTRE 2022</a> */}
          </div>

          {/* <!-- MENU LINKS --> */}
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav ">
              <li>
                <div>
                  {/* <form onSubmit="WriteToFile(this)">
<label>Type your first name:</label>
<input type="text" name="FirstName" id="firstName" size="20"/>
 
<label>Type your last name: </label>
<input type="text" name="LastName" id="lastName" size="20"/>
 
<input type="submit" value="submit"/>
</form> */}

                  <h1 class="tituloini">Compscript</h1>

                  <form
                    method="POST"
                    class="div_file"
                    enctype="multipart/form-data"
                  >
                    <label for="abrirArchivo" class="texto">
                      ABRIR ARCHIVO
                    </label>
                    <input
                      id="abrirArchivo"
                      type="file"
                      name="documentoXML[]"
                      class="btn_enviar"
                      accept=".cst"
                      onChange={(e) => {
                        if (e.target.files[0] != null) {
                          let reader = new FileReader();
                          reader.readAsText(e.target.files[0], "UTF-8");

                          reader.onload = (a) => {
                            alert(a.target.result);
                            currentText = a.target.result;
                            setTextarea(a.target.result);
                          };
                        }
                      }}
                      multiple
                    />
                    {/* <label for="abrirArchivo" > 
                  Abrirr
                </label> */}
                  </form>
                  {/* <form  class="div_file" enctype="multipart/form-data"> 
                                <p class="texto">GUARDAR ARCHIVO</p>  
                                <input onclick="guardar()" id="documentoXML"  name="Submit" type="button"  />                                                                                  
                                
                            </form> */}
                </div>
              </li>
              {/* <li onclick="cerrarsesion()" class="appointment-btn">
                                <a href="#appointment">COMPILAR</a></li> */}
            </ul>
          </div>
        </div>
      </section>
      <div class="centrandoeldiv">
        <button
          onClick={compilar}
          id="enviarCargado"
          type="button"
          class="buttonS button1S"
        >
          COMPILAR
        </button>
        <button
          id="guardar"
          type="button"
          class="buttonS button3S"
          onClick={() => {
            alert("hola");
            const url = window.URL.createObjectURL(
              new Blob([currentText], { type: "text/plain" })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Archivo.cst");
            document.body.appendChild(link);
            link.click();
          }}
        >
          GUARDAR
        </button>
        <button type="button" class="buttonS button4S" href="#divcentrar">
          REPORTES
        </button>
        <dropdown></dropdown>
        <button
          href="http://localhost:3000"
          type="button"
          class="buttonS button2S"
        >
          RESET
        </button>
      </div>

      <div class="content" role="main">
        {/* <section class="holaaaaa">
                    <button  onclick="EnviarProceso()" type="button" class="btn btn-success fa-2x"
                        enabled>Compilar</button>
                    <button onclick="restart()" href="http://localhost:4000" type="button" class="btn btn-danger fa-2x"
                        enabled>Reset</button>
                </section> */}

        <section>
          <div>
            <br />
            <table>
              <tr align="center">
                <td>
                  <h2 class="titulosbonis">ENTRADA</h2>
                </td>
                <td>
                  {/* <h1>{Salida}</h1> */}
                  <h2 class="titulosbonis">SALIDA</h2>
                </td>
              </tr>
              <tr align="center">
                <td>
                  <textarea
                    name="input"
                    wrap="on"
                    id="textareaENTRADA"
                    cols="70"
                    rows="20"
                    value={currentText}
                    onChange={handleChange}
                    enabled
                  >
                    {currentText}
                  </textarea>
                </td>
                <td>
                  <textarea
                    name="output"
                    wrap="on"
                    id="textareaSALIDA"
                    cols="70"
                    rows="20"
                    value={Salida2}
                    onChange={handleChange2}
                    enabled
                  >
                    {Salida2}
                  </textarea>
                </td>
              </tr>
            </table>
            <br />

            {/* <table>
                            <tr align="center">
                                <h2>SALIDA ENTENDIBLE: </h2>
                            </tr>
                            <tr>
                                <div id="outputentendible">
                                    <textarea name="output2" id="textareaSALIDA2" wrap="on" cols="120" rows="35"
                                        enabled>prueba </textarea>

                                </div>
                            </tr>
                        </table> */}
            <br />

            <table>
              <div class="centrandoeldiv">
                <tr align="center">
                  <h2 class="titulosbonis">ERRORES</h2>
                </tr>
                <tr>
                  <div>
                    <textarea
                      wrap="on"
                      id="textareaError"
                      name="textareaError"
                      cols="100"
                      rows="15"
                      enabled
                    ></textarea>
                  </div>
                </tr>
              </div>
            </table>
            <br />
            <br />
          </div>
          <div />
        </section>

        <li>
          <div name="divcentrar" id="divcentrar" class="centrandoeldiv">
            <h1 ALIGN="center"> REPORTES </h1>
            <div class="dropdown-menu">
              {/* <a href="http://localhost:5000/Documentacion" class="dropdown-item">DOCUMENTACION</a> */}
              <br />
              <br />
              <a href="http://localhost:3000/Arbol" class="buttonS button1S">
                AST
              </a>
              <br />
              <br />
              <a href="http://localhost:3000/Errores" class="buttonS button4S">
                ERRORES
              </a>
              <br />
              <br />
              <a href="http://localhost:3000/Symbols" class="buttonS button2S">
                SIMBOLOS
              </a>
              <br />
              <br />
              <a
                href="https://drive.google.com/file/d/1UPabqHhBDfO9cKOFwjKPg37zgKlcCO0a/view?usp=sharing"
                class="buttonS button3S"
              >
                DOCUMENTACION 2
              </a>
              <br />
              <br />
              <a href="http://localhost:3000/me" class="buttonS button1S">
                INFORMACIÓN ESTUDIANTE
              </a>
            </div>
          </div>
        </li>

        <footer id="footer" data-stellar-background-ratio="5">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-4">
                <div class="footer-thumb">
                  <h4 class="wow fadeInUp" data-wow-delay="0.4s">
                    Contáctenos
                  </h4>
                  <p>202000194</p>

                  <div class="contact-info">
                    <p>
                      <i class="fa fa-phone"></i> +502 57707472
                    </p>
                    <p>
                      <i class="fa fa-envelope-o"></i>{" "}
                      <a href="#">3034161730108@ingenieria.usac.edu.gt</a>
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-4">
                <div class="footer-thumb">
                  <h4 class="wow fadeInUp" data-wow-delay="0.4s">
                    Ultimas Actualizaciones
                  </h4>
                  <div class="latest-stories">
                    <div class="stories-image"></div>
                    <div class="stories-info">
                      <a href="#">
                        <h5>Amazing Technology</h5>
                      </a>
                      <span>March 08, 2018</span>
                    </div>
                  </div>

                  <div class="latest-stories">
                    <div class="stories-image"></div>
                    <div class="stories-info">
                      <a href="#">
                        <h5>New Healing Process</h5>
                      </a>
                      <span>February 20, 2018</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-4">
                <div class="footer-thumb">
                  <div class="opening-hours">
                    <h4 class="wow fadeInUp" data-wow-delay="0.4s">
                      Horario de Atención
                    </h4>
                    <p>
                      Lunes - Viernes <span>06:00 AM - 10:00 PM</span>
                    </p>
                    <p>
                      Sabado <span>09:00 AM - 08:00 PM</span>
                    </p>
                    <p>
                      Domingo <span>Cerrado, es dia de Dios</span>
                    </p>
                  </div>

                  <ul class="social-icon">
                    <li>
                      <a
                        href="#"
                        class="fa fa-facebook-square"
                        attr="facebook icon"
                      ></a>
                    </li>
                    <li>
                      <a href="#" class="fa fa-twitter"></a>
                    </li>
                    <li>
                      <a href="#" class="fa fa-instagram"></a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-md-12 col-sm-12 border-top">
                <div class="col-md-4 col-sm-6">
                  <div class="copyright-text">
                    <p>
                      Copyright &copy; 2022 PROYECTO 3 | Diseño: El Bootstrap :v
                    </p>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6">
                  <div class="footer-link">
                    <a href="https://www.who.int/es">OMS</a>
                    <a href="https://www.mspas.gob.gt">MSPAS</a>
                    <a href="https://www.gob.pe/minsa/">MINSA</a>
                    <a href="https://covid19.who.int">COVID 19 INFO</a>
                  </div>
                </div>
                <div class="col-md-2 col-sm-2 text-align-center">
                  <div class="angle-up-btn">
                    <a
                      href="#top"
                      class="smoothScroll wow fadeInUp"
                      data-wow-delay="1.2s"
                    >
                      <i class="fa fa-angle-up"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};
