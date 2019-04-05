
function nacrtajProizvode(ar){
	var divT = $('#tabpor');
	divT.empty();

	var tabela=document.createElement("table");
	tabela.style=" border: 2px solid black";
	tabela.setAttribute("id","tabb");
	var red=document.createElement("tr");
	var zaglavlje=document.createElement("th");
	zaglavlje.innerHTML="Artikli:";
	zaglavlje.style=" border: 2px solid black; background: #35ca57";
	red.append(zaglavlje);
	
	for(var i=0;i<ar.length;i++){
		var naz=document.createElement("td");
		naz.innerHTML=ar[i].naziv;
		naz.style=" border: 2px solid black";
		red.append(naz);
	}
	
	tabela.append(red);
	divT.append(tabela);
}

function nacrtajPorcije(ar){
	var tab = $('#tabb');

	var red=document.createElement("tr");
	red.style=" border: 2px solid black";
	var zaglavlje=document.createElement("th");
	zaglavlje.style=" border: 2px solid black; background:#35ca57";
	zaglavlje.innerHTML="Broj porcija:";
	red.append(zaglavlje);
	
	for(var i=0;i<ar.length;i++){
		var naz=document.createElement("td");
		naz.innerHTML=ar[i];
		naz.style=" border: 2px solid black";
		red.append(naz);
	}
	
	tab.append(red);
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
			
			url: 'rest/por/vratiArt',
			dataType: "json", //tip onog sto saljem
			type: "GET",
			contentType: "application/json",
			success: function(data){
			
				nacrtajProizvode(data);
			}
			
		});
	$.ajax({
	
		url: 'rest/por/vratiPorc',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		contentType: "application/json",
		success: function(data){
			nacrtajPorcije(data);
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
	
	$(document).on('click','#aa',function(e){
		e.preventDefault();
		window.location.href="./artikliAdmin.html";
		
	});
	
	$(document).on('click','#pp',function(e){
		e.preventDefault();
		window.location.href="./mainPor.html";
	});
	$(document).on('click','#kk',function(e){
		e.preventDefault();
		window.location.href="./korisniciAdmin.html";
	});
	$(document).on('click','#vv',function(e){
		e.preventDefault();
		window.location.href="./vozilaAdmin.html";
	});
	$(document).on('click','#re',function(e){
		e.preventDefault();
		window.location.href="./mainAdmin.html";
	});
	
	$(document).on('submit','#odP',function(e){
		e.preventDefault();
		$.ajax({
			
			url: 'rest/por/obrisiPor',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			contentType: "application/json",
			success: function(){
				alert('Porudžbina je obrisana!');
				window.location.href="./mainAdmin.html";
		}
		});
	});
	
	$(document).on('submit','#zavP',function(e){
		e.preventDefault();
		var nap=document.getElementById("napo").value;
		
		$.ajax({
			
			url: 'rest/por/dodajPorAdmin',
			dataType: "json", //tip onog sto saljem
			type: "POST",
			data: nap,
			contentType: "text/plain",
			success: function(data){
				if(data==3){
				window.location.href="./izaberiKupca.html";
				document.getElementById("napo").value="";
				}else if(data==1){
					alert('Porudžbina je prazna');
				}
				else if(data==2){
					alert('Trenutno nema slobodnog dostavljača, ne možete poručiti');
				}else if(data==4){
					alert('Trenutno nema slobodnih vozila, ne možete poručiti');
				}
		}
		});
	});
	
});