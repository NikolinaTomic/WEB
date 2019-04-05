package beans;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

public class Porudzbine {

	private ArrayList<Porudzbinaa> porudzbine;
	
	public Porudzbine() {
		ucitajPorudzbine();
	}
	
	@SuppressWarnings("unchecked")
	public void ucitajPorudzbine(){
		porudzbine=new ArrayList<Porudzbinaa>();
		FileInputStream fis = null;
		try{
			fis = new FileInputStream("porudzbinee.xml");
			XMLDecoder decoder = new XMLDecoder(fis);
			porudzbine=(ArrayList<Porudzbinaa>) decoder.readObject();
			decoder.close();
	
		}catch(IOException e){
			
			setPorudzbine(new ArrayList<Porudzbinaa>());
			
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
	
	public void dodajPorudzbinu (Porudzbinaa p)
	{
		Porudzbine pp=new Porudzbine();
		pp.getPorudzbine().add(p);
	
		try{
			FileOutputStream fos = new FileOutputStream("porudzbinee.xml");
			
			XMLEncoder encoder = new XMLEncoder(fos);
			encoder.writeObject(pp.getPorudzbine());
			encoder.close();
		    fos.close();
		}
		catch(IOException e){

		}      
	}

	
	public void sacuvajPorudzbine(ArrayList<Porudzbinaa> porudz) throws IOException{
		FileOutputStream fos = new FileOutputStream("porudzbinee.xml");
		XMLEncoder encoder = new XMLEncoder(fos);
		encoder.writeObject(porudz);
		encoder.close();
	    fos.close();
		
	}

	public ArrayList<Porudzbinaa> getPorudzbine() {
		return porudzbine;
	}

	public void setPorudzbine(ArrayList<Porudzbinaa> porudzbine) {
		this.porudzbine = porudzbine;
	}


	
	
	
	
}


