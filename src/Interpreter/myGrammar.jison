/**
 * mi primer proyecto con Jison utilizando Nodejs en WINDOWS :)
 */

/*------------------------ Definición éLexca --------------------------*/
%lex

%options case-insensitive
%x CADENA
%%
/*Consider the following example of a scanner that simply scans all double-quote 
delimited strings in a text file but disallows newlines inside quotations:*/

/* Comentarios */
/* El lenguaje
deber soportar dos tipos de comentarios que son los siguientes:
*/
/* Comentarios de una línea*/
(\/\/.*\r\n)|(\/\/.*\n)|(\/\/.*\r)            {}


/* "<!""!"*([^!>]|[^!]">"|"!"[^>])*"!"*"!>" */
/* Comentarios de multilínea */
(\/\*(\s*|.*?)*\*\/)|(\/\/.*)                 {}

/* Espacios*/
\n                  {}
\s+					{}
[ \t\r\n\f]         {}

/*============================== LEXICO ============================== */
/* 5.3 Tipos de Datos RESERVADAS */
"Int"                  		  return 'ENTERO';
"Double"                  return 'DOUBLE';
"Boolean"              	 return 'BOOLEANO';
"Char"                  	return 'CARACTER';
"String"                	return 'STRING';
[0-9]+\b 	            	return 'VENTERO';
[0-9]+("."[0-9]+)\b  	 return 'VDOUBLE';
"true"\b        				return 'TRUE'
"false" \b        				return 'FALSE'
/* 5.4 Secuencias de Escape  */

/* 5.5 Operadores Aritméticos */
"+"             return 'MAS'
"-"             return 'RESTA'
"*"             return 'MULTIPLICACION'
"/"             return 'DIVISION'
"^"             return 'POTENCIA'
"%"             return 'MODULO'

/* 5.6 Operadores Relacionales */
"=="            return 'IGUALA'
"!="            return 'DIFERENTE'
"<="            return 'MENORIGUALQ'
"<"             return 'MENORQUE'
">="            return 'MAYORIGUALQ'
">"             return 'MAYORQUE'

/* 5.7 Operador Ternario */
"?"             return 'INTERROGA'
":"             return 'DOSPUNTOS'

/* 5.8 Operadores Lógicos */
"|"            return 'OR'
"&"            return 'AND'
"!"             return 'NOT'

/* 5.9 Signos de Agrupación 
Los signos de agrupación seran utilizados para agrupar operaciones aritméticas, lógicas o
relacionales. */
"("             return 'PARIZQ'
")"             return 'PARDER'



/* 5.11 Caracteres de finalización y encapsulamiento de sentencias (RESERVADAS)*/
";"             return 'PTOCOMA'
"["             return 'CORIZQ'
"]"             return 'CORDER'

/* 5.12 Declaración y asignación de variables*/
[a-z|A-Z]+[a-z|A-Z|0-9|"_"]+      return 'VARIABLE'
","             return 'COMA'
"="             return 'IGUAL'
				
