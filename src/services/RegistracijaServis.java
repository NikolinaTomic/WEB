package services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Artikaal;
import beans.Artikli;
import beans.Korisnici;
import beans.Korisnik;
import beans.Pomin;
import beans.Restoran;
import beans.Restorani;
import beans.Vozilo;

@Path("/reg")
public class RegistracijaServis {
	@Context
	HttpServletRequest request; //zahtev
	@Context
	HttpServletResponse response;
	@Context
	ServletContext ctx; 

	
	@POST
	@Path("/odjava")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void odjava() {
		ctx.setAttribute("logovani", null);
		ctx.setAttribute("kolicine", new ArrayList<Artikaal>());
		ctx.setAttribute("porudzbina", new ArrayList<Artikaal>());
	}
	
	@POST
	@Path("/provera")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Korisnik registracijaKorisnika(Korisnik k) throws FileNotFoundException, IOException, ClassNotFoundException {
		
		Korisnici postojeci= (Korisnici) ctx.getAttribute("korisnici");
		
		if(postojeci==null) {
			ctx.setAttribute("korisnici", new Korisnici());
			postojeci=(Korisnici) ctx.getAttribute("korisnici");
		}
		for(Korisnik kor: postojeci.getListaKorisnika()) {
			if(kor.getKorisnickoIme().equals(k.getKorisnickoIme())) {
				return null;
			}
		}
		DateFormat df = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	     // Get the date today using Calendar object.
	     java.util.Date today = Calendar.getInstance().getTime();        
	     // Using DateFormat format method we can create a string 
	     // representation of a date with the defined format.
	     String timeAndDate = df.format(today);
	     k.setDatumRegistracije(timeAndDate);
	     k.setUloga("kupac");
	     k.setOmRes(new ArrayList<Restoran>());
	     k.setPorudz(new ArrayList<Pomin>());
	     k.setVozilo(new Vozilo());
	     k.setDodporudz(new ArrayList<Pomin>());
	     
	     postojeci.dodajKorisnika(k);
	     
	     ctx.setAttribute("korisnici", postojeci);
	     return k;
	}
	
	@POST
	@Path("/proveraLog")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Korisnik proveraLogovanja(Korisnik k) {
		/*Korisnici postojeci=(Korisnici) ctx.getAttribute("korisnici");
		
		if(postojeci==null) {
			ctx.setAttribute("korisnici", new Korisnici());
			postojeci=(Korisnici) ctx.getAttribute("korisnici");
		}*/
		Korisnici postojeci= new Korisnici();

		for(Korisnik ko: postojeci.getListaKorisnika()) {
			if(ko.getKorisnickoIme().equals(k.getKorisnickoIme()) && ko.getLozinka().equals(k.getLozinka())) {
				ctx.setAttribute("logovani", ko);
				//System.out.println(ko.getKorisnickoIme());
				
				return ko;	
			}
		}

		return null;
	}
	
	@GET
	@Path("/postojeciArt")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Artikaal> ucitajArt() {
		Artikli a=new Artikli();
		//sa konstruktorom se ucitava fajl
		ArrayList<Artikaal> artikli=new ArrayList<Artikaal>();
		for(Artikaal aa:a.getListaArtikala()) {
			if(aa.isIzbrisan()==false) {
				artikli.add(aa);
			}
		}
		ctx.setAttribute("artikli", artikli);
		return artikli;
	}
	
	@GET
	@Path("/postojeciRest")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Restoran> ucitajRest() {
		Restorani re=new Restorani();
		ArrayList<Restoran> restorani=new ArrayList<Restoran>();
		for(Restoran rr:re.getListaRestorana()) {
			if(rr.isIzbrisan()==false) {
				restorani.add(rr);
			}
		}
		ctx.setAttribute("restorani", restorani);
		

		
		return restorani;
	}
	
	@GET
	@Path("/aa")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Restoran> aa() {
		Restorani re=new Restorani();
	
		return re.getListaRestorana();
	}
	
