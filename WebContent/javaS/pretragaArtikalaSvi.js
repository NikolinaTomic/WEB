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
		divZaSvakiRestoran.style=" border: 2px dotted black; background-color: #35ca57; border: 2px dotted black; width: 250px; float: left; height:160px; margin-right:20px; margin-bottom:20px;";
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

	
		f.append(tabelaArtikala);
		divZaSvakiRestoran.append(f);

		sviArtDiv.append(divZaSvakiRestoran);
	}
	}	
}

$(document).ready(function(){

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
	
	$(document).on('click','#odjavaK',function(e){
		e.preventDefault();
		window.location.href="./pocetna.html";
		
	});

	
	$(document).on('click','#re',function(e){
		e.preventDefault();
		window.location.href="./sviSadrzaj.html";
	});
	
	$(document).on('submit','#pretraga',function(e){
		e.preventDefault();
		pretraziArt();
		document.getElementById("repp").value="";
		document.getElementById("nappa").value="";
		document.getElementById("cepp").value="";
		document.getElementById("tippa").selectedIndex=0;
	});
	
});