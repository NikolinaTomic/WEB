function pretraziRest(){
	var naz=document.getElementById("nazr").value;
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
				iscrtajRK(data);

			}else{
				alert("Cena mora biti broj!");
			}
		}
	});
	
}


function iscrtajRK(restorani){
	var sviResDiv = $('#resK');
	sviResDiv.empty();
	for(var i=0;i<restorani.length;i++){
		if(restorani[i].izbrisan==false){
		var divZaSvakiRestoran = document.createElement("div");
		var f = document.createElement("form");
		
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
		prikazi.setAttribute("onclick", "prikaziRK('"+restorani[i].naziv+"')");

		tabelaArtikala.append(red);
		tabelaArtikala.append(red2);
		tabelaArtikala.append(red3);
		tabelaArtikala.append(red4);
		
		f.append(tabelaArtikala);
		
		divZaSvakiRestoran.append(f);

		sviResDiv.append(divZaSvakiRestoran);
		}
		
	}

}


function prikaziRK(naziv){
	$.ajax({
		url: 'rest/reg/nadjiRest',
		type: 'POST',
		data: naziv,
		contentType: "text/plain",
		dataType: "json",
		success: function(data){
			if(data != null){
	

				$('#prikaziRestK').attr('hidden',false);
				
				document.getElementById('npk').innerHTML=data.naziv;
				document.getElementById('apk').innerHTML=data.adresa;
				document.getElementById('kpk').innerHTML=data.kategorija;
				
				var tabela = $('#jjelak');

				var y = document.getElementById("jjelak").rows.length;
				for(var j = y - 1; j > 0; j--){
					//alert('a');
					document.getElementById("jjelak").deleteRow(j);
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
		
					tabela.append(red);
			
					}
				}

				var tabela = $('#ppicak');

				var x = document.getElementById("ppicak").rows.length;
				for(var i = x - 1; i > 0; i--){
					//alert('a');
					document.getElementById("ppicak").deleteRow(i);
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

					tabela.append(red);
					
					}
				}
				window.scrollTo(0,0);
			}else{

			}
		},
		error: function(){
			alert('greska');
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
		url: 'rest/reg/postojeciRest',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		contentType: "application/json",//content type je sta ti vraca
		success: function(data){
			iscrtajRK(data);
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
	
	$(document).on('click','#svi',function(e){
		e.preventDefault();
		$('#prikaziRestK').attr('hidden',true);
		$('#pretragaR').attr('hidden',false);
		document.getElementById('nas').innerHTML='Restorani';
		$.ajax({
			
			url: 'rest/reg/postojeciRest',
			dataType: "json", //tip onog sto saljem
			type: "GET",
			//data: JSON., //sta saljes,samo kad je post..kastujem jer iz xml ide u json
			contentType: "application/json",
			success: function(data){
			
				iscrtajRK(data);
			}
			
		});
	});
	
	$(document).on('click','#dom',function(e){
		e.preventDefault();
		var pret="domacaKuhinja";
		$('#pretragaR').attr('hidden',false);
		$('#prikaziRestK').attr('hidden',true);
		document.getElementById('nas').innerHTML='Restorani';
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
			
				iscrtajRK(data);
			}
			
		});
	});
	
	$(document).on('click','#ros',function(e){
		e.preventDefault();
		var pret="rostilj";
		$('#prikaziRestK').attr('hidden',true);
		$('#pretragaR').attr('hidden',false);
		document.getElementById('nas').innerHTML='Restorani';
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
				iscrtajRK(data);
			}
			
		});
	});
	
	$(document).on('click','#kin',function(e){
		e.preventDefault();
		var pret="kineskiRestoran";
		$('#prikaziRestK').attr('hidden',true);
		$('#pretragaR').attr('hidden',false);
		document.getElementById('nas').innerHTML='Restorani';
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
				iscrtajRK(data);
			}
			
		});
	});
	
	$(document).on('click','#ind',function(e){
		e.preventDefault();
		var pret="indijskiRestoran";
		$('#prikaziRestK').attr('hidden',true);
		$('#pretragaR').attr('hidden',false);
		document.getElementById('nas').innerHTML='Restorani';
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
				iscrtajRK(data);
			}
			
		});
	});
	
	$(document).on('click','#posl',function(e){
		e.preventDefault();
		var pret="poslasticarnica";
		$('#prikaziRestK').attr('hidden',true);
		$('#pretragaR').attr('hidden',false);
		document.getElementById('nas').innerHTML='Restorani';
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
				iscrtajRK(data);
			}
			
		});
	});
	
	$(document).on('click','#pic',function(e){
		e.preventDefault();
		var pret="picerija";
		$('#prikaziRestK').attr('hidden',true);
		$('#pretragaR').attr('hidden',false);
		document.getElementById('nas').innerHTML='Restorani';
		$.ajax({
			url: 'rest/ku/kategorije',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: pret,
			contentType: "text/plain",//content type je sta ti vraca
			success: function(data){
				iscrtajRK(data);
			}
			
		});
	});

	$(document).on('submit','#prikaziRestK',function(e){
		e.preventDefault();
		$('#prikaziRestK').attr('hidden',true);
	});

	
	$(document).on('submit','#pretragaR',function(e){
		e.preventDefault();
		pretraziRest();
		document.getElementById("nazr").value="";
		document.getElementById("arr").value="";
		document.getElementById("karr").selectedIndex=0;
		$('#prikaziRestK').attr('hidden',true);
	});
	
	$(document).on('click','#pA',function(e){
		e.preventDefault();
		$('#prikaziRestK').attr('hidden',true);
		window.location.href="./pretragaArtikala2.html";
		
	});
	
	$(document).on('click','#vp',function(e){
		e.preventDefault();
		$('#prikaziRestK').attr('hidden',true);
		window.location.href="./dostavljacPorudz.html";
	});
	
	
	
});