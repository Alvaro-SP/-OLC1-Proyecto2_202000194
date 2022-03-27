import React, {Fragment, useEffect, useState} from 'react'
import './index.css';
const API = 'http://localhost:4200';

export const Home = (props)=>{
    // const [Entrada, Salida, Salida2] = useState("");
    return (
        <Fragment>
            {/* <!--! PRE LOADER --> */}
    
    {/* <!--! HEADER --> */}
    <header>
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-sm-5">
                    <p>BIENVENIDO PROYECTO 2 DEL CURSO DE LENGUAJES Y COMPILADORES 1, SECCION A, PRIMER SEMESTRE 2022</p>
                </div>
                <div class="col-md-8 col-sm-7 text-align-right">
                    <span class="phone-icon"><i class="fa fa-phone"></i> 57707472</span>
                    <span class="date-icon"><i class="fa fa-calendar-plus-o"></i> 6:00 AM - 10:00 PM
                        (Lunes-Viernes)</span>
                    <span class="email-icon"><i class="fa fa-envelope-o"></i> <a
                            href="mailto: 3034161730108@ingenieria.usac.edu.gt?subject= Hola Alvaro"
                            target="_blank">3034161730108@ingenieria.usac.edu.gt</a></span>
                </div>
            </div>
        </div>
    </header>
    {/* <!--! SELECCIÓN DE ARCHIVO --> */}
    <section class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
            <div class="navbar-collapse">
                <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
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
                        <h1 class="tituloini">Compscript</h1>
                            <form method="POST" class="div_file" enctype="multipart/form-data">
                                <p class="texto">SELECCIONAR ARCHIVO</p>
                                <input id="documentoXML" type="file" name="documentoXML[]" class="btn_enviar"
                                    accept=".xml" multiple/>
                            </form>

                        </div>
                        </li>
                         {/* <li onclick="cerrarsesion()" class="appointment-btn">
                                <a href="#appointment">COMPILAR</a></li> */}
                    
                </ul>
            </div>
        </div>
    </section>

            <title>202000194</title>
            
            <div class="content" role="main">

                <section class="holaaaaa">
                    <button id="enviarCargado" onclick="EnviarProceso()" type="button" class="btn btn-success fa-2x"
                        enabled>Compilar</button>
                    <button onclick="restart()" href="http://localhost:4000" type="button" class="btn btn-danger fa-2x"
                        enabled>Reset</button>
                </section>
                <section>
                    <div>
                        <br/>
                        <table>
                            <tr align="center">
                                <td>
                                    <h2>ENTRADA</h2>
                                </td>
                                <td>
                                    <h2>SALIDA</h2>
                                </td>
                            </tr>
                            <tr align="center">
                                <td>
                                    <textarea name="input" wrap="on" id="textareaENTRADA" cols="70" rows="20" 
                                        enabled>prueba</textarea>
                                </td>
                                <td>
                                    <textarea name="output" wrap="on" id="textareaSALIDA" cols="70" rows="20"
                                        enabled>prueba</textarea>
                                </td>
                            </tr>
                        </table>
                        <br/>

                        <table>
                            <tr align="center">
                                <h2>SALIDA ENTENDIBLE: </h2>
                            </tr>
                            <tr>
                                <div id="outputentendible">
                                    <textarea name="output2" id="textareaSALIDA2" wrap="on" cols="120" rows="35"
                                        enabled>prueba </textarea>

                                </div>
                            </tr>
                        </table>
                        <br/>


                        <table>
                            <tr align="center">
                                <h2>ERRORES</h2>
                            </tr>
                            <tr>
                                <div >
                                    <textarea  wrap="on" id="textareaError" name="textareaError" cols="100" rows="15"
                                    enabled></textarea>
                                </div>
                            </tr>
                        </table>
                        <br/>
                        <br/>

                    </div>
            <div/>

                </section>

                <li>
                        <div class="div_file">
                            <p class="texto" data-toggle="dropdown">REPORTES</p>
                            
                            <div class="dropdown-menu">
                                {/* <a href="http://localhost:5000/Documentacion" class="dropdown-item">DOCUMENTACION</a> */}
                                <br/><br/>
                                <a href="https://drive.google.com/file/d/1UPabqHhBDfO9cKOFwjKPg37zgKlcCO0a/view?usp=sharing" class="dropdown-item">DOCUMENTACION 2</a>
                                <br/><br/>
                                <a href="http://localhost:3000/me" class="dropdown-item">INFORMACIÓN ESTUDIANTE</a>
                            </div>
                        </div>
                    </li>



                <footer id="footer" data-stellar-background-ratio="5">
                    <div class="container">
                        <div class="row">

                            <div class="col-md-4 col-sm-4">
                                <div class="footer-thumb">
                                    <h4 class="wow fadeInUp" data-wow-delay="0.4s">Contáctenos</h4>
                                    <p>202000194</p>

                                    <div class="contact-info">
                                        <p><i class="fa fa-phone"></i> +502 57707472</p>
                                        <p><i class="fa fa-envelope-o"></i> <a href="#">3034161730108@ingenieria.usac.edu.gt</a></p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 col-sm-4">
                                <div class="footer-thumb">
                                    <h4 class="wow fadeInUp" data-wow-delay="0.4s">Ultimas Actualizaciones</h4>
                                    <div class="latest-stories">
                                        <div class="stories-image">
                                            
                                        </div>
                                        <div class="stories-info">
                                            <a href="#">
                                                <h5>Amazing Technology</h5>
                                            </a>
                                            <span>March 08, 2018</span>
                                        </div>
                                    </div>

                                    <div class="latest-stories">
                                        <div class="stories-image">
                                        </div>
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
                                        <h4 class="wow fadeInUp" data-wow-delay="0.4s">Horario de Atención</h4>
                                        <p>Lunes - Viernes <span>06:00 AM - 10:00 PM</span></p>
                                        <p>Sabado <span>09:00 AM - 08:00 PM</span></p>
                                        <p>Domingo <span>Cerrado, es dia de Dios</span></p>
                                    </div>

                                    <ul class="social-icon">
                                        <li><a href="#" class="fa fa-facebook-square" attr="facebook icon"></a></li>
                                        <li><a href="#" class="fa fa-twitter"></a></li>
                                        <li><a href="#" class="fa fa-instagram"></a></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-md-12 col-sm-12 border-top">
                                <div class="col-md-4 col-sm-6">
                                    <div class="copyright-text">
                                        <p>Copyright &copy; 2022 PROYECTO 3

                                            | Diseño: El Bootstrap :v</p>
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
                                        <a href="#top" class="smoothScroll wow fadeInUp" data-wow-delay="1.2s"><i
                                                class="fa fa-angle-up"></i></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </footer>
            </div>
            
        </Fragment>
    )

}