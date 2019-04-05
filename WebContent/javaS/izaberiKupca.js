function izabranKu(ime){
	$.ajax({
		url: 'rest/por/zalepiKupca',
		dataType: "json", //tip onog sto saljem
		type: "POST",
		data: ime,
		contentType: "text/plain",//content type je sta ti vraca
		success: function(data){
			window.location.href="./izaberiDost.html";
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
		url: 'rest/por/sviKupci',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		contentType: "application/json",//content type je sta ti vraca
		success: function(v){
			var divT = $('#slob');
			divT.empty();
			var tabela=document.createElement("table");
			var red0=document.createElement("tr");
			var z1=document.createElement("th");
			var z2=document.createElement("th");
			var z3=document.createElement("th");
			var z4=document.createElement("th");
			var z5=document.createElement("th");
			z1.style=" border: 2px solid green ";
			z2.style=" border: 2px solid green ";
			z3.style=" border: 2px solid green ";
			z4.style=" border: 2px solid green ";
			z5.style=" border: 2px solid green ";

			z1.innerHTML="Ime";
			z2.innerHTML="Prezime";
			z3.innerHTML="Korisničko ime";
			z4.innerHTML="E-mail adresa";
			z5.innerHTML="Kontakt telefon";

			red0.append(z1);
			red0.append(z2);
			red0.append(z3);
			red0.append(z4);
			red0.append(z5);
			tabela.append(red0);
			
			for(var i=0;i<v.length;i++){
				
				var red1=document.createElement("tr");
				var sad1=document.createElement("td");
				var sad2=document.createElement("td");
				var sad3=document.createElement("td");
				var sad4=document.createElement("td");
				var sad5=document.createElement("td");

				var sad7=document.createElement("td");
				
				sad1.style=" border: 2px solid green ";
				sad2.style=" border: 2px solid green ";
				sad3.style=" border: 2px solid green ";
				sad4.style=" border: 2px solid green ";
				sad5.style=" border: 2px solid green ";
				sad7.style=" border: 2px solid green ";

				sad1.innerHTML=v[i].ime;
				sad2.innerHTML=v[i].prezime;
				sad3.innerHTML=v[i].korisnickoIme;
				sad4.innerHTML=v[i].emailAdresa;
				sad5.innerHTML=v[i].kontaktTelefon;
			
				var preuzmi = document.createElement("INPUT");
				preuzmi.setAttribute("type", "button");
				preuzmi.value="Izaberi";
				preuzmi.className="btn btn-success";
				preuzmi.setAttribute("onclick", "izabranKu('"+v[i].korisnickoIme+"')");
				sad7.append(preuzmi);
				
				red1.append(sad1);
				red1.append(sad2);
				red1.append(sad3);
				red1.append(sad4);
				red1.append(sad5);
				red1.append(sad7);
				tabela.append(red1);
			}
			divT.append(tabela);
		}
	});
	
	
});