(\'(([\\][\"]|[\\][\']|[\\][n]|[\\][t]|[\\][\\])|([^\n\'\"\\]{1}))\') return 'CARACTER'
/*[\"].*[\"]				return 'CADENA'*/
["]                 {acumoftext=""; this.begin("CADENA");}
<CADENA>[^"\\]+     {acumoftext+=yytext;}
<CADENA>"\\n"       {acumoftext+='\n';}
<CADENA>"\\t"       {acumoftext+='\t';}
<CADENA>"\\r"       {acumoftext+='\r';}
<CADENA>"\\\""      {acumoftext+='\"';}
<CADENA>"\\\'"      {acumoftext+='\'';}
<CADENA>"\\\\"      {acumoftext+='\\';}
<CADENA>["]         {yytext = acumoftext; this.popState(); return 'CADENA';}
/* 5.13 Casteos (RESERVADAS)*/


/* 5.14 Incremento y Decremento (RESERVADAS)*/
"++"            return 'INC'
"--"            return 'DEC'
/* 5.15 Estructuras de Datos */


/* 5.16 Sentencias de control (RESERVADAS)*/
"if"            return 'IF'
"else"          return 'ELSE'

"{"             return 'LLAIZQ'
"}"             return 'LLADER'
"switch"        return 'SWITCH'
"case"        return 'CASE'
"break"        return 'BREAK'
"default"        return 'DEFAULT'


/* 5.17 Sentencias cíclicas (RESERVADAS)*/
"while"         return 'WHILE'
"do"            return 'DO'
"for"           return 'FOR'
"new"           return 'NEW'

/* 5.18 Sentencias de transferencia (RESERVADAS)*/
"continue"      return 'CONTINUE'
"return"        return 'RETURN'

/* 5.19 Funciones (RESERVADAS) */
/* 5.20 Métodos (RESERVADAS) */
"void"          return 'VOID'

/* 5.21 Llamadas (RESERVADAS) */
/* 5.22 Función Print (RESERVADAS) */
"print"         return 'PRINT'

/* 5.23 Función Println (RESERVADAS) */
"println"         return 'PRINTLN'

/* 5.24 Función toLower (RESERVADAS) */
"tolower"         return 'TOLOWER'

/* 5.25 Función toUpper (RESERVADAS) */
"toupper"         return 'TOUPPER'
/* 5.26 Round */
"round"         return 'ROUND'

/* 5.25. Funciones nativas (RESERVADAS) */
"length"         return 'LENGTH'
"typeof"         return 'TYPEOF'
"tostring"         return 'TOSTRING'
"tochararray"         return 'TOCHARARRAY' 

/* 5.26. Run (RESERVADAS) */
"run"         return 'RUN'


<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error lexico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
						instruccionesAPI.getAST.setError(instruccionesAPI.errorlexico(yytext,yylloc.first_line,yylloc.first_column));
						instruccionesAPI.getErrores.getInstance().insertar(new ErrorList("Lexico","Caracter: \" "+yytext+"\" no es valido" ,yylloc.first_line,yylloc.first_column)); }
/lex

%{
	const instruccionesAPI	= require('./instrucciones').instruccionesAPI;
    var sintacticerror = "";
	var acumoftext="";
	const {Tree} = require('../Instructions/InstructionAST');

%}

/*----------------------------- 5.10 Precedencia de Operaciones --------------------------*/
/* Asociación de operadores y precedencia 
    La precedencia de operadores nos indica la importancia en que una operación debe
    realizarse por encima del resto. A continuación, se define la misma.*/
%left  'OR'
%left  'AND'
%right 'NOT'
%left  'IGUALA' 'DIFERENTE' 'MENORQUE' 'MAYORIGUALQ' 'MAYORQUE' 'MAYORIGUALQ'
%left 'MAS' 'MENOS'
%left 'MULTIPLICACION' 'DIVISION'
%left UMENOS

%start ini 

%%
 /* ======================Definición de la gramatica==================== */
ini
	: instrucciones EOF		{  }
	| error PTCOMA 			{ 	sintacticerror="Detectado error Sintactico se esperaba otro valor y se recibio: "+yytext+" reparelo.";
												console.error('Este es un error sintactico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
												instruccionesAPI.getAST.setError(instruccionesAPI.errorsintactico(sintacticerror,yylloc.first_line,yylloc.first_column));
										}  /*OJITO: se coloca el ptocoma por si hay un error semantico, entonces se va a recuperar*/
;

instrucciones 
	: instruccion instrucciones		{  }
	| instruccion					{$$=[$1];}
;
/* ================================================================*/
/* ===================		INSTRUCCIONES      ===================*/
/* ================================================================*/
instruccion
	: declaracion					{ $$ = $1; } /* 5.12 Declaración y asignación de variables*/
	| casteos						{ $$ = $1; } /* 5.13 Casteos*/
	| vectores						{ $$ = $1; } /* 5.15.1. Vectores*/
	| instruccionif							{ $$ = $1; } /* 5.15.1. Vectores*/
	| instruccionwhile							{ $$ = $1; } /* 5.17 SenTencias cíclicas*/
	| instruccionfor							{ $$ = $1; } /* 5.17 SenTencias cíclicas*/
	| instrucciondowhile						{ $$ = $1; } /* 5.17 SenTencias cíclicas*/
	| funciones						{ $$ = $1; } /* 5.19 Funciones*/
	| metodos						{ $$ = $1; } /* 5.20 Metodos*/
	| llamadas PTCOMA				{ $$ = $1; } /* 5.21 Llamadas*/
	| instruccionprint PTCOMA					{ $$ = $1; } /* Print*/
	| instruccionprintln PTCOMA				{ $$ = $1; } /* Println*/
    | BREAK PTCOMA                  { $$ = $1; } /* BREAK */
	| CONTINUE PTCOMA               { $$ = $1; } /* CONTINUE */
	| returns PTCOMA      			{ $$ = $1; }
    | instruccionrun PTCOMA                	{ $$ = $1; }
	| VARIABLE MAS MAS PTCOMA 		{ $$ = $1; } /* anio++*/
	| VARIABLE MENOS MENOS PTCOMA 	{ $$ = $1; } /* edad-- */
	| MENOS MENOS VARIABLE PTCOMA 	{ $$ = $1; } /* --edad */

	/*| incredecre	{  }  5.14 Incremento y Decremento*/
;
/* ================================================================*/
/* ===================	FIN  INSTRUCCIONES      ===================*/
/* ================================================================*/

/* -------------------------- DECLARACION ASIGNACION VARIABLES ------------------------------ */
declaracion
	: tipo VARIABLE PTCOMA																				{  } /*<TIPO> identificador;*/
	| tipo notacioncomas PTCOMA																			{  } /*<TIPO> id1, id2, id3, id4;*/
	| tipo VARIABLE IGUAL expresion PTCOMA																{  } /*TIPO> identificador = <EXPRESION>;*/
	| tipo notacioncomas IGUAL expresion PTCOMA 														{  } /*<TIPO> id1, id2, id3, id4 = <EXPRESION>;*/
	| tipo VARIABLE CORIZQ CORDER IGUAL NEW tipo CORIZQ expresion CORDER PTCOMA							{  } /*<TIPO> <ID>[ ] = new <TIPO>[ <EXPRESION> ] ;						 DECLARACION TIPO 1 */
	| tipo VARIABLE CORIZQ CORDER IGUAL NEW tipo CORIZQ expresion CORDER CORIZQ expresion CORDER PTCOMA	{  } /*<TIPO> <ID>[ ][ ]= new <TIPO>[ <EXPRESION> ][ <EXPRESION> ] ;*/
	| tipo VARIABLE CORIZQ CORDER IGUAL CORIZQ listavalores CORDER PTCOMA								{  }  /*<TIPO> <ID>[ ] = [ <LISTAVALORES> ] ;							 DECLARACION TIPO 2 */
	| tipo VARIABLE IGUAL VARIABLE CORIZQ expresion CORDER PTCOMA									{  } /*<TIPO> <ID>[ ] = new <TIPO>[ <EXPRESION> ] ;	 */
	| tipo VARIABLE IGUAL VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER PTCOMA			{  } /*<TIPO> <ID>[ ][ ]= new <TIPO>[ <EXPRESION> ][ <EXPRESION> ] ;*/
	| VARIABLE IGUAL expresion PTCOMA																{  } /*identificador = <EXPRESION>;*/
			/*5.15.1.3 Modificación de Vectores*/
	| VARIABLE CORIZQ expresion CORDER IGUAL expresion PTCOMA										{  } /*<ID> [ EXPRESION ] = EXPRESION;						 DECLARACION TIPO 1*/
	| VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER IGUAL expresion PTCOMA				{  } /*<ID> [ EXPRESION ][ EXPRESION ] = EXPRESION;          DECLARACION TIPO 2 */
;

notacioncomas
	: VARIABLE notacioncomas2 {  }
;

notacioncomas2
	: COMA VARIABLE notacioncomas2 {  }
;

listavalores
	: expresion listavalores2 {  }/* char vectordosd2 [ ][ ] = [[ 0 ,0],[0 , 0]];*/
;

listavalores2
	: COMA expresion listavalores2 {  }
;

/* ------------------------------------ EXPRESIONES ------------------------------------ */
expresion
	: MENOS expresion %prec UMENOS  { $$ = $2 *-1; }
	| expresion MAS expresion       { $$ = $1 + $3; }
	| expresion MENOS expresion     { $$ = $1 - $3; }
	| expresion POR expresion       { $$ = $1 * $3; }
	| expresion DIVIDIDO expresion  { $$ = $1 / $3; }
	| expresion MOD expresion			                    { $$ = $1 % $3; }	
    | expresion POT expresion			                    { $$ = $1 ^ $3; }	
    | expresion MENORIGUALQ expresion	                    {  }	
	| expresion MENORQUE IGUAL expresion	 		        {  }			   
	| expresion MENORQUE expresion	 		                {  }	
    | expresion MAYORIGUALQ expresion	                    {  }			
    | expresion MAYORQUE IGUAL expresion                    {  }				  
    | expresion MAYORQUE expresion                          {  }		
    | expresion IGUALQUE expresion	  		                {  }			
    | expresion IGUAL IGUAL expresion	  		         	{  }			
    | expresion IGUALA expresion	  		                {  }			
    | expresion DIFERENTE expresion	   	                	{  }
    | expresion NOT IGUAL expresion	   	                	{  }
    | expresion OR OR expresion	  			                {  }
    | expresion AND AND expresion			                {  }
	| PARA tipo PARC expresion		{  } /* (int) 18.6*//*(<TIPO>) <EXPRESION>*/
	| VENTERO                        { $$ = Number($1); }
	| VDOUBLE                       	{ $$ = Number($1); }
	| CADENA						{  }
	| TRUE                       	{  }
	| FALSE                       	{  }
	| PARIZQ expresion PARDER       { $$ = $2; }
	| VARIABLE MAS MAS 				{  } /* anio-- */
	| MAS MAS VARIABLE 				{  } /* --anio */
	| VARIABLE MENOS MENOS 			{  } /* edad-- */
	| MENOS MENOS VARIABLE  		{  } /* --edad */
	| VARIABLE CORIZQ expresion CORDER	{  } /* vector2[0];*/
	| VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER	{  } /* vectorDosd[0][0];*/
	| VARIABLE MAS MAS 				{  } /* vectorDosd[0][0]*/
	| expresion INTERROGACION expresion DOSPUNTOS expresion  {  } /*Ternarios*/
    | TOLOWER PARIZQ expresion PARDER  {  } /* toLower  (  <EXPRESION>  );*/       
    | TOUPPER PARIZQ expresion PARDER  {  } /* toUpper  (  <EXPRESION>  );*/      
    | ROUND PARIZQ DOUBLE PARDER    {  } /* round  (  )  ;     */
    | TYPEOF PARIZQ expresion PARDER   {  }
    | TOSTRING PARIZQ expresion PARDER {  }
    | llamar                           {  } /*5.25. Funciones nativas*/
	| LENGTH PARIZQ valor PARDER   {  } /* length  ( <VALOR>  )  ;*/
	| TYPEOF PARIZQ valor PARDER   {  }/* typeof  ( <VALOR>  )  ;*/
	| TOSTRING PARIZQ valor PARDER   {  }/* toString  ( <VALOR>  )  ;*/
	| TOCHARARRAY PARIZQ valor PARDER   {  }/* toCharArray  ( <VALOR>  )  ;*/
;
/* ------------------------------------    VALOR    ------------------------------------ */
 /*- lista
 -vector
 -cadena*/
valor
	:listavalores       		{  }
	|CADENA       			{  }
	|VARIABLE       	   {  } 
;

/* ------------------------------------    TIPOS    ------------------------------------ */
tipo
	:ENTERO       		{  }
	|DOUBLE       		{  }
	|BOOLEANO     	{  }
	|CARACTER    	 {  }
	|STRING        		  {  } 
	|VOID           		{  }
;

/* ------------------------------------    IF    ------------------------------------ */
instruccionif
    :IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER 																	{}/*if   (  <EXPRESION>  )   { 	<INSTRUCCIONES>	} */
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE LLAIZQ instrucciones LLADER	{}	/*if   (  <EXPRESION>  )   { 	<INSTRUCCIONES>	}   else   { 	<INSTRUCCIONES>	} */
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE if 													   {}	/* if   (  <EXPRESION>  )   { 	<INSTRUCCIONES>	} else <IF>*/
	|IF PARIZQ expresion PARDER LLAIZQ LLADER 																							{}
;

/* ------------------------------------  SWITCH  ------------------------------------ */
instruccionswitch
    :SWITCH PARIZQ expresion PARDER LLAIZQ caselist default LLADER  {}/* switch   (   <EXPRESION>   )  { <CASES_LIST>   <DEFAULT> } */
    |SWITCH PARIZQ expresion PARDER LLAIZQ caselist LLADER              {}/* switch   ( <EXPRESION>  )  {<CASES_LIST> } */
    |SWITCH PARIZQ expresion PARDER LLAIZQ default LLADER           	{}/* switch   ( <EXPRESION>  )   { <DEFAULT> } */

;
/* ------------------------------------  caselist  ------------------------------------ */
instruccioncaselist
    :caselist CASE expresion DOSPUNTOS instrucciones    {} 
    |CASE expresion DOSPUNTOS instrucciones             	 {} /* case   <EXPRESION>   :  <INSTRUCCIONES> */
;
/* ------------------------------------  DEFAULT  ------------------------------------ */
instrucciondefault
    :DEFAULT DOSPUNTOS instrucciones	 {}
;

/*--------------------------------------5.17 SenTencias cíclicas----------------------------------*/
 
 /*5.17.1. While  while   (  <EXPRESION>   )   {  <INSTRUCCIONES>  } */
instruccionwhile
    :WHILE PARIZQ expresion PARDER LLAIZQ instrucciones LLADER 		{$$ = new While($3, $6, @1.first_line, @1.first_column);}
;
/*5.17.2. For*/
instruccionfor
    :FOR PARIZQ fordeclarar PTCOMA expresion PTCOMA actualizacion PARDER LLAIZQ instrucciones LLADER  {}/* for  ((<DECLARACION>|<ASIGNACION>);<CONDICION>;< ACTUALIZACION>){<INSTRUCCIONES>} */
;
fordeclarar
    : tipo VARIABLE IGUAL expresion 			{  } /*TIPO> identificador = <EXPRESION>;*/
	| VARIABLE IGUAL expresion 					  {  } /*identificador = <EXPRESION>;*/
;
actualizacion
    : VARIABLE MAS MAS 						{  } /* anio++ */
	| VARIABLE MENOS MENOS 				{  } /* edad-- */
	| VARIABLE IGUAL expresion 				{  } /*identificador = <EXPRESION>;*/
;
/*5.17.3. Do-While*/
instrucciondowhile
    :DO LLAIZQ instrucciones LLADER WHILE PARIZQ expresion PARDER PTCOMA  {}/*do{ <INSTRUCCIONES> }while(<EXPRESION>);*/
;

/*--------------------------------------  5.19 Funciones  ----------------------------------*/
funciones
    : VARIABLE PARIZQ parametros PARDER DOSPUNTOS tipo LLAIZQ instrucciones LLADER {  } /* <ID>(<PARAMETROS>):<TIPO>{ <INSTRUCCIONES>} */
    | VARIABLE PARIZQ PARDER DOSPUNTOS tipo LLAIZQ instrucciones LLADER            		   {  }
;
parametros
    :parametros COMA tipo VARIABLE  	{  }
    |tipo VARIABLE                   					{  }         
;

/*--------------------------------------  5.20 Meodos  ----------------------------------*/
metodos
    : VARIABLE PARIZQ parametros PARDER DOSPUNTOS VOID LLAIZQ instrucciones LLADER 		{  } /* <ID>(<PARAMETROS>):<TIPO>{ <INSTRUCCIONES>} */
    | VARIABLE PARIZQ parametros PARDER LLAIZQ instrucciones LLADER											 {  } /* <ID>(<PARAMETROS>){ <INSTRUCCIONES>} */
    | VARIABLE PARIZQ PARDER DOSPUNTOS VOID LLAIZQ instrucciones LLADER 						{  } /* <ID>():<TIPO>{ <INSTRUCCIONES>} */
    | VARIABLE PARIZQ PARDER LLAIZQ instrucciones LLADER 															 {  } /* <ID>(){ <INSTRUCCIONES>} */
;
/*--------------------------------------  5.21 Llamadas  ----------------------------------*/

llamadas
    :VARIABLE PARIZQ paramllamada PARDER    {   }
    |VARIABLE PARIZQ PARDER                 			{   }
;
/*LLAMADA -> [<ID>] ( [<PARAMETROS_LLAMADA>] )
| [<ID>] ( )*/

paramllamada
    :paramllamada COMA expresion      {  }
    |expresion                        					{  }
;
/*--------------------------------------  5.22 Función Print  ----------------------------------*/
instruccionprint
    :PRINT PARIZQ expresion PARDER   	{   }/* Print  (  <EXPRESION>  );*/
;
/*--------------------------------------  5.23 Función Println  ----------------------------------*/
instruccionprintln
    :PRINTLN PARIZQ expresion PARDER    {  }/* Println  (  <EXPRESION>  );*/
;

/*--------------------------------------  RUN  ----------------------------------*/
/*5.26. Run*/
instruccionrun
    : RUN VARIABLE PARA PARC 			  			{  } /* run <ID>  ( )  ;*/
	| RUN VARIABLE PARA listavalores PARC 	{  } /* run <ID>  ( <LISTAVALORES> )  ;*/
;
listavalores
    : listavalores COMA expresion 		 {  } /*LISTAVALORES->LISTAVALORES  , EXPRESION*/
	| expresion 					 					{  } /*| EXPRESION*/
;

/* -------------------------------------- RETURN --------------------------------------*/
returns	
	: RETURN expresion       	 { $$ = $1; }
    | RETURN                 			{ $$ = $1; }
;










