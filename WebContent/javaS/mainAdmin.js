function pretraziRest(){
	var naz=document.getElementById("nazz").value;
	var adr=document.getElementById("arr").value;
	var kat=document.getElementById("karr").value;
	
var sve=naz+"+"+adr+"+"+kat;

	$.ajax({
		url: 'rest/ku/preR',
		dataType: "json", //tip onog sto saljem
		type: "POST",
		contentType: "text/plain",//content type je sta ti vraca
		data: sve,
		success: function(data){
			if(data!=null){
				iscrtajRestorane(data);

			}else{
				alert("Cena mora biti broj!");
			}
		}
	});
	
}
function iscrtajRestorane(restorani){
	var sviResDiv = $('#res');
	sviResDiv.empty();
	for(var i=0;i<restorani.length;i++){
		if(restorani[i].izbrisan==false){
		var divZaSvakiRestoran = document.createElement("div");
		var f = document.createElement("form");
		f.id="formaR";
		
		divZaSvakiRestoran.style=" border: 2px dotted black; background-color: #35ca57; border: 2px dotted black; width: 255px; float: left; height:180px; margin-right:20px; margin-bottom:20px;";
		var tabelaArtikala=document.createElement("table");
		var red=document.createElement("tr");
		var pog1=document.createElement("th");
		pog1.innerHTML="Naziv:  ";
		var sad1=document.createElement("td");
		sad1.innerHTML=restorani[i].naziv;		
		red.append(pog1);
		red.append(sad1);
		
		var red2=document.createElement("tr");
		var pog2=document.createElement("th");
		pog2.innerHTML="Adresa:  ";
		var sad2=document.createElement("td");
		sad2.innerHTML=restorani[i].adresa;
		red2.append(pog2);
		red2.append(sad2);
		
		var red3=document.createElement("tr");
		var pog3=document.createElement("th");
		pog3.innerHTML="Kategorija:  ";
		var sad3=document.createElement("td");
		sad3.innerHTML=restorani[i].kategorija;
		red3.append(pog3);
		red3.append(sad3);
		
		var red4=document.createElement("tr");
		var pog4=document.createElement("th");
		var sad4=document.createElement("td");
		var prikazi = document.createElement("INPUT");
		prikazi.setAttribute("type", "button");
		prikazi.value="Prikaži";
		prikazi.className="btn btn-success";

		pog4.append(prikazi);
		red4.append(pog4);
		red4.append(sad4);
		prikazi.setAttribute("onclick", "prikaziR('"+restorani[i].naziv+"')");

		var red5=document.createElement("tr");
		var pog5=document.createElement("th");
		var sad5=document.createElement("td");
		var izmeni = document.createElement("INPUT");
		izmeni.setAttribute("type", "button");
		izmeni.value="Izmeni";
		izmeni.className="btn btn-success";
		izmeni.setAttribute("onclick", "izmeniR('"+restorani[i].naziv+"')");
		pog5.append(izmeni);
		
		var obrisi = document.createElement("INPUT");
		obrisi.setAttribute("type", "button");
		obrisi.value="Izbriši";
		obrisi.className="btn btn-success";
		obrisi.setAttribute("onclick", "obrisiR('"+restorani[i].naziv+"')");
		sad5.append(obrisi);

		red5.append(pog5);
		red5.append(sad5);
		
		tabelaArtikala.append(red);
		tabelaArtikala.append(red2);
		tabelaArtikala.append(red3);
		tabelaArtikala.append(red5);
		tabelaArtikala.append(red4);
		
		f.append(tabelaArtikala);
		
		/*var picc=restorani[i].listaPica;
		for(var j=0;j<picc.length;j++){
			
			if(picc[j].izbrisan==false){
				//alert(picc[j].naziv);
			var lab=document.createElement("label");
			lab.innerHTML=picc[j].naziv;
			f.append(lab);
			}
		}*/
		
		divZaSvakiRestoran.append(f);

		sviResDiv.append(divZaSvakiRestoran);
		}
		
	}


}

