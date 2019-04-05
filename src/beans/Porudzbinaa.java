package beans;

import java.util.ArrayList;

public class Porudzbinaa {
	private ArrayList<Artikaal> stavke;
	private ArrayList<Integer> kolicina;
	private String datumIVreme;
	private Korisnik kupac;
	private Korisnik dostavljac;
	private String status;
	private String napomena;
	private Vozilo vozilo;
	private boolean izbrisan;
	private boolean izmena;
	
	public Porudzbinaa() {
		stavke=new ArrayList<Artikaal>();
		kolicina=new ArrayList<Integer>();
		datumIVreme="";
		kupac=new Korisnik();
		dostavljac=new Korisnik();
		status="";
		napomena="";
		vozilo=new Vozilo();
		izbrisan=false;
		izmena=false;
	}

	public String getDatumIVreme() {
		return datumIVreme;
	}
	public void setDatumIVreme(String datumIVreme) {
		this.datumIVreme = datumIVreme;
	}
	public Korisnik getKupac() {
		return kupac;
	}
	public void setKupac(Korisnik kupac) {
		this.kupac = kupac;
	}
	public Korisnik getDostavljac() {
		return dostavljac;
	}
	public void setDostavljac(Korisnik dostavljac) {
		this.dostavljac = dostavljac;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getNapomena() {
		return napomena;
	}
	public void setNapomena(String napomena) {
		this.napomena = napomena;
	}
	public ArrayList<Artikaal> getStavke() {
		return stavke;
	}
	public void setStavke(ArrayList<Artikaal> stavke) {
		this.stavke = stavke;
	}
	public ArrayList<Integer> getKolicina() {
		return kolicina;
	}
	public void setKolicina(ArrayList<Integer> kolicina) {
		this.kolicina = kolicina;
	}

	public Vozilo getVozilo() {
		return vozilo;
	}

	public void setVozilo(Vozilo vozilo) {
		this.vozilo = vozilo;
	}

	public boolean isIzbrisan() {
		return izbrisan;
	}

	public void setIzbrisan(boolean izbrisan) {
		this.izbrisan = izbrisan;
	}

	public boolean isIzmena() {
		return izmena;
	}

	public void setIzmena(boolean izmena) {
		this.izmena = izmena;
	}
	

}
