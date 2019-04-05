function iscrtajPorudzbineSlobodan(){
	
	$.ajax({
		url: 'rest/por/konkrDost',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		contentType: "application/json",//content type je sta ti vraca
		success: function(por){
			if(por!=null){
			var divT = $('#po');
			divT.empty();

			for(var i=0;i<por.length;i++){

				var divzaPor=document.createElement("div");
				divzaPor.style=" border: 2px solid black; float:left;margin-left: 5px;margin-right: 5px;margin-top:5px; margin-bottom:5px;";
				var tab=document.createElement("table");
				var red0=document.createElement("tr");
				red0.style=" border: 2px solid black; background: #35ca57";
				var pog1=document.createElement("th");
				pog1.innerHTML='Naziv artikla';
				pog1.style=" border: 2px solid black; background: #35ca57";
				var pog2=document.createElement("th");
				pog2.innerHTML='Jedinična cena';
				pog2.style=" border: 2px solid black; background: #35ca57";
				var pog3=document.createElement("th");
				pog3.innerHTML='Opis';
				pog3.style=" border: 2px solid black; background: #35ca57";
				var pog4=document.createElement("th");
				pog4.innerHTML='Količina';
				pog4.style=" border: 2px solid black; background: #35ca57";
				var pog5=document.createElement("th");
				pog5.innerHTML='Tip';
				pog5.style=" border: 2px solid black; background: #35ca57";
				var pog6=document.createElement("th");
				pog6.innerHTML='Broj porcija';
				pog6.style=" border: 2px solid black; background: #35ca57";
				red0.append(pog1);
				red0.append(pog2);
				red0.append(pog3);
				red0.append(pog4);
				red0.append(pog5);
				red0.append(pog6);
				tab.append(red0);
				
				for(var j=0;j<por[i].stavke.length;j++){
					var red=document.createElement('tr');
					red.style=" border: 2px solid black";
					var sad1=document.createElement('td');
					sad1.innerHTML=por[i].stavke[j].naziv;
					sad1.style=" border: 2px solid black";
					var sad2=document.createElement('td');
					sad2.innerHTML=por[i].stavke[j].jedinicnaCena;
					sad2.style=" border: 2px solid black";
					var sad3=document.createElement('td');
					//sad3.innerHTML=por[i].stavke[j].opis;
					var tx=document.createElement("textarea");
					tx.setAttribute('rows', '1');
					tx.setAttribute('cols', '15');
					tx.setAttribute('readonly', 'readonly');
					//tx.style="background: #35ca57";
					//tx.style=" background-color: #35ca57;";
					
					tx.innerHTML=por[i].stavke[j].opis;
					sad3.append(tx);
					
					
					sad3.style=" border: 2px solid black";
					var sad4=document.createElement('td');
					sad4.innerHTML=por[i].stavke[j].kolicina+" "+por[i].stavke[j].mera;
					sad4.style=" border: 2px solid black";
					var sad5=document.createElement('td');
					sad5.innerHTML=por[i].stavke[j].tip;
					sad5.style=" border: 2px solid black";
					var sad6=document.createElement('td');
					sad6.innerHTML=por[i].kolicina[j];
					sad6.style=" border: 2px solid black";
					
					red.append(sad1);
					red.append(sad2);
					red.append(sad3);
					red.append(sad4);
					red.append(sad5);
					red.append(sad6);
					tab.append(red);
				}
				
				var tab2=document.createElement("table");
				
				var red2=document.createElement("tr");
				var dat=document.createElement("th");
				dat.innerHTML="Datum poručivanja:";
				var dat2=document.createElement("td");
				dat2.innerHTML=por[i].datumIVreme;
				red2.append(dat);
				red2.append(dat2);
				
				var red3=document.createElement("tr");
				var dost=document.createElement("th");
				dost.innerHTML="Dostavljač:";
				var dost2=document.createElement("td");
				if(por[i].dostavljac!=null){
				dost2.innerHTML=por[i].dostavljac.korisnickoIme+" ("+por[i].dostavljac.ime+" "+por[i].dostavljac.prezime+")";
				}else{
				dost2.innerHTML="";
				}
				red3.append(dost);
				red3.append(dost2);
				
				var red8=document.createElement("tr");
				var kup=document.createElement("th");
				kup.innerHTML="Kupac:";
				var kup2=document.createElement("td");
				if(por[i].kupac!=null){
				kup2.innerHTML=por[i].kupac.korisnickoIme+" ("+por[i].kupac.ime+" "+por[i].kupac.prezime+")";
				}else{
				kup2.innerHTML="";
				}
				red8.append(kup);
				red8.append(kup2);
				
				var red4=document.createElement("tr");
				var sta=document.createElement("th");
				sta.innerHTML="Status porudžbine:";
				var sta2=document.createElement("td");
				sta2.innerHTML=por[i].status;
				red4.append(sta);
				red4.append(sta2);
				
				var red5=document.createElement("tr");
				var voz=document.createElement("th");
				voz.innerHTML="Vozilo:";
				var voz2=document.createElement("td");
				if(por[i].vozilo!=null){
				voz2.innerHTML=por[i].vozilo.registarskaOznaka+" ("+por[i].vozilo.marka+" "+por[i].vozilo.model+")";
				}else{
					voz2.innerHTML="";
				}
				red5.append(voz);
				red5.append(voz2);
				
				var red6=document.createElement("tr");
				var nap=document.createElement("th");
				nap.innerHTML="Napomena:";
				var nap2=document.createElement("td");
				var tx2=document.createElement("textarea");
				tx2.setAttribute('rows', '2');
				tx2.setAttribute('cols', '40');
				tx2.setAttribute('readonly', 'readonly');	
				tx2.innerHTML=por[i].napomena;
				//tx2.style="background: #35ca57";

				nap2.append(tx2);
				red6.append(nap);
				red6.append(nap2);
				
				var red7=document.createElement("tr");
				var prazno=document.createElement("td");
				var dgm=document.createElement("td");
				var preuzmi = document.createElement("INPUT");
				preuzmi.setAttribute("type", "button");
				preuzmi.value="Preuzmi porudžbinu";
				preuzmi.className="btn btn-success";
				preuzmi.setAttribute("onclick", "preuzmiPor('"+por[i].datumIVreme+"')");
				
				dgm.append(preuzmi);
				red7.append(prazno);
				red7.append(dgm);
				
				tab2.append(red2);
				tab2.append(red3);
				tab2.append(red8);
				tab2.append(red4);
				tab2.append(red5);
				tab2.append(red6);
				tab2.append(red7);
				
				divzaPor.append(tab);
				divzaPor.append(tab2);
				divT.append(divzaPor);
			}
			iscrtajSopstvene();
			}else{iscrtajSopstvene();}
		}
	});

	}