function prikaziR(naziv){
	
	$.ajax({
		url: 'rest/reg/nadjiRest',
		type: 'POST',
		data: naziv,
		contentType: "text/plain",
		dataType: "json",
		success: function(data){
			if(data != null){
				document.getElementById('nazre').innerHTML = "Prikaz restorana";
				$('#noviRest').attr('hidden',true);
				$('#picaP').attr('hidden',true);
				$('#jelaJ').attr('hidden',true);
				$('#prikaziRest').attr('hidden',false);
				
				document.getElementById('np').innerHTML=data.naziv;
				document.getElementById('ap').innerHTML=data.adresa;
				document.getElementById('kp').innerHTML=data.kategorija;
				
				var tabela = $('#jjela');

				var y = document.getElementById("jjela").rows.length;
				for(var j = y - 1; j > 0; j--){
					//alert('a');
					document.getElementById("jjela").deleteRow(j);
				}


				for(var i=0;i<data.listaJela.length;i++){
					if(data.listaJela[i].izbrisan==false){
					var red = document.createElement("tr");
					red.style=" border: 2px solid black";
					var sad1=document.createElement("td");
					sad1.style=" border: 2px solid black";
					sad1.innerHTML=data.listaJela[i].naziv;		
					red.append(sad1);
					
					var sad2=document.createElement("td");
					sad2.innerHTML=data.listaJela[i].jedinicnaCena;
					sad2.style=" border: 2px solid black";
					red.append(sad2);

					var sad3=document.createElement("td");
					sad3.style=" border: 2px solid black";
					var tx=document.createElement("textarea");
					tx.setAttribute('rows', '2');
					tx.setAttribute('cols', '10');
					tx.setAttribute('readonly', 'readonly');
					tx.innerHTML=data.listaJela[i].opis;
					sad3.append(tx);
					red.append(sad3);
					
					var sad4=document.createElement("td");
					sad4.innerHTML=data.listaJela[i].kolicina;
					sad4.style=" border: 2px solid black";
					red.append(sad4);
					
					var sad5=document.createElement("td");
					sad5.style=" border: 2px solid black";
					var por = document.createElement("INPUT");
					por.style=" width:70px";
					por.setAttribute("type", "number");
					por.setAttribute("placeholder", 0);
					por.setAttribute("min", "0");
					por.setAttribute("id", "brJ"+data.listaJela[i].naziv);
					
					
					sad5.append(por);
					red.append(sad5);
					
					var sad6=document.createElement("td");
					sad6.style=" border: 2px solid black";
					var poru = document.createElement("INPUT");
					poru.setAttribute("type", "button");
					poru.value="Poruči";
					poru.className="btn btn-success";
					poru.setAttribute("onclick", "poruciArtJ('"+data.listaJela[i].naziv+"')");

					sad6.append(poru);
					red.append(sad6);

					
					tabela.append(red);
			
					}
				}

				var tabela = $('#ppica');
				var x = document.getElementById("ppica").rows.length;
				for(var i = x - 1; i > 0; i--){
					//alert('a');
					document.getElementById("ppica").deleteRow(i);
				}

				for(var i=0;i<data.listaPica.length;i++){
					if(data.listaPica[i].izbrisan==false){
					var red = document.createElement("tr");
					red.style=" border: 2px solid black";
					var sad1=document.createElement("td");
					sad1.style=" border: 2px solid black";
					sad1.innerHTML=data.listaPica[i].naziv;		
					red.append(sad1);
					
					var sad2=document.createElement("td");
					sad2.innerHTML=data.listaPica[i].jedinicnaCena;
					sad2.style=" border: 2px solid black";
					red.append(sad2);

					var sad3=document.createElement("td");
					sad3.style=" border: 2px solid black";
					var tx=document.createElement("textarea");
					tx.setAttribute('rows', '2');
					tx.setAttribute('cols', '10');
					tx.setAttribute('readonly', 'readonly');
					tx.innerHTML=data.listaPica[i].opis;
					sad3.append(tx);
					red.append(sad3);
					
					var sad4=document.createElement("td");
					sad4.innerHTML=data.listaPica[i].kolicina;
					sad4.style=" border: 2px solid black";
					red.append(sad4);
					
					var sad5=document.createElement("td");
					sad5.style=" border: 2px solid black";
					var por = document.createElement("INPUT");
					por.style=" width:70px";
					por.setAttribute("type", "number");
					por.setAttribute("placeholder", 0);
					por.setAttribute("min", "0");
					por.setAttribute("id", "brP"+data.listaPica[i].naziv);
					

					sad5.append(por);
					red.append(sad5);	

					var sad6=document.createElement("td");
					sad6.style=" border: 2px solid black";
					var poru = document.createElement("INPUT");
					poru.setAttribute("type", "button");
					poru.value="Poruči";
					poru.className="btn btn-success";
					poru.setAttribute("onclick", "poruciArt('"+data.listaPica[i].naziv+"')");
					sad6.append(poru);
					red.append(sad6);

					tabela.append(red);
					
					}
				}
				window.scrollTo(0,100);
			}else{

			}
		},
		error: function(){
			alert('greska');
		}
	});
	
}



