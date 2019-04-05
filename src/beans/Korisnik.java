package beans;

import java.util.ArrayList;

public class Korisnik { 
	public Korisnik(String korisnickoIme, String lozinka, String ime, String prezime, String uloga,
			String kontaktTelefon, String emailAdresa, String datumRegistracije, ArrayList<Restoran> omRes,
			ArrayList<Pomin> porudz, Vozilo vozilo, ArrayList<Pomin> dodporudz) {
		super();
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.uloga = uloga;
		this.kontaktTelefon = kontaktTelefon;
		this.emailAdresa = emailAdresa;
		this.datumRegistracije = datumRegistracije;
		this.setOmRes(omRes);
		this.setPorudz(porudz);
		this.setVozilo(vozilo);
		this.setDodporudz(dodporudz);
	}
	private String korisnickoIme;
	private String lozinka;
	private String ime;
	private String prezime;
	private String uloga; //korisnik,admin i dostavljac
	private String kontaktTelefon;//napraviti proveru na ovo
	private String emailAdresa; //isto
	private String datumRegistracije; //isto
	
	private ArrayList<Restoran> omRes;
	private ArrayList<Pomin> porudz;
	private Vozilo vozilo;
	private ArrayList<Pomin> dodporudz;
	
	public Korisnik() {
		korisnickoIme="";
		lozinka="";
		ime="";
		prezime="";
		uloga="";
		kontaktTelefon="";
		emailAdresa="";
		datumRegistracije="";
		setOmRes(new ArrayList<Restoran>());
		setPorudz(new ArrayList<Pomin>());
		setVozilo(new Vozilo());
		setDodporudz(new ArrayList<Pomin>());
		
	}
	
	
	



	public String getKorisnickoIme() {
		return korisnickoIme;
	}
	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}
	public String getLozinka() {
		return lozinka;
	}
	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}
	public String getIme() {
		return ime;
	}
	public void setIme(String ime) {
		this.ime = ime;
	}
	public String getPrezime() {
		return prezime;
	}
	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}
	public String getKontaktTelefon() {
		return kontaktTelefon;
	}
	public void setKontaktTelefon(String kontaktTelefon) {
		this.kontaktTelefon = kontaktTelefon;
	}
	public String getEmailAdresa() {
		return emailAdresa;
	}
	public void setEmailAdresa(String emailAdresa) {
		this.emailAdresa = emailAdresa;
	}
	public String getDatumRegistracije() {
		return datumRegistracije;
	}
	public void setDatumRegistracije(String datumRegistracije) {
		this.datumRegistracije = datumRegistracije;
	}
	public String getUloga() {
		return uloga;
	}
	public void setUloga(String uloga) {
		this.uloga = uloga;
	}






	public ArrayList<Restoran> getOmRes() {
		return omRes;
	}






	public void setOmRes(ArrayList<Restoran> omRes) {
		this.omRes = omRes;
	}






	public ArrayList<Pomin> getPorudz() {
		return porudz;
	}






	public void setPorudz(ArrayList<Pomin> porudz) {
		this.porudz = porudz;
	}






	public Vozilo getVozilo() {
		return vozilo;
	}






	public void setVozilo(Vozilo vozilo) {
		this.vozilo = vozilo;
	}






	public ArrayList<Pomin> getDodporudz() {
		return dodporudz;
	}






	public void setDodporudz(ArrayList<Pomin> dodporudz) {
		this.dodporudz = dodporudz;
	}

}
