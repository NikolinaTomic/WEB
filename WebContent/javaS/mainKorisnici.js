function iscrtajKor(k){
	
	var tabela = $('#tabK');
	var x=tabela.length;
	for(var i = x - 1; i > 0; i--){
		//alert('a');
		document.getElementById("tabK").deleteRow(i);
	}
	
for(var i=0;i<k.length;i++){
	var red = document.createElement("tr");
	red.style=" border: 2px solid black";
	var sad1=document.createElement("td");
	
	sad1.style=" border: 2px solid green";
	sad1.innerHTML=k[i].ime;
	red.append(sad1);
	
	var sad2=document.createElement("td");
	sad2.innerHTML=k[i].prezime;
	sad2.style=" border: 2px solid green";
	red.append(sad2);

	var sad3=document.createElement("td");
	sad3.innerHTML=k[i].emailAdresa;
	sad3.style=" border: 2px solid green";
	red.append(sad3);
	
	var sad4=document.createElement("td");
	sad4.innerHTML=k[i].kontaktTelefon;
	sad4.style=" border: 2px solid green";
	red.append(sad4);
	
	var sad5=document.createElement("td");
	sad5.innerHTML=k[i].datumRegistracije;
	sad5.style=" border: 2px solid green;";
	red.append(sad5);
	
	var sad6=document.createElement("td");
	sad6.innerHTML=k[i].korisnickoIme;
	sad6.id="ki";
	sad6.style=" border: 2px solid green";
	red.append(sad6);
	
	var sad7=document.createElement("td");
	sad7.innerHTML=k[i].lozinka;
	sad7.style=" border: 2px solid green";
	red.append(sad7);
	
	var sad8=document.createElement("td");
//	sad8.innerHTML=k[i].uloga;
	sad8.style=" border: 2px solid green";
	
	var selecti = document.createElement("select");
	selecti.id="ss";
	var option = document.createElement("option");
	option.text = k[i].uloga;
	selecti.add(option,0);
	selecti.id="s";
	 var j;
	    for(j = selecti.options.length - 1 ; j >= 0 ; j--)
	    {
	        selecti.remove(j);
	    }
	var tipic1;
	var tipic2;

	switch(k[i].uloga)
	
	{
		case "administrator": {tipic1="kupac"; tipic2="dostavljac";} break;
		case "kupac": {tipic1="dostavljac"; tipic2="administrator";} break;
		case "dostavljac": {tipic1="administrator"; tipic2="kupac";} break;

	}
	
	var option2 = document.createElement("option");
	option2.text = tipic1;
	var option3 = document.createElement("option");
	option3.text = tipic2;

	selecti.append(option);
	selecti.append(option2);
	selecti.append(option3);
	sad8.append(selecti);
	selecti.setAttribute("id", "brJ"+k[i].korisnickoIme);
	red.append(sad8);
	//////////////////////////////////
	
	var sad9=document.createElement("td");
	var obrisi2 = document.createElement("INPUT");
	obrisi2.setAttribute("type", "button");
	obrisi2.value="Izmeni";
	obrisi2.className="btn btn-success";
	
	sad9.style=" border: 2px solid green";
	sad9.append(obrisi2);
	obrisi2.setAttribute("onclick", "l('"+k[i].korisnickoIme+"')");
	red.append(sad9);

	tabela.append(red);
}
var dg = document.createElement("tr");

var dg1 = document.createElement("td");
var dg2 = document.createElement("td");
var dg3 = document.createElement("td");
var dg4 = document.createElement("td");
var dg5 = document.createElement("td");
var dg6 = document.createElement("td");
var dg7 = document.createElement("td");


dg.append(dg1);
dg.append(dg2);
dg.append(dg3);
dg.append(dg4);
dg.append(dg5);
dg.append(dg6);
dg.append(dg7);
tabela.append(dg);
}

function l(ime){
	var uloga = document.getElementById("brJ"+ime).value;
	var spoj=ime+"+"+uloga;
	$.ajax({
		url: 'rest/ku/promenaUloge',
		dataType: "json", //tip onog sto saljem
		type: "POST",
		contentType: "text/plain",//content type je sta ti vraca
		data: spoj,
		success: function(data){
			alert('Uspešno izvršena izmena uloge');
		}
	});

}



$(document).ready(function(){
	$.ajax({
		url: 'rest/ku/logo',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		contentType: "application/json",//content type je sta ti vraca
		success: function(data){
			document.getElementById('logA').innerHTML=data.ime+" "+data.prezime;
			document.getElementById('logA').style="text-decoration: underline";
		}
	});
	
	$.ajax({
		url: 'rest/ku/sviKorisnici',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		contentType: "application/json",//content type je sta ti vraca
		success: function(data){
			iscrtajKor(data);
		}
	});

	
	$(document).on('click','#aa',function(e){
		e.preventDefault();
		window.location.href="./artikliAdmin.html";
	});
	$(document).on('click','#vv',function(e){
		e.preventDefault();
		window.location.href="./vozilaAdmin.html";
	});
	$(document).on('click','#rr',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./mainAdmin.html";
	});
	$(document).on('click','#pp',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./mainPor.html";
	});
	

	$(document).on('click','#odjava',function(e){
		e.preventDefault();
		$.ajax({
			url: 'rest/reg/odjava',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			//data: JSON., //sta saljes,samo kad je post..kastujem jer iz xml ide u json
			contentType: "application/json",//content type je sta ti vraca
			success: function(){
				window.location.href="./pocetna.html";
			}
		});
	});
	
	
	
});