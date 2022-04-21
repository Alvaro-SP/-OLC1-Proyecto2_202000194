/**
 * mi primer proyecto con Jison utilizando Nodejs en WINDOWS :)
 */
%{
	const {MiArbolAST} = require('../Instructions/ASTGlobal/InstructionAST');
	var InstructionAST = require('../Instructions/ASTGlobal/InstructionAST')
	const instruccionesAPI	= require('../Interpreter/interprete').instruccionesAPI; //las instrucciones de la API
    const {INSPrint} = require('../Instructions/INSprint.js');
    const {INSAritmetico} = require('../Instructions/INSAritmetico');
    const {INSRelacional} = require('../Instructions/INSRelacional');
    const {INSLogico} = require('../Instructions/INSLogico');
    const {Asignar} = require('../Instructions/Asignar');
    const {Declarar} = require('../Instructions/Declarar');
    const {INSCastear} = require('../Instructions/INSCastear');
    const {INSPrimitivo} = require('../Instructions/INSPrimitivos');
    const {INSid} = require('../Instructions/id');
    const {INSincredecre} = require('../Instructions/INSincredecre');
    const {INSreturn} = require('../Instructions/return');
    const {INSllamada} = require('../Instructions/llamar');
    const {INSMetodo} = require('../Instructions/metodos');

	//SENTENCIAS
    const {INSif} = require('../Instructions/INSif');
    const {INSwhile} = require('../Instructions/INSwhile');
    const {INSdowhile} = require('../Instructions/INSdowhile');
    const {INSfor} = require('../Instructions/INSfor');
    const {INSswitch} = require('../Instructions/INSswitch');
	const {INSCase} = require('../Instructions/INSCase');
	//pauses
	const {INSBreak} = require('../Instructions/break');
	const {INSContinue} = require('../Instructions/break');
	const Tipo = require("../Instructions/ASTGlobal/tiponodo");
	const tipos = require("../Instructions/ASTGlobal/tiponodo");
	var sintacticerror = "";
	var acumoftext="";
	var arbolINSERRORES = new InstructionAST.InstructionAST();//por si hay errores
	// var MiArbolAST = new InstructionAST();
%}

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

/* Espacios*/
\n                  {}
\s+					{}
[ \t\r\n\f]         {}

/* Comentarios de una línea*/
(\/\/.*\r\n)|(\/\/.*\n)|(\/\/.*\r)            {}


/* "<!""!"*([^!>]|[^!]">"|"!"[^>])*"!"*"!>" */
/* Comentarios de multilínea */
(\/\*(\s*|.*?)*\*\/)|(\/\/.*)                 {}



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

/*============================== LEXICO ============================== */
/* 5.3 Tipos de Datos RESERVADAS */
"Int"               return 'ENTERO';
"double"            return 'DOUBLE';
"boolean"           return 'BOOLEANO';
"char"              return 'CARACTER';
/* 5.20 Métodos (RESERVADAS) */
"void"          return 'VOID'
"string"            return 'STRING';
"true"        		return 'TRUE'
"false"         	return 'FALSE'
"new"           return 'NEW'




/* 5.4 Secuencias de Escape  */

/* 5.5 Operadores Aritméticos */
/* 5.14 Incremento y Decremento (RESERVADAS)*/
"++"            return 'INC'
"--"            return 'DEC'
"+"             return 'MAS'
"-"             return 'MENOS'
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

/* 5.11 Caracteres de finalización y encapsulamiento de sentencias (RESERVADAS)*/
"="             return 'IGUAL'
";"             return 'PTCOMA'
/* 5.7 Operador Ternario */
"?"             return 'INTERROGA'
":"             return 'DOSPUNTOS'
","             return 'COMA'

/* 5.8 Operadores Lógicos */
"||"            return 'OR'
"&&"            return 'AND'
"!"             return 'NOT'


/* 5.9 Signos de Agrupación 
Los signos de agrupación seran utilizados para agrupar operaciones aritméticas, lógicas o
relacionales. */
"("             return 'PARIZQ'
")"             return 'PARDER'
"{"             return 'LLAIZQ'
"}"             return 'LLADER'
"["             return 'CORIZQ'
"]"             return 'CORDER'

