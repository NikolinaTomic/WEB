
function noviKor() {
	return JSON.stringify({
		"korisnickoIme":$('#k_ime').val(),
		"lozinka":$('#lozinka').val(),
		"ime":$('#ime').val(),
		"prezime":$('#prezime').val(),
		"kontaktTelefon":$('#telefon').val(),
		"emailAdresa":$('#email').val()
		
	});
}

$(document).ready(function(){
	$(document).on('submit','#regForm',function(e){
		e.preventDefault();
		
		var ime=document.getElementsByName('ime')[0].value;
		var prezime=document.getElementsByName('prezime')[0].value;
		var telefon=document.getElementsByName('telefon')[0].value;
		var email=document.getElementsByName('email')[0].value;
		var korisnickoime=document.getElementsByName('korisnickoime')[0].value;
		var lozinka=document.getElementsByName('lozinka')[0].value;
		var back=true;


		if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
			document.getElementsByName('email')[0].style.background='red';
			alert("Pogrešna forma email adrese!");
			back=false;
		}
		
		if(!ime){
			document.getElementsByName('ime')[0].style.background='red';
			back=false;
		}
		
		if(!ime.match(/^[a-zA-zšŠđĐčČćĆžŽ-]{2,30}$/)){
			document.getElementsByName('ime')[0].style.background='red';
			alert("Ime ne sme sadržati karaktere koji nisu slova! Izuzev u slučaju 2 imena (npr Ana-Marija)");
			back=false;
		}
		
		if(!prezime.match(/^[a-zA-zđĐšŠžŽćĆčČ ]{2,30}$/)){
			document.getElementsByName('prezime')[0].style.background='red';
			alert("Prezime ne sme sadržati karaktere koji nisu slova! Izuzev u slučaju 2 prezimena (npr Vasić Pavlović)");
			back=false;
		}
		
		if(!prezime){
			document.getElementsByName('prezime')[0].style.background='red';
			back=false;
		}
		if(telefon){
			if(!telefon.match(/^[0-9]{5,12}$/)){
				document.getElementsByName('telefon')[0].style.background = 'red';
				back = false;
				alert("Telefon moraju biti samo brojevi bez karaktera (od 5 do 12 cifara)!");
			}
		}	
		
		if(!email){
			document.getElementsByName('email')[0].style.background='red';
			back=false;
		}
		
		
		if(!korisnickoime){
			document.getElementsByName('korisnickoime')[0].style.background='red';
			back=false;
		}
		if(!lozinka){
			document.getElementsByName('lozinka')[0].style.background='red';
			back=false;
		}
		
		if(!back){
			alert("Popunite obeležena polja!");
		}else{

			$.ajax({
				
				url: 'rest/reg/provera',
				dataType: "json", //tip onog sto saljem
				type: "POST",
				data: noviKor(), //sta saljes,samo kad je post..kastujem jer iz xml ide u json
				contentType: "application/json",//content type je sta ti vraca
				success: function(data){ //data ako nesto vraca-return
					if(data!=null){
					alert('Uspešno');
					window.location.href="./pocetna.html"
					}else{
						alert('Već postoji to korisničko ime!');
						$('#postojikor').attr('hidden', false); 
					}
				},
				
				
			});

			
		}
		
	});
	
});