/*import Web3 from "web3";
import NanoCelulosa from "../../build/contracts/nanocelulosa.json";

var url = "http://127.0.0.1:8545/";
const url2 = "https://rpc-mumbai.maticvigil.com/";
const url3 ='https://rinkeby.infura.io/v3/e4edca9c5b3143b4915068824bbe3cac';
var web3 = new Web3(url3);
//var contrato_address = "0x920BeC2BEcba71B34E619bBA1902Bfd44D792483";
var contrato_address = "0x3A80CAdE96cdD372512B7C97762754b16D8b7D66";
var contrato = new web3.eth.Contract(NanoCelulosa.abi, contrato_address);
*/
var btConsultar = document.getElementById('btConsultar');

btConsultar.addEventListener('click', async () => {
  var parrafo = document.getElementById('resultado');
  var anteriores = document.getElementById('anteriores');
  parrafo.innerHTML = "";
  anteriores.innerHTML = "";
  var codigo = document.getElementById('codigo1').value;
  var fase = document.getElementById('fase').value;
  // COMPRUEBO QUE LA ETAPA SELECCIONADA SE HA REALIZADO - EN CASO DE NO HABERSE REALIZADO, SE MUESTRA EL MENSAJE
  var etapas_hechas = await contrato.methods.getEtapas(codigo).call();
  if((fase == "f3" && etapas_hechas[0] ==0) || (fase == "f4" && etapas_hechas[2] ==0) || (fase == "f6" && etapas_hechas[3] ==0)) {
    alert("La fase seleccionada no se ha realizado. Escoge otra fase");
  }
  else {
      // 2 LECTURAS DFIERENTES DE LA FASE 3 (ENZIMATICO) PORQUE PUEDE SER QUE HAYA DOS TRATAMIENTOS ENZIMATICOS DIFERENTES
        // PRIMERO CASO --> SE HAN HECHO LAS DOS VUELTAS DEL ENZIMATICO - LEO LOS DOS
          if(fase == "f3" && etapas_hechas[1] == 1){
            var transactionHash = await contrato.methods.getHashGuardado(codigo,"f31").call();
            var tx = await web3.eth.getTransaction(transactionHash);
            var data = tx.input;
            var pa = web3.eth.abi.decodeParameters(['string', 'string', 'string', 'string', 'string', 'string'], data.substr(10));
            var texto1="<font size=5> Pretratamiento enzimático (1) </font> <br>";
            var texto2 ="Enzima: " + pa[1] + "<br> Cantidad enzima: " + pa[2] + "<br> Tiempo de reacción: " + pa[3] + "<br> Temperatura : " + pa[4];


            var transactionHash2 = await contrato.methods.getHashGuardado(codigo,"f32").call();
            var tx2 = await web3.eth.getTransaction(transactionHash2);
            var data2 = tx2.input;
            var pa2 = web3.eth.abi.decodeParameters(['string', 'string', 'string', 'string', 'string', 'string'], data2.substr(10));
            var texto3=" <br> <font size=5>Pretratamiento enzimático (2) </font> <br>";
            var texto4 ="Enzima: " + pa2[1] + "<br> Cantidad enzima: " + pa2[2] + "<br> Tiempo de reacción: " + pa2[3] + "<br> Temperatura : " + pa2[4];
            parrafo.innerHTML = texto1 + texto2 + texto3 + texto4;
        }

        // SSOLO SE HA HECHO UN TRATAMIENTO ENZIMATICO
        else if(fase == "f3" && etapas_hechas[0] == 1 && etapas_hechas[1] == 0 ) {
            var transactionHash = await contrato.methods.getHashGuardado(codigo,"f31").call();
            var tx = await web3.eth.getTransaction(transactionHash);
            var data = tx.input;
            var pa = web3.eth.abi.decodeParameters(['string', 'string', 'string', 'string', 'string', 'string'], data.substr(10));
            var texto1="<font size=5> Pretratamiento enzimático (1) </font> <br>";
            var texto2 ="Enzima: " + pa[1] + "<br> Cantidad enzima: " + pa[2] + "<br> Tiempo de reacción: " + pa[3] + "<br> Temperatura : " + pa[4];
            parrafo.innerHTML = texto1 + texto2;
          }

//COMO NO SE PIDE EL TRATAMIENTO DE NINGUNA DE LAS FASES ENZIMATICAS --> PASO A VER QUE FASE SE HA PEDIDO ( LAS OTRAS FASES SE DEBERIAN HACER SIEMPRE)
      else {
            var transactionHash = await contrato.methods.getHashGuardado(codigo,fase).call();
            if(transactionHash != "VACIO"){
                  var tx = await web3.eth.getTransaction(transactionHash);
                  var data = tx.input;
                      if(fase == "f1"){
                          var pa = web3.eth.abi.decodeParameters(['string', 'string', 'string', 'string', 'string', 'string'], data.substr(10));
                          var texto1="<font size=5> Elección pasta de celulosa </font> <br>";
                          var texto2 ="Origen: " + pa[1] + "<br> Consistencia: " + pa[2]  + " % <br> Celulosa: " + pa[3] + " % <br> Hemicelulosa: " + pa[4] + " % <br> Lignina: " + pa[5] + "%";
                          parrafo.innerHTML = texto1 + texto2;
                        } // fase de elección pasta de celulosa

                     else if(fase == "f2"){
                          var pa = web3.eth.abi.decodeParameters(['string', 'string', 'string', 'string', 'string'], data.substr(10));
                          var texto1="<font size=5> Pretratramiento mecánico </font> <br>";
                          if(pa[1] == "Refinador"){
                              var texto2 ="Tecnica: " + pa[1] + "<br> Tiempo: " + pa[2]  + "<br> Ciclos: " + pa[3] + "<br> Tipo de discos: " + pa[4] ;
                            }
                            else {
                              var texto2 ="Tecnica: " + pa[1] + "<br> Tiempo: " + pa[2]  + "<br> Ciclos: " + pa[3];
                            }

                         parrafo.innerHTML = texto1 + texto2;
                       } // fase de pretratamiento mecanico

                    else if(fase == "f4"){
                        var pa = web3.eth.abi.decodeParameters(['string',  'string', 'string', 'string', 'string', 'string', 'string', 'string'], data.substr(10));
                        if(transactionHash != 0){
                            var texto1="<font size=5> Pretratamiento químico </font> <br>";
                            var texto2 ="Cantidad TEMPO: " + pa[2] + "<br> Cantidad Bromudo sódico: " + pa[3] + "<br> Cantidad Hipoclorito sódico: " + pa[4] + "<br> Cantidad Sosa : " + pa[5] + "<br> pH inicial: " + pa[6] + "<br> Tasas de carboxílicos: " + pa[7];
                            parrafo.innerHTML = texto1 + texto2;
                          }
                          else {
                            parrafo.innerHTML = "No se ha realizado pretratamiento químico";
                          }
                        }// fase de pretratramiento quimico

                    else if(fase == "f5"){
                        var pa = web3.eth.abi.decodeParameters(['string', 'string',  'uint256 []'], data.substr(10));
                        var pasos = parseInt(pa[1]);
                        var presiones = pa[2];
                        var texto1="<font size=5> Homogenización </font> <br>";
                        var texto2 ="Número de pasos: " + pa[1];
                        var texto4 = "<br>"
                        for (let i=0; i<pasos; i++) {
                          texto4 += "Presión paso " + (i+1) + ": " + presiones[i] + " bares <br>";
                        }
                        parrafo.innerHTML = texto1 + texto2 +texto4;
                      } // fase de homogenizacion

                   else if(fase == "f6"){
                     var pa = web3.eth.abi.decodeParameters(['string',  'string',  'string', 'string',  'string', 'string'], data.substr(10));
                     if(transactionHash != 0){
                       var texto1="<font size=5> Secado </font> <br>";
                       var texto2 ="Velocidad de la bomba: " + pa[1] + "<br> Temperatura de entrada: " + pa[2] + "<br> Temperatura de salida: " + pa[3] + "<br> Presión de secado: " + pa[4] + "<br> Tiempo de secado: " + pa[5];
                       parrafo.innerHTML = texto1 + texto2;
                     }
                     else{
                       parrafo.innerHTML = "<font size=4> No se ha realizado secado </font>";
                     }
                   } // fase de secado

              // LLEGO A LA FASE-7 --> EN LA QUE TENGO QUE HACER UNA LECTURA DE TODO LO ANTERIOR
                 else {
                   var pa = web3.eth.abi.decodeParameters(['string', 'string', 'string', 'string', 'string'], data.substr(10));
                   var texto1="<font size=5> NANOCELULOSA </font> <br>";
                   var texto2 ="Cantidad obtenida: " + pa[1] + "<br> Tamaño: " + pa[2] + "<br> Análisis FTIR: " + pa[3] + "<br> Viscosidad: " + pa[4];

                   // OBTENER LA INFORMACIÓN DE LAS FASES 1 A 6//
                   var etapas = await contrato.methods.getEtapas(codigo).call();
                   var t3 = "";
                   var t32 = "";
                   var t4 = "";
                   var t6 = "";
                   if (etapas[0] == 1) {
                     var hash_enz = await contrato.methods.getHashGuardado(codigo,"f31").call();
                     var tx_enz = await web3.eth.getTransaction(hash_enz);
                     var data_enz = tx_enz.input;
                     var pa_enz = web3.eth.abi.decodeParameters(['string', 'string', 'string', 'string', 'string', 'string'], data_enz.substr(10));
                     t3  = "<br><br> <font size=4>Pretratamiento enzimático (1) </font> <br>" + "Enzima: " + pa_enz[2] + "<br> Cantidad enzima: " + pa_enz[3] + "<br> Tiempo de reacción: " + pa_enz[4] + "<br> Temperatura : " + pa_enz[5];
                   }

                   if (etapas[1] == 1) {
                     var hash_enz = await contrato.methods.getHashGuardado(codigo,"f32").call();
                     var tx_enz = await web3.eth.getTransaction(hash_enz);
                     var data_enz = tx_enz.input;
                     var pa_enz = web3.eth.abi.decodeParameters(['string', 'string', 'string', 'string', 'string', 'string'], data_enz.substr(10));
                     t32  = "<br><br> <font size=4>Pretratamiento enzimático (2) </font> <br>" + "Enzima: " + pa_enz[2] + "<br> Cantidad enzima: " + pa_enz[3] + "<br> Tiempo de reacción: " + pa_enz[4] + "<br> Temperatura : " + pa_enz[5];
                   }

                   if (etapas[2] == 1) {
                     var hash_qui = await contrato.methods.getHashGuardado(codigo,"f4").call();
                     var tx_qui = await web3.eth.getTransaction(hash_qui);
                     var data_qui = tx_qui.input;
                     var pa_qui = web3.eth.abi.decodeParameters(['string',  'string', 'string', 'string', 'string', 'string', 'string', 'string'], data_qui.substr(10));
                     t4 = " <br><br> <font size=4>Pretratamiento químico </font> <br>" + "Cantidad TEMPO: " + pa_qui[2] + "<br> Cantidad Bromudo sódico: " + pa_qui[3] + "<br> Cantidad Hipoclorito sódico: " + pa_qui[4] + "<br> Cantidad Sosa : " + pa_qui[5] + "<br> pH inicial: " + pa_qui[6] + "<br> Tasas de carboxílicos: " + pa_qui[7];
                   }
                   if (etapas[3] == 1) {
                     var hash_sec = await contrato.methods.getHashGuardado(codigo,"f6").call();
                     var tx_sec = await web3.eth.getTransaction(hash_sec);
                     var data_sec = tx_sec.input;
                     var pa_sec = web3.eth.abi.decodeParameters(['string',  'string',  'string', 'string', 'string'], data_sec.substr(10));
                     t6 = "<br><br> <font size=4> Secado </font> <br>" + "Velocidad de la bomba: " + pa_sec[1] + "<br> Temperatura de entrada: " + pa_sec[2] + "<br> Temperatura de salida: " + pa_sec[3] + "<br> Presión de secado: " + pa_sec[4];
                   }

                   var hash_mec = await contrato.methods.getHashGuardado(codigo,"f2").call();
                   var tx_mec = await web3.eth.getTransaction(hash_mec);
                   var data_mec = tx_mec.input;

                   var hash_ini = await contrato.methods.getHashGuardado(codigo,"f1").call();
                   var tx_ini = await web3.eth.getTransaction(hash_ini);
                   var data_ini = tx_ini.input;

                   var hash_homo = await contrato.methods.getHashGuardado(codigo,"f5").call();
                   var tx_homo = await web3.eth.getTransaction(hash_homo);
                   var data_homo = tx_homo.input;

                   var pa_homo = web3.eth.abi.decodeParameters(['string', 'string','uint256 []'], data_homo.substr(10));
                   var pa_mec = web3.eth.abi.decodeParameters(['string', 'string', 'string'], data_mec.substr(10));
                   var pa_ini = web3.eth.abi.decodeParameters(['string', 'string', 'string', 'string', 'string', 'string'], data_ini.substr(10));

                   var t1 = "<br><font size=4> Pasta de celulosa inicial </font> <br>" + "Origen: " + pa_ini[1] + "<br> Cantidad pasta de celulosa: " + pa_ini[2] + "<br> Celulosa: " + pa_ini[3] + " % <br> Hemicelulosa: " + pa_ini[4] + " % <br> Lignina: " + pa_ini[5] + "% <br>";
                   var t2 = "<br><font size=4> Pretratramiento mecánico </font> <br>" + "Tecnica: " + pa_mec[2];
                   var t5 = "<br><br> <font size=4> Homogenización </font> <br>" + "Número de pasos: " + pa_homo[1];
                   var t5_aux = "<br>"
                   for (let i=0; i<parseInt(pa_homo[1]); i++) {
                     t5_aux += "Presión paso " + (i+1) + ": " + pa_homo[2][i] + " bares <br>";
                   }
                   t5 = t5 + t5_aux;
                   var separacion = "<br><font size=5> PROCESOS REALIZADOS </font> <br> --------------------------------------------------------------------------- ";
                   parrafo.innerHTML = texto1 + texto2;
                   anteriores.innerHTML =separacion + t1 + t2 + t3 + t32 +t4+  t5 + t6;
                 } // producto final
            } // END IF QUE ASEGURA QUE ESTA VACIO PARA ESE CODIGO
            else {
              anteriores.innerHTML = "Para ese código no se ha realizado esa tarea";
            }
}// end else if de comparar
} // end else de que hay alguna que no se ha hecho.
});
