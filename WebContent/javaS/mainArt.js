function pretraziArt(){

	var tippa=document.getElementById("tippa").value;
	var nappa=document.getElementById("nappa").value;
	var cepp=document.getElementById("cepp").value;
	var repp=document.getElementById("repp").value;
	
	var sve=tippa+"+"+nappa+"+"+cepp+"+"+repp;
	
	$.ajax({
		url: 'rest/ku/preA',
		dataType: "json", //tip onog sto saljem
		type: "POST",
		contentType: "text/plain",//content type je sta ti vraca
		data: sve,
		success: function(data){
			if(data!=null){
			iscrtajArtikle(data);

			}else{
				alert("Cena mora biti broj!");
			}
		}
	});
	
	
}
function iscrtajArtikle(artikli){
	
		var sviArtDiv = $('#art');
		sviArtDiv.empty();
		for(var i=0;i<artikli.length;i++){
			if(artikli[i].izbrisan==false){
			var divZaSvakiRestoran = document.createElement("div");
			var f = document.createElement("form");
			f.id="formaA";
			//stil diva
			divZaSvakiRestoran.style=" border: 2px dotted black; background-color: #35ca57; border: 2px dotted black; width: 250px; float: left; height:200px; margin-right:20px; margin-bottom:20px;";
			var tabelaArtikala=document.createElement("table");
			var red=document.createElement("tr");
			var pog1=document.createElement("th");
			pog1.innerHTML="Naziv:  ";
			var sad1=document.createElement("td");
			sad1.innerHTML=artikli[i].naziv;
	
			sad1.id="nA";
			red.append(pog1);
			red.append(sad1);	
			
			var red2=document.createElement("tr");
			var pog2=document.createElement("th");
			pog2.innerHTML="Jedinična cena: ";
			var sad2=document.createElement("td");
	
			sad2.innerHTML=artikli[i].jedinicnaCena;
			red2.append(pog2);
			red2.append(sad2);
		
			
			var red3=document.createElement("tr");
			var pog3=document.createElement("th");
			pog3.innerHTML="Opis:  ";
			var sad3=document.createElement("td");
			var tx=document.createElement("textarea");
			tx.setAttribute('rows', '2');
			tx.setAttribute('cols', '10');
			tx.setAttribute('readonly', 'readonly');
			tx.style=" background-color: #35ca57;";
			
			tx.innerHTML=artikli[i].opis;
			sad3.append(tx);
			red3.append(pog3);
			red3.append(sad3);
			
			
			var tipic;
			switch(artikli[i].tip)
			{
				case "jelo": tipic="g"; break;
				case "pice": tipic="ml"; break;
			}
			
			var red4=document.createElement("tr");
			var pog4=document.createElement("th");
			pog4.innerHTML="Količina:  ";
			var sad4=document.createElement("td");
			sad4.innerHTML=artikli[i].kolicina+" "+tipic;
			red4.append(pog4);
			red4.append(sad4);
			tabelaArtikala.append(red);
			tabelaArtikala.append(red2);
			tabelaArtikala.append(red3);
			tabelaArtikala.append(red4);
			
			var red5=document.createElement("tr");
			var pog4=document.createElement("td");
			var obrisi = document.createElement("INPUT");
			obrisi.setAttribute("type", "submit");
			obrisi.value="Izbriši";
			obrisi.className="btn btn-success";
			obrisi.setAttribute("onclick", "obrisiArtikal('"+artikli[i].naziv+"')");
			
			var pog44=document.createElement("td");
			var izmeni = document.createElement("INPUT");
			izmeni.setAttribute("type", "button");
			izmeni.value="Izmena";
			izmeni.className="btn btn-success";
			izmeni.setAttribute("onclick", "izmenaA('"+artikli[i].naziv+"')");
		
			pog4.append(izmeni);
			pog44.append(obrisi);
			red5.append(pog4);
			red5.append(pog44);
			tabelaArtikala.append(red5);
			f.append(tabelaArtikala);
			divZaSvakiRestoran.append(f);

			sviArtDiv.append(divZaSvakiRestoran);
		}
		}	
}

function noviArt() {
	return JSON.stringify({
		"naziv":$('#naza').val(),
		"jedinicnaCena":$('#cenaa').val(),
		"opis":$('#opisaa').val(),
		"kolicina":$('#kolaa').val(),
		"tip":$('#tipa').val(),
		
	});
}

function obrisiArtikal(naziv){
	//alert(id);
	$.ajax({
		url: 'rest/reg/izArt',
		type: 'POST',
		data: naziv,
		contentType: "text/plain",
		dataType: "json",
		success: function(data){
			if(data != null){
				iscrtajArtikle(data);
			}else{
				alert('Nije obrisano');
			}
		},
		error: function(){
			alert('greska');
		}
	});
	
}

