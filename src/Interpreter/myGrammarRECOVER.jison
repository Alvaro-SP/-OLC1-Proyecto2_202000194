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

.   { }
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
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ GRAMATICA COMENTARIOS▬▬▬▬▬▬▬▬▬▬▬▬▬
 /* ======================Definición de la gramatica==================== */
ini
	: instrucciones EOF		
;

instrucciones
	: instrucciones instruccion 		
	| instruccion					
;
/* ================================================================*/
/* ===================		INSTRUCCIONES      ===================*/
/* ================================================================*/
instruccion
	: declaracion					
	| funciones						
	| metodos						
	| call						
	| instruccionswitch					
	| instruccionif					
	| instruccionwhile				
	| instruccionfor				
	| instrucciondowhile			
	| instruccionprint		
	| instruccionprintln		
	| VARIABLE INC PTCOMA 		
	// | VARIABLE MAS MAS PTCOMA 		
	| VARIABLE DEC PTCOMA 	
	// | VARIABLE MENOS MENOS PTCOMA 	
	| CONTINUE PTCOMA              	
    | BREAK PTCOMA                 	
	| returns PTCOMA      			
    // | instruccionrun PTCOMA         
    | RUN call
	/*| incredecre	{  }  5.14 Incremento y Decremento*/
;
/* ================================================================*/
/* ===================	FIN  INSTRUCCIONES      ===================*/
/* ================================================================*/


/*--------------------------------------5.17 SenTencias cíclicas----------------------------------*/
 

/*--------------------------------------  5.19 Funciones  ----------------------------------*/
funciones
    : VARIABLE PARIZQ parametros PARDER DOSPUNTOS tipo LLAIZQ instrucciones LLADER 
    | VARIABLE PARIZQ PARDER DOSPUNTOS tipo LLAIZQ instrucciones LLADER            
;


/*--------------------------------------  5.20 Meodos  ----------------------------------*/
metodos
    : VARIABLE PARIZQ parametros PARDER DOSPUNTOS VOID LLAIZQ instrucciones LLADER 
    | VARIABLE PARIZQ parametros PARDER LLAIZQ instrucciones LLADER				   
    | VARIABLE PARIZQ PARDER DOSPUNTOS VOID LLAIZQ instrucciones LLADER 		   
    | VARIABLE PARIZQ PARDER LLAIZQ instrucciones LLADER 						   
;
/*--------------------------------------  5.21 Llamadas  ----------------------------------*/
call
	:llamadas PTCOMA
;

llamadas
    :VARIABLE PARIZQ paramllamada PARDER    
    |VARIABLE PARIZQ PARDER                 
;
/*LLAMADA -> [<ID>] ( [<PARAMETROS_LLAMADA>] )
| [<ID>] ( )*/

paramllamada
    :paramllamada COMA expresion      	
    |expresion                        	
;
parametros
    :parametros COMA tipo VARIABLE  
    |tipo VARIABLE                           
;

/* ------------------------------------    IF    ------------------------------------ */
instruccionif
    :IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER 														
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE LLAIZQ instrucciones LLADER
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE instruccionif 												
	|IF PARIZQ expresion PARDER LLAIZQ LLADER 																		
;

/* ------------------------------------  SWITCH  ------------------------------------ */
instruccionswitch
    :SWITCH PARIZQ expresion PARDER LLAIZQ instruccioncaselist instrucciondefault LLADER  
    |SWITCH PARIZQ expresion PARDER LLAIZQ instruccioncaselist LLADER          
    |SWITCH PARIZQ expresion PARDER LLAIZQ instrucciondefault LLADER          	

;

/* ------------------------------------  caselist  ------------------------------------ */
instruccioncaselist
    :instruccioncaselist CASE expresion DOSPUNTOS instrucciones    
    |CASE expresion DOSPUNTOS instrucciones             
;
/* ------------------------------------  DEFAULT  ------------------------------------ */
instrucciondefault
    :DEFAULT DOSPUNTOS instrucciones  {  }
;

 /*5.17.1. While  while   (  <EXPRESION>   )   {  <INSTRUCCIONES>  } */
instruccionwhile
    :WHILE PARIZQ expresion PARDER LLAIZQ instrucciones LLADER 		
;

/*5.17.3. Do-While*/
instrucciondowhile
    :DO LLAIZQ instrucciones LLADER WHILE PARIZQ expresion PARDER PTCOMA  
;


/*5.17.2. For*/
instruccionfor
    :FOR PARIZQ fordeclarar PTCOMA expresion PTCOMA actualizacion PARDER LLAIZQ instrucciones LLADER  
;
fordeclarar
    : tipo VARIABLE IGUAL expresion 
	| VARIABLE IGUAL expresion 		
;
actualizacion
    : VARIABLE INC 			
	| VARIABLE DEC 			
	// | VARIABLE MENOS MENOS 			
	| VARIABLE IGUAL expresion 		
;