function poruciArt(naziv){
	var kolicina = document.getElementById("brP"+naziv).value;
	var spoj=naziv+"+"+kolicina;
	$.ajax({
		url: 'rest/por/dodajUPor',
		dataType: "json", //tip onog sto saljem
		type: "POST",
		contentType: "text/plain",//content type je sta ti vraca
		data: spoj,
		success: function(data){
			if(data!=null){
				alert('Proizvod '+naziv+" x"+kolicina+" je dodan u korpu");
			}else{
				alert('Broj porcija mora biti ceo broj!');
			}
		}
	});
}
function poruciArtJ(naziv){
	var kolicina = document.getElementById("brJ"+naziv).value;
	var spoj=naziv+"+"+kolicina;
	$.ajax({
		url: 'rest/por/dodajUPor',
		dataType: "json", //tip onog sto saljem
		type: "POST",
		contentType: "text/plain",//content type je sta ti vraca
		data: spoj,
		success: function(data){
			if(data!=null){
				alert('Proizvod '+naziv+" x"+kolicina+" je dodan u korpu");
			}else{
				alert('Broj porcija mora biti ceo broj!');
			}
		}
	});
}



function dodajP(naziv){
	var pronadjen=false;
	var x = document.getElementById("novaPica").rows.length;
	for(var i = 0; i <x; i++){
		var y = document.getElementById("novaPica").rows[i].cells[0].innerHTML;
		if(naziv==y){
			pronadjen=true;
		}		
	}
	if(pronadjen==true){
		alert('Već postoji ovo piće u vašoj listi!')
	}else{
		var resto = document.getElementById("nazr").value;
		var spoj=resto+"!"+naziv;

		$.ajax({
			url: 'rest/reg/nadjiArt2',
			type: 'POST',
			data: spoj,
			contentType: "text/plain",
			dataType: "json",
		success: function(data){
			if(data != null){
				dodajP2(data);
			}else{
				alert('Nije pronadjen artikal');
			}
		},
		error: function(){
			alert('greska');
		}
	});
	}
}


function dodajJ(naziv){
	var pronadjen=false;
	var x = document.getElementById("novaJela").rows.length;
	for(var i = 0; i <x; i++){
		var y = document.getElementById("novaJela").rows[i].cells[0].innerHTML;
		if(naziv==y){
			pronadjen=true;
		}		
	}
	if(pronadjen==true){
		alert('Već postoji ovo jelo u vašoj listi!')
	}else{
	var resto = document.getElementById("nazr").value;
	var spoj=resto+"!"+naziv;

	$.ajax({
		url: 'rest/reg/nadjiArt2',
		type: 'POST',
		data: spoj,
		contentType: "text/plain",
		dataType: "json",
		success: function(data){
			if(data != null){
				dodajJ2(data);
			}else{
				alert('Nije pronadjen artikal');
			}
		},
		error: function(){
			alert('greska');
		}
	});
	}
}

function dodajP2(pice){
	var tabela = $('#novaPica');
	
	var red = document.createElement("tr");
	red.style=" border: 2px solid black";
	var sad1=document.createElement("td");
	sad1.style=" border: 2px solid black";
	sad1.innerHTML=pice.naziv;		
	red.append(sad1);
	
	var sad2=document.createElement("td");
	sad2.innerHTML=pice.jedinicnaCena;
	sad2.style=" border: 2px solid black";
	red.append(sad2);

	var sad3=document.createElement("td");
	sad3.style=" border: 2px solid black";
	var tx=document.createElement("textarea");
	tx.setAttribute('rows', '2');
	tx.setAttribute('cols', '10');
	tx.setAttribute('readonly', 'readonly');
	tx.innerHTML=pice.opis;
	sad3.append(tx);
	red.append(sad3);
	
	var sad4=document.createElement("td");
	sad4.innerHTML=pice.kolicina;
	sad4.style=" border: 2px solid black";
	red.append(sad4);
	
	var sad5=document.createElement("td");
	sad5.style=" border: 2px solid black";
	var obrisi = document.createElement("INPUT");
	obrisi.setAttribute("type", "button");
	obrisi.value="Izbaci";
	obrisi.className="btn btn-success";

	sad5.append(obrisi);
	red.append(sad5);
	
	tabela.append(red);


	obrisi.setAttribute("onclick", "izbaciP('"+pice.naziv+"')");
}

function izbaciP(naziv){
	var resto = document.getElementById("nazr").value;
	var spoj=resto+"!"+naziv;
//	alert(spoj);
	$.ajax({
		url: 'rest/reg/izbaciEle',
		type: 'POST',
		data: spoj,
		contentType: "text/plain",
		dataType: "json",
	success: function(){
	
	},
	error: function(){
		alert('greska');
	}
});

	var pronadjen=0;
	var x = document.getElementById("novaPica").rows.length;
	//on ga doda 3. pa i ako izbrises pre njega on ostaje na 3. mestu
	for(var i=0;i<x;i++){
		var y = document.getElementById("novaPica").rows[i].cells[0].innerHTML;
		if(y==naziv){
			pronadjen=i;
		}
	
	}
	document.getElementById("novaPica").deleteRow(pronadjen); 
}

