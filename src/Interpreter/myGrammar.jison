/**
 * mi primer proyecto con Jison utilizando Nodejs en WINDOWS :)
 */
%{
	const {MiArbolAST} = require('../Instructions/ASTGlobal/InstructionAST');
	var {InstructionAST} = require('../Instructions/ASTGlobal/InstructionAST')
	var {nodoAST} = require('../Instructions/ASTGlobal/nodoAST')
	const instruccionesAPI	= require('../Interpreter/interprete').instruccionesAPI; //las instrucciones de la API
    const {INSprint} = require('../Instructions/INSprint');
    const {INSAritmetico} = require('../Instructions/INSAritmetico');
    const {INSRelacional} = require('../Instructions/INSRelacional');
    const {INSLogico} = require('../Instructions/INSLogico');
    const {Asignar} = require('../Instructions/Asignar');
    const {Declarar} = require('../Instructions/Declarar');
    const {INSCastear} = require('../Instructions/INSCastear');
    const {INSPrimitivos} = require('../Instructions/INSPrimitivos');
    const {id} = require('../Instructions/id');
    const {INSincredecre} = require('../Instructions/INSincredecre');
    const {INSreturn} = require('../Instructions/INSreturn');
    const {llamar} = require('../Instructions/llamar');
    const {metodos} = require('../Instructions/metodos');
    const {INSTernario} = require('../Instructions/INSTernario');
    const {FUNClength} = require('../Instructions/FUNClength');
    const {FUNCround} = require('../Instructions/FUNCround');
    const {ToCharArray} = require('../Instructions/ToCharArray');
    const {ToLower} = require('../Instructions/ToLower');
    const {ToString} = require('../Instructions/ToString');
    const {ToUpper} = require('../Instructions/ToUpper');
    const {TypeOf} = require('../Instructions/TypeOf');
    const {DeclaraVector1} = require('../Instructions/DeclaraVector1');
    const {AsignaVector1} = require('../Instructions/AsignaVector1');
    const {Vector1} = require('../Instructions/Vector1');

	//SENTENCIAS
    const {INSif} = require('../Instructions/INSif');
    const {INSwhile} = require('../Instructions/INSwhile');
    const {INSdowhile} = require('../Instructions/INSdowhile');
    const {INSfor} = require('../Instructions/INSfor');
    const {INSswitch} = require('../Instructions/INSswitch');
	const {INSCase} = require('../Instructions/INSCase');
	//pauses
	const {Break} = require('../Instructions/Break');
	const {Continue} = require('../Instructions/Continue');
	const Tipo = require("../Instructions/ASTGlobal/tiponodo");
	const tipos = require("../Instructions/ASTGlobal/tiponodo");
	var sintacticerror = "";
	var acumoftext="";
	var arbolINSERRORES = new InstructionAST();//por si hay errores
	var erroreslexicos=[];
	//PARA MI AST
	// var arbol = new MiArbolAST();
	// var MiArbolAST = new InstructionAST();
%}

/*------------------------ Definición éLexca --------------------------*/
%lex

%options case-insensitive
%x CADENA
%%
/*Consider the following example of a scanner that simply scans all double-quote 
delimited strings in a text file but disallows newlines ide quotations:*/

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

