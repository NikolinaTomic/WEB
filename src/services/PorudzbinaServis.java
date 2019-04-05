package services;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import javax.servlet.ServletContext;
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
import beans.Porudzbinaa;
import beans.Porudzbine;
import beans.Vozila;
import beans.Vozilo;

@Path("/por")
public class PorudzbinaServis {
@Context
ServletContext ctx;

@POST
@Path("/izabranoVoziloIzDost")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON) 
public void vozIzmDost(String reg) {
	Vozila vo=new Vozila();
	Vozilo nadjen=new Vozilo();
	for(Vozilo v:vo.getListaVozila()) {
		if(v.getRegistarskaOznaka().equals(reg)) {
			v.setUpotreba("da");
			nadjen=v;
			try {
				vo.sacuvajVozila(vo.getListaVozila());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	Porudzbine po=new Porudzbine();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.isIzmena()==true) {

			p.setVozilo(nadjen);
			p.setIzmena(false);
			
			try {
				po.sacuvajPorudzbine(po.getPorudzbine());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}


}


@POST
@Path("/izabranDostIzm")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON) 
public Pomin izabranDostIzmena(String ime) {
	Korisnici ko=new Korisnici();
	Korisnik noviD=new Korisnik();
	Korisnik stariD=new Korisnik();
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getKorisnickoIme().equals(ime)) {
			noviD=k;
			
		}
	}
	boolean nemaVoz=false;
	Porudzbine po=new Porudzbine();
	Porudzbinaa nadjena=new Porudzbinaa();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.isIzmena()==true && p.isIzbrisan()==false) {
			stariD=p.getDostavljac();
			if(stariD==null) {
				p.setStatus("dostava u toku");
				nemaVoz=true;
			}else {
				p.setIzmena(false);
			}
			p.setDostavljac(noviD);
			
		
			nadjena=p;
			
		}
	}
	try {
		po.sacuvajPorudzbine(po.getPorudzbine());
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	Pomin nova=new Pomin();
	nova.setDatum(nadjena.getDatumIVreme());
	nova.setStatus(nadjena.getStatus());
	
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getUloga().equals("dostavljac")) {
		for(Pomin p:k.getDodporudz()) {
			if(p.getDatum().equals(nadjena.getDatumIVreme())) {
				p.setIzbrisan(true);
			
			}
		}
		}
	}
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getUloga().equals("dostavljac")) {
			if(k.getKorisnickoIme().equals(noviD.getKorisnickoIme())) {
			
				if(k.getDodporudz().size()==0) {
					k.setDodporudz(new ArrayList<Pomin>());
					
					k.getDodporudz().add(nova);
				}else {
				k.getDodporudz().add(nova);
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
	
	if(nemaVoz==true) {
		return null;
	}else {
		return nova;
	}
	
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


@GET
@Path("/slobDostima")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Korisnik> slobDostimaLi(){
	boolean zauzet=false;
	Korisnici ko=new Korisnici();
	ArrayList<Korisnik> slob=new ArrayList<Korisnik>();
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getUloga().equals("dostavljac")) {
			for(Pomin p:k.getDodporudz()) {
				if(p.isIzbrisan()==false && p.getStatus().equals("dostava u toku")) {
					zauzet=true;
				}
			}
			if(zauzet) {
				zauzet=false;
			}else{
				slob.add(k);
				
			}
		}
	}
	if(slob.size()==0) {
		return null;
	}else {
		return slob;
	}
	
}

@POST
@Path("/izmeniKupca")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public void izmeniKupca(String datum){
	Porudzbine po=new Porudzbine();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.getDatumIVreme().equals(datum)) {
			p.setIzmena(true);
			try {
				po.sacuvajPorudzbine(po.getPorudzbine());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
}


@POST
@Path("/izmeniKupcaNastavak")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public void izmeniKupca2(String ime){
	Korisnik novi=new Korisnik();
	Korisnik stari=new Korisnik();

	Korisnici ko=new Korisnici();
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getKorisnickoIme().equals(ime)) {
			novi=k;
		}
	}
	Porudzbine po=new Porudzbine();
	//Porudzbinaa ta=new Porudzbinaa();
	Pomin ta=new Pomin();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.isIzmena()==true) {
			stari=p.getKupac();
	
			p.setIzmena(false);
			p.setKupac(novi);
			//ta=p;
			ta.setDatum(p.getDatumIVreme());
			ta.setStatus(p.getStatus());
			try {
				po.sacuvajPorudzbine(po.getPorudzbine());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getKorisnickoIme().equals(ime)) {
			k.getPorudz().add(ta);
		}
		if(k.getKorisnickoIme().equals(stari.getKorisnickoIme())) {
			for(Pomin p:k.getPorudz()) {
				if(p.getDatum().equals(ta.getDatum())) {
					p.setIzbrisan(true);
				}
			}
		}
		/*if(ta.getDostavljac()!=null) {
			if(k.getKorisnickoIme().equals(ta.getDostavljac().getKorisnickoIme())) {
				for(Porudzbinaa p:k.getDodporudz()) {
					if(p.getDatumIVreme().equals(ta.getDatumIVreme())) {
						p.setKupac(novi);
					}
				}
			}
		}*/
	}
	try {
		ko.sacuvajKorisnike(ko.getListaKorisnika());
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
}