function izbaciJ(naziv){
	var resto = document.getElementById("nazr").value;
	var spoj=resto+"!"+naziv;
//	alert(spoj);
	$.ajax({
		url: 'rest/reg/izbaciEle',
		type: 'POST',
		data: spoj,
		contentType: "text/plain",
		dataType: "json",
	success: function(){
	
	},
	error: function(){
		alert('greska');
	}
});
	var pronadjen=0;
	var x = document.getElementById("novaJela").rows.length;

	for(var i=0;i<x;i++){
		var y = document.getElementById("novaJela").rows[i].cells[0].innerHTML;
		if(y==naziv){
			pronadjen=i;
		}
	
	}
	document.getElementById("novaJela").deleteRow(pronadjen); 
}

function dodajJ2(pice){
	var tabela = $('#novaJela');
	
	var red = document.createElement("tr");
	red.style=" border: 2px solid black";
	var sad1=document.createElement("td");
	sad1.style=" border: 2px solid black";
	sad1.innerHTML=pice.naziv;		
	red.append(sad1);
	
	var sad2=document.createElement("td");
	sad2.innerHTML=pice.jedinicnaCena;
	sad2.style=" border: 2px solid black";
	red.append(sad2);

	var sad3=document.createElement("td");
	sad3.style=" border: 2px solid black";
	var tx=document.createElement("textarea");
	tx.setAttribute('rows', '2');
	tx.setAttribute('cols', '10');
	tx.setAttribute('readonly', 'readonly');
	tx.innerHTML=pice.opis;
	sad3.append(tx);
	red.append(sad3);
	
	var sad4=document.createElement("td");
	sad4.innerHTML=pice.kolicina;
	sad4.style=" border: 2px solid black";
	red.append(sad4);
	
	var sad5=document.createElement("td");
	sad5.style=" border: 2px solid black";
	var obrisi = document.createElement("INPUT");
	obrisi.setAttribute("type", "button");
	obrisi.value="Izbaci";
	obrisi.className="btn btn-success";
	//obrisi.setAttribute("onclick", "dodajP('"+pica[i].naziv+"')");
	sad5.append(obrisi);
	red.append(sad5);
	
	tabela.append(red);
	obrisi.setAttribute("onclick", "izbaciJ('"+pice.naziv+"')");
}

function obrisiR(naziv){
	//alert(id);
	$.ajax({
		url: 'rest/reg/izRes',
		type: 'POST',
		data: naziv,
		contentType: "text/plain",
		dataType: "json",
		success: function(data){
			if(data != null){
				iscrtajRestorane(data);
			}else{
				alert('Nije obrisano');
			}
		},
		error: function(){
			alert('greska');
		}
	});
	
}

function izmeniR(naziv){
	$('#prikaziRest').attr('hidden',true);
	document.getElementById('nazr').readOnly = true;
	document.getElementById('nazre').innerHTML = "Izmena restorana";
 	document.getElementById('dodizr').value = "Izmeni";
 	document.getElementById('nazr').style.background='white';
	document.getElementById('adr').style.background='white';

	$('#noviRest').attr('hidden',false);
	$('#picaP').attr('hidden',false);
	$('#jelaJ').attr('hidden',false);
	
	$.ajax({
		url: 'rest/reg/nadjiRest',
		type: 'POST',
		data: naziv,
		contentType: "text/plain",
		dataType: "json",
		success: function(data){
			if(data != null){
				ispisiPoljaRes(data);
			}else{
				alert('Nije pronadjen restoran');
			}
		},
		error: function(){
			alert('greska');
		}
	});

}