.   { 	console.log('Este es un error lexico: (  ' + yytext + '  ) en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
		// instruccionesAPI.getAST.error.push(instruccionesAPI.errorlexico(yytext,yylloc.first_line,yylloc.first_column));
		// instruccionesAPI.getAST.setError(instruccionesAPI.errorLexico('Carecter irreconocible:  '+yytext,yylloc.first_line,yylloc.first_column));
		erroreslexicos.push(instruccionesAPI.errorLexico('Carecter irreconocible:  '+yytext,yylloc.first_line,yylloc.first_column));
		// instruccionesAPI.getErrores.getInstance().insertar(new ErrorList("Lexico","Caracter: \" "+yytext+"\" no es valido" ,yylloc.first_line,yylloc.first_column)); 
		// return arboolINSERRORES
		
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
	: instrucciones EOF		{  $$ = [new InstructionAST($1[0]), new nodoAST('ARBOL SINTACTICO',[$1[1]])]; return $$;  }//here i gonna to save my AST 
	// | error  			{ 	var sintacticerror="Detectado error Sintactico se esperaba otro valor y se recibio: "+$$.tostring()+" reparelo.";
	// 						console.log('Este es un error sintactico: ' +$$ + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
	// 						// instruccionesAPI.getAST.error.push(instruccionesAPI.errorsintactico(sintacticerror,this._$.first_line,this._$.first_column));
	// 						arbolINSERRORES.setError(instruccionesAPI.errorsintactico(sintacticerror,this._$.first_line,this._$.first_column));
	// 						return  arbolINSERRORES
	// 						// return (instruccionesAPI.errorsintactico(sintacticerror,this._$.first_line,this._$.first_column));
	// 					}  /*OJITO: se coloca el ptocoma por si hay un error semantico, entonces se va a recuperar*/
;

instrucciones
	: instrucciones instruccion 	{ $$ = [$1[0], new nodoAST('INSTRUCCIONES',[$1[1],$2[1]])]; $1[0].push($2[0]);  }//instruccionesAPI.getAST.ins($2)
	| instruccion					{ $$ = [ [$1[0]] , new nodoAST('INSTRUCCIONES',[$1[1]]) ];}
;
/* ================================================================*/
/* ===================		INSTRUCCIONES      ===================*/
/* ================================================================*/
instruccion
	: declaracion					{ $$ = [$1[0], new nodoAST('INSTRUCCION',[$1[1]])]; } /* 5.12 Declaración y asignación de variables*/
	| funciones						{ $$ = [$1[0], new nodoAST('INSTRUCCION',[$1[1]])]; } /* 5.19 Funciones*/
	| metodos						{ $$ = [$1[0], new nodoAST('INSTRUCCION',[$1[1]])]; } /* 5.20 Metodos*/
	| call							{ $$ = [$1[0], new nodoAST('INSTRUCCION',[$1[1]])]; } /* 5.20 Metodos*/
	| instruccionswitch				{ $$ = [$1[0], new nodoAST('INSTRUCCION',[$1[1]])]; } /* 5.15.1. Vectores*/
	| instruccionif					{ $$ = [$1[0], new nodoAST('INSTRUCCION',[$1[1]])]; } /* 5.15.1. Vectores*/
	| instruccionwhile				{ $$ = [$1[0], new nodoAST('INSTRUCCION',[$1[1]])]; } /* 5.17 SenTencias cíclicas*/
	| instruccionfor				{ $$ = [$1[0], new nodoAST('INSTRUCCION',[$1[1]])]; } /* 5.17 SenTencias cíclicas*/
	| instrucciondowhile			{ $$ = [$1[0], new nodoAST('INSTRUCCION',[$1[1]])]; } /* 5.17 SenTencias cíclicas*/
	| instruccionprint 				{ $$ = [$1[0], new nodoAST('INSTRUCCION',[$1[1]])]; } /* Print*/
	| instruccionprintln 			{ $$ = [$1[0], new nodoAST('INSTRUCCION',[$1[1]])]; } /* Println*/
	| VARIABLE INC PTCOMA 			{ $$ = [new INSincredecre($1, "INCREMENT", @1.first_line, @1.first_column), new nodoAST('INSTRUCCION',[new nodoAST($1,null),new nodoAST($2,null),new nodoAST($3,null)])]; } /* anio++*/
	| VARIABLE DEC PTCOMA 			{ $$ = [new INSincredecre($1, "DECREMENT", @1.first_line, @1.first_column), new nodoAST('INSTRUCCION',[new nodoAST($1,null),new nodoAST($2,null),new nodoAST($3,null)])]; } /* anio++*/
	// | llamadas PTCOMA				{ $$ = $1; } /* 5.21 Llamadas*/
	| CONTINUE PTCOMA              	{ $$ = [new Continue("CONTINUE",@1.first_line, @1.first_column), new nodoAST('INSTRUCCION',[new nodoAST($1,null),new nodoAST($2,null)])]; } /* CONTINUE */
    | BREAK PTCOMA                 	{ $$ = [new Break("BREAK",@1.first_line, @1.first_column), new nodoAST('INSTRUCCION',[new nodoAST($1,null),new nodoAST($2,null)])]; } /* BREAK */
	| returns PTCOMA      			{ $$ = [$1[0],new nodoAST('INSTRUCCION',[$1[1],new nodoAST($2,null)])]; }
    | RUN call				        { $$ = [$2[0], new nodoAST('INSTRUCCION',[new nodoAST($1,null),$2[1]])]; }
	// | VARIABLE MAS MAS PTCOMA 		{ $$ = $1; } /* anio++*/
	// | VARIABLE MENOS MENOS PTCOMA 	{ $$ = $1; } /* edad-- */
	/*| incredecre	{  }  5.14 Incremento y Decremento*/
;
/* ================================================================*/
/* ===================	FIN  INSTRUCCIONES      ===================*/
/* ================================================================*/

/*--------------------------------------  5.19 Funciones  ----------------------------------*/
funciones
    : VARIABLE PARIZQ parametros PARDER DOSPUNTOS tipo LLAIZQ instrucciones LLADER { $$ = [new metodos($1 ,$3[0], $6[0], $8[0], @1.first_line, @1.first_column),new nodoAST('FUNCIONES',[new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null), new nodoAST($5,null), $6[1], new nodoAST($7,null), $8[1], new nodoAST($9,null)])]; } /* <ID>(<PARAMETROS>):<TIPO>{ <INSTRUCCIONES>} */
    | VARIABLE PARIZQ PARDER DOSPUNTOS tipo LLAIZQ instrucciones LLADER            { $$ = [new metodos($1 ,null, $5[0], $7[0], @1.first_line, @1.first_column), new nodoAST('FUNCIONES',[new nodoAST($1,null), new nodoAST($2,null), new nodoAST($3,null), new nodoAST($4,null), $5[1], new nodoAST($6,null), $7[1], new nodoAST($8,null),])]; }
;
/*--------------------------------------  5.20 Meodos  ----------------------------------*/
metodos																										//*variable,param,tipo,ins, line, column
    // : VARIABLE PARIZQ parametros PARDER DOSPUNTOS VOID LLAIZQ instrucciones LLADER { $$ = [new metodos($1 ,$3[0], null, $8[0], @1.first_line, @1.first_column), new nodoAST('METODOS',[new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null), new nodoAST($5,null), new nodoAST($6,null), new nodoAST($7,null), $8[1], new nodoAST($9,null) ])] ; } /* <ID>(<PARAMETROS>):<TIPO>{ <INSTRUCCIONES>} */
    : VARIABLE PARIZQ parametros PARDER LLAIZQ instrucciones LLADER				   { $$ = [new metodos($1 ,$3[0], Tipo.VOID, $6[0], @1.first_line, @1.first_column), new nodoAST('METODOS',[new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null), new nodoAST($5,null),  $6[1], new nodoAST($7,null)		])] ; } /* <ID>(<PARAMETROS>){ <INSTRUCCIONES>} */
    // | VARIABLE PARIZQ PARDER DOSPUNTOS VOID LLAIZQ instrucciones LLADER 		   { $$ = [new metodos($1 ,null, null, $7[0], @1.first_line, @1.first_column) , new nodoAST('METODOS',[new nodoAST($1,null), new nodoAST($2,null), new nodoAST($3,null), new nodoAST($4,null), new nodoAST($5,null), new nodoAST($6,null),  $7[1], new nodoAST($8,null) ])] ;  } /* <ID>():<TIPO>{ <INSTRUCCIONES>} */
    | VARIABLE PARIZQ PARDER LLAIZQ instrucciones LLADER 						   { $$ = [new metodos($1 ,null, Tipo.VOID, $5[0], @1.first_line, @1.first_column) , new nodoAST('METODOS',[new nodoAST($1,null), new nodoAST($2,null), new nodoAST($3,null), new nodoAST($4,null),  $5[1], new nodoAST($6,null), ])] ;  } /* <ID>(){ <INSTRUCCIONES>} */
