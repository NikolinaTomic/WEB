function izabranoVozilo(reg){
	
	$.ajax({
		url: 'rest/voz/odabrano',
		dataType: "json", //tip onog sto saljem
		type: "POST",
		data:reg,
		contentType: "text/plain",//content type je sta ti vraca
		success: function(){
			window.location.href="./dostavljacPorudz.html";
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
		url: 'rest/voz/slobodna',
		dataType: "json", //tip onog sto saljem
		type: "GET",
		contentType: "application/json",//content type je sta ti vraca
		success: function(v){
			var divT = $('#dov');
			divT.empty();
			var tabela=document.createElement("table");
			var red0=document.createElement("tr");
			var z1=document.createElement("th");
			var z2=document.createElement("th");
			var z3=document.createElement("th");
			var z4=document.createElement("th");
			var z5=document.createElement("th");
			var z6=document.createElement("th");
			z1.style=" border: 2px solid green ";
			z2.style=" border: 2px solid green ";
			z3.style=" border: 2px solid green ";
			z4.style=" border: 2px solid green ";
			z5.style=" border: 2px solid green ";
			z6.style=" border: 2px solid green ";


			z1.innerHTML="Marka";
			z2.innerHTML="Model";
			z3.innerHTML="Tip";
			z4.innerHTML="Registarska oznaka";
			z5.innerHTML="Godina proizvodnje";
			z6.innerHTML="Napomena";
			
			red0.append(z1);
			red0.append(z2);
			red0.append(z3);
			red0.append(z4);
			red0.append(z5);
			red0.append(z6);
			tabela.append(red0);
			
			for(var i=0;i<v.length;i++){
				
				var red1=document.createElement("tr");
				var sad1=document.createElement("td");
				var sad2=document.createElement("td");
				var sad3=document.createElement("td");
				var sad4=document.createElement("td");
				var sad5=document.createElement("td");
				var sad6=document.createElement("td");
				var sad7=document.createElement("td");
				
				sad1.style=" border: 2px solid green ";
				sad2.style=" border: 2px solid green ";
				sad3.style=" border: 2px solid green ";
				sad4.style=" border: 2px solid green ";
				sad5.style=" border: 2px solid green ";
				sad6.style=" border: 2px solid green ";
				sad7.style=" border: 2px solid green ";

				sad1.innerHTML=v[i].marka;
				sad2.innerHTML=v[i].model;
				sad3.innerHTML=v[i].tip;
				sad4.innerHTML=v[i].registarskaOznaka;
				sad5.innerHTML=v[i].godinaProizvodnje;
				var tx=document.createElement("textarea");
				tx.setAttribute('rows', '1');
				tx.setAttribute('cols', '15');
				tx.setAttribute('readonly', 'readonly');		
				tx.innerHTML=v[i].napomena;
				sad6.append(tx);
				
				var preuzmi = document.createElement("INPUT");
				preuzmi.setAttribute("type", "button");
				preuzmi.value="Izaberi";
				preuzmi.className="btn btn-success";
				preuzmi.setAttribute("onclick", "izabranoVozilo('"+v[i].registarskaOznaka+"')");
				sad7.append(preuzmi);
				
				red1.append(sad1);
				red1.append(sad2);
				red1.append(sad3);
				red1.append(sad4);
				red1.append(sad5);
				red1.append(sad6);
				red1.append(sad7);
				tabela.append(red1);
			}
			divT.append(tabela);
		}
	});
	
});