	@POST
	@Path("/dodArt")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Artikaal> dodajArt(Artikaal a){
		Artikli ax=new Artikli();
		for(Artikaal aa:ax.getListaArtikala()) {
			if(aa.getNaziv().equals(a.getNaziv()) && aa.isIzbrisan()==false) {
				return null;
			}
		}
		ax.dodajArtikal(a);
		//ucitajArt();
		//ctx.setAttribute("artikli", ax.getListaArtikala());
		return ucitajArt();
		
	}
	
	@POST
	@Path("/dodRest")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Restoran> dodajRest(Restoran r){
		Restorani re=new Restorani();

		for(Restoran rr:re.getListaRestorana()) {
			if(rr.getNaziv().equals(r.getNaziv()) && rr.isIzbrisan()==false) {
				return null;
			}
		}
		re.dodajRestoran(r);
		return ucitajRest();	
	}
	
	@POST
	@Path("/izArt")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Artikaal> izbrisiArt(String naz){
		Artikli ax=new Artikli();
		for(Artikaal aa:ax.getListaArtikala()) {
			if(aa.getNaziv().equals(naz) && aa.isIzbrisan()==false) {
				aa.setIzbrisan(true);
				
			}
		}
		try {
			ax.sacuvajArtikle(ax.getListaArtikala());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Restorani re=new Restorani();
		for(Restoran r : re.getListaRestorana()) {
			if(r.isIzbrisan()==false) {
				for(Artikaal aa : r.getListaPica()) {
					if(aa.getNaziv().equals(naz)) {
						aa.setIzbrisan(true);
					}
				}
				for(Artikaal aa : r.getListaJela()) {
					if(aa.getNaziv().equals(naz)) {
						aa.setIzbrisan(true);
					}
				}
			}
		}
		try {
			re.sacuvajRestorane(re.getListaRestorana());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ucitajArt();
	}
	
	@POST
	@Path("/izRes")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Restoran> izbrisiRest(String naz){
		Restorani re=new Restorani();
		for(Restoran rr:re.getListaRestorana()) {
			if(rr.getNaziv().equals(naz) && rr.isIzbrisan()==false) {
				rr.setIzbrisan(true);
			}
		}
	
		try {
			re.sacuvajRestorane(re.getListaRestorana());
		
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Korisnici ko=new Korisnici();
		for(Korisnik k:ko.getListaKorisnika()) {
			for(Restoran r:k.getOmRes()) {
				if(r.getNaziv().equals(naz)) {
					r.setIzbrisan(true);
					
				}
			}
		}
		try {
			ko.sacuvajKorisnike(ko.getListaKorisnika());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return ucitajRest();
	}
	
	@POST
	@Path("/izmArt")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Artikaal> izmeniArt(Artikaal a){
		Artikli ax=new Artikli();
		for(Artikaal aa:ax.getListaArtikala()) {
			if(aa.getNaziv().equals(a.getNaziv()) && aa.isIzbrisan()==false) {
				if(!aa.getNaziv().equals(a.getNaziv())) {
					aa.setNaziv(a.getNaziv());
				}
				if(aa.getJedinicnaCena()!=a.getJedinicnaCena())
					aa.setJedinicnaCena(a.getJedinicnaCena());
				if(!aa.getOpis().equals(a.getOpis()))
					aa.setOpis(a.getOpis());
				if(aa.getKolicina()!=a.getKolicina())
					aa.setKolicina(a.getKolicina());
				if(!aa.getTip().equals(a.getTip())) {
					aa.setTip(a.getTip());
					if(a.getTip().equals("jelo"))
						aa.setMera("g");
					else
						aa.setMera("ml");
				}
			}
		}
		try {
			ax.sacuvajArtikle(ax.getListaArtikala());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Restorani re=new Restorani();
		for(Restoran r: re.getListaRestorana()) {
			for(Artikaal aa:r.getListaJela()) {
				if(aa.getNaziv().equals(a.getNaziv())) {
					if(!aa.getNaziv().equals(a.getNaziv())) {
						aa.setNaziv(a.getNaziv());
					}
					if(aa.getJedinicnaCena()!=a.getJedinicnaCena())
						aa.setJedinicnaCena(a.getJedinicnaCena());
					if(!aa.getOpis().equals(a.getOpis()))
						aa.setOpis(a.getOpis());
					if(aa.getKolicina()!=a.getKolicina())
						aa.setKolicina(a.getKolicina());
					if(!aa.getTip().equals(a.getTip())) {
						aa.setTip(a.getTip());
						if(a.getTip().equals("jelo")) {
							System.out.println("a1");
							aa.setMera("g");
						}else {
							System.out.println("a2");
							aa.setMera("ml");
							aa.setIzbrisan(true);
							r.getListaPica().add(a);
							try {
								re.sacuvajRestorane(re.getListaRestorana());
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
					}
				}
			}
			for(Artikaal aa:r.getListaPica()) {
				if(aa.getNaziv().equals(a.getNaziv())) {
					if(!aa.getNaziv().equals(a.getNaziv())) {
						aa.setNaziv(a.getNaziv());
					}
					if(aa.getJedinicnaCena()!=a.getJedinicnaCena())
						aa.setJedinicnaCena(a.getJedinicnaCena());
					if(!aa.getOpis().equals(a.getOpis()))
						aa.setOpis(a.getOpis());
					if(aa.getKolicina()!=a.getKolicina())
						aa.setKolicina(a.getKolicina());
					if(!aa.getTip().equals(a.getTip())) {
						aa.setTip(a.getTip());
						if(a.getTip().equals("jelo")) {
							System.out.println("b1");
							aa.setMera("g");
							aa.setIzbrisan(true);
							r.getListaJela().add(a);
							try {
								re.sacuvajRestorane(re.getListaRestorana());
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}else {
							aa.setMera("ml");
							System.out.println("b2");
						}
					}
				}
			}
		}
		try {
			re.sacuvajRestorane(re.getListaRestorana());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ucitajArt();
	}
	
	@POST
	@Path("/izmRest")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Restoran> izmeniRest(Restoran r){
		Restorani re=new Restorani();
		for(Restoran rr:re.getListaRestorana()) {
			if(rr.getNaziv().equals(r.getNaziv()) && rr.isIzbrisan()==false) {
				if(!rr.getNaziv().equals(r.getNaziv())) {
					rr.setNaziv(r.getNaziv());
				}
				if(!rr.getAdresa().equals(r.getAdresa())) {
					rr.setAdresa(r.getAdresa());
				}
				if(!rr.getKategorija().equals(r.getKategorija())) {
					rr.setKategorija(r.getKategorija());
				}
			}
		}
		
		try {
			re.sacuvajRestorane(re.getListaRestorana());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Korisnici ko=new Korisnici();
		for(Korisnik k:ko.getListaKorisnika()) {
			for(Restoran rr:k.getOmRes()) {
				if(rr.getNaziv().equals(r.getNaziv()) && rr.isIzbrisan()==false) {
					if(!rr.getNaziv().equals(r.getNaziv())) {
						rr.setNaziv(r.getNaziv());
					}
					if(!rr.getAdresa().equals(r.getAdresa())) {
						rr.setAdresa(r.getAdresa());
					}
					if(!rr.getKategorija().equals(r.getKategorija())) {
						rr.setKategorija(r.getKategorija());
					}
				}
			}
		}
		try {
			ko.sacuvajKorisnike(ko.getListaKorisnika());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ucitajRest();
	}
	
	@POST
	@Path("/nadjiArt")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Artikaal nadjArt(String naz){
		Artikli ax=new Artikli();
		for(Artikaal aa:ax.getListaArtikala()) {
			if(aa.getNaziv().equals(naz) && aa.isIzbrisan()==false) {
				return aa;
			}
		}
		return null;
	}
	
	@POST
	@Path("/nadjiArt2")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Artikaal nadjArt2(String naz){
		int br=naz.lastIndexOf("!");
		String ree=naz.substring(0,br);
		String arr=naz.substring(br+1,naz.length());

		Artikaal nadjen=new Artikaal();
		Artikli ax=new Artikli();
		for(Artikaal aa:ax.getListaArtikala()) {
			//System.out.println(aa.getNaziv());
			if(aa.getNaziv().equals(arr) && aa.isIzbrisan()==false) {
				nadjen=aa;
			
			}
		}
		
		Restorani rrr=new Restorani();
		for(Restoran r:rrr.getListaRestorana()) {
			if(r.getNaziv().equals(ree) && r.isIzbrisan()==false) {
				if(nadjen.getTip().equals("jelo")) {
				if(r.getListaJela().size()==0) {
					//r.setListaJela(new HashMap<Artikaal, Boolean>());
					//r.getListaJela().put(nadjen, false);
					r.setListaJela(new ArrayList<Artikaal>());
					r.getListaJela().add(nadjen);
					////System.out.println(r.getNaziv());
				}
				else {
					//r.getListaJela().put(nadjen,false);
					r.getListaJela().add(nadjen);
				}
			}
			else {
				if(r.getListaPica().size()==0) {
					//r.setListaPica(new HashMap<Artikaal, Boolean>());
					//r.getListaPica().put(nadjen,false);
					r.setListaPica(new ArrayList<Artikaal>());
					r.getListaPica().add(nadjen);
				}
				else {
					//r.getListaPica().put(nadjen,false);
					r.getListaPica().add(nadjen);
				}
			}
		}
		}
		try {
			rrr.sacuvajRestorane(rrr.getListaRestorana());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return nadjen;
	}
	
	@POST
	@Path("/izbaciEle")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public void izbaciElement(String naz){
		int br=naz.lastIndexOf("!");
		String ree=naz.substring(0,br);
		String arr=naz.substring(br+1,naz.length());

		Artikaal nadjen=new Artikaal();
		Artikli ax=new Artikli();
		for(Artikaal aa:ax.getListaArtikala()) {
			if(aa.getNaziv().equals(arr) && aa.isIzbrisan()==false) {
				nadjen=aa;
				break;
			}
		}
		
		Restorani rrr=new Restorani();
	
		for(Restoran r:rrr.getListaRestorana()) {
			if(r.getNaziv().equals(ree) && r.isIzbrisan()==false) {
				if(nadjen.getTip().equals("jelo")) {
					//r.getListaJela().replace(nadjen, true);
					for(Artikaal aa: r.getListaJela()) {
						if(aa.getNaziv().equals(nadjen.getNaziv()) && aa.isIzbrisan()==false) {
							aa.setIzbrisan(true);
							//System.out.println(aa.getNaziv());
							break;
						}
					}
			}else {
				//r.getListaPica().replace(nadjen, true);
				for(Artikaal aa: r.getListaPica()) {
					if(aa.getNaziv().equals(nadjen.getNaziv()) && aa.isIzbrisan()==false) {
						aa.setIzbrisan(true);
						break;
					}
				}
			}
			}
		}
		try {
			rrr.sacuvajRestorane(rrr.getListaRestorana());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	@POST
	@Path("/nadjiRest")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Restoran nadjRest(String naz){
		Restorani re=new Restorani();
		for(Restoran rr:re.getListaRestorana()) {
			if(rr.getNaziv().equals(naz) && rr.isIzbrisan()==false) {
				return rr;
			}
		}
		return null;
	}
	
	@GET
	@Path("/ucitajPica")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	//public HashMap<Artikaal,Boolean> ucitatiPica(){
	public ArrayList<Artikaal> ucitatiPica(){
		Artikli a=new Artikli();
		//HashMap<Artikaal,Boolean> pica=new HashMap<Artikaal,Boolean>();
		ArrayList<Artikaal> pica=new ArrayList<Artikaal>();
		for(Artikaal aa:a.getListaArtikala()) {
			if(aa.getTip().equals("pice") && aa.isIzbrisan()==false) {
			//	pica.put(aa,false);
				pica.add(aa);
			}
		}

		return pica;	
	}
	
	@GET
	@Path("/ucitajJela")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	//public HashMap<Artikaal,Boolean> ucitatiJela(){
	public ArrayList<Artikaal> ucitatiJela(){
		Artikli a=new Artikli();
		//HashMap<Artikaal,Boolean> pica=new HashMap<Artikaal,Boolean>();
		ArrayList<Artikaal> pica=new ArrayList<Artikaal>();
		for(Artikaal aa:a.getListaArtikala()) {
			if(aa.getTip().equals("jelo") && aa.isIzbrisan()==false) {
				//pica.put(aa,false);
				pica.add(aa);
			}
		}
		return pica;	
	}
}


