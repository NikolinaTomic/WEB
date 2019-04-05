package beans;

public class Artikaal {
	public Artikaal(String naziv, double jedinicnaCena, String opis, double kolicina, String tip, String mera, boolean izbrisan) {
		super();
		this.naziv = naziv;
		this.jedinicnaCena = jedinicnaCena;
		this.opis = opis;
		this.kolicina = kolicina;
		this.tip = tip;
		this.mera = mera;
		this.izbrisan=izbrisan;
	}
	private String naziv;
	private double jedinicnaCena;
	private String opis;
	private double kolicina; //grami ili mililitri
	private String tip;
	private String mera;
	private boolean izbrisan;
	
	public Artikaal() {
		naziv="";
		jedinicnaCena=0;
		opis="";
		kolicina=0;
		tip="";
		mera="";
		izbrisan=false;
	}
	
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public double getJedinicnaCena() {
		return jedinicnaCena;
	}
	public void setJedinicnaCena(double jedinicnaCena) {
		this.jedinicnaCena = jedinicnaCena;
	}
	public String getOpis() {
		return opis;
	}
	public void setOpis(String opis) {
		this.opis = opis;
	}
	public double getKolicina() {
		return kolicina;
	}
	public void setKolicina(double kolicina) {
		this.kolicina = kolicina;
	}
	public String getTip() {
		return tip;
	}
	public void setTip(String tip) {
		this.tip = tip;
	}
	public String getMera() {
		return mera;
	}
	public void setMera(String mera) {
		this.mera = mera;
	}

	public boolean isIzbrisan() {
		return izbrisan;
	}

	public void setIzbrisan(boolean izbrisan) {
		this.izbrisan = izbrisan;
	}
	

}