function iscrtajSopstvene(){
	$.ajax({
		url: 'rest/por/konkrDostSopstvene',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		contentType: "application/json",//content type je sta ti vraca
		success: function(por){
		if(por!=null){
			var divT = $('#po');

			for(var i=0;i<por.length;i++){

				var divzaPor=document.createElement("div");
				divzaPor.style=" border: 2px solid black; float:left;margin-left: 5px;margin-right: 5px;margin-top:5px; margin-bottom:5px;";
				var tab=document.createElement("table");
				var red0=document.createElement("tr");
				red0.style=" border: 2px solid black; background: #35ca57";
				var pog1=document.createElement("th");
				pog1.innerHTML='Naziv artikla';
				pog1.style=" border: 2px solid black; background: #35ca57";
				var pog2=document.createElement("th");
				pog2.innerHTML='Jedinična cena';
				pog2.style=" border: 2px solid black; background: #35ca57";
				var pog3=document.createElement("th");
				pog3.innerHTML='Opis';
				pog3.style=" border: 2px solid black; background: #35ca57";
				var pog4=document.createElement("th");
				pog4.innerHTML='Količina';
				pog4.style=" border: 2px solid black; background: #35ca57";
				var pog5=document.createElement("th");
				pog5.innerHTML='Tip';
				pog5.style=" border: 2px solid black; background: #35ca57";
				var pog6=document.createElement("th");
				pog6.innerHTML='Broj porcija';
				pog6.style=" border: 2px solid black; background: #35ca57";
				red0.append(pog1);
				red0.append(pog2);
				red0.append(pog3);
				red0.append(pog4);
				red0.append(pog5);
				red0.append(pog6);
				tab.append(red0);
				
				for(var j=0;j<por[i].stavke.length;j++){
					var red=document.createElement('tr');
					red.style=" border: 2px solid black";
					var sad1=document.createElement('td');
					sad1.innerHTML=por[i].stavke[j].naziv;
					sad1.style=" border: 2px solid black";
					var sad2=document.createElement('td');
					sad2.innerHTML=por[i].stavke[j].jedinicnaCena;
					sad2.style=" border: 2px solid black";
					var sad3=document.createElement('td');
					var tx=document.createElement("textarea");
					tx.setAttribute('rows', '1');
					tx.setAttribute('cols', '15');
					tx.setAttribute('readonly', 'readonly');
					
					tx.innerHTML=por[i].stavke[j].opis;
					sad3.append(tx);
					
					sad3.style=" border: 2px solid black";
					var sad4=document.createElement('td');
					sad4.innerHTML=por[i].stavke[j].kolicina+" "+por[i].stavke[j].mera;
					sad4.style=" border: 2px solid black";
					var sad5=document.createElement('td');
					sad5.innerHTML=por[i].stavke[j].tip;
					sad5.style=" border: 2px solid black";
					var sad6=document.createElement('td');
					sad6.innerHTML=por[i].kolicina[j];
					sad6.style=" border: 2px solid black";
					
					red.append(sad1);
					red.append(sad2);
					red.append(sad3);
					red.append(sad4);
					red.append(sad5);
					red.append(sad6);
					tab.append(red);
				}
				
				var tab2=document.createElement("table");
				
				var red2=document.createElement("tr");
				var dat=document.createElement("th");
				dat.innerHTML="Datum poručivanja:";
				var dat2=document.createElement("td");
				dat2.innerHTML=por[i].datumIVreme;
				red2.append(dat);
				red2.append(dat2);
				
				var red3=document.createElement("tr");
				var dost=document.createElement("th");
				dost.innerHTML="Dostavljač:";
				var dost2=document.createElement("td");
				if(por[i].dostavljac!=null){
				dost2.innerHTML=por[i].dostavljac.korisnickoIme+" ("+por[i].dostavljac.ime+" "+por[i].dostavljac.prezime+")";
				}else{
				dost2.innerHTML="";
				}
				red3.append(dost);
				red3.append(dost2);
				
				var red8=document.createElement("tr");
				var kup=document.createElement("th");
				kup.innerHTML="Kupac:";
				var kup2=document.createElement("td");
				if(por[i].kupac!=null){
				kup2.innerHTML=por[i].kupac.korisnickoIme+" ("+por[i].kupac.ime+" "+por[i].kupac.prezime+")";
				}else{
				kup2.innerHTML="";
				}
				red8.append(kup);
				red8.append(kup2);
				
				var red4=document.createElement("tr");
				var sta=document.createElement("th");
				sta.innerHTML="Status porudžbine:";
				var sta2=document.createElement("td");
				sta2.innerHTML=por[i].status;
				red4.append(sta);
				red4.append(sta2);
				
				var red5=document.createElement("tr");
				var voz=document.createElement("th");
				voz.innerHTML="Vozilo:";
				var voz2=document.createElement("td");
				if(por[i].vozilo!=null){
				voz2.innerHTML=por[i].vozilo.registarskaOznaka+" ("+por[i].vozilo.marka+" "+por[i].vozilo.model+")";
				}else{
					voz2.innerHTML="";
				}
				red5.append(voz);
				red5.append(voz2);
				
				var red6=document.createElement("tr");
				var nap=document.createElement("th");
				nap.innerHTML="Napomena:";
				var nap2=document.createElement("td");
				var tx2=document.createElement("textarea");
				tx2.setAttribute('rows', '2');
				tx2.setAttribute('cols', '40');
				tx2.setAttribute('readonly', 'readonly');	
				tx2.innerHTML=por[i].napomena;

				nap2.append(tx2);
				red6.append(nap);
				red6.append(nap2);
				
				tab2.append(red2);
				tab2.append(red3);
				tab2.append(red8);
				tab2.append(red4);
				tab2.append(red5);
				tab2.append(red6);
				
				divzaPor.append(tab);
				divzaPor.append(tab2);
				divT.append(divzaPor);
			}
		}
		}
	});

}

