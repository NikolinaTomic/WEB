package beans;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

public class Korisnici {
private ArrayList<Korisnik> listaKorisnika;
	
	public Korisnici() {
		ucitajKorisnike();
	}

	public ArrayList<Korisnik> getListaKorisnika() {
		return listaKorisnika;
	}

	public void setListaKorisnika(ArrayList<Korisnik> listaKorisnika) {
		this.listaKorisnika = listaKorisnika;
	}
	
	public void defaultniKorisnici() {
		Korisnik admin=new Korisnik("admin","admin","admin","admin","administrator","0645456","admin.@dfgdfg.com","24/10/2019 16:23:13",new ArrayList<Restoran>(),new ArrayList<Pomin>(),new Vozilo(),new ArrayList<Pomin>());
		Korisnik nina=new Korisnik("Nina","nina","Nina","Tomic","administrator","0602145","asd.@dfgdfg.com","24/12/2019 16:23:13",new ArrayList<Restoran>(),new ArrayList<Pomin>(),new Vozilo(),new ArrayList<Pomin>());
		Korisnik masa=new Korisnik("Masa","masa","Masa","Djurkovic","kupac","06875425","masalegenda.@dffg.com","28/12/2019 10:23:10",new ArrayList<Restoran>(),new ArrayList<Pomin>(),new Vozilo(),new ArrayList<Pomin>());
		Korisnik tica=new Korisnik("Tica","tica","Tica","Mitric","dostavljac","0605445","a54jd.@dfgdfg.com","31/12/2019 16:23:13",new ArrayList<Restoran>(),new ArrayList<Pomin>(),new Vozilo(),new ArrayList<Pomin>());
		Korisnik d=new Korisnik("d","d","Dostavljac","Dostavljac","dostavljac","0657545","a54dsfd.@dfgdfg.com","31/12/2019 09:23:13",new ArrayList<Restoran>(),new ArrayList<Pomin>(),new Vozilo(),new ArrayList<Pomin>());
		
		listaKorisnika=new ArrayList<Korisnik>();
		listaKorisnika.add(admin);
		listaKorisnika.add(nina); 
		listaKorisnika.add(masa);
		listaKorisnika.add(tica);
		listaKorisnika.add(d);
		//for(Korisnik k:listaKorisnika) {
		//	dodajKorisnika(k);
		//}
		try {
			sacuvajKorisnike(listaKorisnika);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@SuppressWarnings("unchecked")
	public void ucitajKorisnike(){
		FileInputStream fis = null;
		try{
			fis = new FileInputStream("korisnici.xml");
			XMLDecoder decoder = new XMLDecoder(fis);
			listaKorisnika = (ArrayList<Korisnik>) decoder.readObject();
			decoder.close();
		}catch(IOException e){
			defaultniKorisnici();
		}
		finally{
			try {
				if(fis!=null)
					fis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	    
	}
	
	public void dodajKorisnika (Korisnik korisnik)
	{
		Korisnici k=new Korisnici();
		k.getListaKorisnika().add(korisnik);
		try{
			FileOutputStream fos = new FileOutputStream("korisnici.xml");
			XMLEncoder encoder = new XMLEncoder(fos);
			encoder.writeObject(k.getListaKorisnika());
			encoder.close();
		    fos.close();
		}
		catch(IOException e){

		}
	    
	    
	}
	
	public void sacuvajKorisnike(ArrayList<Korisnik> korisnici) throws IOException{
		FileOutputStream fos = new FileOutputStream("korisnici.xml");
		XMLEncoder encoder = new XMLEncoder(fos);
		encoder.writeObject(korisnici);
		encoder.close();
	    fos.close();
		
	}

}
