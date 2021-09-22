import Web3 from "web3";
import Trazabilidad from "../../build/contracts/trazabilidad.json";

// En este caso, solo se hacen consultas, no es necesario asociar ninguna Wallet ni ninguna Address. Simplemente con conectarse a la red es suficiente.
var url_network='https://rpc-mumbai.maticvigil.com/';
var web3 = new Web3(url_network);

const contract_Address = "0xd6A7c915066E17ba18024c799258C8A286fFBc00";
var contrato = new web3.eth.Contract(Trazabilidad.abi,contract_Address);

var btBuscar = document.getElementById('btBuscar');
var btLIX = document.getElementById('btLIX');
var btCE = document.getElementById('btCE');
//var btTX = document.getElementById('btTX');

btBuscar.addEventListener('click', async () => {

var alta2 = document.getElementById('ALTA2');
var inicial2 = document.getElementById('INICIAL2');
var procesos2 = document.getElementById('PROCESOS2');
var fin2 = document.getElementById('FIN2');
alta2.innerHTML="";
procesos2.innerHTML="";
fin2.innerHTML="";
inicial2.innerHTML="";
var idProducto = document.getElementById('id_product2').value;
var cliente = document.getElementById('id_cli').value;
if(idProducto == '' || cliente == ''){
  alert("Rellene los campos de id producto y cliente");
}

else {

  var transactionHash = await contrato.methods.getDatosTx(parseInt(idProducto),cliente).call();
  var tx1 = await web3.eth.getTransaction(transactionHash[0]);
  var tx2 = await web3.eth.getTransaction(transactionHash[1]);
  var tx3 = await web3.eth.getTransaction(transactionHash[2]);
  var tx4 = await web3.eth.getTransaction(transactionHash[3]);

  var data1 = tx1.input;
  var data2 = tx2.input;
  var data3 = tx3.input;
  var data4 = tx4.input;

  var parametros1 = web3.eth.abi.decodeParameters(['uint256', 'string', 'string', 'string'], data1.substr(10));
  var parametros2 = web3.eth.abi.decodeParameters(['uint256', 'string', 'string', 'string'], data2.substr(10));
  var parametros3 = web3.eth.abi.decodeParameters(['uint256', 'string', 'string', 'string', 'string', 'string', 'string'], data3.substr(10));
  var parametros4 = web3.eth.abi.decodeParameters(['uint256', 'string', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256'], data4.substr(10));

  alta2.innerHTML = " <font size=5> Información de llegada del lote </font> <br> Proveedor: " +  parametros1[1] + "<br> Cantidad: " + parametros1[2] + "<br> Fecha de llegada: " + parametros1[3];
  inicial2.innerHTML = " <font size=5> Información de almacenamiento inicial</font> <br> Cantidad Escoria negra 0-25mm (kg): " +  parametros2[1] + "<br> Cantidad Escoria negra 25-300mm (kg): " + parametros2[2] + "<br> Cantidad Escoria blanca (kg): " + parametros2[3];
  procesos2.innerHTML = " <font size=5> Procesos realizados </font> <br> Molienda: " +  parametros3[1] + "<br> Fecha molienda: " + parametros3[2] + "<br> Cribado: " + parametros3[3]+ "<br> Fecha cribado: " + parametros3[4] + "<br> Lavado: " + parametros3[5] + "<br> Fecha lavado: " + parametros3[6];
  var texto_fin1 =" <font size=5> Producto final </font> <br> Fecha final: " +  parametros4[1] + "<br> Cantidad EN 0-4mm (kg): " + parametros4[2]+ "<br> Cantidad EN 5-10mm (kg): " + parametros4[3] + "<br> Cantidad EN 11-20mm (kg): " + parametros4[4];
  var texto_fin2= "<br> Cantidad EB 0-10mm (kg): " + parametros4[5] + "<br> Cantidad EN 11-20mm (kg): " + parametros4[6];
  fin2.innerHTML = texto_fin1 + texto_fin2;
} //end else
}); // end Buscar


btLIX.addEventListener('click', async () => {
var transactionHash = await contrato.methods.getAnalisisTx("lix").call();
var tx1 = await web3.eth.getTransaction(transactionHash);
var data1 = tx1.input;
var parametros1 = web3.eth.abi.decodeParameters(['string', 'string'], data1.substr(10));
var pLIX = document.getElementById('LIX');
pLIX.innerHTML = "<strong> Último análisis de lixivación: </strong> <br> Fecha: " + parametros1[0] + "<br> Resultado: " + parametros1[1];
}); // end btLIX


btCE.addEventListener('click', async () => {
var transactionHash = await contrato.methods.getAnalisisTx("ce").call();
var tx1 = await web3.eth.getTransaction(transactionHash);
var data1 = tx1.input;
var parametros1 = web3.eth.abi.decodeParameters(['string', 'string'], data1.substr(10));
var pCE = document.getElementById('CE');
pCE.innerHTML = "<strong> Último marcado CE: </strong> <br> Fecha: " + parametros1[0] + "<br> Resultado: " + parametros1[1];
}); // end btCE
