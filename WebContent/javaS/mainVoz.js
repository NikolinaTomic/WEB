function iscrtajVozila(artikli){
	
		var sviArtDiv = $('#vozz');
		sviArtDiv.empty();
		for(var i=0;i<artikli.length;i++){
			if(artikli[i].izbrisan==false){
			var divZaSvakiRestoran = document.createElement("div");
			var f = document.createElement("form");
			f.id="formaV";
			//stil diva
			divZaSvakiRestoran.style=" border: 2px dotted black; background-color: #35ca57; border: 2px dotted black; width: 300px; float: left; height:230px; margin-right:20px; margin-bottom:20px;";
			var tabelaArtikala=document.createElement("table");
			var red=document.createElement("tr");
			var pog1=document.createElement("th");
			pog1.innerHTML="Marka:  ";
			var sad1=document.createElement("td");
			sad1.innerHTML=artikli[i].marka;
			//alert(sad1.innerHTML);
			red.append(pog1);
			red.append(sad1);	
			
			var red2=document.createElement("tr");
			var pog2=document.createElement("th");
			pog2.innerHTML="Model: ";
			var sad2=document.createElement("td");
	
			sad2.innerHTML=artikli[i].model;
			red2.append(pog2);
			red2.append(sad2);
		
			
			var red3=document.createElement("tr");
			var pog3=document.createElement("th");
			pog3.innerHTML="Tip:  ";
			var sad3=document.createElement("td");
			sad3.innerHTML=artikli[i].tip;

			red3.append(pog3);
			red3.append(sad3);
			
			var red4=document.createElement("tr");
			var pog4=document.createElement("th");
			pog4.innerHTML="Registarska oznaka:  ";
			var sad4=document.createElement("td");
			sad4.innerHTML=artikli[i].registarskaOznaka;
			red4.append(pog4);
			red4.append(sad4);
			
			var red5=document.createElement("tr");
			var pog5=document.createElement("th");
			pog5.innerHTML="Godina proizvodnje:  ";
			var sad5=document.createElement("td");
			sad5.innerHTML=artikli[i].godinaProizvodnje;
			red5.append(pog5);
			red5.append(sad5);
			
			var red6=document.createElement("tr");
			var pog6=document.createElement("th");
			pog6.innerHTML="U upotrebi:  ";
			var sad6=document.createElement("td");
			sad6.innerHTML=artikli[i].upotreba;
			red6.append(pog6);
			red6.append(sad6);
			
			var red7=document.createElement("tr");
			var pog7=document.createElement("th");
			pog7.innerHTML="Napomena:  ";
			var sad7=document.createElement("td");
			sad7.innerHTML=artikli[i].napomena;
			red7.append(pog7);
			red7.append(sad7);
			tabelaArtikala.append(red);
			tabelaArtikala.append(red2);
			tabelaArtikala.append(red3);
			tabelaArtikala.append(red4);
			tabelaArtikala.append(red5);
			tabelaArtikala.append(red6);
			tabelaArtikala.append(red7);
			
			var red8=document.createElement("tr");
			var pog8=document.createElement("td");
			var obrisi = document.createElement("INPUT");
			obrisi.setAttribute("type", "submit");
			obrisi.value="Izbriši";
			obrisi.className="btn btn-success";
			obrisi.setAttribute("onclick", "obrisiVozilo('"+artikli[i].registarskaOznaka+"')");
			
			var pog44=document.createElement("td");
			var izmeni = document.createElement("INPUT");
			izmeni.setAttribute("type", "button");
			izmeni.value="Izmena";
			izmeni.className="btn btn-success";
			izmeni.setAttribute("onclick", "izmenaV('"+artikli[i].registarskaOznaka+"')");
		
			pog8.append(izmeni);
			pog44.append(obrisi);
			red8.append(pog8);
			red8.append(pog44);
			tabelaArtikala.append(red8);
			f.append(tabelaArtikala);
			divZaSvakiRestoran.append(f);

			sviArtDiv.append(divZaSvakiRestoran);
		}
		}	
}

function novoVoz() {
	return JSON.stringify({
		"marka":$('#mark').val(),
		"model":$('#mod').val(),
		"tip":$('#tipv').val(),
		"registarskaOznaka":$('#reg').val(),
		"godinaProizvodnje":$('#god').val(),
		"napomena":$('#nap').val(),
		
	});
}
function obrisiVozilo(reg){
	//alert(id);
	$.ajax({
		url: 'rest/voz/izVoz',
		type: 'POST',
		data: reg,
		contentType: "text/plain",
		dataType: "json",
		success: function(data){
			if(data != null){
				iscrtajVozila(data);
			}else{
				alert('Nije obrisano');
			}
		},
		error: function(){
			alert('greska');
		}
	});
	
}

function izmenaV(naziv){
	//alert(naziv);
	document.getElementById('reg').readOnly = true;
	document.getElementById('nazicV').innerHTML = "Izmena artikla";
 	document.getElementById('dodizV').value = "Izmeni";
 	document.getElementById('mark').style.background='white';
	document.getElementById('mod').style.background='white';
	document.getElementById('reg').style.background='white';
	document.getElementById('god').style.background='white';
	document.getElementById('nap').style.background='white';
 	//alert(naziv);
	$('#novoVoz').attr('hidden',false);
 		$.ajax({
		url: 'rest/voz/nadjiVoz',
		type: 'POST',
		data: naziv,
		contentType: "text/plain",
		dataType: "json",
		success: function(data){
			if(data != null){
				ispisiPoljaV(data);
			}else{
				alert('Nije pronadjeno vozilo');
			}
		},
		error: function(){
			alert('greska');
		}
	});
	
}

