/*import Web3 from "web3";
import NanoCelulosa from "../../build/contracts/nanocelulosa.json";
import HDwalletProvider from '@truffle/hdwallet-provider';
//import fs  from 'fs';

var url = "http://127.0.0.1:8545/";
const url2 = "https://rpc-mumbai.maticvigil.com/";
const url_rinkeby ='https://rinkeby.infura.io/v3/e4edca9c5b3143b4915068824bbe3cac';
const network = "rinkeby";
const privateKey = "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";
const mnemonic ="pair alley ancient outdoor vault sponsor mechanic empty faith faint eagle news";
var myAddress = "";
if (network == "rinkeby"){
  myAddress = "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73";
}
else {
 myAddress = "0xe94a2b97c1b8c2eed542575d923913f7a1d667a5";
}
//var provider = new HDwalletProvider(privateKey,url2);
var provider = new HDwalletProvider(mnemonic,url_rinkeby);
var web3 = new Web3(provider);
//var contrato_address = "0xCED8799bABa8dD4CB06AD6933521eB2E7d74FC59";
//var contrato_address = "0xA6a50ec1cbC8e2a1f0AC006814A0427eE34CdaA4"; rinkeby
var contrato_address = "0x3A80CAdE96cdD372512B7C97762754b16D8b7D66";

var contrato = new web3.eth.Contract(NanoCelulosa.abi, contrato_address);*/
//*******************************************************************************************************************************
// DIVs
var divGeneral = document.getElementById('div_general');
var divPasta = document.getElementById('div_pasta');
var divMecanico = document.getElementById('div_mecanico');
var divEnzimatico = document.getElementById('div_enzimatico');
var divQuimico = document.getElementById('div_quimico');
var divHomo = document.getElementById('div_homo');
var divSecado = document.getElementById('div_secado');
var divNano = document.getElementById('div_final');
var divDoble = document.getElementById('doble');
var divRefino = document.getElementById('refino');

// BOTONES
var btPasta = document.getElementById('btPasta');
var btPreMecanico = document.getElementById('btPreMecanico');
var btPreEnzima = document.getElementById('btPreEnzima');
var btPreEnzima2 = document.getElementById('btPreEnzima2');
var btPreQuimico = document.getElementById('btPreQuimico');
var btHomo = document.getElementById('btHomo');
var btPasos = document.getElementById('btPasos');
var btSecado = document.getElementById('btSecado');
var btNanocelulosa = document.getElementById('btNanocelulosa');

// SELECTOR general
var seleGeneral = document.getElementById('general');
// Selector Simultaneidad
var seleSim = document.getElementById('sim_mec');
// Selector duplicidad enzimatico
var seleDoble = document.getElementById('sel_doble');
// Selector de tipo Mecanico
var select_tipo = document.getElementById('tipo_pre');