/* 5.16 Sentencias de control (RESERVADAS)*/
"if"            return 'IF'
"else"          return 'ELSE'

"switch"        return 'SWITCH'
"case"        return 'CASE'
"break"        return 'BREAK'
"default"        return 'DEFAULT'

/* 5.17 Sentencias cíclicas (RESERVADAS)*/
"while"         return 'WHILE'
"do"            return 'DO'
"for"           return 'FOR'

/* 5.18 Sentencias de transferencia (RESERVADAS)*/
"continue"      return 'CONTINUE'
"return"        return 'RETURN'

/* 5.19 Funciones (RESERVADAS) */


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

/* 5.12 Declaración y asignación de variables*/
[0-9]+("."[0-9]+)\b  return 'VDOUBLE';
[0-9]+\b 	        return 'VENTERO';
([a-z|A-Z])[a-z|A-Z|0-9|"_"]*       return 'VARIABLE'
(\'(([\\][\"]|[\\][\']|[\\][n]|[\\][t]|[\\][\\])|([^\n\'\"\\]{1}))\') return 'VCARACTER'
/* 5.13 Casteos (RESERVADAS)*/

/* 5.15 Estructuras de Datos */

<<EOF>>                 return 'EOF';

.   { 	console.log('Este es un error lexico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
		// instruccionesAPI.getAST.error.push(instruccionesAPI.errorlexico(yytext,yylloc.first_line,yylloc.first_column));
		arbolINSERRORES.setError(instruccionesAPI.errorlexico(yytext,yylloc.first_line,yylloc.first_column));
		// instruccionesAPI.getErrores.getInstance().insertar(new ErrorList("Lexico","Caracter: \" "+yytext+"\" no es valido" ,yylloc.first_line,yylloc.first_column)); 
	}
/lex

/*----------------------------- 5.10 Precedencia de Operaciones --------------------------*/
/* Asociación de operadores y precedencia 
    La precedencia de operadores nos indica la importancia en que una operación debe
    realizarse por encima del resto. A continuación, se define la misma.*/
%left  'OR', 'INTERROGA', 'tipo'
%left  'AND'
%right 'NOT'
%left  'IGUALA', 'DIFERENTE', 'MENORQUE', 'MENORIGUALQ', 'MAYORQUE', 'MAYORIGUALQ'
%left  'INC', 'MAS', 'DEC', 'MENOS'
%left  'MULTIPLICACION', 'DIVISION', 'POTENCIA', 'MODULO', 'VARIABLE'
%left   UMENOS

%start ini

%%
 /* ======================Definición de la gramatica==================== */
ini
	: instrucciones EOF		{  $$ = new InstructionAST($1); return $$;  }//here i gonna to save my AST 
	| error  			{ 	var sintacticerror="Detectado error Sintactico se esperaba otro valor y se recibio: "+$$+" reparelo.";
							console.log('Este es un error sintactico: ' +$$ + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
							// instruccionesAPI.getAST.error.push(instruccionesAPI.errorsintactico(sintacticerror,this._$.first_line,this._$.first_column));
							arbolINSERRORES.setError(instruccionesAPI.errorsintactico(sintacticerror,this._$.first_line,this._$.first_column));
							return  arbolINSERRORES
							// return (instruccionesAPI.errorsintactico(sintacticerror,this._$.first_line,this._$.first_column));
						}  /*OJITO: se coloca el ptocoma por si hay un error semantico, entonces se va a recuperar*/
;

instrucciones
	: instrucciones instruccion 	{ $$ = $1; instruccionesAPI.getAST.ins($2);  }
	| instruccion					{ $$ = [$1];}
;
/* ================================================================*/
/* ===================		INSTRUCCIONES      ===================*/
/* ================================================================*/
instruccion
	: declaracion					{ $$ = $1; } /* 5.12 Declaración y asignación de variables*/
	| funciones						{ $$ = $1; } /* 5.19 Funciones*/
	| metodos						{ $$ = $1; } /* 5.20 Metodos*/
	| call							{ $$ = $1; } /* 5.20 Metodos*/
	| instruccionswitch				{ $$ = $1; } /* 5.15.1. Vectores*/
	| instruccionif					{ $$ = $1; } /* 5.15.1. Vectores*/
	| instruccionwhile				{ $$ = $1; } /* 5.17 SenTencias cíclicas*/
	| instruccionfor				{ $$ = $1; } /* 5.17 SenTencias cíclicas*/
	| instrucciondowhile			{ $$ = $1; } /* 5.17 SenTencias cíclicas*/
	| instruccionprint PTCOMA		{ $$ = $1; } /* Print*/
	| instruccionprintln PTCOMA		{ $$ = $1; } /* Println*/
	| VARIABLE INC PTCOMA 			{ $$ = new INSincredecre($1, "INCREMENT", @1.first_line, @1.first_column); } /* anio++*/
	| VARIABLE DEC PTCOMA 			{ $$ = new INSincredecre($1, "DECREMENT", @1.first_line, @1.first_column); } /* anio++*/
	// | llamadas PTCOMA				{ $$ = $1; } /* 5.21 Llamadas*/
	| CONTINUE PTCOMA              	{ $$ = new INSContinue("CONTINUE",@1.first_line, @1.first_column); } /* CONTINUE */
    | BREAK PTCOMA                 	{ $$ = new INSBreak("BREAK",@1.first_line, @1.first_column); } /* BREAK */
	| returns PTCOMA      			{ $$ = $1; }
    | RUN call				        { $$ = $1; }
	// | VARIABLE MAS MAS PTCOMA 		{ $$ = $1; } /* anio++*/
	// | VARIABLE MENOS MENOS PTCOMA 	{ $$ = $1; } /* edad-- */
	/*| incredecre	{  }  5.14 Incremento y Decremento*/
;
/* ================================================================*/
/* ===================	FIN  INSTRUCCIONES      ===================*/
/* ================================================================*/

/*--------------------------------------  5.19 Funciones  ----------------------------------*/
funciones
    : VARIABLE PARIZQ parametros PARDER DOSPUNTOS tipo LLAIZQ instrucciones LLADER { $$ = new INSMetodo($1 ,$3, $6, $8, @1.first_line, @1.first_column); } /* <ID>(<PARAMETROS>):<TIPO>{ <INSTRUCCIONES>} */
    | VARIABLE PARIZQ PARDER DOSPUNTOS tipo LLAIZQ instrucciones LLADER            { $$ = new INSMetodo($1 ,null, $5, $7, @1.first_line, @1.first_column); }
;
/*--------------------------------------  5.20 Meodos  ----------------------------------*/
metodos																										//*variable,param,tipo,ins, line, column
    : VARIABLE PARIZQ parametros PARDER DOSPUNTOS VOID LLAIZQ instrucciones LLADER { $$ = new INSMetodo($1 ,$3, null, $8, @1.first_line, @1.first_column); } /* <ID>(<PARAMETROS>):<TIPO>{ <INSTRUCCIONES>} */
    | VARIABLE PARIZQ parametros PARDER LLAIZQ instrucciones LLADER				   { $$ = new INSMetodo($1 ,$3, null, $6, @1.first_line, @1.first_column); } /* <ID>(<PARAMETROS>){ <INSTRUCCIONES>} */
    | VARIABLE PARIZQ PARDER DOSPUNTOS VOID LLAIZQ instrucciones LLADER 		   { $$ = new INSMetodo($1 ,null, null, $7, @1.first_line, @1.first_column); } /* <ID>():<TIPO>{ <INSTRUCCIONES>} */
    | VARIABLE PARIZQ PARDER LLAIZQ instrucciones LLADER 						   { $$ = new INSMetodo($1 ,null, null, $5, @1.first_line, @1.first_column); } /* <ID>(){ <INSTRUCCIONES>} */
;

/*--------------------------------------  5.21 Llamadas  ----------------------------------*/
call
	:llamadas PTCOMA	{ $$ = $1; }
;

llamadas
    :VARIABLE PARIZQ paramllamada PARDER    {$$ = new INSllamada($1, $3, @1.first_line, @1.first_column);}
    |VARIABLE PARIZQ PARDER                 {$$ = new INSllamada($1, null, @1.first_line, @1.first_column);   }
;
/*LLAMADA -> [<ID>] ( [<PARAMETROS_LLAMADA>] )
| [<ID>] ( )*/

paramllamada
    :paramllamada COMA expresion      	{ $$ = $1; $$.push($3); } //add to a list array
    |expresion                        	{ $$ = [$1]; }
;

parametros
    :parametros COMA tipo VARIABLE  	{ $$ = $1; $$.push(new Declarar($3, $4, null,  @1.first_line, @1.first_column)); }
    |tipo VARIABLE                   	{ $$= [new Declarar($1, $2, null,  @1.first_line, @1.first_column)]; }
;
/* ------------------------------------    IF    ------------------------------------ */
instruccionif
    :IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER 									{$$ = new If($3, $6, null, @1.first_line, @1.first_column);}/*if   (  <EXPRESION>  )   { 	<INSTRUCCIONES>	} */
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE LLAIZQ instrucciones LLADER	{$$ = new If($3, $6, $10, @1.first_line, @1.first_column);}	/*if   (  <EXPRESION>  )   { 	<INSTRUCCIONES>	}   else   { 	<INSTRUCCIONES>	} */
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE instruccionif 					{$$ = new If($3, $6, [$9], @1.first_line, @1.first_column);}	/* if   (  <EXPRESION>  )   { 	<INSTRUCCIONES>	} else <IF>*/
	|IF PARIZQ expresion PARDER LLAIZQ LLADER 													{}
;
/* ------------------------------------  SWITCH  ------------------------------------ */
instruccionswitch
    :SWITCH PARIZQ expresion PARDER LLAIZQ instruccioncaselist instrucciondefault LLADER  	{ $$ = new INSswitch($3, $6, $7, @1.first_line, @1.first_column); }/* switch   (   <EXPRESION>   )  { <CASES_LIST>   <DEFAULT> } */
    |SWITCH PARIZQ expresion PARDER LLAIZQ instruccioncaselist LLADER          				{ $$ = new INSswitch($3, $6, null, @1.first_line, @1.first_column); }/* switch   ( <EXPRESION>  )  {<CASES_LIST> } */
    |SWITCH PARIZQ expresion PARDER LLAIZQ instrucciondefault LLADER          				{ $$ = new INSswitch($3, null, $6, @1.first_line, @1.first_column); }/* switch   ( <EXPRESION>  )   { <DEFAULT> } */
;
/* ------------------------------------  caselist  ------------------------------------ */
instruccioncaselist
    :instruccioncaselist CASE expresion DOSPUNTOS instrucciones { $$ = $1; $$.push(new INSCase($3, $5, @1.first_line, @1.first_column)); }
    |CASE expresion DOSPUNTOS instrucciones             		{ $$ = []; $$.push(new INSCase($2, $4, @1.first_line, @1.first_column)); } /* case   <EXPRESION>   :  <INSTRUCCIONES> */
;
/* ------------------------------------  DEFAULT  ------------------------------------ */
instrucciondefault
    :DEFAULT DOSPUNTOS instrucciones  { $$ = $3 }
;
/*--------------------------------------5.17 SenTencias cíclicas----------------------------------*/

 /*5.17.1. While  while   (  <EXPRESION>   )   {  <INSTRUCCIONES>  } */
instruccionwhile
    :WHILE PARIZQ expresion PARDER LLAIZQ instrucciones LLADER 		{$$ = new INSwhile($3, $6, @1.first_line, @1.first_column);}
;

/*5.17.3. Do-While*/
instrucciondowhile
    :DO LLAIZQ instrucciones LLADER WHILE PARIZQ expresion PARDER PTCOMA  {$$ = new INSdowhile($7, $3, @1.first_line, @1.first_column);}/*do{ <INSTRUCCIONES> }while(<EXPRESION>);*/
;
/*5.17.2. For*/
instruccionfor
    :FOR PARIZQ fordeclarar PTCOMA expresion PTCOMA actualizacion PARDER LLAIZQ instrucciones LLADER  {$$ = new INSfor(@3, @5, @7, @10,@1.first_line, @1.first_column);}/* for  ((<DECLARACION>|<ASIGNACION>);<CONDICION>;< ACTUALIZACION>){<INSTRUCCIONES>} */
;
fordeclarar
    : tipo VARIABLE IGUAL expresion { $$ = new Declarar($1, $2, $4,  @1.first_line, @1.first_column);  } /*TIPO> identificador = <EXPRESION>;*/
	| VARIABLE IGUAL expresion 		{ $$ = new Asignar($1, $3, @1.first_line, @1.first_column); } /*identificador = <EXPRESION>;*/
;
actualizacion
    : VARIABLE INC	 				{ $$ = new INSincredecre($1, "INCREMENT", @1.first_line, @1.first_column); } /* anio++ */
	| VARIABLE DEC 					{ $$ = new INSincredecre($1, "DECREMENT", @1.first_line, @1.first_column); } /* edad-- */
	| VARIABLE IGUAL expresion 		{ $$ = new Asignar($1, $3, @1.first_line, @1.first_column); } /*identificador = <EXPRESION>;*/
;
/*--------------------------------------  5.22 Función Print  ----------------------------------*/
instruccionprint /* valores únicamente de tipo entero, doble, booleano, cadena y carácter. */
    :PRINT PARIZQ expresion PARDER   	{  $$ = new INSPrint($3, @1.first_line, @1.first_column, false);   }/* Print  (  <EXPRESION>  );*/
;
/*--------------------------------------  5.23 Función Println  ----------------------------------*/
instruccionprintln/*entero,doble, booleano, cadena y carácter.*/
    :PRINTLN PARIZQ expresion PARDER    { $$ = new INSPrint($3, @1.first_line, @1.first_column, true); }/* Println  (  <EXPRESION>  );*/
;

/*--------------------------------------  RUN  ----------------------------------*/
/*5.26. Run*/
// instruccionrun
//     : RUN VARIABLE PARA PARC 			  		{  } /* run <ID>  ( )  ;*/
// 	| RUN VARIABLE PARA listavalores PARC 		{  } /* run <ID>  ( <LISTAVALORES> )  ;*/
// ;
// listavalores
//     : listavalores COMA expresion 		 		{  } /*LISTAVALORES->LISTAVALORES  , EXPRESION*/
// 	| expresion 					 			{  } /*| EXPRESION*/
// ;

/* -------------------------------------- RETURN --------------------------------------*/
returns
	: RETURN expresion       	{ $$ = new INSreturn($2,@1.first_line, @1.first_column); }
    | RETURN                 	{ $$ = new INSreturn(null,@1.first_line, @1.first_column); }
;
/* -------------------------- DECLARACION ASIGNACION VARIABLES ------------------------------ */
declaracion
	: tipo VARIABLE PTCOMA																				{ $$ = new Declarar($1, $2, null,  @1.first_line, @1.first_column); } /*<TIPO> identificador;*/
	| tipo VARIABLE IGUAL expresion PTCOMA																{ $$ = new Declarar($1, $2, $4,  @1.first_line, @1.first_column);} /*TIPO> identificador = <EXPRESION>;*/
	| tipo notacioncomas PTCOMA																			{ $$ = new Declarar($1, $2, null,  @1.first_line, @1.first_column); } /*<TIPO> id1, id2, id3, id4;*/
	| tipo notacioncomas IGUAL expresion PTCOMA 														{ $$ = new Declarar($1, $2, $4,  @1.first_line, @1.first_column); } /*<TIPO> id1, id2, id3, id4 = <EXPRESION>;*/
	| tipo VARIABLE CORIZQ CORDER IGUAL NEW tipo CORIZQ expresion CORDER PTCOMA							{  } /*<TIPO> <ID>[ ] = new <TIPO>[ <EXPRESION> ] ;						 DECLARACION TIPO 1 */
	| tipo VARIABLE CORIZQ CORDER IGUAL NEW tipo CORIZQ expresion CORDER CORIZQ expresion CORDER PTCOMA	{  } /*<TIPO> <ID>[ ][ ]= new <TIPO>[ <EXPRESION> ][ <EXPRESION> ] ;*/
	| tipo VARIABLE CORIZQ CORDER IGUAL CORIZQ listavalores CORDER PTCOMA								{  }  /*<TIPO> <ID>[ ] = [ <LISTAVALORES> ] ;							 DECLARACION TIPO 2 */
	| tipo VARIABLE IGUAL VARIABLE CORIZQ expresion CORDER PTCOMA										{  } /*<TIPO> <ID>[ ] = new <TIPO>[ <EXPRESION> ] ;	 */
	| tipo VARIABLE IGUAL VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER PTCOMA				{  } /*<TIPO> <ID>[ ][ ]= new <TIPO>[ <EXPRESION> ][ <EXPRESION> ] ;*/
	| notacioncomas IGUAL expresion PTCOMA																{ $$ = new Asignar($1, $3, @1.first_line, @1.first_column);  } /*identificador = <EXPRESION>;*/
	| VARIABLE IGUAL expresion PTCOMA																	{ $$ = new Asignar($1, $3, @1.first_line, @1.first_column);  } /*identificador = <EXPRESION>;*/
			/*5.15.1.3 Modificación de Vectores*/
	| VARIABLE CORIZQ expresion CORDER IGUAL expresion PTCOMA											{  } /*<ID> [ EXPRESION ] = EXPRESION;						 DECLARACION TIPO 1*/
	| VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER IGUAL expresion PTCOMA					{  } /*<> [ EXPRESION ][ EXPRESION ] = EXPRESION;          DECLARACION TIPO 2 */
;

notacioncomas
	: notacioncomas COMA VARIABLE  	{ $$=$1; $$.push($3) }
	| VARIABLE 						{ $$=[]; $$.push($1) }
;
/* ------------------------------------ EXPRESIONES ------------------------------------ */
expresion																				/*aqui es UNARIA XD*/
	: MENOS expresion %prec UMENOS  						{ $$ = new INSAritmetico(null, $3, 'UNITARIA',  @1.first_line, @1.first_column); }
	| NOT expresion      						 			{ $$ = new INSLogico(null, $2, 'NOT', @1.first_line, @1.first_column);}/*constructor(expDer, expIzq, tipo, fila, column){*/
	| expresion MAS expresion      						 	{ $$ = new INSAritmetico($1, $3, 'SUMA',  @1.first_line, @1.first_column); }/*constructor(expDer, expIzq, tipo, fila, column){*/
	| expresion MENOS expresion     					 	{ $$ = new INSAritmetico($1, $3, 'RESTA',  @1.first_line, @1.first_column); }
	| expresion MULTIPLICACION expresion       			 	{ $$ = new INSAritmetico($1, $3, 'MULTIPLICACION',  @1.first_line, @1.first_column); }
	| expresion DIVISION expresion 						 	{ $$ = new INSAritmetico($1, $3, 'DIVISION',  @1.first_line, @1.first_column); }
	| expresion MODULO expresion			             	{ $$ = new INSAritmetico($1, $3, 'MODULO',  @1.first_line, @1.first_column); }
    | expresion POTENCIA expresion			             	{ $$ = new INSAritmetico($1, $3, 'POTENCIA',  @1.first_line, @1.first_column); }
    
	| expresion MENORIGUALQ expresion	                    { $$ = new INSRelacional($1, $3, 'MENORIGUAL',  @1.first_line, @1.first_column); }
	// | expresion MENORQUE IGUAL expresion	 		        { $$ = new INSRelacional($1, $3, 'MENOR',  @1.first_line, @1.first_column); }
	| expresion MENORQUE expresion	 		                { $$ = new INSRelacional($1, $3, 'MENOR',  @1.first_line, @1.first_column); }
    | expresion MAYORIGUALQ expresion	                    { $$ = new INSRelacional($1, $3, 'MAYORIGUAL',  @1.first_line, @1.first_column); }
    // | expresion MAYORQUE IGUAL expresion                    { $$ = new INSRelacional($1, $3, 'MAYOR',  @1.first_line, @1.first_column); }
    | expresion MAYORQUE expresion                          { $$ = new INSRelacional($1, $3, 'MAYOR',  @1.first_line, @1.first_column); }
    // | expresion IGUAL IGUAL expresion	  		         	{ $$ = new INSRelacional($1, $3, 'IGUAL',  @1.first_line, @1.first_column); }
    | expresion IGUALA expresion	  		                { $$ = new INSRelacional($1, $3, 'IGUAL',  @1.first_line, @1.first_column); }
    | expresion DIFERENTE expresion	   	                	{ $$ = new INSRelacional($1, $3, 'NEGACION',  @1.first_line, @1.first_column); }
    // | expresion NOT IGUAL expresion	   	                	{ $$ = new INSRelacional($1, $3, 'NEGACION',  @1.first_line, @1.first_column); }
    | expresion OR expresion	  			                { $$ = new INSLogico($1, $3, 'NOT', @1.first_line, @1.first_column); }
    | expresion AND expresion			                	{ $$ = new INSLogico($1, $3, 'NOT', @1.first_line, @1.first_column); }
	
	| PARA tipo PARC expresion								{ $$ = new INSCastear($2, $4, @1.first_line, @1.first_column); } /* (int) 18.6*//*(<TIPO>) <EXPRESION>*/
	| VARIABLE                      						{ $$ = new INSid($1, @1.first_line, @1.first_column); }
	| VENTERO                      							{ $$ = new INSPrimitivo(new Tipo(tipos.INT), Number($1), @1.first_line, @1.first_column); }
	| VDOUBLE                       						{ $$ = new INSPrimitivo(new Tipo(tipos.DOUBLE), Number($1), @1.first_line, @1.first_column); }
	| CADENA												{ $$ = new INSPrimitivo(new Tipo(tipos.STRING), $1, @1.first_line, @1.first_column); }
	| VCARACTER		 										{ $$ = new INSPrimitivo(new Tipo(tipos.CARACTER), $1, @1.first_line, @1.first_column); }
	| TRUE                       							{ $$ = new INSPrimitivo(new Tipo(tipos.BOOLEAN), true, @1.first_line, @1.first_column); }
	| FALSE                       							{ $$ = new INSPrimitivo(new Tipo(tipos.BOOLEAN), false, @1.first_line, @1.first_column); }
	| PARIZQ expresion PARDER       						{ $$ = $2; }
	// | VARIABLE MAS MAS 										{  } /* anio-- */
	// | VARIABLE MENOS MENOS 									{  } /* edad-- */
	| VARIABLE CORIZQ expresion CORDER							{  } /* vector2[0];*/
	| VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER 	{  } /* vectorDosd[0][0];*/
	// | VARIABLE MAS MAS 										{  } /* vectorDosd[0][0]*/
	| expresion INTERROGA expresion DOSPUNTOS expresion 	{  $$ = new INSTernario($1, $3, $5, @1.first_line, @1.first_column); } /*Ternarios*/
    
	| TOLOWER PARIZQ expresion PARDER  						{  } /* toLower  (  <EXPRESION>  );*/       
    | TOUPPER PARIZQ expresion PARDER  						{  } /* toUpper  (  <EXPRESION>  );*/      
    | ROUND PARIZQ DOUBLE PARDER    						{  } /* round  (  )  ;     */
    | TYPEOF PARIZQ expresion PARDER   						{  }
    | TOSTRING PARIZQ expresion PARDER 						{  }
	| LENGTH PARIZQ expresion PARDER   						{  } /* length  ( <VALOR>  )  ;*/
	| TYPEOF PARIZQ expresion PARDER   						{  }/* typeof  ( <VALOR>  )  ;*/
	| TOSTRING PARIZQ expresion PARDER   					{  }/* toString  ( <VALOR>  )  ;*/
	| TOCHARARRAY PARIZQ expresion PARDER   				{  }/* toCharArray  ( <VALOR>  )  ;*/
    | llamadas                           					{ $$= $1; } /*5.25. Funciones nativas*/
;

listavalores
	: listavalores COMA expresion 	{ $$ = $1; $$.push($3);}/* char vectordosd2 [ ][ ] = [[ 0 ,0],[0 , 0]];*/
	| expresion						{ $$ = []; $$.push($1);}
;
/* ------------------------------------    TIPOS    ------------------------------------ */
tipo
	:ENTERO       	{ $$ = new Tipo(tipos.INT); }
	|DOUBLE       	{ $$ = new Tipo(tipos.DOUBLE); }
	|BOOLEANO     	{ $$ = new Tipo(tipos.BOOLEAN); }
	|CARACTER    	{ $$ = new Tipo(tipos.CARACTER); }
	|STRING        	{ $$ = new Tipo(tipos.STRING); }
	|VOID           { $$ = new Tipo(tipos.VOID); }
;