;

/*--------------------------------------  5.21 Llamadas  ----------------------------------*/
call
	:llamadas PTCOMA	{ $$ = [$1[0],new nodoAST('CALL',[$1[1],new nodoAST($2,null)])]; }
;

llamadas
    :VARIABLE PARIZQ paramllamada PARDER    {$$ = [new llamar($1, $3[0], @1.first_line, @1.first_column), new nodoAST('LLAMADAS',[new nodoAST($1,null),new nodoAST($2,null),$3[1],new nodoAST($2,null)])];}
    |VARIABLE PARIZQ PARDER                 {$$ = [new llamar($1, null, @1.first_line, @1.first_column), new nodoAST('LLAMADAS',[new nodoAST($1,null),new nodoAST($2,null),new nodoAST($3,null)])];   }
;
/*LLAMADA -> [<ID>] ( [<PARAMETROS_LLAMADA>] )
| [<ID>] ( )*/
// instrucciones
// 	: instrucciones instruccion 	{ $$ = [$1[0], new nodoAST('INSTRUCCIONES',[$1[1],$2[1]])]; $1[0].push($2[0]);  }//instruccionesAPI.getAST.ins($2)
// 	| instruccion					{ $$ = [ [$1[0]] , new nodoAST('INSTRUCCIONES',[$1[1]]) ];}
// ;
paramllamada
    :paramllamada COMA expresion      	{ $$ = [$1[0] , new nodoAST('PARAMETRO LLAMADA',[$1[1],new nodoAST($2,null),$3[1]]) ]; $$.push($3[0]); } //add to a list array
    |expresion                        	{ $$ = [[$1[0]] , new nodoAST('PARAMETRO LLAMADA',$1[1]) ] ; }
;

parametros
    :parametros COMA tipo VARIABLE  	{ $$ = [ $1[0], new nodoAST('PARAMETROS',[$1[1],new nodoAST($2,null),$3[1],new nodoAST($4,null)]) ]; $$.push(new Declarar($3[0], $4, null,  @1.first_line, @1.first_column)); }
    |tipo VARIABLE                   	{ $$= [[new Declarar($1[0], $2, null,  @1.first_line, @1.first_column)] , new nodoAST('PARAMETROS',[$1[1], new nodoAST($2,null)])]; }
