package services;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Artikaal;
import beans.Artikli;
import beans.Korisnici;
import beans.Korisnik;
import beans.Pomin;
import beans.Porudzbinaa;
import beans.Restoran;
import beans.Restorani;

@Path("/ku")
public class KupacServis {
	@Context
	HttpServletRequest request; //zahtev
	@Context
	HttpServletResponse response;
@Context
ServletContext ctx;

@POST
@Path("/promenaUloge")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public void promenaUloga(String spoj) {
	int p1=spoj.lastIndexOf("+");
	String uloga=spoj.substring(p1+1,spoj.length());
	String ime=spoj.substring(0,p1);

	Korisnici ko=new Korisnici();
	for(Korisnik k:ko.getListaKorisnika()) {
		if(k.getKorisnickoIme().equals(ime)) {
			k.setUloga(uloga);
			try {
				ko.sacuvajKorisnike(ko.getListaKorisnika());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}

@POST
@Path("/preR")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Restoran> pretragaR(String spoj) {
	int p1=spoj.lastIndexOf("+");
	String kateg=spoj.substring(p1+1,spoj.length());


	String spoj2=spoj.substring(0, p1);
	int p2=spoj2.lastIndexOf("+");
	String adresa1=spoj2.substring(p2+1,spoj2.length()); 
	String adresa=adresa1.toLowerCase();
	
	String spoj3=spoj.substring(0, p2);
	int p3=spoj3.lastIndexOf("+");
	String naziv1=spoj3.substring(p3+1,spoj3.length()); 
	String naziv=naziv1.toLowerCase();

		Restorani r=new Restorani();
		ArrayList<Restoran> restorani=new ArrayList<Restoran>();

		if((!naziv.equals("")) && adresa.equals("") && kateg.equals("")) {
			for(Restoran res : r.getListaRestorana()) {
				String n=res.getNaziv().toLowerCase();
				if(n.startsWith(naziv) && res.isIzbrisan()==false) {
					restorani.add(res);
				}
			}
		}else if((!adresa.equals("")) && naziv.equals("") && kateg.equals("")) {
			for(Restoran res : r.getListaRestorana()) {
				String a=res.getAdresa().toLowerCase();
				if(a.startsWith(adresa) && res.isIzbrisan()==false) {
					restorani.add(res);
				}
			}
		}else if((!kateg.equals("")) && adresa.equals("") && naziv.equals("")) {
			for(Restoran res : r.getListaRestorana()) {
				if(res.getKategorija().equals(kateg)&& res.isIzbrisan()==false) {
					restorani.add(res);
				}
			}
		}else if(naziv.equals("") && adresa.equals("") && kateg.equals("")) {
			for(Restoran res : r.getListaRestorana()) {
				if(res.isIzbrisan()==false) {
					restorani.add(res);
				}
			}
		}else if((!naziv.equals("")) && !(adresa.equals("")) && !(kateg.equals(""))) {
			for(Restoran res : r.getListaRestorana()) {
				String n=res.getNaziv().toLowerCase();
				String a=res.getAdresa().toLowerCase();
				if(n.startsWith(naziv) && a.startsWith(adresa) && res.getKategorija().equals(kateg) && res.isIzbrisan()==false) {
					restorani.add(res);
				}
			}
		}else if((!naziv.equals("")) && !(adresa.equals("")) && kateg.equals("")){
			for(Restoran res : r.getListaRestorana()) {
				String n=res.getNaziv().toLowerCase();
				String a=res.getAdresa().toLowerCase();
				if(n.startsWith(naziv) && a.startsWith(adresa)&& res.isIzbrisan()==false) {
					restorani.add(res);
				}
			}
		}else if((!naziv.equals("")) && adresa.equals("") && !(kateg.equals(""))){
			for(Restoran res : r.getListaRestorana()) {
				String n=res.getNaziv().toLowerCase();
				if(n.startsWith(naziv) && res.getKategorija().equals(kateg)&& res.isIzbrisan()==false) {
					restorani.add(res);
				}
			}
		}else {
			for(Restoran res : r.getListaRestorana()) {
				String a=res.getAdresa().toLowerCase();
				if(a.startsWith(adresa) && res.getKategorija().equals(kateg)&& res.isIzbrisan()==false) {
					restorani.add(res);
				}
			}
		}
		return restorani;

}

@POST
@Path("/preA")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Artikaal> pretragaA(String spoj) {
	int p1=spoj.lastIndexOf("+");
	String repp1=spoj.substring(p1+1,spoj.length()); //restoran
	String repp=repp1.toLowerCase();

	String spoj2=spoj.substring(0, p1);
	int p2=spoj2.lastIndexOf("+");
	String cepp=spoj2.substring(p2+1,spoj2.length()); //cena
	
	String spoj3=spoj.substring(0, p2);
	int p3=spoj3.lastIndexOf("+");
	String nappa1=spoj3.substring(p3+1,spoj3.length()); //naziv artikla
	String nappa=nappa1.toLowerCase();
	
	String spoj4=spoj.substring(0, p3);
	int p4=spoj4.lastIndexOf("+");
	String tippa=spoj4.substring(p4+1,spoj4.length()); //tip
	
	Artikli art=new Artikli();
	ArrayList<Artikaal> artikli=new ArrayList<Artikaal>();

	if((!tippa.equals(""))&&nappa.equals("")&&cepp.equals("")&&repp.equals("")) { //akoje nista da izlista sve
		for(Artikaal a : art.getListaArtikala()) {
			if(a.getTip().equals(tippa) && a.isIzbrisan()==false) {
				artikli.add(a);
			}
		}
	}else if((!nappa.equals(""))&&tippa.equals("")&&cepp.equals("")&&repp.equals("")) { 
		for(Artikaal a : art.getListaArtikala()) {
			String na=a.getNaziv().toLowerCase();
			if(na.startsWith(nappa)  && a.isIzbrisan()==false) {
				artikli.add(a);
			}

		}
	}else if((!cepp.equals(""))&&tippa.equals("")&&nappa.equals("")&&repp.equals("")) { 
		for(Artikaal a : art.getListaArtikala()) {
			Double cena;
			try {
				cena=Double.parseDouble(cepp);
			} catch (Exception e) {
				// TODO: handle exception
				return null;
			}
			if(a.getJedinicnaCena()==cena  && a.isIzbrisan()==false) {
				artikli.add(a);
			}

		}
	}else if((!repp.equals(""))&&tippa.equals("")&&nappa.equals("")&&cepp.equals("")) { 
		Restorani rr=new Restorani();
		boolean postoji=false;
		for(Restoran r : rr.getListaRestorana()) {
			String na=r.getNaziv().toLowerCase();
			if(na.startsWith(repp) && r.isIzbrisan()==false) {
			for(Artikaal a : r.getListaJela()) {
				for(Artikaal x : artikli) {
					if(a.getNaziv().equals(x.getNaziv())  && a.isIzbrisan()==false) {
						postoji=true;
					}
				}
				if(postoji==false) {
					artikli.add(a);
				}else {
					postoji=false;
				}

			}
			
			for(Artikaal aa : r.getListaPica()) {
				for(Artikaal x : artikli) {
					if(aa.getNaziv().equals(x.getNaziv())  || aa.isIzbrisan()==true) {
						postoji=true;
					}
				}
				if(postoji==false) {
					artikli.add(aa);
				}else {
					postoji=false;
				}

			}
			}
		}
	}else if(repp.equals("")&&tippa.equals("")&&nappa.equals("")&&cepp.equals("")) {
		for(Artikaal a:art.getListaArtikala()) {
			if(a.isIzbrisan()==false) {
			artikli.add(a);
			}
		}
	}
///////////////////////////////////////////////////////mesanje
	else {
		ArrayList<Artikaal> artikli2=new ArrayList<Artikaal>();
		ArrayList<Artikaal> artikli3=new ArrayList<Artikaal>();
	
		if(!tippa.equals("")) { //jedna od filtracija korisnika
			if(!nappa.equals("")) {
				if(!cepp.equals("")) {
					for(Artikaal a:art.getListaArtikala()) {
						Double cena;
						try {
							cena=Double.parseDouble(cepp);
						} catch (Exception e) {
							// TODO: handle exception
							return null;
						}
						String na=a.getNaziv().toLowerCase();
						if(a.getTip().equals(tippa)&&na.startsWith(nappa) && a.getJedinicnaCena()==cena  && a.isIzbrisan()==false) {
							artikli2.add(a);
						}
					}
					///////////////////////////////////////////////////////// ako je sve popunjeno
					if(!repp.equals("")) {
						Restorani rr=new Restorani();
						boolean postoji=false;
						for(Restoran r : rr.getListaRestorana()) {
							String na=r.getNaziv().toLowerCase();
							if(na.startsWith(repp) && r.isIzbrisan()==false) {
							for(Artikaal a : r.getListaJela()) {
								for(Artikaal x : artikli3) {
									if(a.getNaziv().equals(x.getNaziv())  || a.isIzbrisan()==true) {
										postoji=true;
									}
								}
								if(postoji==false) {
									artikli3.add(a);
								}else {
									postoji=false;
								}

							}
							for(Artikaal aa : r.getListaPica()) {
								for(Artikaal x : artikli3) {
									if(aa.getNaziv().equals(x.getNaziv())  || aa.isIzbrisan()==true) {
										postoji=true;
									}
								}
								if(postoji==false) {
									artikli3.add(aa);
								}else {
									postoji=false;
								}

							}
							}
						}

						boolean p=false;
						for(Artikaal a: artikli2) {
							for(Artikaal y : artikli3) {
								if(a.getNaziv().equals(y.getNaziv())  && a.isIzbrisan()==false) {
									p=true;
								}
							}
							if(p) {
								artikli.add(a);
								p=false;
							}else {}
						}
					/////////////////////////////////////ako je sve popunjeno sem restorana
					}else {
						artikli=artikli2;
					}
					/////////////////////////////////////ako je popunjeno sve sem cene
				}else {
					for(Artikaal a:art.getListaArtikala()) {
						String na=a.getNaziv().toLowerCase();
						if(a.getTip().equals(tippa)&&na.startsWith(nappa) && a.isIzbrisan()==false) {
							artikli2.add(a);
						}
					}
					if(!repp.equals("")) {

							Restorani rr=new Restorani();
							boolean postoji=false;
							for(Restoran r : rr.getListaRestorana()) {
								String na=r.getNaziv().toLowerCase();
								if(na.startsWith(repp) && r.isIzbrisan()==false) {
								for(Artikaal a : r.getListaJela()) {
									for(Artikaal x : artikli3) {
										if(a.getNaziv().equals(x.getNaziv()) || a.isIzbrisan()==true) {
											postoji=true;
										}
									}
									if(postoji==false) {
										artikli3.add(a);
									}else {
										postoji=false;
									}

								}
								for(Artikaal aa : r.getListaPica()) {
									for(Artikaal x : artikli3) {
										if(aa.getNaziv().equals(x.getNaziv()) || aa.isIzbrisan()==true) {
											postoji=true;
										}
									}
									if(postoji==false) {
										artikli3.add(aa);
									}else {
										postoji=false;
									}

								}
								}
							}
						
							boolean p=false;
							for(Artikaal a: artikli2) {
								for(Artikaal y : artikli3) {
									if(a.getNaziv().equals(y.getNaziv()) && a.isIzbrisan()==false) {
										p=true;
									}
								}
								if(p) {
									artikli.add(a);
									p=false;
								}else {}
							}
						
					//////////////////////////////////////////ako nisu popunjene cena i restoran
					}else {
						artikli=artikli2;
					}
					
				}
			//////////////////////////ako nema naziv i cenu
			}else {
				if(cepp.equals("")) {
				for(Artikaal a:art.getListaArtikala()) {
					if(a.getTip().equals(tippa) && a.isIzbrisan()==false) {
						artikli2.add(a);
					}
				}
				if(!repp.equals("")) {
					Restorani rr=new Restorani();
					boolean postoji=false;
					for(Restoran r : rr.getListaRestorana()) {
						String na=r.getNaziv().toLowerCase();
						if(na.startsWith(repp) && r.isIzbrisan()==false) {
						for(Artikaal a : r.getListaJela()) {
							for(Artikaal x : artikli3) {
								if(a.getNaziv().equals(x.getNaziv()) || a.isIzbrisan()==true) {
									postoji=true;
								}
							}
							if(postoji==false) {
								artikli3.add(a);
							}else {
								postoji=false;
							}

						}
						for(Artikaal aa : r.getListaPica()) {
							for(Artikaal x : artikli3) {
								if(aa.getNaziv().equals(x.getNaziv()) || aa.isIzbrisan()==true) {
									postoji=true;
								}
							}
							if(postoji==false) {
								artikli3.add(aa);
							}else {
								postoji=false;
							}

						}
						}
					}
				
					boolean p=false;
					for(Artikaal a: artikli2) {
						for(Artikaal y : artikli3) {
							if(a.getNaziv().equals(y.getNaziv()) && a.isIzbrisan()==false) {
								p=true;
							}
						}
						if(p) {
							artikli.add(a);
							p=false;
						}else {}
					}

				////////////////////////////////ako ima samo tip
				}else {
					artikli=artikli2;
				}
				////////////////////////ako su tip cena i res
				}else {
					Double cena;
					try {
						cena=Double.parseDouble(cepp);
					} catch (Exception e) {
						// TODO: handle exception
						return null;
					}
					for(Artikaal a:art.getListaArtikala()) {
			
						if(a.getTip().equals(tippa)&&cena==a.getJedinicnaCena() && a.isIzbrisan()==false) {
							artikli2.add(a);

						}
					}
					if(!repp.equals("")) {
						Restorani rr=new Restorani();
						boolean postoji=false;
						for(Restoran r : rr.getListaRestorana()) {
							String na=r.getNaziv().toLowerCase();
							if(na.startsWith(repp) && r.isIzbrisan()==false) {
							for(Artikaal a : r.getListaJela()) {
								for(Artikaal x : artikli3) {
									if(a.getNaziv().equals(x.getNaziv()) || a.isIzbrisan()==true) {
										postoji=true;
									}
								}
								if(postoji==false) {
									artikli3.add(a);
								}else {
									postoji=false;
								}

							}
							for(Artikaal aa : r.getListaPica()) {
								for(Artikaal x : artikli3) {
									if(aa.getNaziv().equals(x.getNaziv()) || aa.isIzbrisan()==true) {
										postoji=true;
									}
								}
								if(postoji==false) {
									artikli3.add(aa);
								}else {
									postoji=false;
								}

							}
							}
						}
					
						boolean p=false;
						for(Artikaal a: artikli2) {
							for(Artikaal y : artikli3) {
								if(a.getNaziv().equals(y.getNaziv()) && a.isIzbrisan()==false) {
									p=true;
								}
							}
							if(p) {
								artikli.add(a);
								p=false;
							}else {}
						}

					////////////////////////////////ako ima samo tip
					}else {
						artikli=artikli2;
					}
				}
			}
			
		}else { //ako tip nije jedna od filtracija korisnika

			if(!nappa.equals("")) {
				if(!cepp.equals("")) {
					Double cena;
					try {
						cena=Double.parseDouble(cepp);
					} catch (Exception e) {
						// TODO: handle exception
						return null;
					}
					for(Artikaal a:art.getListaArtikala()) {
						String na=a.getNaziv().toLowerCase();
						if(cena==a.getJedinicnaCena() && na.startsWith(nappa) && a.isIzbrisan()==false) {
							artikli2.add(a);
						}
						
					}
					/////////////////////////////ako nema samo tip
					if(!repp.equals("")) {
						Restorani rr=new Restorani();
						boolean postoji=false;
						for(Restoran r : rr.getListaRestorana()) {
							String na=r.getNaziv().toLowerCase();
							if(na.startsWith(repp) && r.isIzbrisan()==false) {
							for(Artikaal a : r.getListaJela()) {
								for(Artikaal x : artikli3) {
									if(a.getNaziv().equals(x.getNaziv()) || a.isIzbrisan()==true) {
										postoji=true;
									}
								}
								if(postoji==false) {
									artikli3.add(a);
								}else {
									postoji=false;
								}

							}
							for(Artikaal aa : r.getListaPica()) {
								for(Artikaal x : artikli3) {
									if(aa.getNaziv().equals(x.getNaziv()) || aa.isIzbrisan()==true) {
										postoji=true;
									}
								}
								if(postoji==false) {
									artikli3.add(aa);
								}else {
									postoji=false;
								}

							}
							}
						}
					
						boolean p=false;
						for(Artikaal a: artikli2) {
							for(Artikaal y : artikli3) {
								if(a.getNaziv().equals(y.getNaziv()) && a.isIzbrisan()==false) {
									p=true;
								}
							}
							if(p) {
								artikli.add(a);
								p=false;
							}else {
								
								}
							}
						////////////////////////////ako nema tip i restoran
						}else {
							artikli=artikli2;
						}

				///////////////////////////////////////////nema ni tip ni cenu
				}else {
					/////////////////////////////////////////////////////////////////////////////

					for(Artikaal a:art.getListaArtikala()) {
						String na=a.getNaziv().toLowerCase();
						if(na.startsWith(nappa) && a.isIzbrisan()==false) {
							artikli2.add(a);
						}
						
					}
					/////////////////////////////ako ima naziv i restoran
					if(!repp.equals("")) {
						Restorani rr=new Restorani();
						boolean postoji=false;
						for(Restoran r : rr.getListaRestorana()) {
							String na=r.getNaziv().toLowerCase();
							if(na.startsWith(repp) && r.isIzbrisan()==false) {
							for(Artikaal a : r.getListaJela()) {
								for(Artikaal x : artikli3) {
									if(a.getNaziv().equals(x.getNaziv()) || a.isIzbrisan()==true) {
										postoji=true;
									}
								}
								if(postoji==false) {
									artikli3.add(a);
								}else {
									postoji=false;
								}

							}
							for(Artikaal aa : r.getListaPica()) {
								for(Artikaal x : artikli3) {
									if(aa.getNaziv().equals(x.getNaziv()) || aa.isIzbrisan()==true) {
										postoji=true;
									}
								}
								if(postoji==false) {
									artikli3.add(aa);
								}else {
									postoji=false;
								}

							}
							}
						}
					
						boolean p=false;
						for(Artikaal a: artikli2) {
							for(Artikaal y : artikli3) {
								if(a.getNaziv().equals(y.getNaziv()) && a.isIzbrisan()==false) {
									p=true;
								}
							}
							if(p) {
								artikli.add(a);
								p=false;
							}else {
								
								}
							}
						////////////////////////////ako ima samo naziv
						}else {
							artikli=artikli2;
						}

					//////////////////////////////////////////////////////////////////////////////////
				}
				
			///////////////////////////////ako nema tip i naziv
			}else {
				////////////////////ima cenu i res
				if(!cepp.equals("")) {
				/////////////////////////////////////////////////////////////////////////
					Double cena;
					try {
						cena=Double.parseDouble(cepp);
					} catch (Exception e) {
						// TODO: handle exception
						return null;
					}
					for(Artikaal a:art.getListaArtikala()) {
						if(a.getJedinicnaCena()==cena && a.isIzbrisan()==false) {
							artikli2.add(a);
						}
						
					}
					/////////////////////////////ako ima cena i res
					if(!repp.equals("")) {
						Restorani rr=new Restorani();
						boolean postoji=false;
						for(Restoran r : rr.getListaRestorana()) {
							String na=r.getNaziv().toLowerCase();
							if(na.startsWith(repp) && r.isIzbrisan()==false) {
							for(Artikaal a : r.getListaJela()) {
								for(Artikaal x : artikli3) {
									if(a.getNaziv().equals(x.getNaziv()) || a.isIzbrisan()==true) {
										postoji=true;
									}
								}
								if(postoji==false) {
									artikli3.add(a);
								}else {
									postoji=false;
								}

							}
							for(Artikaal aa : r.getListaPica()) {
								for(Artikaal x : artikli3) {
									if(aa.getNaziv().equals(x.getNaziv()) || aa.isIzbrisan()==true) {
										postoji=true;
									}
								}
								if(postoji==false) {
									artikli3.add(aa);
								}else {
									postoji=false;
								}

							}
							}
						}
					
						boolean p=false;
						for(Artikaal a: artikli2) {
							for(Artikaal y : artikli3) {
								if(a.getNaziv().equals(y.getNaziv()) && a.isIzbrisan()==false) {
									p=true;
								}
							}
							if(p) {
								artikli.add(a);
								p=false;
							}else {
								
								}
							}
						////////////////////////////ako ima samo cena
						}else {
							artikli=artikli2;
						}
					
				///////////////////////////////////////////////////////////////////////
				////////////////////////nema nista ne zna se za rest to ima gore odradjeno
				}else {
					
				}
			}
		}

	}

	//for(Artikaal a:artikli) {
	//	System.out.println(a.getNaziv());
	//}
	return artikli;
}

@GET
@Path("/logo")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public Korisnik ulogovani() {
	Korisnik k=new Korisnik();
	k=(Korisnik) ctx.getAttribute("logovani");
	if(k==null) {
		ctx.setAttribute("logovani", new Korisnik());
		k=(Korisnik) ctx.getAttribute("logovani");
	}
	//for(Restoran r:k.getOmRes()) {
	//	System.out.println(r.getNaziv());
	//}
	return k;
}

@POST
@Path("/kategorije")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Restoran> kategorijeR(String kat) {
	Restorani re=new Restorani();
	ArrayList<Restoran> pro=new ArrayList<Restoran>();
	for(Restoran r:re.getListaRestorana()) {
		if(r.getKategorija().equals(kat) && r.isIzbrisan()==false) {
			pro.add(r);
		}
	}
	return pro;
}

@GET
@Path("/sviKorisnici")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Korisnik> sviKor(){
	Korisnici ko=new Korisnici();
//	ctx.setAttribute("korisnici", ko.getListaKorisnika());
	boolean zauzet=false;
	ArrayList<Korisnik> slob=new ArrayList<Korisnik>();
	for(Korisnik k: ko.getListaKorisnika()) {
		if(k.getUloga().equals("kupac")) {
			for(Pomin p:k.getPorudz()) {
				if(p.isIzbrisan()==false && !p.getStatus().equals("dostavljeno")) {
					zauzet=true;
				}
			}
			if(zauzet) {
				zauzet=false;
			}else {
				slob.add(k);
			}
		}
		
		else if(k.getUloga().equals("dostavljac")) {
			for(Pomin p:k.getDodporudz()) {
				if(p.isIzbrisan()==false && p.getStatus().equals("dostava u toku")) {
					zauzet=true;
				}
			}
			if(zauzet) {
				zauzet=false;
			}else {
				slob.add(k);
			}
		}else {
			slob.add(k);
		}
	}
	return slob;
}

@POST
@Path("/omRest")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public Restoran omiljeniRest(String naz) {
	Restorani re=new Restorani();
	Restoran trazeni=new Restoran();
	
	for(Restoran r:re.getListaRestorana()) {
		if(r.getNaziv().equals(naz) && r.isIzbrisan()==false) {
			trazeni=r;
		}
	}
	
	Korisnik k=(Korisnik) ctx.getAttribute("logovani");
	if(k==null) {
		ctx.setAttribute("logovani", new Korisnik());
		k=(Korisnik) ctx.getAttribute("logovani");
	}
	
	Korisnici ko=new Korisnici();
	for(Korisnik kk : ko.getListaKorisnika()) {
		if(kk.getKorisnickoIme().equals(k.getKorisnickoIme()) && kk.getUloga().equals("kupac")) {
			for(Restoran r: kk.getOmRes()) {
				if(r.getNaziv().equals(trazeni.getNaziv()) && r.isIzbrisan()==false) {
					return null;
				}
			}
			if(kk.getOmRes().size()==0) {
				kk.setOmRes(new ArrayList<Restoran>());
				kk.getOmRes().add(trazeni);
				try {
					ko.sacuvajKorisnike(ko.getListaKorisnika());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				break;
			}else {
				kk.getOmRes().add(trazeni);
				try {
					ko.sacuvajKorisnike(ko.getListaKorisnika());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				break;
			}
		}
	}return trazeni;
}

@POST
@Path("/izomRest")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Restoran> IzbaciOmiljeniRest(String naz) {
	Korisnik k=new Korisnik();
	k=(Korisnik) ctx.getAttribute("logovani");
	if(k==null) {
		ctx.setAttribute("logovani", new Korisnik());
		k=(Korisnik) ctx.getAttribute("logovani");
	}
	Korisnici ko=new Korisnici();
	for(Korisnik kk: ko.getListaKorisnika()) {
		if(kk.getKorisnickoIme().equals(k.getKorisnickoIme()) && kk.getUloga().equals("kupac")) {
			for(Restoran r:kk.getOmRes()) {
				if(r.getNaziv().equals(naz) && r.isIzbrisan()==false) {
					r.setIzbrisan(true);
					try {
						ko.sacuvajKorisnike(ko.getListaKorisnika());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					return kk.getOmRes();
					
				}
			}
		}
	}
	
return null;

}

@GET
@Path("/nadjiOm")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public ArrayList<Restoran> nadjiOm() {
	Korisnik k=(Korisnik) ctx.getAttribute("logovani");
	if(k==null) {
		ctx.setAttribute("logovani", new Korisnik());
		k=(Korisnik) ctx.getAttribute("logovani");
	}
	
	Korisnici ko=new Korisnici();
	for(Korisnik kk : ko.getListaKorisnika()) {
		if(kk.getKorisnickoIme().equals(k.getKorisnickoIme()) && kk.getUloga().equals("kupac")) {
			return kk.getOmRes();
		}
	}

	return null;
	
}


}