seleGeneral.addEventListener('change',  async () => {
var etapa = document.getElementById('general').value;
if(etapa =="1"){
  divPasta.style.display = "block";
  divMecanico.style.display = "none";
  divEnzimatico.style.display = "none";
  divQuimico.style.display = "none";
  divHomo.style.display = "none";
  divSecado.style.display = "none";
  divNano.style.display = "none";
}
else if(etapa =="2"){
  divMecanico.style.display = "block";
  divQuimico.style.display = "none";
  divHomo.style.display = "none";
  divSecado.style.display = "none";
  divNano.style.display = "none";
  divPasta.style.display = "none";
  seleSim.addEventListener('change',  async () => {
  if(seleSim.value == "No") {
    divEnzimatico.style.display = "none";
  }
  else {
    divEnzimatico.style.display = "block";
    seleDoble.addEventListener('change', async () => {
      if (seleDoble.value == "No"){
        divDoble.style.display = "none"
      }
      else{
        divDoble.style.display = "block"
      }
    }); // end seleDoble
    }
  }); // end seleSim
  select_tipo.addEventListener('change', async () => {
    if(select_tipo.value == "Refinador") {
      divRefino.style.display = "block";
    }
    else {
      divRefino.style.display = "none";
    }

  });
}
else if(etapa =="3"){
  divEnzimatico.style.display = "block";
  divQuimico.style.display = "none";
  divHomo.style.display = "none";
  divSecado.style.display = "none";
  divNano.style.display = "none";
  divPasta.style.display = "none";
  divMecanico.style.display = "none";
  seleDoble.addEventListener('change', async () => {
    if (seleDoble.value == "No"){
      divDoble.style.display = "none"
    }
    else{
      divDoble.style.display = "block"
    }
  });
}

else if(etapa =="4"){
  divQuimico.style.display = "block";
  divHomo.style.display = "none";
  divSecado.style.display = "none";
  divNano.style.display = "none";
  divPasta.style.display = "none";
  divMecanico.style.display = "none";
  divEnzimatico.style.display = "none";
}
else if(etapa =="5"){
  divHomo.style.display = "block";
  divPasta.style.display = "none";
  divMecanico.style.display = "none";
  divEnzimatico.style.display = "none";
  divQuimico.style.display = "none";
  divSecado.style.display = "none";
  divNano.style.display = "none";
}
else if(etapa =="6"){
  divSecado.style.display = "block";
  divPasta.style.display = "none";
  divMecanico.style.display = "none";
  divEnzimatico.style.display = "none";
  divQuimico.style.display = "none";
  divHomo.style.display = "none";
  divNano.style.display = "none";
}
else if(etapa =="7"){
  divNano.style.display = "block";
  divPasta.style.display = "none";
  divMecanico.style.display = "none";
  divEnzimatico.style.display = "none";
  divQuimico.style.display = "none";
  divHomo.style.display = "none";
  divSecado.style.display = "none";
}
else if(etapa =="0"){
  divPasta.style.display = "none";
  divMecanico.style.display = "none";
  divEnzimatico.style.display = "none";
  divQuimico.style.display = "none";
  divHomo.style.display = "none";
  divSecado.style.display = "none";
  divNano.style.display = "none";
}
}); // addEventListener SelectorGeneral

/// FUNCIONALIDAD DE LOS BOTONES PARA REGISTRAR CADA UNA DE LAS ETAPAS DEL PROCESO
btPasta.addEventListener('click', async () => {
  var codigo = document.getElementById('codigo1').value;
  if (codigo == ""){
    alert("Rellena el campo codigo");
  }
  else {
    var origen = document.getElementById('origen').value;
    var cantidad = document.getElementById('cantidad').value;
    var celulosa = document.getElementById('celulosa').value;
    var hemi = document.getElementById('hemicelulosa').value;
    var lignina = document.getElementById('lignina').value;
    var text = "Origen: " + origen + "\nConsistencia (%): " + cantidad + "\nCelulosa (%): " + celulosa + "\nHemicelulosa (%): " + hemi + "\nLignina (%): " + lignina;
    var confirmacion = confirm(text);
    if(confirmacion){
      var tx = await contrato.methods.registrarPastaCelulosa(codigo,origen,cantidad,celulosa,hemi,lignina).send({from:myAddress, gasprice: "10000", gas: 250000});
      await contrato.methods.guardarTransaccion(tx.transactionHash,codigo,"f1").send({from:myAddress, gasprice: "10000", gas: 250000});
    }
  }
});

btPreMecanico.addEventListener('click', async () => {
  var codigo = document.getElementById('codigo2').value;
  var tiempo = document.getElementById('tiempo2').value;
  var ciclos = document.getElementById('ciclos2').value
  if (codigo == ""){
    alert("Rellena el campo codigo");
  }
  else {
    var tipo = document.getElementById('tipo_pre').value;

    var disco = "";
    if(tipo == "Refinador"){
      disco = document.getElementById('tipo_discos').value;
      var text = "Pretratamiento mecanico: " + tipo + "\nTiempo: " + tiempo + "\nCiclos: " + ciclos + "\nTipo de disco: " + disco;
      var codigo_fase =  "ME-R";
    }
    else{
      var codigo_fase = "ME-C";
      var text = "Pretratamiento mecanico: " + tipo + "\nTiempo: " + tiempo + "\nCiclos: " + ciclos;
    }
    var confirmacion = confirm(text);
    if(confirmacion){
      var tx = await contrato.methods.registrarPreMecanico(codigo,tipo, tiempo,ciclos,disco).send({from:myAddress, gasprice: "10000", gas: 250000});
      await contrato.methods.guardarTransaccion(tx.transactionHash,codigo,"f2").send({from:myAddress, gasprice: "10000", gas: 250000});
    }
    else {
      alert("Revisa la información");
    }
  }

});

