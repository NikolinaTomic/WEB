package beans;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

public class Artikli {
private ArrayList<Artikaal> listaArtikala;
	
	public Artikli() {
		//listaArtikala=new ArrayList<Artikal>();
		ucitajArtikle();
	}

	public void defaultniArtikli() {
		Artikaal a1=new Artikaal("Coca cola",78,"mini",0.33,"pice","ml",false);
		Artikaal a2=new Artikaal("Fanta",69,"mini",0.33,"pice","ml",false);
		Artikaal a3=new Artikaal("Limunada",100,"kiselo",0.25,"pice","ml",false);
		Artikaal a4=new Artikaal("Hleb",45,"beli",0.2,"jelo","g",false);
		Artikaal a5=new Artikaal("Pavlaka",115,"velika",0.5,"jelo","g",false);
		Artikaal a6=new Artikaal("Crni hleb",50,"crni",0.2,"jelo","g",false);
		Artikaal a7=new Artikaal("Salama",180,"velika",0.5,"jelo","g",false);
		Artikaal a8=new Artikaal("Cedjeni sok",230,"slatki",0.33,"pice","ml",false);
		Artikaal a9=new Artikaal("Kisela voda",35,"",1.5,"pice","ml",false);
		Artikaal a10=new Artikaal("Jagoda",110,"",2,"pice","ml",false);
		listaArtikala=new ArrayList<Artikaal>();
		listaArtikala.add(a1);
		listaArtikala.add(a2);
		listaArtikala.add(a3);
		listaArtikala.add(a4);
		listaArtikala.add(a5);
		listaArtikala.add(a6);
		listaArtikala.add(a7);
		listaArtikala.add(a8);
		listaArtikala.add(a9);
		listaArtikala.add(a10);
		try {
			sacuvajArtikle(listaArtikala);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
	
	@SuppressWarnings("unchecked")
	public void ucitajArtikle(){
		FileInputStream fis = null;
		try{
			fis = new FileInputStream("artiklii.xml");
			XMLDecoder decoder = new XMLDecoder(fis);
			listaArtikala = (ArrayList<Artikaal>) decoder.readObject();
			decoder.close();
	
		}catch(IOException e){
			
			defaultniArtikli();
			
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
	
	public void dodajArtikal (Artikaal a)
	{
		Artikli ax=new Artikli();
		ax.getListaArtikala().add(a);
		try{
			FileOutputStream fos = new FileOutputStream("artiklii.xml");
			
			XMLEncoder encoder = new XMLEncoder(fos);
			encoder.writeObject(ax.getListaArtikala());
			encoder.close();
		    fos.close();
		}
		catch(IOException e){

		}      
	}

	
	public void sacuvajArtikle(ArrayList<Artikaal> artikli) throws IOException{
		FileOutputStream fos = new FileOutputStream("artiklii.xml");
		XMLEncoder encoder = new XMLEncoder(fos);
		encoder.writeObject(artikli);
		encoder.close();
	    fos.close();
		
	}
	public ArrayList<Artikaal> getListaArtikala() {
		return listaArtikala;
	}

	public void setListaArtikala(ArrayList<Artikaal> listaArtikala) {
		this.listaArtikala = listaArtikala;
	}


}