;
/* ------------------------------------    IF    ------------------------------------ */
instruccionif
    :IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER 									{$$ = [new INSif($3[0], $6[0], null, @1.first_line, @1.first_column), new nodoAST('INS IF',[new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null), new nodoAST($5,null), $6[1], new nodoAST($7,null) ])]; }/*if   (  <EXPRESION>  )   { 	<INSTRUCCIONES>	} */
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE LLAIZQ instrucciones LLADER	{$$ = [new INSif($3[0], $6[0], $10[0], @1.first_line, @1.first_column) , new nodoAST('INS IF',[new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null), new nodoAST($5,null), $6[1], new nodoAST($7,null), new nodoAST($8,null), new nodoAST($9,null), $10[1], new nodoAST($11,null)])];  }	/*if   (  <EXPRESION>  )   { 	<INSTRUCCIONES>	}   else   { 	<INSTRUCCIONES>	} */
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE instruccionif 					{$$ = [new INSif($3[0], $6[0], [$9], @1.first_line, @1.first_column), new nodoAST('INS IF',[new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null), new nodoAST($5,null), $6[1], new nodoAST($7,null), new nodoAST($8,null), $9[1]])]; }	/* if   (  <EXPRESION>  )   { 	<INSTRUCCIONES>	} else <IF>*/
	|IF PARIZQ expresion PARDER LLAIZQ LLADER 													{}
;
/* ------------------------------------  SWITCH  ------------------------------------ */
instruccionswitch
    :SWITCH PARIZQ expresion PARDER LLAIZQ instruccioncaselist instrucciondefault LLADER  	{ $$ = [new INSswitch($3[0], $6[0], $7[0], @1.first_line, @1.first_column)  ,new nodoAST('INS SWITCH',[new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null), new nodoAST($5,null), $6[1], $7[1], new nodoAST($8,null) ])]; }/* switch   (   <EXPRESION>   )  { <CASES_LIST>   <DEFAULT> } */
    |SWITCH PARIZQ expresion PARDER LLAIZQ instruccioncaselist LLADER          				{ $$ = [new INSswitch($3[0], $6[0], null, @1.first_line, @1.first_column),new nodoAST('INS SWITCH',[new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null), new nodoAST($5,null), $6[1], new nodoAST($7,null)])]; }/* switch   ( <EXPRESION>  )  {<CASES_LIST> } */
    |SWITCH PARIZQ expresion PARDER LLAIZQ instrucciondefault LLADER          				{ $$ = [new INSswitch($3[0], null, $6[0], @1.first_line, @1.first_column),new nodoAST('INS SWITCH',[new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null), new nodoAST($5,null), $6[1],new nodoAST($7,null)])]; }/* switch   ( <EXPRESION>  )   { <DEFAULT> } */
;

instrucciones
	: instrucciones instruccion 	{ $$ = [$1[0], new nodoAST('INSTRUCCIONES',[$1[1],$2[1]])]; $1[0].push($2[0]);  }//instruccionesAPI.getAST.ins($2)
	| instruccion					{ $$ = [ [$1[0]] , new nodoAST('INSTRUCCIONES',[$1[1]]) ];}
;
/* ------------------------------------  caselist  ------------------------------------ */
instruccioncaselist
    :instruccioncaselist CASE expresion DOSPUNTOS instrucciones { $$ = [$1[0],new nodoAST('CASE',[$1[1], new nodoAST($2,null), $3[1], new nodoAST($4,null), $5[1],]) ]; $$.push(new INSCase($3[0], $5[0], @1.first_line, @1.first_column)); }
    |CASE expresion DOSPUNTOS instrucciones             		{ $$ = [[new INSCase($2[0], $4[0], @1.first_line, @1.first_column)], new nodoAST('CASE',[new nodoAST($1,null), $2[1], new nodoAST($3,null), $4[1]])]; } /* case   <EXPRESION>   :  <INSTRUCCIONES> */
;
/* ------------------------------------  DEFAULT  ------------------------------------ */
instrucciondefault
    :DEFAULT DOSPUNTOS instrucciones  { $$ = [$3[0], new nodoAST('DEFAULT', [new nodoAST($1,null),new nodoAST($2,null),$3[1]])] }
;
/*--------------------------------------5.17 SenTencias cíclicas----------------------------------*/

 /*5.17.1. While  while   (  <EXPRESION>   )   {  <INSTRUCCIONES>  } */
instruccionwhile
    :WHILE PARIZQ expresion PARDER LLAIZQ instrucciones LLADER 		{$$ = [new INSwhile($3[0], $6[0], @1.first_line, @1.first_column), new nodoAST('WHILE', [new nodoAST($1,null),new nodoAST($2,null),$3[1],new nodoAST($4,null),new  nodoAST($5,null), $6[1],new  nodoAST($7,null),])];}