btPreEnzima.addEventListener('click', async () => {
    var codigo = document.getElementById('codigo3').value;
    if (codigo == ""){
      alert("Rellena el campo codigo");
    }
    else {
      var enzima = document.getElementById('enzima').value;
      var cantidad_enz = document.getElementById('cant_enz').value;
      var tiempo_reaccion = document.getElementById('tiempo3').value;
      var temperatura = document.getElementById('temp3').value;
      var codigo_fase = "HE";
      var text = "Enzima: " + enzima + "\nCantidad enzima: " + cantidad_enz + "\nTiempo: " + tiempo_reaccion + "\nTemperatura: " + temperatura;
      var confirmacion = confirm(text);
        if(confirmacion){
          var tx = await contrato.methods.registrarPreEnzimatico(codigo,enzima,cantidad_enz, tiempo_reaccion, temperatura,"enz1").send({from:myAddress, gasprice: "10000", gas: 250000});
          await contrato.methods.guardarTransaccion(tx.transactionHash,codigo, "f31").send({from:myAddress, gasprice: "10000", gas: 250000});
        }
        else {
          alert("Comprueba la información");
        }
  }// Else codigo vacio
});

btPreEnzima2.addEventListener('click', async () => {
    var codigo = document.getElementById('codigo32').value;
    if (codigo == ""){
      alert("Rellena el campo codigo");
    }
    else {
      var enzima = document.getElementById('enzima2').value;
      var cantidad_enz = document.getElementById('cant_enz2').value;
      var tiempo_reaccion = document.getElementById('tiempo32').value;
      var temperatura = document.getElementById('temp32').value;
      var codigo_fase = "HE";
      var text = "Enzima: " + enzima + "\nCantidad enzima: " + cantidad_enz + "\nTiempo: " + tiempo_reaccion + "\nTemperatura: " + temperatura;
      var confirmacion = confirm(text);
        if(confirmacion){
          var tx = await contrato.methods.registrarPreEnzimatico(codigo,enzima,cantidad_enz, tiempo_reaccion, temperatura,"enz2").send({from:myAddress, gasprice: "10000", gas: 250000});
          await contrato.methods.guardarTransaccion(tx.transactionHash,codigo, "f32").send({from:myAddress, gasprice: "10000", gas: 250000});
        }
        else {
          alert("Comprueba la información");
        }
  }// Else codigo vacio
}); // end bt Enzimatico2

btPreQuimico.addEventListener('click', async () => {
  var codigo = document.getElementById('codigo4').value;
  if (codigo == ""){
    alert("Rellena el campo codigo");
  }
  else {
  var tempo = document.getElementById('cant_tempo').value;
  var bromuro = document.getElementById('cant_bro').value;
  var cloruro = document.getElementById('cant_clo').value;
  var sosa = document.getElementById('cant_sosa').value;
  var ph = document.getElementById('ph_ant4').value;
  var tiempo = document.getElementById('tiempo4').value;
  var codigo_fase = "OT";
  var carboxilico = document.getElementById('carboxi').value;
  var text = "Tempo: " + tempo + "\n Bromuro: " + bromuro + "\n Cloruro: " + cloruro + "\n Sosa: " + sosa +"\n pH: " + ph + "\n Tiempo: " + tiempo + "\n Carboxilico: " + carboxilico;
  var confirmacion = confirm(text);
  if(confirmacion){
      var tx = await contrato.methods.registrarPreQuimico(codigo, tempo,bromuro,cloruro,sosa,ph,tiempo, carboxilico).send({from:myAddress, gasprice: "10000", gas: 250000});
      await contrato.methods.guardarTransaccion(tx.transactionHash,codigo,"f4").send({from:myAddress, gasprice: "10000", gas: 250000});
  } // if confirmacion
  else {
      alert("Comprueba la información");
  } // else confirmacion
  } // else codigo vacio
});