function preuzmiPor(datum){
	$.ajax({
		url: 'rest/por/preuzmiPor',
		dataType: "json", //tip onog sto saljem
		data: datum,
		type: "POST",
		contentType: "text/plain",//content type je sta ti vraca
		success: function(por){
			if(por!=null){
				//iscrtajPorudzbineZauzet(por);
				window.location.href="./odabirVozila.html";
			}else{
				alert('Nema slobodnih vozila!');
			}
		}
		});
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function iscrtajPorudzbineZauzet(p1){
	var divT = $('#po');
	divT.empty();
	//alert(p1.datumIVreme);
	var divzaPor=document.createElement("div");
	divzaPor.style=" border: 2px solid black; float:left;margin-left: 5px;margin-right: 5px;margin-top:5px; margin-bottom:5px;";
	var tab=document.createElement("table");
	var red0=document.createElement("tr");
	red0.style=" border: 2px solid black; background: #35ca57";
	var pog1=document.createElement("th");
	pog1.innerHTML='Naziv artikla';
	pog1.style=" border: 2px solid black; background: #35ca57";
	var pog2=document.createElement("th");
	pog2.innerHTML='Jedinična cena';
	pog2.style=" border: 2px solid black; background: #35ca57";
	var pog3=document.createElement("th");
	pog3.innerHTML='Opis';
	pog3.style=" border: 2px solid black; background: #35ca57";
	var pog4=document.createElement("th");
	pog4.innerHTML='Količina';
	pog4.style=" border: 2px solid black; background: #35ca57";
	var pog5=document.createElement("th");
	pog5.innerHTML='Tip';
	pog5.style=" border: 2px solid black; background: #35ca57";
	var pog6=document.createElement("th");
	pog6.innerHTML='Broj porcija';
	pog6.style=" border: 2px solid black; background: #35ca57";
	red0.append(pog1);
	red0.append(pog2);
	red0.append(pog3);
	red0.append(pog4);
	red0.append(pog5);
	red0.append(pog6);
	tab.append(red0);
	
	for(var j=0;j<p1.stavke.length;j++){
		var red=document.createElement('tr');
		red.style=" border: 2px solid black";
		var sad1=document.createElement('td');
		sad1.innerHTML=p1.stavke[j].naziv;
		sad1.style=" border: 2px solid black";
		var sad2=document.createElement('td');
		sad2.innerHTML=p1.stavke[j].jedinicnaCena;
		sad2.style=" border: 2px solid black";
		var sad3=document.createElement('td');
		var tx=document.createElement("textarea");
		tx.setAttribute('rows', '1');
		tx.setAttribute('cols', '15');
		tx.setAttribute('readonly', 'readonly');
		
		tx.innerHTML=p1.stavke[j].opis;
		sad3.append(tx);
		
		
		sad3.style=" border: 2px solid black";
		var sad4=document.createElement('td');
		sad4.innerHTML=p1.stavke[j].kolicina+" "+p1.stavke[j].mera;
		sad4.style=" border: 2px solid black";
		var sad5=document.createElement('td');
		sad5.innerHTML=p1.stavke[j].tip;
		sad5.style=" border: 2px solid black";
		var sad6=document.createElement('td');
		sad6.innerHTML=p1.kolicina[j];
		sad6.style=" border: 2px solid black";
		
		red.append(sad1);
		red.append(sad2);
		red.append(sad3);
		red.append(sad4);
		red.append(sad5);
		red.append(sad6);
		tab.append(red);
	}
		var tab2=document.createElement("table");
		
		var red2=document.createElement("tr");
		var dat=document.createElement("th");
		dat.innerHTML="Datum poručivanja:";
		var dat2=document.createElement("td");
		dat2.innerHTML=p1.datumIVreme;
		red2.append(dat);
		red2.append(dat2);
		
		var red3=document.createElement("tr");
		var dost=document.createElement("th");
		dost.innerHTML="Dostavljač:";
		var dost2=document.createElement("td");
		if(p1.dostavljac!=null){
		dost2.innerHTML=p1.dostavljac.korisnickoIme+" ("+p1.dostavljac.ime+" "+p1.dostavljac.prezime+")";
		}else{
		dost2.innerHTML="";
		}
		red3.append(dost);
		red3.append(dost2);
		
		var red8=document.createElement("tr");
		var kup=document.createElement("th");
		kup.innerHTML="Kupac:";
		var kup2=document.createElement("td");
		if(p1.kupac!=null){
		kup2.innerHTML=p1.kupac.korisnickoIme+" ("+p1.kupac.ime+" "+p1.kupac.prezime+")";
		}else{
		kup2.innerHTML="";
		}
		red8.append(kup);
		red8.append(kup2);
		
		var red4=document.createElement("tr");
		var sta=document.createElement("th");
		sta.innerHTML="Status porudžbine:";
		var sta2=document.createElement("td");
		sta2.innerHTML=p1.status;
		red4.append(sta);
		red4.append(sta2);
		
		var red5=document.createElement("tr");
		var voz=document.createElement("th");
		voz.innerHTML="Vozilo:";
		var voz2=document.createElement("td");
		if(p1.vozilo!=null){
		voz2.innerHTML=p1.vozilo.registarskaOznaka+" ("+p1.vozilo.marka+" "+p1.vozilo.model+")";
		}else{
			voz2.innerHTML="";
		}
		red5.append(voz);
		red5.append(voz2);
		
		var red6=document.createElement("tr");
		var nap=document.createElement("th");
		nap.innerHTML="Napomena:";
		var nap2=document.createElement("td");
		var tx2=document.createElement("textarea");
		tx2.setAttribute('rows', '2');
		tx2.setAttribute('cols', '40');
		tx2.setAttribute('readonly', 'readonly');	
		tx2.innerHTML=p1.napomena;
		//tx2.style="background: #35ca57";

		nap2.append(tx2);
		red6.append(nap);
		red6.append(nap2);
		
		var red7=document.createElement("tr");
		var prazno=document.createElement("td");
		var dgm=document.createElement("td");
		var preuzmi = document.createElement("INPUT");
		preuzmi.setAttribute("type", "button");
		preuzmi.value="Porudžbina dostavljena";
		preuzmi.className="btn btn-success";
		preuzmi.setAttribute("onclick", "dostavljenaPor('"+p1.datumIVreme+"')");
		
		dgm.append(preuzmi);
		red7.append(prazno);
		red7.append(dgm);
		
		tab2.append(red2);
		tab2.append(red3);
		tab2.append(red8);
		tab2.append(red4);
		tab2.append(red5);
		tab2.append(red6);
		tab2.append(red7);
		
		divzaPor.append(tab);
		divzaPor.append(tab2);
		divT.append(divzaPor);


		$.ajax({ //ostale da budu bez dugmeta 
			url: 'rest/por/zauzetDostOstale',
			dataType: "json", //tip onog sto saljem
			type: "GET",
			contentType: "application/json",//content type je sta ti vraca
			success: function(por){
				if(por!=null){
				for(var i=0;i<por.length;i++){

					var divzaPor2=document.createElement("div");
					divzaPor2.style=" border: 2px solid black; float:left;margin-left: 5px;margin-right: 5px;margin-top:5px; margin-bottom:5px;";
					var tab=document.createElement("table");
					var red0=document.createElement("tr");
					red0.style=" border: 2px solid black; background: #35ca57";
					var pog1=document.createElement("th");
					pog1.innerHTML='Naziv artikla';
					pog1.style=" border: 2px solid black; background: #35ca57";
					var pog2=document.createElement("th");
					pog2.innerHTML='Jedinična cena';
					pog2.style=" border: 2px solid black; background: #35ca57";
					var pog3=document.createElement("th");
					pog3.innerHTML='Opis';
					pog3.style=" border: 2px solid black; background: #35ca57";
					var pog4=document.createElement("th");
					pog4.innerHTML='Količina';
					pog4.style=" border: 2px solid black; background: #35ca57";
					var pog5=document.createElement("th");
					pog5.innerHTML='Tip';
					pog5.style=" border: 2px solid black; background: #35ca57";
					var pog6=document.createElement("th");
					pog6.innerHTML='Broj porcija';
					pog6.style=" border: 2px solid black; background: #35ca57";
					red0.append(pog1);
					red0.append(pog2);
					red0.append(pog3);
					red0.append(pog4);
					red0.append(pog5);
					red0.append(pog6);
					tab.append(red0);
					
					for(var j=0;j<por[i].stavke.length;j++){
						var red=document.createElement('tr');
						red.style=" border: 2px solid black";
						var sad1=document.createElement('td');
						sad1.innerHTML=por[i].stavke[j].naziv;
						sad1.style=" border: 2px solid black";
						var sad2=document.createElement('td');
						sad2.innerHTML=por[i].stavke[j].jedinicnaCena;
						sad2.style=" border: 2px solid black";
						var sad3=document.createElement('td');
						//sad3.innerHTML=por[i].stavke[j].opis;
						var tx=document.createElement("textarea");
						tx.setAttribute('rows', '1');
						tx.setAttribute('cols', '15');
						tx.setAttribute('readonly', 'readonly');
						//tx.style="background: #35ca57";
						//tx.style=" background-color: #35ca57;";
						
						tx.innerHTML=por[i].stavke[j].opis;
						sad3.append(tx);
						
						
						sad3.style=" border: 2px solid black";
						var sad4=document.createElement('td');
						sad4.innerHTML=por[i].stavke[j].kolicina+" "+por[i].stavke[j].mera;
						sad4.style=" border: 2px solid black";
						var sad5=document.createElement('td');
						sad5.innerHTML=por[i].stavke[j].tip;
						sad5.style=" border: 2px solid black";
						var sad6=document.createElement('td');
						sad6.innerHTML=por[i].kolicina[j];
						sad6.style=" border: 2px solid black";
						
						red.append(sad1);
						red.append(sad2);
						red.append(sad3);
						red.append(sad4);
						red.append(sad5);
						red.append(sad6);
						tab.append(red);
					}
					
					var tab2=document.createElement("table");
					
					var red2=document.createElement("tr");
					var dat=document.createElement("th");
					dat.innerHTML="Datum poručivanja:";
					var dat2=document.createElement("td");
					dat2.innerHTML=por[i].datumIVreme;
					red2.append(dat);
					red2.append(dat2);
					
					var red3=document.createElement("tr");
					var dost=document.createElement("th");
					dost.innerHTML="Dostavljač:";
					var dost2=document.createElement("td");
					if(por[i].dostavljac!=null){
					dost2.innerHTML=por[i].dostavljac.korisnickoIme+" ("+por[i].dostavljac.ime+" "+por[i].dostavljac.prezime+")";
					}else{
					dost2.innerHTML="";
					}
					red3.append(dost);
					red3.append(dost2);
					
					var red8=document.createElement("tr");
					var kup=document.createElement("th");
					kup.innerHTML="Kupac:";
					var kup2=document.createElement("td");
					if(por[i].kupac!=null){
					kup2.innerHTML=por[i].kupac.korisnickoIme+" ("+por[i].kupac.ime+" "+por[i].kupac.prezime+")";
					}else{
					kup2.innerHTML="";
					}
					red8.append(kup);
					red8.append(kup2);
					
					var red4=document.createElement("tr");
					var sta=document.createElement("th");
					sta.innerHTML="Status porudžbine:";
					var sta2=document.createElement("td");
					sta2.innerHTML=por[i].status;
					red4.append(sta);
					red4.append(sta2);
					
					var red5=document.createElement("tr");
					var voz=document.createElement("th");
					voz.innerHTML="Vozilo:";
					var voz2=document.createElement("td");
					if(por[i].vozilo!=null){
					voz2.innerHTML=por[i].vozilo.registarskaOznaka+" ("+por[i].vozilo.marka+" "+por[i].vozilo.model+")";
					}else{
						voz2.innerHTML="";
					}
					red5.append(voz);
					red5.append(voz2);
					
					var red6=document.createElement("tr");
					var nap=document.createElement("th");
					nap.innerHTML="Napomena:";
					var nap2=document.createElement("td");
					var tx2=document.createElement("textarea");
					tx2.setAttribute('rows', '2');
					tx2.setAttribute('cols', '40');
					tx2.setAttribute('readonly', 'readonly');	
					tx2.innerHTML=por[i].napomena;

					nap2.append(tx2);
					red6.append(nap);
					red6.append(nap2);
					
					tab2.append(red2);
					tab2.append(red3);
					tab2.append(red8);
					tab2.append(red4);
					tab2.append(red5);
					tab2.append(red6);
					
					divzaPor2.append(tab);
					divzaPor2.append(tab2);
					divT.append(divzaPor2);
				}
				}
			}
	
		});
}

function dostavljenaPor(datum){
	$.ajax({
		url: 'rest/por/dostavljenaPor',
		dataType: "json", //tip onog sto saljem
		type: "POST",
		data: datum,
		contentType: "text/plain",//content type je sta ti vraca
		success: function(){
			iscrtajPorudzbineSlobodan();
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
			document.getElementById('logK').innerHTML=data.ime+" "+data.prezime;
			document.getElementById('logK').style="text-decoration: underline";
		}
	});
	

	$.ajax({
		url: 'rest/por/zauzetDost',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		contentType: "application/json",//content type je sta ti vraca
		success: function(data){
			if(data!=null){
			iscrtajPorudzbineZauzet(data);
				
			}else{
			iscrtajPorudzbineSlobodan();
			}
		}
	});
	

	$(document).on('click','#odjavaK',function(e){
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
	
	$(document).on('click','#pA',function(e){
		e.preventDefault();
		window.location.href="./pretragaArtikala2.html";
		
	});
	
	
	$(document).on('click','#re',function(e){
		e.preventDefault();
		window.location.href="./dostavljacMain.html";
		
	});
	
});