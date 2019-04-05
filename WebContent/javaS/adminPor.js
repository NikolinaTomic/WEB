function iscrtajPorudzbine(por){
	var divT = $('#pop');
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
		var dost3=document.createElement("td");
		var promD = document.createElement("INPUT");
		promD.setAttribute("type", "button");
		promD.value="Izmeni dostavljača";
		promD.className="btn btn-success";
		promD.setAttribute("onclick", "promeniD('"+por[i].datumIVreme+"')");
	
		dost3.append(promD);
		red3.append(dost);
		red3.append(dost2);
		red3.append(dost3);
		
		var red8=document.createElement("tr");
		var kup=document.createElement("th");
		kup.innerHTML="Kupac:";
		var kup2=document.createElement("td");
		if(por[i].kupac!=null){
		kup2.innerHTML=por[i].kupac.korisnickoIme+" ("+por[i].kupac.ime+" "+por[i].kupac.prezime+")";
		}else{
		kup2.innerHTML="";
		}
		var kup3=document.createElement("td");
		var promK = document.createElement("INPUT");
		promK.setAttribute("type", "button");
		promK.value="Izmeni kupca";
		promK.className="btn btn-success";
		promK.setAttribute("onclick", "promeniK('"+por[i].datumIVreme+"')");
		kup3.append(promK);
		red8.append(kup);
		red8.append(kup2);
		red8.append(kup3);
		
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
		tx2.setAttribute('rows', '3');
		tx2.setAttribute('cols', '30');
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
		preuzmi.value="Izbriši porudžbinu";
		preuzmi.className="btn btn-success";
		preuzmi.setAttribute("onclick", "izbrisiPor('"+por[i].datumIVreme+"')");
		
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
}

function promeniD(dat){
	$.ajax({
		url: 'rest/por/izmeniDost',
		dataType: "json", //tip onog sto saljem
		type: "POST",
		data: dat,
		contentType: "text/plain",//content type je sta ti vraca
		success: function(data){
			if(data==3){
			window.location.href="./izaberiDost2.html";
			}else if(data==1){
				alert('Svi dostavljači su zauzeti!');
			}
			else if(data==2){
				alert('Sva vozila su zauzeta!');
			}
		}
	});
}

function promeniK(dat){
	$.ajax({
		url: 'rest/por/izmeniKupca',
		dataType: "json", //tip onog sto saljem
		type: "POST",
		data: dat,
		contentType: "text/plain",//content type je sta ti vraca
		success: function(data){
			window.location.href="./izaberiKupca2.html";
		}
	});
}

function izbrisiPor(dat){
	$.ajax({
		url: 'rest/por/obrisiPorAdmin',
		dataType: "json", //tip onog sto saljem
		type: "POST",
		data: dat,
		contentType: "text/plain",//content type je sta ti vraca
		success: function(data){
			iscrtajPorudzbine(data);
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
		url: 'rest/por/svePor',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		contentType: "application/json",//content type je sta ti vraca
		success: function(data){
			if(data!=null){
			iscrtajPorudzbine(data);
			}
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
	
});