function ispisiPoljaRes(r){
	document.getElementById('nazr').value = r.naziv;
	document.getElementById('adr').value = r.adresa;
	
	var tipp=document.getElementById('katr');
	var option = document.createElement("option");
	option.text = r.kategorija;
	tipp.add(option,0);
	$('#katr').empty();
	var tipic1;
	var tipic2;
	var tipic3;
	var tipic4;
	var tipic5;
	switch(r.kategorija)
	
	{
		case "domacaKuhinja": {tipic1="rostilj"; tipic2="kineskiRestoran"; tipic3="indijskiRestoran"; tipic4="poslasticarnica"; tipic5="picerija";} break;
		case "rostilj": {tipic1="domacaKuhinja"; tipic2="kineskiRestoran"; tipic3="indijskiRestoran"; tipic4="poslasticarnica"; tipic5="picerija";} break;
		case "kineskiRestoran": {tipic1="rostilj"; tipic2="domacaKuhinja"; tipic3="indijskiRestoran"; tipic4="poslasticarnica"; tipic5="picerija";} break;
		case "indijskiRestoran": {tipic1="rostilj"; tipic2="kineskiRestoran"; tipic3="domacaKuhinja"; tipic4="poslasticarnica"; tipic5="picerija";} break;
		case "poslasticarnica": {tipic1="rostilj"; tipic2="kineskiRestoran"; tipic3="indijskiRestoran"; tipic4="domacaKuhinja"; tipic5="picerija";} break;
		case "picerija": {tipic1="rostilj"; tipic2="kineskiRestoran"; tipic3="indijskiRestoran"; tipic4="poslasticarnica"; tipic5="domacaKuhinja";} break;
		
	}
	
	var option2 = document.createElement("option");
	option2.text = tipic1;
	var option3 = document.createElement("option");
	option3.text = tipic2;
	var option4 = document.createElement("option");
	option4.text = tipic3;
	var option5 = document.createElement("option");
	option5.text = tipic4;
	var option6 = document.createElement("option");
	option6.text = tipic5;
	tipp.append(option);
	tipp.append(option2);
	tipp.append(option3);
	tipp.append(option4);
	tipp.append(option5);
	tipp.append(option6);
	
	var tabela = $('#novaJela');

	var y = document.getElementById("novaJela").rows.length;
	for(var j = y - 1; j > 0; j--){
		//alert('a');
		document.getElementById("novaJela").deleteRow(j);
	}


	for(var i=0;i<r.listaJela.length;i++){
		if(r.listaJela[i].izbrisan==false){
		var red = document.createElement("tr");
		red.style=" border: 2px solid black";
		var sad1=document.createElement("td");
		sad1.style=" border: 2px solid black";
		sad1.innerHTML=r.listaJela[i].naziv;		
		red.append(sad1);
		
		var sad2=document.createElement("td");
		sad2.innerHTML=r.listaJela[i].jedinicnaCena;
		sad2.style=" border: 2px solid black";
		red.append(sad2);

		var sad3=document.createElement("td");
		sad3.style=" border: 2px solid black";
		var tx=document.createElement("textarea");
		tx.setAttribute('rows', '2');
		tx.setAttribute('cols', '10');
		tx.setAttribute('readonly', 'readonly');
		tx.innerHTML=r.listaJela[i].opis;
		sad3.append(tx);
		red.append(sad3);
		
		var sad4=document.createElement("td");
		sad4.innerHTML=r.listaJela[i].kolicina;
		sad4.style=" border: 2px solid black";
		red.append(sad4);
		
		var sad5=document.createElement("td");
		sad5.style=" border: 2px solid black";
		var obrisi = document.createElement("INPUT");
		obrisi.setAttribute("type", "button");
		obrisi.value="Izbaci";
		obrisi.className="btn btn-success";
		sad5.append(obrisi);
		red.append(sad5);
		
		tabela.append(red);
		obrisi.setAttribute("onclick", "izbaciJ('"+r.listaJela[i].naziv+"')");
		}
	}

	var tabela = $('#novaPica');
	var x = document.getElementById("novaPica").rows.length;
	for(var i = x - 1; i > 0; i--){
		//alert('a');
		document.getElementById("novaPica").deleteRow(i);
	}
	


	for(var i=0;i<r.listaPica.length;i++){
		if(r.listaPica[i].izbrisan==false){
		var red = document.createElement("tr");
		red.style=" border: 2px solid black";
		var sad1=document.createElement("td");
		sad1.style=" border: 2px solid black";
		sad1.innerHTML=r.listaPica[i].naziv;		
		red.append(sad1);
		
		var sad2=document.createElement("td");
		sad2.innerHTML=r.listaPica[i].jedinicnaCena;
		sad2.style=" border: 2px solid black";
		red.append(sad2);

		var sad3=document.createElement("td");
		sad3.style=" border: 2px solid black";
		var tx=document.createElement("textarea");
		tx.setAttribute('rows', '2');
		tx.setAttribute('cols', '10');
		tx.setAttribute('readonly', 'readonly');
		tx.innerHTML=r.listaPica[i].opis;
		sad3.append(tx);
		red.append(sad3);
		
		var sad4=document.createElement("td");
		sad4.innerHTML=r.listaPica[i].kolicina;
		sad4.style=" border: 2px solid black";
		red.append(sad4);
		
		var sad5=document.createElement("td");
		sad5.style=" border: 2px solid black";
		var obrisi = document.createElement("INPUT");
		obrisi.setAttribute("type", "button");
		obrisi.value="Izbaci";
		obrisi.className="btn btn-success";
		sad5.append(obrisi);
		red.append(sad5);
		
		tabela.append(red);
		obrisi.setAttribute("onclick", "izbaciP('"+r.listaPica[i].naziv+"')");
		}
	}

	$.ajax({
		url:'rest/reg/ucitajPica',
		dataType: "json",
		type:"GET",
		contentType: "application/json",
		success: function(data){
			iscrtajPice(data);
		}
	});
	
	$.ajax({
		url:'rest/reg/ucitajJela',
		dataType: "json",
		type:"GET",
		contentType: "application/json",
		success: function(data){
			iscrtajJela(data);
		}
	});
	
	
	window.scrollTo(0,300);


}