;

/*5.17.3. Do-While*/
instrucciondowhile
    :DO LLAIZQ instrucciones LLADER WHILE PARIZQ expresion PARDER PTCOMA  {$$ = [new INSdowhile($7[0], $3[0], @1.first_line, @1.first_column), new nodoAST('DO WHILE', [new nodoAST($1,null),new nodoAST($2,null),$3[1], new nodoAST($4,null), new nodoAST($5,null), new nodoAST($6,null), $7[1],new nodoAST($8,null),new nodoAST($9,null)])];}/*do{ <INSTRUCCIONES> }while(<EXPRESION>);*/
;
/*5.17.2. For*/
instruccionfor
    :FOR PARIZQ fordeclarar PTCOMA expresion PTCOMA actualizacion PARDER LLAIZQ instrucciones LLADER  {$$ = [new INSfor($3[0], $5[0], $7[0], $10[0],@1.first_line, @1.first_column), new nodoAST('FOR', [new nodoAST($1,null),new nodoAST($2,null),$3[1],new  nodoAST($4,null), $5[1], new nodoAST($6,null), $7[1],new nodoAST($8,null),new nodoAST($9,null),$10[1],new nodoAST($11,null)])];}/* for  ((<DECLARACION>|<ASIGNACION>);<CONDICION>;< ACTUALIZACION>){<INSTRUCCIONES>} */
;
fordeclarar
    : tipo VARIABLE IGUAL expresion { $$ = [new Declarar($1[0], $2, $4[0],  @1.first_line, @1.first_column), new nodoAST('DECLARACION',[$1[1],new nodoAST($2,null),new nodoAST($3,null),$4[1]])];  } /*TIPO> identificador = <EXPRESION>;*/
	| VARIABLE IGUAL expresion 		{ $$ = [new Asignar($1, $3[0], @1.first_line, @1.first_column), new nodoAST('ASIGNACION',[new nodoAST($1,null),new nodoAST($2,null),$3[1]])]; } /*identificador = <EXPRESION>;*/
;
actualizacion
    : VARIABLE INC	 				{ $$ = [new INSincredecre($1, "INCREMENT", @1.first_line, @1.first_column), new nodoAST('ACTUALIZACION',[new nodoAST($1,null),new nodoAST($2,null)])]; } /* anio++ */
	| VARIABLE DEC 					{ $$ = [new INSincredecre($1, "DECREMENT", @1.first_line, @1.first_column), new nodoAST('ACTUALIZACION',[new nodoAST($1,null),new nodoAST($2,null)])]; } /* edad-- */
	| VARIABLE IGUAL expresion 		{ $$ = [new Asignar($1, $3[0], @1.first_line, @1.first_column), new nodoAST('ACTUALIZACION',[new nodoAST($1,null),new nodoAST($2,null),$3[1]])]; } /*identificador = <EXPRESION>;*/
;
/*--------------------------------------  5.22 Función Print  ----------------------------------*/
instruccionprint /* valores únicamente de tipo entero, doble, booleano, cadena y carácter. */
    :PRINT PARIZQ expresion PARDER PTCOMA   	{  $$ = [new INSprint($3[0], @1.first_line, @1.first_column, false),new nodoAST('PRINT',[new nodoAST($1,null),new nodoAST($2,null),$3[1],new nodoAST($4,null)])];   }/* Print  (  <EXPRESION>  );*/
;
/*--------------------------------------  5.23 Función Println  ----------------------------------*/
instruccionprintln/*entero,doble, booleano, cadena y carácter.*/
    :PRINTLN PARIZQ expresion PARDER PTCOMA    { $$ = [new INSprint($3[0], @1.first_line, @1.first_column, true),new nodoAST('PRINT',[new nodoAST($1,null),new nodoAST($2,null),$3[1],new nodoAST($4,null)])]; }/* Println  (  <EXPRESION>  );*/
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
	: RETURN expresion       	{ $$ = [new INSreturn($2[0],@1.first_line, @1.first_column)  , new nodoAST('RETURN',[new nodoAST($1,null),$2[1]])]; }
    | RETURN                 	{ $$ = [new INSreturn(null,@1.first_line, @1.first_column), new nodoAST('RETURN',new nodoAST($1,null))]; }