function izmenaA(naziv){
	document.getElementById('naza').readOnly = true;
	document.getElementById('nazic').innerHTML = "Izmena artikla";
 	document.getElementById('dodiz').value = "Izmeni";
 	document.getElementById('naza').style.background='white';
	document.getElementById('cenaa').style.background='white';
	document.getElementById('kolaa').style.background='white';
	document.getElementById('opisaa').style.background='white';
 	//alert(naziv);
	$('#noviArt').attr('hidden',false);
 		$.ajax({
		url: 'rest/reg/nadjiArt',
		type: 'POST',
		data: naziv,
		contentType: "text/plain",
		dataType: "json",
		success: function(data){
			if(data != null){
				//alert('zove');
				ispisiPoljaAr(data);
			}else{
				alert('Nije pronadjen artikal');
			}
		},
		error: function(){
			alert('greska');
		}
	});
	
}


function ispisiPoljaAr(artikal){
	//alert(artikal.naziv);
	document.getElementById('naza').value = artikal.naziv;
	document.getElementById('cenaa').value = artikal.jedinicnaCena;
	document.getElementById('opisaa').value = artikal.opis;
	document.getElementById('kolaa').value = artikal.kolicina;
	var tipp=document.getElementById('tipa');
	var option = document.createElement("option");
	option.text = artikal.tip;
	
	tipp.add(option,0);
	$('#tipa').empty();
	var tipic;
	switch(artikal.tip)
	{
		case "jelo": tipic="pice"; break;
		case "pice": tipic="jelo"; break;
	}
	
	var option2 = document.createElement("option");
	option2.text = tipic;
	tipp.append(option);
	tipp.append(option2);
	window.scrollTo(0,100);
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
		url: 'rest/reg/postojeciArt',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		//data: JSON., //sta saljes,samo kad je post..kastujem jer iz xml ide u json
		contentType: "application/json",//content type je sta ti vraca
		success: function(data){
			iscrtajArtikle(data);
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
	
	$(document).on('submit','#pretraga',function(e){
		e.preventDefault();
		pretraziArt();
		document.getElementById("repp").value="";
		document.getElementById("nappa").value="";
		document.getElementById("cepp").value="";
		document.getElementById("tippa").selectedIndex=0;
		$('#noviArt').attr('hidden',true);
	});
	
	$(document).on('click','#vv',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./vozilaAdmin.html";
	});
	
	
	
	$(document).on('click','#kk',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./korisniciAdmin.html";
	});
	
	$(document).on('click','#rr',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./mainAdmin.html";
	});
	$(document).on('click','#pp',function(e){ //ide na stranicu gde su izlistani artikli
		e.preventDefault();
		window.location.href="./mainPor.html";
	});

	$(document).on('submit','#dodajArt',function(e){
		e.preventDefault();
		document.getElementById('naza').readOnly = false;
	 	document.getElementById('dodiz').value = "Dodaj";
		document.getElementById('nazic').innerHTML = "Novi artikal";
		if($('#noviArt').is(':hidden')){
			$('#noviArt').attr('hidden',false);
			document.getElementById('naza').value='';
			document.getElementById('cenaa').value='';
			document.getElementById('kolaa').value='';
			document.getElementById('opisaa').value='';
			document.getElementById('naza').style.background='white';
			document.getElementById('cenaa').style.background='white';
			document.getElementById('kolaa').style.background='white';
			document.getElementById('opisaa').style.background='white';

		}else{
			$('#noviArt').attr('hidden',true);
		}

		
	});

	
	$(document).on('submit','#noviArt',function(e){
		e.preventDefault();
		let naziv=document.getElementById('naza').value;
		let cena=document.getElementById('cenaa').value;
		let kolicina=document.getElementById('kolaa').value;
		
		let back=true;
		
		if(!naziv){
			document.getElementById('naza').style.background='red';
			back=false;
		}
		
		if(!cena){
			document.getElementById('cenaa').style.background = 'red';
			back = false;
		}
			if(!cena.match(/^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/))
			{
				alert('Cena mora biti pozitivan broj do 2 decimale!');
				document.getElementById('cenaa').style.background = 'red';
				back = false;
			}

		if(!kolicina){
			 document.getElementById('kolaa').style.background='red';
			    back=false;
		}
		

		if(!kolicina.match(/^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/))
		{
			alert('Količina mora biti pozitivan broj do 2 decimale!');
			 document.getElementById('kolaa').style.background='red';
			back = false;
		}

		if(!back){
			alert("Popunite obeležena polja!");
		}else{
			var unutra=document.getElementById('dodiz').value;
			
			if( unutra== "Dodaj"){
			$.ajax({
				url: 'rest/reg/dodArt',
				dataType: "json", //tip onog sto saljem
				type: "POST",
				data: noviArt(), //sta saljes,samo kad je post..kastujem jer iz xml ide u json
				contentType: "application/json",//content type je sta ti vraca
				success: function(data){
					if(data!=null){
						$('#noviArt').attr('hidden',true);
						iscrtajArtikle(data);
				}else{
					alert('Već postoji artikal sa tim nazivom!');
				}

			}
		});}
		else{
		$.ajax({
			url: 'rest/reg/izmArt',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: noviArt(), //sta saljes,samo kad je post..kastujem jer iz xml ide u json
			contentType: "application/json",//content type je sta ti vraca
			success: function(data){
				if(data!=null){
					$('#noviArt').attr('hidden',true);
					iscrtajArtikle(data);
			}else{
				
			}

		}
	});
		}
		}

	});
});