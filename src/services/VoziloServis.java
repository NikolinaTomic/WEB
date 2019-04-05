package services;

import java.io.IOException;
import java.util.ArrayList;

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

import beans.Korisnici;
import beans.Korisnik;
import beans.Porudzbinaa;
import beans.Porudzbine;
import beans.Vozila;
import beans.Vozilo;

@Path("/voz")
public class VoziloServis {
	@Context
	HttpServletRequest request; //zahtev
	@Context
	HttpServletResponse response;
	@Context
	ServletContext ctx; 
	
	@GET
	@Path("/postojeciVoz")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Vozilo> ucitajVoz() {
		Vozila vo=new Vozila();
		
		//sa konstruktorom se ucitava fajl
		ctx.setAttribute("vozila", vo.getListaVozila());
		return vo.getListaVozila();
	}
	
	@POST
	@Path("/dodVoz")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Vozilo> dodajVoz(Vozilo v){
		Vozila vo=new Vozila();
		for(Vozilo vv:vo.getListaVozila()) {
			if(vv.getRegistarskaOznaka().equals(v.getRegistarskaOznaka()) && vv.isIzbrisan()==false) {
				return null;
			}
		}
		v.setUpotreba("ne");
		vo.dodajVozilo(v);
		return ucitajVoz();
		
	}
	
	@POST
	@Path("/izVoz")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Vozilo> izbrisiVoz(String reg){
		Vozila vo=new Vozila();
		for(Vozilo vv:vo.getListaVozila()) {
			if(vv.getRegistarskaOznaka().equals(reg) && vv.isIzbrisan()==false) {
				vv.setIzbrisan(true);
			}
		}

		try {
			vo.sacuvajVozila(vo.getListaVozila());

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ucitajVoz();
	}
	
	@POST
	@Path("/izmVoz")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Vozilo> izmeniVoz(Vozilo v){
		Vozila vo=new Vozila();
		for(Vozilo vv:vo.getListaVozila()) {
			if(vv.getRegistarskaOznaka().equals(v.getRegistarskaOznaka()) && vv.isIzbrisan()==false) {
			if(!vv.getMarka().equals(v.getMarka())) {
				vv.setMarka(v.getMarka());
			}
			if(!vv.getModel().equals(v.getModel())) {
				vv.setModel(v.getModel());
			}
			if(!vv.getTip().equals(v.getTip())) {
				vv.setTip(v.getTip());
			}
			if(!vv.getGodinaProizvodnje().equals(v.getGodinaProizvodnje())) {
				vv.setGodinaProizvodnje(v.getGodinaProizvodnje());
			}
			if(!vv.getRegistarskaOznaka().equals(v.getRegistarskaOznaka())) {
				vv.setRegistarskaOznaka(v.getRegistarskaOznaka());
			}
			if(!vv.getNapomena().equals(v.getNapomena())) {
				vv.setNapomena(v.getNapomena());
			}
			if(!vv.getUpotreba().equals(v.getUpotreba())) {
				vv.setUpotreba(v.getUpotreba());
			}
			}
		}
		
		try {
			vo.sacuvajVozila(vo.getListaVozila());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ucitajVoz();
	}
	
	@POST
	@Path("/nadjiVoz")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public Vozilo nadjArt(String reg){
		Vozila vo=new Vozila();
		for(Vozilo vv:vo.getListaVozila()) {
			if(vv.getRegistarskaOznaka().equals(reg)) {
				
				return vv;
			}
		}

		return null;
	}
	
	@GET
	@Path("/slobodna")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Vozilo> slobodnaVoz() {
		Vozila vo=new Vozila();
		ArrayList<Vozilo> slobodna=new ArrayList<Vozilo>();
		for(Vozilo v:vo.getListaVozila()) {
			if(v.getUpotreba().equals("ne") && v.isIzbrisan()==false) {
				slobodna.add(v);
			}
		}
		return slobodna;
	}
	
	@GET
	@Path("/uloga")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String uloga() {
		Korisnik logovani=(Korisnik) ctx.getAttribute("logovani");
		Korisnici ko=new Korisnici();
		String uloga="";
		for(Korisnik k:ko.getListaKorisnika()) {
			if(k.getKorisnickoIme().equals(logovani.getKorisnickoIme())) {
				uloga=k.getUloga();
			}
		}
		System.out.println(uloga);
		return uloga;
	}
	
	@POST
	@Path("/odabrano")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public void odabranoVoz(String reg) {
		Vozila vo=new Vozila();
		Vozilo nadjen=new Vozilo();
		for(Vozilo v:vo.getListaVozila()) {
			if(v.getRegistarskaOznaka().equals(reg) && v.isIzbrisan()==false) {
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
		Korisnik logovani=(Korisnik) ctx.getAttribute("logovani");
		for(Porudzbinaa p:po.getPorudzbine()) {
			if(p.getDostavljac()!=null) {
			if(p.getDostavljac().getKorisnickoIme().equals(logovani.getKorisnickoIme()) && p.getStatus().equals("dostava u toku")  && p.isIzbrisan()==false) {
				p.setVozilo(nadjen);
				try {
					po.sacuvajPorudzbine(po.getPorudzbine());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			}
		}
	/*	Korisnici ko=new Korisnici();
		for(Korisnik k:ko.getListaKorisnika()) {
			for(Pomin pp:k.getPorudz()) {
				for(Porudzbinaa p:po.getPorudzbine()) {
					if(pp.getDatum().equals(p.getDatumIVreme())) {
				if(pp.getDostavljac()!=null) {
				if(pp.getDostavljac().getKorisnickoIme().equals(logovani.getKorisnickoIme()) && pp.getStatus().equals("dostava u toku") && pp.isIzbrisan()==false) {
					pp.setVozilo(nadjen);
					try {
						ko.sacuvajKorisnike(ko.getListaKorisnika());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				}
				}
				}
			}*/
		/*	for(Porudzbina pp:k.getDodporudz()) {
				if(pp.getStatus().equals("dostava u toku") && pp.isIzbrisan()==false) {
					pp.setVozilo(nadjen);
					try {
						ko.sacuvajKorisnike(ko.getListaKorisnika());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}*/
	//	}
	}
}