function ispisiPoljaV(artikal){
	//alert(artikal.naziv);
	document.getElementById('mark').value = artikal.marka;
	document.getElementById('mod').value = artikal.model;
	document.getElementById('reg').value = artikal.registarskaOznaka;
	document.getElementById('god').value = artikal.godinaProizvodnje;
	document.getElementById('nap').value = artikal.napomena;
	
	var tipp=document.getElementById('tipv');
	var option = document.createElement("option");
	option.text = artikal.tip;
	//alert(option.text);
	tipp.add(option,0);
	$('#tipv').empty();
	var tipic1;
	var tipic2;
	switch(artikal.tip)
	
	{
		case "automobil": {tipic1="skuter"; tipic2="bicikl";} break;
		case "skuter": {tipic1="automobil"; tipic2="bicikl";} break;
		case "bicikl": {tipic1="skuter"; tipic2="automobil";} break;
	}
	
	var option2 = document.createElement("option");
	option2.text = tipic1;

	var option3 = document.createElement("option");
	option3.text = tipic2;
	tipp.append(option);
	tipp.append(option2);
	tipp.append(option3);
	window.scrollTo(0,0);
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
		url: 'rest/voz/postojeciVoz',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		//data: JSON., //sta saljes,samo kad je post..kastujem jer iz xml ide u json
		contentType: "application/json",//content type je sta ti vraca
		success: function(data){
			iscrtajVozila(data);
		}
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
	
	$(document).on('click','#aa',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./artikliAdmin.html";
	});
	
	$(document).on('click','#rr',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./mainAdmin.html";
	});

	$(document).on('click','#kk',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./korisniciAdmin.html";
	});
	$(document).on('click','#pp',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./mainPor.html";
	});
	
	$(document).on('submit','#dodajVoz',function(e){
		e.preventDefault();
		document.getElementById('reg').readOnly = false;
	 	document.getElementById('dodizV').value = "Dodaj";
		document.getElementById('nazicV').innerHTML = "Novi artikal";
		if($('#novoVoz').is(':hidden')){
			$('#novoVoz').attr('hidden',false);
			document.getElementById('mark').value='';
			document.getElementById('mod').value='';
			document.getElementById('reg').value='';
			document.getElementById('god').value='';
			document.getElementById('nap').value='';
			document.getElementById('mark').style.background='white';
			document.getElementById('mod').style.background='white';
			document.getElementById('reg').style.background='white';
			document.getElementById('god').style.background='white';
			document.getElementById('nap').style.background='white';
		}else{
			$('#novoVoz').attr('hidden',true);
		}

	});
	
	$(document).on('submit','#novoVoz',function(e){
		e.preventDefault();
		let marka=document.getElementById('mark').value;
		let model=document.getElementById('mod').value;
		let reg=document.getElementById('reg').value;
		let god=document.getElementById('god').value;
		let back=true;
		
		if(!god){
			document.getElementById('god').style.background='red';
			back=false;
		}
		
		if(!god.match(/^19[0-9]{2,2}$/) && !god.match(/^20[01][0-9]$/)){
			document.getElementById('god').style.background='red';
			alert("Godina proizvodnje mora biti veća od 1900.te!");
			back=false;
		}
		
		if(!marka){
			document.getElementById('mark').style.background='red';
			back=false;
		}
		
		if(!model){
			document.getElementById('mod').style.background = 'red';
			back = false;
		}
		if(!reg){
			document.getElementById('reg').style.background='red';
			back=false;
		}
		
		if(!reg.match(/^[A-Z][A-Z][0-9][0-9][0-9]-[A-Z][A-Z]$/)){
			document.getElementById('reg').style.background='red';
			alert("Registarska oznaka mora biti oblika: XXyyy-XX (X-veliko slovo, y-broj)!")
			back=false;
		}
		
		if(!back){
			alert("Popunite obeležena polja!");
		}else{
			var unutra=document.getElementById('dodizV').value;
			
			if( unutra== "Dodaj"){
			$.ajax({
				url: 'rest/voz/dodVoz',
				dataType: "json", //tip onog sto saljem
				type: "POST",
				data: novoVoz(), //sta saljes,samo kad je post..kastujem jer iz xml ide u json
				contentType: "application/json",//content type je sta ti vraca
				success: function(data){
					if(data!=null){
						
						$('#novoVoz').attr('hidden',true);
						iscrtajVozila(data);
				}else{
					alert('Već postoji vozilo sa tom registarskom oznakom!');
				}
				}
			});
	
		}else{
			
			$.ajax({
			url: 'rest/voz/izmVoz',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: novoVoz(), //sta saljes,samo kad je post..kastujem jer iz xml ide u json
			contentType: "application/json",//content type je sta ti vraca
			success: function(data){
				if(data!=null){
					
					$('#novoVoz').attr('hidden',true);
					iscrtajVozila(data);
			}else{
				
			}

		}
	});
			}
		}
	
		});
	
});