;
/* -------------------------- DECLARACION ASIGNACION VARIABLES ------------------------------ */
declaracion
	: tipo VARIABLE PTCOMA																				{ $$ = [new Declarar($1[0], $2, null,  @1.first_line, @1.first_column), new nodoAST('DECLARACION',[$1[1], new nodoAST($2,null), new nodoAST($3,null),])] ; } /*<TIPO> identificador;*/
	| tipo VARIABLE IGUAL expresion PTCOMA																{ $$ = [new Declarar($1[0], $2, $4[0],  @1.first_line, @1.first_column)  , new nodoAST('DECLARACION',[$1[1], new nodoAST($2,null), new nodoAST($3,null), $4[1], new nodoAST($5,null),])] ;} /*TIPO> identificador = <EXPRESION>;*/
	| tipo notacioncomas PTCOMA																			{ $$ = [new Declarar($1[0], $2[0], null,  @1.first_line, @1.first_column), new nodoAST('DECLARACION',[$1[1], $2[1], new nodoAST($3,null),])] ; } /*<TIPO> id1, id2, id3, id4;*/
	| tipo notacioncomas IGUAL expresion PTCOMA 														{ $$ = [new Declarar($1[0], $2[0], $4[0],  @1.first_line, @1.first_column)  , new nodoAST('DECLARACION',[$1[1], $2[1], new nodoAST($3,null), $4[1], new nodoAST($5,null),])] ; } /*<TIPO> id1, id2, id3, id4 = <EXPRESION>;*/
	
	
	| tipo VARIABLE CORIZQ CORDER IGUAL NEW tipo CORIZQ expresion CORDER PTCOMA							{ $$ = [new DeclaraVector1($1[0], $2, $7[0], $9[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1], new nodoAST($2,null), new nodoAST($3,null), new nodoAST($4,null), new nodoAST($5,null), new nodoAST($6,null), $7[1], new nodoAST($8,null), $9[1], new nodoAST($10,null), new nodoAST($11,null)])]; } /*<TIPO> <ID>[ ] = new <TIPO>[ <EXPRESION> 3.2 ] ;						 DECLARACION TIPO 1 */
	| tipo VARIABLE CORIZQ CORDER IGUAL CORIZQ listavalores CORDER PTCOMA								{ $$ = [new DeclaraVector1($1[0], $2, null, $7[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1], new nodoAST($2,null), new nodoAST($3,null), new nodoAST($4,null), new nodoAST($5,null), new nodoAST($6,null), $7[1], new nodoAST($8,null), new nodoAST($9,null)])]; }  /*<TIPO> <ID>[ ] = [ <LISTAVALORES> ] ;							 DECLARACION TIPO 2 */
	| tipo VARIABLE CORIZQ CORDER IGUAL expresion PTCOMA								{ $$ = [new DeclaraVector1($1[0], $2, $1[0], $6[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1], new nodoAST($2,null), new nodoAST($3,null), new nodoAST($4,null), new nodoAST($5,null),  $6[1], new nodoAST($7,null)])]; }  /*<TIPO> <ID>[ ] = [ <LISTAVALORES> ] ;							 DECLARACION TIPO 2 */
	
	| tipo VARIABLE CORIZQ CORDER IGUAL NEW tipo CORIZQ expresion CORDER CORIZQ expresion CORDER PTCOMA	{  } /*<TIPO> <ID>[ ][ ]= new <TIPO>[ <EXPRESION> ][ <EXPRESION> ] ;*/
	// | tipo VARIABLE IGUAL VARIABLE CORIZQ expresion CORDER PTCOMA										{  } /*<TIPO> <ID>[ ] = new <TIPO>[ <EXPRESION> ] ;	 */
	// | tipo VARIABLE IGUAL VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER PTCOMA				{  } /*<TIPO> <ID>[ ][ ]= new <TIPO>[ <EXPRESION> ][ <EXPRESION> ] ;*/
	
	
	| notacioncomas IGUAL expresion PTCOMA																{ $$ = [new Asignar($1[0], $3[0], @1.first_line, @1.first_column),new nodoAST('DECLARACION',[$1[1], new nodoAST($2,null), $3[1], new nodoAST($4,null)])];  } /*identificador = <EXPRESION>;*/
	| VARIABLE IGUAL expresion PTCOMA																	{ $$ = [new Asignar($1, $3[0], @1.first_line, @1.first_column),new nodoAST('DECLARACION',[new nodoAST($1,null), new nodoAST($2,null), $3[1] ,new nodoAST($4,null)])];  } /*identificador = <EXPRESION>;*/
			/*5.15.1.3 Modificación de Vectores*/

	| VARIABLE CORIZQ expresion CORDER IGUAL expresion PTCOMA											{ $$ = [new AsignaVector1($1, $3[0], $6[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null), new nodoAST($2,null), $3[1],new nodoAST($4,null), new nodoAST($5,null),  $6[1], new nodoAST($7,null)])]; } /*<ID> [ EXPRESION ] = EXPRESION;						 DECLARACION TIPO 1*/
	| VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER IGUAL expresion PTCOMA					{  } /*<> [ EXPRESION ][ EXPRESION ] = EXPRESION;          DECLARACION TIPO 2 */
;
listavalores
	: listavalores COMA expresion 	{ $$ = [$1[0],new nodoAST('LIST VALORES',[$1[1],new nodoAST($2,null),$3[1]])] ; $1[0].push($3[0]);}/* char vectordosd2 [ ][ ] = [[ 0 ,0],[0 , 0]];*/
	| expresion						{ $$ = [ [$1[0]] , new nodoAST('LIST VALORES',[$1[1]]) ];}
