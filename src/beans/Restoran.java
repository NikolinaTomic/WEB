package beans;

import java.util.ArrayList;

public class Restoran {
	//public Restoran(String naziv, String adresa, String kategorija, boolean izbrisan, HashMap<Artikaal, Boolean> listaJela,
	//		HashMap<Artikaal, Boolean> listaPica) {
	public Restoran(String naziv, String adresa, String kategorija, boolean izbrisan, ArrayList<Artikaal> listaJela,ArrayList<Artikaal> listaPica) {
		super();
		this.naziv = naziv;
		this.adresa = adresa;
		this.kategorija = kategorija;
		this.izbrisan = izbrisan;
		this.setListaJela(listaJela);
		this.setListaPica(listaPica);
	}

	private String naziv;
	private String adresa;
	private String kategorija;
	private boolean izbrisan;
	//public enum kategorija{domacaKuhinja,rostilj,kineskiRestoran,indijskiRestoran,poslesticarnica,picerija};
	//private HashMap<Artikaal, Boolean>  listaJela;
	//private HashMap<Artikaal, Boolean>  listaPica;
	private ArrayList<Artikaal>  listaJela;
	private ArrayList<Artikaal> listaPica;
	public Restoran() {
		naziv="";
		adresa="";
		kategorija="";
		//setListaJela(new HashMap<Artikaal, Boolean>());
		//setListaPica(new HashMap<Artikaal, Boolean>());
		listaJela=new ArrayList<Artikaal>();
		listaPica=new ArrayList<Artikaal>();
		setIzbrisan(false);
	}
	
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public String getAdresa() {
		return adresa;
	}
	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public String getKategorija() {
		return kategorija;
	}
	public void setKategorija(String kategorija) {
		this.kategorija = kategorija;
	}

	public boolean isIzbrisan() {
		return izbrisan;
	}

	public void setIzbrisan(boolean izbrisan) {
		this.izbrisan = izbrisan;
	}

	public ArrayList<Artikaal> getListaJela() {
		return listaJela;
	}

	public void setListaJela(ArrayList<Artikaal> listaJela) {
		this.listaJela = listaJela;
	}

	public ArrayList<Artikaal> getListaPica() {
		return listaPica;
	}

	public void setListaPica(ArrayList<Artikaal> listaPica) {
		this.listaPica = listaPica;
	}

/*	public HashMap<Artikaal, Boolean> getListaJela() {
		return listaJela;
	}

	public void setListaJela(HashMap<Artikaal, Boolean> listaJela) {
		this.listaJela = listaJela;
	}

	public HashMap<Artikaal, Boolean> getListaPica() {
		return listaPica;
	}

	public void setListaPica(HashMap<Artikaal, Boolean> listaPica) {
		this.listaPica = listaPica;
	}*/


}