@POST
@Path("/izmeniDost")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public int izmeniDost(String datum){

	boolean zauzet=false;
	Korisnici ko=new Korisnici();
	ArrayList<Korisnik> slob=new ArrayList<Korisnik>();
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getUloga().equals("dostavljac")) {
			for(Pomin p:k.getDodporudz()) {
				if(p.isIzbrisan()==false && p.getStatus().equals("dostava u toku")) {
					zauzet=true;
				}
			}
			if(zauzet) {
				zauzet=false;
			}else{
				slob.add(k);
				
			}
		}
	}
	if(slob.size()==0) {
		return 1;
	}
	
	boolean voziS=false;
	Vozila vo=new Vozila();
	for(Vozilo v:vo.getListaVozila()) {
		if(v.getUpotreba().equals("ne")) {
			voziS=true;
		}
	}
	if(voziS==false) {return 2;}
	
	Porudzbine po=new Porudzbine();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.getDatumIVreme().equals(datum)) {
			p.setIzmena(true);
			try {
				po.sacuvajPorudzbine(po.getPorudzbine());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	return 3;
}

@POST
@Path("/obrisiPorAdmin")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Porudzbinaa> obrisiPorAdmin(String datum) {
	Porudzbine po=new Porudzbine();
	Vozilo nadjenV=new Vozilo();
	Korisnik nadjenDost=new Korisnik();
	Korisnik nadjenKup=new Korisnik();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.getDatumIVreme().equals(datum) && p.isIzbrisan()==false) {
			nadjenV=p.getVozilo();
			nadjenDost=p.getDostavljac();
			nadjenKup=p.getKupac();
			p.setIzbrisan(true);

			try {
				po.sacuvajPorudzbine(po.getPorudzbine());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	Korisnici ko=new Korisnici();
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getKorisnickoIme().equals(nadjenDost.getKorisnickoIme())) {
			for(Pomin pp:k.getDodporudz()) {
				if(pp.getDatum().equals(datum)) {
					pp.setIzbrisan(true);
				}
			}
		}
		if(k.getKorisnickoIme().equals(nadjenKup.getKorisnickoIme())) {
			for(Pomin pp:k.getPorudz()) {
				if(pp.getDatum().equals(datum)) {
					pp.setIzbrisan(true);
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
	Vozila vo=new Vozila();
	for(Vozilo vv:vo.getListaVozila()) {
		if(vv.getRegistarskaOznaka().equals(nadjenV.getRegistarskaOznaka())) {
			vv.setUpotreba("ne");
			try {
				vo.sacuvajVozila(vo.getListaVozila());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	return svePor();
}

@GET
@Path("/svePor")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Porudzbinaa> svePor(){
	Porudzbine por=new Porudzbine();
	ArrayList<Porudzbinaa> p=new ArrayList<Porudzbinaa>();
	for(Porudzbinaa pp:por.getPorudzbine()) {
		if(pp.isIzbrisan()==false) {
			p.add(pp);
		}
	}
	return p;
}

@SuppressWarnings("unchecked")
@POST
@Path("/dodajUPor")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public Artikaal dodajUPorudzbinu(String spoj) {
	int presek=spoj.lastIndexOf("+");
	String kol=spoj.substring(presek+1, spoj.length());
	String naz=spoj.substring(0,presek);
	Artikli a=new Artikli();
	Artikaal nadjen=new Artikaal();
	for(Artikaal aa:a.getListaArtikala()) {
		if(aa.getNaziv().equals(naz) && aa.isIzbrisan()==false) {
			nadjen=aa;
		}
	}

	ArrayList<Artikaal> art=(ArrayList<Artikaal>) ctx.getAttribute("porudzbina");
	if(art==null) {
		ctx.setAttribute("porudzbina", new ArrayList<Artikaal>());
		art= (ArrayList<Artikaal>) ctx.getAttribute("porudzbina");
	}
	ArrayList<Integer> porc=(ArrayList<Integer>) ctx.getAttribute("kolicine");
	if(porc==null) {
		ctx.setAttribute("kolicine", new ArrayList<Artikaal>());
		porc= (ArrayList<Integer>) ctx.getAttribute("kolicine");
	}
	int porcije=0;
	try {
		porcije=Integer.parseInt(kol);

		art.add(nadjen);
		porc.add(porcije);
		ctx.setAttribute("kolicine", porc);
		ctx.setAttribute("porudzbina", art);
		return nadjen;
	} catch (Exception e) {
		// TODO: handle exception
		return null;
	}
}

@SuppressWarnings("unchecked")
@GET
@Path("/vratiArt")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Artikaal> vracanjeArt(){
	ArrayList<Artikaal> art=(ArrayList<Artikaal>) ctx.getAttribute("porudzbina");
	if(art==null) {
		ctx.setAttribute("porudzbina", new ArrayList<Artikaal>());
		art= (ArrayList<Artikaal>) ctx.getAttribute("porudzbina");
	}
	
	return art;
}

@SuppressWarnings("unchecked")
@GET
@Path("/vratiPorc")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Integer> vracanjePorc(){
	ArrayList<Integer> porc=(ArrayList<Integer>) ctx.getAttribute("kolicine");
	if(porc==null) {
		ctx.setAttribute("kolicine", new ArrayList<Artikaal>());
		porc= (ArrayList<Integer>) ctx.getAttribute("kolicine");
	}
	return porc;
}

@POST
@Path("/obrisiPor")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public void obrisiPor(){
	ctx.setAttribute("kolicine", new ArrayList<Artikaal>());
	ctx.setAttribute("porudzbina", new ArrayList<Artikaal>());
}

@SuppressWarnings("unchecked")
@POST
@Path("/dodajPor")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public Porudzbinaa dodajPor(String nap){
	ArrayList<Artikaal> arti= (ArrayList<Artikaal>) ctx.getAttribute("porudzbina");
	if(arti.size()==0) {return null;}
	ArrayList<Integer> kol= (ArrayList<Integer>) ctx.getAttribute("kolicine");
	Porudzbinaa p=new Porudzbinaa();
	p.setStatus("poruceno");
	p.setKolicina(kol);
	p.setStavke(arti);
	p.setNapomena(nap);
	DateFormat df = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    java.util.Date today = Calendar.getInstance().getTime();        
    String timeAndDate = df.format(today);
    p.setDatumIVreme(timeAndDate);
    Korisnik k=(Korisnik) ctx.getAttribute("logovani");
	p.setKupac(k);
	p.setDostavljac(null);
	p.setVozilo(null);
	
	Korisnici ko=new Korisnici();
	for(Korisnik kk : ko.getListaKorisnika()) { //dodajem da i korisnik
		if(kk.getKorisnickoIme().equals(k.getKorisnickoIme())) {
			Pomin nova=new Pomin();
			nova.setDatum(p.getDatumIVreme());
			nova.setStatus(p.getStatus());
			kk.getPorudz().add(nova);
			try {
				ko.sacuvajKorisnike(ko.getListaKorisnika());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	Porudzbine por=new Porudzbine(); //i porudzbine imaju tu por
	por.getPorudzbine().add(p);
	//por.dodajPorudzbinu(p);
	try {
		por.sacuvajPorudzbine(por.getPorudzbine());
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	ctx.setAttribute("kolicine", new ArrayList<Artikaal>());
	ctx.setAttribute("porudzbina", new ArrayList<Artikaal>());
	return p;
	
}

@GET
@Path("/postojecePor")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Porudzbinaa> postojecePor(){
	Korisnik logovani=(Korisnik) ctx.getAttribute("logovani");
	Korisnici ko=new Korisnici();
	ArrayList<Porudzbinaa> por=new ArrayList<Porudzbinaa>();
	Porudzbine po=new Porudzbine();
	for(Korisnik kk: ko.getListaKorisnika()) {
		if(kk.getKorisnickoIme().equals(logovani.getKorisnickoIme())) {
			for(Pomin p:kk.getPorudz()) {
				for(Porudzbinaa x:po.getPorudzbine()) {
					if(p.getDatum().equals(x.getDatumIVreme())) {
						if(p.isIzbrisan()==false) {
							por.add(x);
						}
					}
				}
			}
		}
	}
	return por;
}

@GET
@Path("/konkrDost")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Porudzbinaa> konrkDost(){ //ako nema dostavljaca

	ArrayList<Porudzbinaa> por=new ArrayList<Porudzbinaa>();
	
	Porudzbine po=new Porudzbine();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.getStatus().equals("poruceno") && p.getDostavljac()==null && p.isIzbrisan()==false) {
			por.add(p);
		//	System.out.println(p.getDatumIVreme());
		}
	}
return por;	
}

@GET
@Path("/konkrDostSopstvene")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Porudzbinaa> konrkDost2(){ //njegove porudzbine
	Korisnik logovani=(Korisnik) ctx.getAttribute("logovani");
	ArrayList<Porudzbinaa> por=new ArrayList<Porudzbinaa>();
	Porudzbine po=new Porudzbine();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.getDostavljac()!=null) {
			if(p.getDostavljac().getKorisnickoIme().equals(logovani.getKorisnickoIme()) && p.isIzbrisan()==false) {
				por.add(p);
			}
		}
	}
return por;	
}


@GET
@Path("/zauzetDost")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public Porudzbinaa zauzetDost(){
	Korisnik logovani=(Korisnik) ctx.getAttribute("logovani");
	Porudzbine po=new Porudzbine();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.getDostavljac()!=null) {
		if(p.getStatus().equals("dostava u toku") && p.getDostavljac().getKorisnickoIme().equals(logovani.getKorisnickoIme()) && p.isIzbrisan()==false) {
			return p;
		}
		}
	}
	return null;
	
}

@GET
@Path("/zauzetDostOstale")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON) //dugme dostavi ima samo 1 por a ovo su ostale koje nemaju dugme(njegove stare i nove sto nemaju dost)
public ArrayList<Porudzbinaa> zauzetDostOstale(){
	Korisnik logovani=(Korisnik) ctx.getAttribute("logovani");
	Porudzbine po=new Porudzbine();
	ArrayList<Porudzbinaa> por=new ArrayList<Porudzbinaa>();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.isIzbrisan()==false) {
		if(p.getStatus().equals("poruceno") || (p.getDostavljac().getKorisnickoIme().equals(logovani.getKorisnickoIme()) && p.getStatus().equals("dostavljeno"))) {
			por.add(p);
		}
		}
	}
	return por;
}

@POST
@Path("/preuzmiPor")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public Porudzbinaa preuzmiPor(String datum){
	Korisnik logovani=(Korisnik) ctx.getAttribute("logovani");
	Porudzbine po=new Porudzbine();
	Korisnici ko=new Korisnici();

	Vozila vo=new Vozila();
	ArrayList<Vozilo> slob=new ArrayList<Vozilo>();
	for(Vozilo v:vo.getListaVozila()) {
		if(v.getUpotreba().equals("ne") && v.isIzbrisan()==false) {
			slob.add(v);
		}
	}
	if(slob.size()==0) {return null;}
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.getDatumIVreme().equals(datum)) {
			p.setStatus("dostava u toku");
			p.setDostavljac(logovani);
			try {
				po.sacuvajPorudzbine(po.getPorudzbine());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			for(Korisnik k:ko.getListaKorisnika()) {
				if(k.getKorisnickoIme().equals(logovani.getKorisnickoIme())) {
					Pomin nova=new Pomin();
					nova.setDatum(p.getDatumIVreme());
					nova.setStatus("dostava u toku");
				
					k.getDodporudz().add(nova);
					ctx.setAttribute("logovani", k);
					try {
						ko.sacuvajKorisnike(ko.getListaKorisnika());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			/*	for(Porudzbinaa pp:k.getPorudz()) {
					if(pp.getDatumIVreme().equals(p.getDatumIVreme())) {
						pp.setStatus("dostava u toku");
						pp.setDostavljac(logovani);
						try {
							ko.sacuvajKorisnike(ko.getListaKorisnika());
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}*/
			}
			
			return p;
		}
	}
	return null;
}

@POST
@Path("/dostavljenaPor")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public void dostavljenaPor(String datum){
	Korisnik logovani=(Korisnik) ctx.getAttribute("logovani");
	Porudzbine po=new Porudzbine();
	Korisnici ko=new Korisnici();
	Vozilo v=new Vozilo();

	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.getDatumIVreme().equals(datum)) {
			p.setStatus("dostavljeno");
			v=p.getVozilo();
			try {
				po.sacuvajPorudzbine(po.getPorudzbine());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			for(Korisnik k:ko.getListaKorisnika()) {
				if(k.getKorisnickoIme().equals(logovani.getKorisnickoIme())) {
					for(Pomin pp:k.getDodporudz()) {
						if(pp.getDatum().equals(datum)) {
							pp.setStatus("dostavljeno");
							ctx.setAttribute("logovani", k);
						}
					}
					try {
						ko.sacuvajKorisnike(ko.getListaKorisnika());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				/*for(Pomin pp:k.getPorudz()) {
					if(pp.getDatum().equals(p.getDatumIVreme())) {
						pp.setStatus("dostavljeno");
						pp.setDostavljac(logovani);
						try {
							ko.sacuvajKorisnike(ko.getListaKorisnika());
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}*/
			}

		}
	}
	Vozila vo=new Vozila();
	for(Vozilo vv:vo.getListaVozila()) {
		if(v!=null) {
		if(vv.getRegistarskaOznaka().equals(v.getRegistarskaOznaka()) && vv.isIzbrisan()==false) {
			vv.setUpotreba("ne");
			try {
				vo.sacuvajVozila(vo.getListaVozila());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	}

}

@SuppressWarnings("unchecked")
@POST
@Path("/dodajPorAdmin")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public int dodajPorAdmin(String nap){
	ArrayList<Artikaal> arti= (ArrayList<Artikaal>) ctx.getAttribute("porudzbina");
	if(arti.size()==0) {return 1;}
	ArrayList<Integer> kol= (ArrayList<Integer>) ctx.getAttribute("kolicine");
	
	
	boolean zauzet=false;
	Korisnici ko=new Korisnici();
	ArrayList<Korisnik> slob=new ArrayList<Korisnik>();
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getUloga().equals("dostavljac")) {
			for(Pomin p:k.getDodporudz()) {
				if(p.isIzbrisan()==false && p.getStatus().equals("dostava u toku")) {
					zauzet=true;
				}
			}
			if(zauzet) {
				zauzet=false;
			}else{
				slob.add(k);
				
			}
		}
	}
	if(slob.size()==0) {
		return 2;
	}
	
	boolean voziS=false;
	Vozila vo=new Vozila();
	for(Vozilo v:vo.getListaVozila()) {
		if(v.getUpotreba().equals("ne")) {
			voziS=true;
		}
	}
	if(voziS==false) {return 4;}

	Porudzbinaa p=new Porudzbinaa();
	p.setStatus("dostava u toku");
	p.setKolicina(kol);
	p.setStavke(arti);
	p.setNapomena(nap);
	DateFormat df = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    java.util.Date today = Calendar.getInstance().getTime();        
    String timeAndDate = df.format(today);
    p.setDatumIVreme(timeAndDate);
   // Korisnik k=(Korisnik) ctx.getAttribute("logovani");
	p.setKupac(null);
	p.setDostavljac(null);
	p.setVozilo(null);
	p.setIzmena(true);
	
	Porudzbine por=new Porudzbine(); //i porudzbine imaju tu por
	por.getPorudzbine().add(p);
	//por.dodajPorudzbinu(p);
	try {
		por.sacuvajPorudzbine(por.getPorudzbine());
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	ctx.setAttribute("kolicine", new ArrayList<Artikaal>());
	ctx.setAttribute("porudzbina", new ArrayList<Artikaal>());
	return 3;
	
}

@GET
@Path("/sviKupci")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Korisnik> sviKupci(){
	Korisnici ko=new Korisnici();
	ArrayList<Korisnik> kupci=new ArrayList<Korisnik>();
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getUloga().equals("kupac")) {
			kupci.add(k);
		}
	}
	return kupci;
	}


@POST
@Path("/zalepiKupca")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public void zalepiKupca(String naz){
	Korisnik nadjen =new Korisnik();
	Korisnici ko=new Korisnici();
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getKorisnickoIme().equals(naz)) { nadjen=k;}
	}
	
	Porudzbine po=new Porudzbine();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.isIzmena()==true) {
			if(nadjen.getUloga().equals("kupac")) {
				p.setKupac(nadjen);
			}else {
				p.setDostavljac(nadjen);
			}
			try {
				po.sacuvajPorudzbine(po.getPorudzbine());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}

@POST
@Path("/zalepiVozilo")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public void zalepiVozilo(String reg){
	Vozilo nadjeno=new Vozilo();
	Vozila vo=new Vozila();
	Korisnik kupac=new Korisnik();
	Korisnik dost=new Korisnik();
	
	for(Vozilo v:vo.getListaVozila()) {
		if(v.getRegistarskaOznaka().equals(reg)) {
			v.setUpotreba("da");
			nadjeno=v;
			try {
				vo.sacuvajVozila(vo.getListaVozila());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	Porudzbinaa ta=new Porudzbinaa();
	Porudzbine po=new Porudzbine();
	for(Porudzbinaa p:po.getPorudzbine()) {
		if(p.isIzmena()==true) {
			p.setVozilo(nadjeno);
			p.setIzmena(false);
			ta=p;
			kupac=p.getKupac();
			dost=p.getDostavljac();
			try {
				po.sacuvajPorudzbine(po.getPorudzbine());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	Korisnici ko=new Korisnici();
	for(Korisnik k:ko.getListaKorisnika()) {
		Pomin nova=new Pomin();
		nova.setDatum(ta.getDatumIVreme());
		nova.setStatus(ta.getStatus());
		if(k.getKorisnickoIme().equals(kupac.getKorisnickoIme())) {
			
			k.getPorudz().add(nova);
		}else if(k.getKorisnickoIme().equals(dost.getKorisnickoIme())) {
			k.getDodporudz().add(nova);
		}
	}
	try {
		ko.sacuvajKorisnike(ko.getListaKorisnika());
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

}

}