btHomo.addEventListener('click', async () => {
  var codigo = document.getElementById('codigo5').value;
  if (codigo == ""){
    alert("Rellena el campo codigo");
  }
  else {
  var presion = document.getElementById('presion');
  var pasos = document.getElementById('pasos5').value;
  var presiones = [];
  for (let i = 0; i<pasos; i++){
    var iden = "p" + i;
    var p = parseInt(document.getElementById(iden).value);
    presiones.push(p);
  }
  var codigo_fase = "HPH P"+pasos;
  var confirmacion = confirm("Confirma el número de pasos y la presión a registrar");
  if(confirmacion){
    var tx = await contrato.methods.registrarHomogenizacion(codigo,pasos,presiones).send({from:myAddress, gasprice: "10000", gas: 250000});
    await contrato.methods.guardarTransaccion(tx.transactionHash,codigo,"f5").send({from:myAddress, gasprice: "10000", gas: 250000});
  }
  else {
    alert("comprueba la informacion");
  }

}
});

btPasos.addEventListener('click', async () => {
  alert("Si te equivocas en el número de pasos a introducir, recarga la página");
var pasos = parseInt(document.getElementById('pasos5').value);
var presion = document.getElementById('presion');
for (let i = 0; i<pasos; i++){
  const entrada = document.createElement('input');
  var iden = "p" + i;
  entrada.setAttribute('id',iden);
  entrada.setAttribute('size','3');
  entrada.setAttribute('class',"w3-input w3-border w3-col m1");
  presion.appendChild(entrada);
}
});

btSecado.addEventListener('click', async () => {
    var codigo = document.getElementById('codigo6').value;
    if (codigo == ""){
      alert("Rellena el campo codigo");
    }
    else {
    var vel_bomba = document.getElementById('v_bomba').value;
    var temp_in = document.getElementById('temp_in').value;
    var temp_out = document.getElementById('temp_out').value;
    var presion = document.getElementById('pre6').value;
    var tiempo = document.getElementById('tiempo6').value;
    var text = "Vel. Bomba: " + vel_bomba + "\n Temperatura entrada: " + temp_in + "\n Temperatura salida: " + temp_out + "\n Presión: " + presion + "\n Tiempo: " + tiempo;
    var confirmacion = confirm(text);
    if(confirmacion){
      var tx = await contrato.methods.registrarSecado(codigo,vel_bomba,temp_in,temp_out,presion,tiempo).send({from:myAddress, gasprice: "10000", gas: 250000});
      await contrato.methods.guardarTransaccion(tx.transactionHash,codigo,"f6").send({from:myAddress, gasprice: "10000", gas: 250000});
    }
    else {
      alert("Comprueba la información");
      }
  } // else campo vacio
});

btNanocelulosa.addEventListener('click', async () => {
  var codigo = document.getElementById('codigo7').value;
  if (codigo == ""){
    alert("Rellena el campo codigo");
  }
  else {
  var cantidad = document.getElementById('cantidad_final').value;
  var tam = document.getElementById('tam_final').value;
  var ftir = document.getElementById('grup_final').value;
  var viscosidad = document.getElementById('viscosidad').value;

  var tx = await contrato.methods.registrarNanoCelulosa(codigo,cantidad,tam,ftir,viscosidad).send({from:myAddress, gasprice: "10000", gas: 250000});
  await contrato.methods.guardarTransaccion(tx.transactionHash,codigo,"f7").send({from:myAddress, gasprice: "10000", gas: 250000});
}
});
