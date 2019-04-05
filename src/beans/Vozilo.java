package beans;

public class Vozilo {
	public Vozilo(String marka, String model, String tip, String registarskaOznaka, String godinaProizvodnje,
			String napomena, String upotreba, boolean izbrisan) {
		super();
		this.marka = marka;
		this.model = model;
		this.tip = tip; //bicikl,skuter,automobil
		this.registarskaOznaka = registarskaOznaka;
		this.godinaProizvodnje = godinaProizvodnje;
		this.napomena = napomena;
		this.upotreba = upotreba;
		this.izbrisan = izbrisan;
	}

	private String marka;
	private String model;
	private String tip;
	//public enum tip{bicikl,skuter,automobil};////
	private String registarskaOznaka; ///
	private String godinaProizvodnje;///
	private String napomena;
	private String upotreba;
	private boolean izbrisan;
	
	public Vozilo() {
		marka="";
		model="";
		tip="";
		registarskaOznaka="";
		godinaProizvodnje="";
		setUpotreba("");
		napomena="";
		izbrisan=false;
	}
	
	public String getMarka() {
		return marka;
	}
	public void setMarka(String marka) {
		this.marka = marka;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getRegistarskaOznaka() {
		return registarskaOznaka;
	}
	public void setRegistarskaOznaka(String registarskaOznaka) {
		this.registarskaOznaka = registarskaOznaka;
	}
	public String getGodinaProizvodnje() {
		return godinaProizvodnje;
	}
	public void setGodinaProizvodnje(String godinaProizvodnje) {
		this.godinaProizvodnje = godinaProizvodnje;
	}
	
	public String getNapomena() {
		return napomena;
	}
	public void setNapomena(String napomena) {
		this.napomena = napomena;
	}
	public String getTip() {
		return tip;
	}
	public void setTip(String tip) {
		this.tip = tip;
	}

	public String getUpotreba() {
		return upotreba;
	}

	public void setUpotreba(String upotreba) {
		this.upotreba = upotreba;
	}

	public boolean isIzbrisan() {
		return izbrisan;
	}

	public void setIzbrisan(boolean izbrisan) {
		this.izbrisan = izbrisan;
	}

}
