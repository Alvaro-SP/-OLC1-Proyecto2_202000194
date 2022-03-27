import React, { Fragment } from "react";


export const NotFound = (props) => {


  return (<Fragment>
      <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="./assets/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="./assets/favicon/favicon-16x16.png" />
        <link rel="manifest" href="./assets/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href="css/style.css" />
          <title>F</title>

        <section  class="vh-100 w-100 d-flex flex-column justify-content-center align-items-center text-center">
          <img  src="https://static.13.cl/7/sites/default/files/esports/articulos/field-image/maxresdefault.jpg" alt="imagen" className="img-fluid" />
          <h1>¡Oops!</h1>
          <p>Parece que la página que buscas no existe</p>
          <a href="/" class="btn btn-primary">Volver al inicio</a>
        </section>
      </div>
  </Fragment>
  );
};