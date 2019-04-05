package beans;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

public class Restorani {
private ArrayList<Restoran> listaRestorana;
	
	public Restorani() {
		ucitajRestorane();
	}

	public void defaultniRestorani() {
		Restoran r1=new Restoran("Sugar&Soul","Alekse Šantića 18","poslasticarnica",false,new ArrayList<Artikaal>(),new ArrayList<Artikaal>());
		Restoran r2=new Restoran("Dva štapića","Vojvođanska 3","kineskiRestoran",false,new ArrayList<Artikaal>(),new ArrayList<Artikaal>());
		Restoran r3=new Restoran("Indijac","Rumenačka 189","indijskiRestoran",false,new ArrayList<Artikaal>(),new ArrayList<Artikaal>());
		Restoran r4=new Restoran("Violeta","Bulevar cara Lazara","picerija",false,new ArrayList<Artikaal>(),new ArrayList<Artikaal>());
		Restoran r5=new Restoran("Kotao","Mite Ružića 2a","domacaKuhinja",false,new ArrayList<Artikaal>(),new ArrayList<Artikaal>());
		Restoran r6=new Restoran("Pera","Vojvođanska 5","rostilj",false,new ArrayList<Artikaal>(),new ArrayList<Artikaal>());
		Restoran r7=new Restoran("Dugica","Modena 45","poslasticarnica",false,new ArrayList<Artikaal>(),new ArrayList<Artikaal>());
		Restoran r8=new Restoran("Vidikovac","Senta 7","domacaKuhinja",false,new ArrayList<Artikaal>(),new ArrayList<Artikaal>());
		Restoran r9=new Restoran("Plava frajla","Alekse Šantića 26","domacaKuhinja",false,new ArrayList<Artikaal>(),new ArrayList<Artikaal>());
		Restoran r10=new Restoran("Dve Ruže","Bulevar cara Dušana 78","kineskiRestoran",false,new ArrayList<Artikaal>(),new ArrayList<Artikaal>());

		listaRestorana=new ArrayList<Restoran>();
		listaRestorana.add(r1);
		listaRestorana.add(r2);
		listaRestorana.add(r3);
		listaRestorana.add(r4);
		listaRestorana.add(r5);
		listaRestorana.add(r6);
		listaRestorana.add(r7);
		listaRestorana.add(r8);
		listaRestorana.add(r9);
		listaRestorana.add(r10);
		
		try {
			
			sacuvajRestorane(listaRestorana);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
	
	@SuppressWarnings("unchecked")
	public void ucitajRestorane(){
		FileInputStream fis = null;
		listaRestorana=new ArrayList<Restoran>();
		try{
			fis = new FileInputStream("restorani.xml");
			XMLDecoder decoder = new XMLDecoder(fis);
			listaRestorana = (ArrayList<Restoran>) decoder.readObject();
			decoder.close();
	
		}catch(IOException e){
			
			defaultniRestorani();
			
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
	
	public void dodajRestoran (Restoran r)
	{
		Restorani re=new Restorani();
		re.getListaRestorana().add(r);
	
		try{
			FileOutputStream fos = new FileOutputStream("restorani.xml");
			
			XMLEncoder encoder = new XMLEncoder(fos);
			encoder.writeObject(re.getListaRestorana());
			encoder.close();
		    fos.close();
		}
		catch(IOException e){

		}      
	}

	
	public void sacuvajRestorane(ArrayList<Restoran> restorani) throws IOException{
		FileOutputStream fos = new FileOutputStream("restorani.xml");
		XMLEncoder encoder = new XMLEncoder(fos);
		encoder.writeObject(restorani);
		encoder.close();
	    fos.close();
		
	}


	public ArrayList<Restoran> getListaRestorana() {
		return listaRestorana;
	}

	public void setListaRestorana(ArrayList<Restoran> listaRestorana) {
		this.listaRestorana = listaRestorana;
	}



}