/*--------------------------------------  5.22 Función Print  ----------------------------------*/
instruccionprint /* valores únicamente de tipo entero,
	doble, booleano, cadena y carácter. */
    :PRINT PARIZQ expresion PARDER PTCOMA   	
;
/*--------------------------------------  5.23 Función Println  ----------------------------------*/
instruccionprintln/*entero,doble, booleano, cadena y carácter.*/
    :PRINTLN PARIZQ expresion PARDER PTCOMA    
;

/*--------------------------------------  RUN  ----------------------------------*/
/*5.26. Run*/
// instruccionrun
//     : RUN VARIABLE PARA PARC 			  		
// 	| RUN VARIABLE PARA listavalores PARC 		
// ;
/* -------------------------------------- RETURN --------------------------------------*/
returns	
	: RETURN expresion       	
    | RETURN                 	
;
/* -------------------------- DECLARACION ASIGNACION VARIABLES ------------------------------ */
declaracion
	: tipo VARIABLE PTCOMA
	| tipo VARIABLE IGUAL expresion PTCOMA																
	| tipo notacioncomas PTCOMA																			 																				
	| tipo notacioncomas IGUAL expresion PTCOMA 														
	| tipo VARIABLE CORIZQ CORDER IGUAL NEW tipo CORIZQ expresion CORDER PTCOMA							
	| tipo VARIABLE CORIZQ CORDER IGUAL NEW tipo CORIZQ expresion CORDER CORIZQ expresion CORDER PTCOMA	
	| tipo VARIABLE CORIZQ CORDER IGUAL CORIZQ listavalores CORDER PTCOMA								
	| tipo VARIABLE IGUAL VARIABLE CORIZQ expresion CORDER PTCOMA										
	| tipo VARIABLE IGUAL VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER PTCOMA				
	| notacioncomas IGUAL expresion PTCOMA																
	| VARIABLE IGUAL expresion PTCOMA																	
			/*5.15.1.3 Modificación de Vectores*/
	| VARIABLE CORIZQ expresion CORDER IGUAL expresion PTCOMA											
	| VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER IGUAL expresion PTCOMA					
;

notacioncomas
	: notacioncomas COMA VARIABLE 
	| VARIABLE
;


/* ------------------------------------ EXPRESIONES ------------------------------------ */
expresion																				/*aqui es UNARIA XD*/
	: MENOS expresion %prec UMENOS  						
	| NOT expresion       						 	
	| expresion MAS expresion      						 	
	| expresion MENOS expresion     					 	
	| expresion MULTIPLICACION expresion       			 	
	| expresion DIVISION expresion 						 	
	| expresion MODULO expresion			             	
    | expresion POTENCIA expresion			             	
	| expresion MENORIGUALQ expresion	                    
	// | expresion MENORQUE IGUAL expresion	 		        
	| expresion MENORQUE expresion	 		                
    | expresion MAYORIGUALQ expresion	                    
    // | expresion MAYORQUE IGUAL expresion                    
    | expresion MAYORQUE expresion                          
    // | expresion IGUAL IGUAL expresion	  		         	
    | expresion IGUALA expresion	  		                
    | expresion DIFERENTE expresion	   	                	
    // | expresion NOT IGUAL expresion	   	                	
    | expresion OR expresion	  			                
    | expresion AND expresion			                
	| PARA tipo PARC expresion								
	| VARIABLE                      							
	| VENTERO                      							
	| VDOUBLE                       						
	| CADENA												
	| VCARACTER		 										
	| TRUE                       							
	| FALSE                       							
	| PARIZQ expresion PARDER       						
	// | VARIABLE MAS MAS 										
	// | VARIABLE MENOS MENOS 									
	| VARIABLE CORIZQ expresion CORDER						
	| VARIABLE CORIZQ expresion CORDER CORIZQ expresion CORDER 
	// | VARIABLE MAS MAS 										
	| expresion INTERROGA expresion DOSPUNTOS expresion 
	| TOLOWER PARIZQ expresion PARDER  						
    | TOUPPER PARIZQ expresion PARDER  						
    | ROUND PARIZQ DOUBLE PARDER    						
    | TYPEOF PARIZQ expresion PARDER   						
    | TOSTRING PARIZQ expresion PARDER 						
	| LENGTH PARIZQ expresion PARDER   							
	| TYPEOF PARIZQ expresion PARDER   							
	| TOSTRING PARIZQ expresion PARDER   						
	| TOCHARARRAY PARIZQ expresion PARDER   					
    | llamadas                           						
;
// listavalores
//     : listavalores COMA expresion 		 		
// 	| expresion 					 			
// ;
listavalores
	: listavalores COMA expresion 
	| expresion
;
/* ------------------------------------    TIPOS    ------------------------------------ */
tipo
	:ENTERO       
	|DOUBLE       
	|BOOLEANO     
	|CARACTER    	
	|STRING        
	|VOID          
;