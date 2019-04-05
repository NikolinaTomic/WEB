package beans;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

public class Vozila {
private ArrayList<Vozilo> listaVozila;

	public Vozila() {
		ucitajVozila();
	}
public void defaultniRestorani() {

		Vozilo v1=new Vozilo("Audi","A6","automobil","NS193-SL","2015","pukla guma","ne",false);
		Vozilo v2=new Vozilo("Audi","A3","automobil","BG456-AM","2011","","ne",false);
		Vozilo v3=new Vozilo("Nissan","GT-R50","automobil","SM140-KL","2007","","ne",false);		
		Vozilo v4=new Vozilo("Opel","Astra","automobil","NS032-RL","2001","fali goriva","ne",false);
		Vozilo v5=new Vozilo("Reno","Fluenca","automobil","BG863-SD","2016","oprati","ne",false);
		Vozilo v6=new Vozilo("Aprilia","RS 125","skuter","SM426-QW","2003","","ne",false);
		Vozilo v7=new Vozilo("Aprilia","Shiver 900","skuter","SA198-XR","2007","nema kaciga","ne",false);
		Vozilo v8=new Vozilo("Piaggio","MEDLEY 150","skuter","PP486-SC","2000","","ne",false);
		Vozilo v9=new Vozilo("Polar","FORESTER PRO","bicikl","LO123-HJ","2013","ne radi svetlo","ne",false);
		Vozilo v10=new Vozilo("Polar","BOOSTER PLASMA","bicikl","NS596-KA","2018","","ne",false);
		listaVozila=new ArrayList<Vozilo>();
		listaVozila.add(v1);
		listaVozila.add(v2);
		listaVozila.add(v3);
		listaVozila.add(v4);
		listaVozila.add(v5);
		listaVozila.add(v6);
		listaVozila.add(v7);
		listaVozila.add(v8);
		listaVozila.add(v9);
		listaVozila.add(v10);

		
		try {
			
			sacuvajVozila(listaVozila);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
	
@SuppressWarnings("unchecked")
public void ucitajVozila(){
	FileInputStream fis = null;
	try{
		fis = new FileInputStream("vozila.xml");
		XMLDecoder decoder = new XMLDecoder(fis);
		listaVozila = (ArrayList<Vozilo>) decoder.readObject();
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

public void dodajVozilo (Vozilo v)
{
	Vozila vo=new Vozila();
	vo.getListaVozila().add(v);

	try{
		FileOutputStream fos = new FileOutputStream("vozila.xml");
		
		XMLEncoder encoder = new XMLEncoder(fos);
		encoder.writeObject(vo.getListaVozila());
		encoder.close();
	    fos.close();
	}
	catch(IOException e){

	}      
}


public void sacuvajVozila(ArrayList<Vozilo> vozila) throws IOException{
	FileOutputStream fos = new FileOutputStream("vozila.xml");
	XMLEncoder encoder = new XMLEncoder(fos);
	encoder.writeObject(vozila);
	encoder.close();
    fos.close();
	
}


	public ArrayList<Vozilo> getListaVozila() {
		return listaVozila;
	}

	
	public void setListaVozila(ArrayList<Vozilo> listaVozila) {
		this.listaVozila = listaVozila;
	}

}