function noviRest() {
	return JSON.stringify({
		"naziv":$('#nazr').val(),
		"adresa":$('#adr').val(),
		"kategorija":$('#katr').val(),		
	});
}

function iscrtajPice(pica){
	
	var svaPica = $('#picaP');
	svaPica.empty();
	var tabelaArtikala=document.createElement("table");
	tabelaArtikala.id="tb";
	tabelaArtikala.style=" border: 2px solid black";

	var red=document.createElement("tr");
	red.style=" border: 2px solid black";
	var pog1=document.createElement("th");
	pog1.innerHTML="Naziv  ";
	pog1.style=" border: 2px solid black";
	var pog2=document.createElement("th");
	pog2.innerHTML="Jed. cena";
	pog2.style=" border: 2px solid black";
	var pog3=document.createElement("th");
	pog3.innerHTML="Opis    ";
	pog3.style=" border: 2px solid black";
	var pog4=document.createElement("th");
	pog4.innerHTML="Kol.[ml] ";
	pog4.style=" border: 2px solid black";
	var pog5=document.createElement("th");
	pog5.innerHTML="U pića ";
	pog5.style=" border: 2px solid black";
	red.append(pog1);
	red.append(pog2);
	red.append(pog3);
	red.append(pog4);
	red.append(pog5);
	tabelaArtikala.append(red);
	 
	for(var i=0;i<pica.length;i++){
		if(pica[i].izbrisan==false){
		var red2=document.createElement("tr");
		red2.style=" border: 2px solid black";
		var sad2=document.createElement("td");
		sad2.innerHTML=pica[i].naziv;	
		//alert(pk[i].naziv);
		sad2.style=" border: 2px solid black";
		var sad3=document.createElement("td");
		sad3.innerHTML=pica[i].jedinicnaCena;
		sad3.style=" border: 2px solid black";
		var sad4=document.createElement("td");
		var tx=document.createElement("textarea");
		tx.setAttribute('rows', '2');
		tx.setAttribute('cols', '10');
		tx.setAttribute('readonly', 'readonly');
		tx.innerHTML=pica[i].opis;
		sad4.append(tx);

	
		sad4.style=" border: 2px solid black";
		var sad5=document.createElement("td");
		sad5.innerHTML=pica[i].kolicina;
		sad5.style=" border: 2px solid black";
		var sad6=document.createElement("td");
		sad6.style=" border: 2px solid black";
		var obrisi = document.createElement("INPUT");
		obrisi.setAttribute("type", "button");
		obrisi.value="Dodaj";
		obrisi.className="btn btn-success";
		obrisi.setAttribute("onclick", "dodajP('"+pica[i].naziv+"')");
		sad6.append(obrisi);
		red2.append(sad2);
		red2.append(sad3);
		red2.append(sad4);
		red2.append(sad5);
		red2.append(sad6);
		tabelaArtikala.append(red2);
		}
	}
	svaPica.append(tabelaArtikala);
}