;
notacioncomas
	: notacioncomas COMA VARIABLE  	{ $$=[$1[0], new nodoAST('NOT COMAS',[$1[1],new nodoAST($2,null),new nodoAST($3,null)])] ; $1[0].push($3); }
	| VARIABLE 						{ $$=[[$1], new nodoAST('NOT COMAS',[$1])];  }
;
/* ------------------------------------ EXPRESIONES ------------------------------------ */
expresion																				/*aqui es UNARIA XD*/
	: MENOS expresion %prec UMENOS  						{ $$ = [new INSAritmetico(null, $2[0], 'UNITARIA',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null),$2[1]])]; }
	| NOT expresion      						 			{ $$ = [new INSLogico(null, $2[0], 'NOT', @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null),$2[1]])];}/*constructor(expDer, expIzq, tipo, fila, column){*/
	| expresion MAS expresion      						 	{ $$ = [new INSAritmetico($1[0], $3[0], 'SUMA',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }/*constructor(expDer, expIzq, tipo, fila, column){*/
	| expresion MENOS expresion     					 	{ $$ = [new INSAritmetico($1[0], $3[0], 'RESTA',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
	| expresion MULTIPLICACION expresion       			 	{ $$ = [new INSAritmetico($1[0], $3[0], 'MULTIPLICACION',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
	| expresion DIVISION expresion 						 	{ $$ = [new INSAritmetico($1[0], $3[0], 'DIVISION',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
	| expresion MODULO expresion			             	{ $$ = [new INSAritmetico($1[0], $3[0], 'MODULO',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
    | expresion POTENCIA expresion			             	{ $$ = [new INSAritmetico($1[0], $3[0], 'POTENCIA',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
	| expresion MENORIGUALQ expresion	                    { $$ = [new INSRelacional($1[0], $3[0], 'MENORIGUAL',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
	// | expresion MENORQUE IGUAL expresion	 		        { $$ = [new INSRelacional($1[0], $3[0], 'MENOR',  @1.first_line, @1.first_column)]; }
	| expresion MENORQUE expresion	 		                { $$ = [new INSRelacional($1[0], $3[0], 'MENOR',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
    | expresion MAYORIGUALQ expresion	                    { $$ = [new INSRelacional($1[0], $3[0], 'MAYORIGUAL',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
    // | expresion MAYORQUE IGUAL expresion                 { $$ = [new INSRelacional($1[0], $3[0], 'MAYOR',  @1.first_line, @1.first_column)]; }
    | expresion MAYORQUE expresion                          { $$ = [new INSRelacional($1[0], $3[0], 'MAYOR',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
    // | expresion IGUAL IGUAL expresion	  		        { $$ = [new INSRelacional($1[0], $3[0], 'IGUAL',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
    | expresion IGUALA expresion	  		                { $$ = [new INSRelacional($1[0], $3[0], 'IGUAL',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
    | expresion DIFERENTE expresion	   	                	{ $$ = [new INSRelacional($1[0], $3[0], 'NEGACION',  @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
    // | expresion NOT IGUAL expresion	   	                { $$ = [new INSRelacional($1, $3, 'NEGACION',  @1.first_line, @1.first_column)]; }
    | expresion OR expresion	  			                { $$ = [new INSLogico($1[0], $3[0], 'OR', @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
    | expresion AND expresion			                	{ $$ = [new INSLogico($1[0], $3[0], 'AND', @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1]])]; }
	| PARIZQ tipo PARDER expresion								{ $$ = [new INSCastear($2[0], $4[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null),$2[1],new nodoAST($3,null),$4[1]])]; } /* (int) 18.6*//*(<TIPO>) <EXPRESION>*/
	| VARIABLE INC  									{ $$ = [new INSincredecre($1, "INCREMENT", @1.first_line, @1.first_column), new nodoAST('EXPRESION',[new nodoAST($1,null),new nodoAST($2,null)])]; } /* anio++*/
	| VARIABLE DEC  									{ $$ = [new INSincredecre($1, "DECREMENT", @1.first_line, @1.first_column), new nodoAST('EXPRESION',[new nodoAST($1,null),new nodoAST($2,null)])]; } /* anio++*/
	| VARIABLE                      						{ $$ = [new id($1, @1.first_line, @1.first_column), new nodoAST('EXPRESION', new nodoAST($1,null))]; }
	| VENTERO                      							{ $$ = [new INSPrimitivos(Tipo.INT, Number($1), @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST('ENTERO', [new nodoAST(yytext,null)])])]; }
	| VDOUBLE                       						{ $$ = [new INSPrimitivos(Tipo.DOUBLE, Number($1), @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST('DOUBLE', [new nodoAST(yytext,null)])])]; }
	| CADENA												{ $$ = [new INSPrimitivos(Tipo.STRING, $1, @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST('CADENA', [new nodoAST(yytext,null)])])]; }
	| VCARACTER		 										{ $$ = [new INSPrimitivos(Tipo.CARACTER, $1, @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST('CARACTER', [new nodoAST(yytext,null)])])]; }
	| TRUE                       							{ $$ = [new INSPrimitivos(Tipo.BOOLEAN, true, @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST('BOOLEANO', [new nodoAST($1,null)])])]; }
	| FALSE                       							{ $$ = [new INSPrimitivos(Tipo.BOOLEAN, false, @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST('BOOLEANO', [new nodoAST($1,null)])])]; }
	| PARIZQ expresion PARDER       						{ $$ = [$2[0],new nodoAST('EXPRESION', [new nodoAST($1,null),$2[1], new nodoAST($3,null)])]; }
	// | VARIABLE MAS MAS 										{  } /* anio-- */
	// | VARIABLE MENOS MENOS 									{  } /* edad-- */
	| VARIABLE CORIZQ expresion CORDER							{ $$ = [new Vector1($1, $3[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [$1[1],new nodoAST($2,null),$3[1],new nodoAST($4,null)])]; } /* vector2[0];*/
	| VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER 	{  } /* vectorDosd[0][0];*/
	// | VARIABLE MAS MAS 										{  } /* vectorDosd[0][0]*/
	| expresion INTERROGA expresion DOSPUNTOS expresion 	{  $$ = [new INSTernario($1[0], $3[0], $5[0], @1.first_line, @1.first_column),new nodoAST('EXPRESION', [$1[1], new nodoAST($2,null), $3[1], new nodoAST($4,null), $5[1]])]; } /*Ternarios*/

	| TOLOWER PARIZQ expresion PARDER  						{ $$ = [new ToLower($3[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null)])];  } /* toLower  (  <EXPRESION>  );*/       
    | TOUPPER PARIZQ expresion PARDER  						{ $$ = [new ToUpper($3[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null)])]; } /* toUpper  (  <EXPRESION>  );*/      
    | ROUND PARIZQ VDOUBLE PARDER    						{ $$ = [new FUNCround($3[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null)])]; } /* round  (  )  ;     */
    | TYPEOF PARIZQ expresion PARDER   						{ $$ = [new TypeOf($3[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null)])]; }
    | TOSTRING PARIZQ expresion PARDER 						{ $$ = [new ToString($3[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null)])]; }
	| LENGTH PARIZQ expresion PARDER   						{ $$ = [new FUNClength($3[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null)])]; } /* length  ( <VALOR>  )  ;*/
	// | TYPEOF PARIZQ expresion PARDER   						{ $$ = [new T($3[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null), new nodoAST($2,null), $3[1] new nodoAST($4,null)])]; }/* typeof  ( <VALOR>  )  ;*/
	// | TOSTRING PARIZQ expresion PARDER   					{ $$ = [new ToLower($3[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null), new nodoAST($2,null), $3[1] new nodoAST($4,null)])]; }/* toString  ( <VALOR>  )  ;*/
	| TOCHARARRAY PARIZQ expresion PARDER   				{ $$ = [new ToCharArray($3[0], @1.first_line, @1.first_column), new nodoAST('EXPRESION', [new nodoAST($1,null), new nodoAST($2,null), $3[1], new nodoAST($4,null)])]; }/* toCharArray  ( <VALOR>  )  ;*/
    | llamadas                           					{ $$= [$1[0], new nodoAST('EXPRESION', [$1[1]])]; } /*5.25. Funciones nativas*/
;

listavalores
	: listavalores COMA expresion 	{ $$ = [$1[0],new nodoAST('LIST VALORES',[$1[1],new nodoAST($2,null),$2[1]])] ; $1[0].push($3[0]);}/* char vectordosd2 [ ][ ] = [[ 0 ,0],[0 , 0]];*/
	| expresion						{ $$ = [ [$1[0]] , new nodoAST('LIST VALORES',[$1[1]]) ];}
;
/* ------------------------------------    TIPOS    ------------------------------------ */
tipo
	:ENTERO       	{ $$ = [Tipo.INT, new nodoAST($1,null)]; }
	|DOUBLE       	{ $$ = [Tipo.DOUBLE, new nodoAST($1,null)]; }
	|BOOLEANO     	{ $$ = [Tipo.BOOLEAN, new nodoAST($1,null)]; }
	|CARACTER    	{ $$ = [Tipo.CARACTER, new nodoAST($1,null)]; }
	|STRING        	{ $$ = [Tipo.STRING, new nodoAST($1,null)]; }
	|VOID           { $$ = [Tipo.VOID, new nodoAST($1,null)]; }
;