function iscrtajJela(pica){
	var svaPica = $('#jelaJ');
	svaPica.empty();
	var tabelaArtikala=document.createElement("table");
	tabelaArtikala.style=" border: 2px solid black";
	
	var red=document.createElement("tr");
	red.style=" border: 2px solid black";
	var pog1=document.createElement("th");
	pog1.innerHTML="Naziv  ";
	pog1.style=" border: 2px solid black";
	var pog2=document.createElement("th");
	pog2.innerHTML="Jed. cena";
	pog2.style=" border: 2px solid black";
	var pog3=document.createElement("th");
	pog3.innerHTML="Opis    ";
	pog3.style=" border: 2px solid black";
	var pog4=document.createElement("th");
	pog4.innerHTML="Kol.[g] ";
	pog4.style=" border: 2px solid black";
	var pog5=document.createElement("th");
	pog5.innerHTML="U jela ";
	pog5.style=" border: 2px solid black";
	red.append(pog1);
	red.append(pog2);
	red.append(pog3);
	red.append(pog4);
	red.append(pog5);
	tabelaArtikala.append(red);
	

	for(var i=0;i<pica.length;i++){
		if(pica[i].izbrisan==false){
		var red2=document.createElement("tr");
		red2.style=" border: 2px solid black";
		var sad2=document.createElement("td");
		sad2.innerHTML=pica[i].naziv;	
		sad2.style=" border: 2px solid black";
		var sad3=document.createElement("td");
		sad3.innerHTML=pica[i].jedinicnaCena;
		sad3.style=" border: 2px solid black";
		var sad4=document.createElement("td");
		var tx=document.createElement("textarea");
		tx.setAttribute('rows', '2');
		tx.setAttribute('cols', '10');
		tx.setAttribute('readonly', 'readonly');
		tx.innerHTML=pica[i].opis;
		sad4.append(tx);

		sad4.style=" border: 2px solid black";
		var sad5=document.createElement("td");
		sad5.innerHTML=pica[i].kolicina;
		sad5.style=" border: 2px solid black";
		var sad6=document.createElement("td");
		sad6.style=" border: 2px solid black";
		var obrisi = document.createElement("INPUT");
		obrisi.setAttribute("type", "button");
		obrisi.value="Dodaj";
		obrisi.className="btn btn-success";
		obrisi.setAttribute("onclick", "dodajJ('"+pica[i].naziv+"')");
		sad6.append(obrisi);
		red2.append(sad2);
		red2.append(sad3);
		red2.append(sad4);
		red2.append(sad5);
		red2.append(sad6);
		tabelaArtikala.append(red2);
		}
	}
	svaPica.append(tabelaArtikala);
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
		url: 'rest/reg/aa',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		//data: JSON., //sta saljes,samo kad je post..kastujem jer iz xml ide u json
		contentType: "application/json",//content type je sta ti vraca
		success: function(data){
			
		}
	});

	$.ajax({
		url: 'rest/reg/postojeciRest',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		//data: JSON., //sta saljes,samo kad je post..kastujem jer iz xml ide u json
		contentType: "application/json",//content type je sta ti vraca
		success: function(data){
			iscrtajRestorane(data);
		}
	});
	
	$(document).on('click','#sviR',function(e){
		e.preventDefault();
		
		$.ajax({
			
			url: 'rest/reg/postojeciRest',
			dataType: "json", //tip onog sto saljem
			type: "GET",
			//data: JSON., //sta saljes,samo kad je post..kastujem jer iz xml ide u json
			contentType: "application/json",
			success: function(data){
				iscrtajRestorane(data);
			}
			
		});
	});
	
	$(document).on('click','#pp',function(e){
		e.preventDefault();
		window.location.href="./mainPor.html";
	});
	
	$(document).on('click','#domR',function(e){
		e.preventDefault();
		var pret="domacaKuhinja";
		
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
				iscrtajRestorane(data);
			}
			
		});
	});
	
	$(document).on('click','#rosR',function(e){
		e.preventDefault();
		var pret="rostilj";
		
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
				iscrtajRestorane(data);
			}
			
		});
	});
	
	$(document).on('click','#kinR',function(e){
		e.preventDefault();
		var pret="kineskiRestoran";
		
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
				iscrtajRestorane(data);
			}
			
		});
	});
	
	$(document).on('click','#indR',function(e){
		e.preventDefault();
		var pret="indijskiRestoran";
		
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
				iscrtajRestorane(data);
			}
			
		});
	});
	
	$(document).on('click','#poslR',function(e){
		e.preventDefault();
		var pret="poslasticarnica";
	
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
				iscrtajRestorane(data);
			}
			
		});
	});
	
	$(document).on('click','#korpa',function(e){
		e.preventDefault();
		window.location.href="./korpaAdmin.html";

	});
	
	$(document).on('submit','#pretragaR',function(e){
		e.preventDefault();
		pretraziRest();
		document.getElementById("nazz").value="";
		document.getElementById("arr").value="";
		document.getElementById("karr").selectedIndex=0;
		document.getElementById('nazre').innerHTML = "";
		$('#noviRest').attr('hidden',true);
		$('#prikaziRest').attr('hidden',true);
		$('#picaP').attr('hidden',true);
		$('#jelaJ').attr('hidden',true);

	});
	
	$(document).on('click','#picR',function(e){
		e.preventDefault();
		var pret="picerija";
	
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
				iscrtajRestorane(data);
			}
			
		});
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
	
	$(document).on('submit','#prikaziRest',function(e){
		e.preventDefault();
		$('#prikaziRest').attr('hidden',true); 
		document.getElementById('nazre').innerHTML = "";
		
	});
	
	$(document).on('submit','#zav',function(e){
		e.preventDefault();
		$.ajax({
			url: 'rest/reg/postojeciRest',
			dataType: "json", //tip onog sto saljem
			type: "GET",
			//data: JSON., //sta saljes,samo kad je post..kastujem jer iz xml ide u json
			contentType: "application/json",//content type je sta ti vraca
			success: function(data){
				iscrtajRestorane(data);
			}
		});
		document.getElementById('nazre').innerHTML = "";
		$('#noviRest').attr('hidden',true);
		$('#picaP').attr('hidden',true);
		$('#jelaJ').attr('hidden',true);
		$('#dug').attr('hidden',true);

	});

	$(document).on('click','#aa',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./artikliAdmin.html";
	});
	$(document).on('click','#vv',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./vozilaAdmin.html";
	});
	$(document).on('click','#kk',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./korisniciAdmin.html";
	});
	
	$(document).on('submit','#dodajRes',function(e){
		e.preventDefault();
		$('#prikaziRest').attr('hidden',true);
		document.getElementById('nazr').readOnly = false;
	 	document.getElementById('dodizr').value = "Dalje";
	 	$('#picaP').attr('hidden',true);
		$('#jelaJ').attr('hidden',true);

		if($('#noviRest').is(':hidden')){
			$('#noviRest').attr('hidden',false);
			document.getElementById('nazre').innerHTML = "Novi restoran";
			$('#picaP').attr('hidden',true);
			$('#jelaJ').attr('hidden',true);
			$('#dug').attr('hidden',true);
			document.getElementById('nazr').readOnly = false;
			document.getElementById('adr').readOnly = false;
			document.getElementById('katr').readOnly = false;

			document.getElementById('nazr').value='';
			document.getElementById('adr').value='';
			document.getElementById('nazr').style.background='white';
			document.getElementById('adr').style.background='white';
			var x = document.getElementById("novaPica").rows.length;
			for(var i = x - 1; i > 0; i--){
				//alert('a');
				document.getElementById("novaPica").deleteRow(i);
			}
			var y = document.getElementById("novaJela").rows.length;
			for(var j = y - 1; j > 0; j--){
				//alert('a');
				document.getElementById("novaJela").deleteRow(j);
			}
		
			$.ajax({
				url:'rest/reg/ucitajPica',
				dataType: "json",
				type:"GET",
				contentType: "application/json",
				success: function(data){
					iscrtajPice(data);
				}
			});
			
			$.ajax({
				url:'rest/reg/ucitajJela',
				dataType: "json",
				type:"GET",
				contentType: "application/json",
				success: function(data){
					iscrtajJela(data);
				}
			});

		}else{
			$('#noviRest').attr('hidden',true);
			document.getElementById('nazre').innerHTML = "";
		}
	});

	
	
	$(document).on('submit','#noviRest',function(e){
		
		e.preventDefault();
		let naziv=document.getElementById('nazr').value;
		let adresa=document.getElementById('adr').value;
		let back=true;
		
		if(!naziv){
			document.getElementById('nazr').style.background='red';
			back=false;
		}
		if(!adresa){
			document.getElementById('adr').style.background='red';
			back=false;
		}
		if(!back){
			alert("Popunite obeležena polja!");
		}else{
			var unutra=document.getElementById('dodizr').value;
			
			if( unutra== "Dalje"){
				//alert('A');
				
				
				$.ajax({
					url: 'rest/reg/dodRest',
					dataType: "json", //tip onog sto saljem
					type: "POST",
					data: noviRest(), //sta saljes,samo kad je post..kastujem jer iz xml ide u json
					contentType: "application/json",//content type je sta ti vraca
					success: function(data){
						if(data!=null){
						
							$('#picaP').attr('hidden',false);
							$('#jelaJ').attr('hidden',false);
							$('#dug').attr('hidden',false);
							document.getElementById('nazr').readOnly = true;
							document.getElementById('adr').readOnly = true;
							document.getElementById('katr').readOnly = true;
			
					}else{
						alert('Već postoji restoran sa tim nazivom!');
					}

				}
			});
		}
		else{
			document.getElementById('nazre').innerHTML = "";
			$('#noviRest').attr('hidden',true);
			$('#picaP').attr('hidden',true);
			$('#jelaJ').attr('hidden',true);
			
		$.ajax({
			url: 'rest/reg/izmRest',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: noviRest(), //sta saljes,samo kad je post..kastujem jer iz xml ide u json
			contentType: "application/json",//content type je sta ti vraca
			success: function(data){
				if(data!=null){
					$('#noviRest').attr('hidden',true);
					iscrtajRestorane(data);
			}else{
				
			}

		}
	});
		}
		}

	});

});