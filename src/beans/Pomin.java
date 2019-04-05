package beans;

public class Pomin {
	public Pomin(String datum, boolean izbrisan,String status) {
		super();
		this.setDatum(datum);
		this.setIzbrisan(izbrisan);
		this.setStatus(status);
	}

	private String datum;
	private String status;
	private boolean izbrisan;
	
	public Pomin() {
		setDatum("");
		setStatus("");
		setIzbrisan(false);
	}

	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}

	public boolean isIzbrisan() {
		return izbrisan;
	}

	public void setIzbrisan(boolean izbrisan) {
		this.izbrisan = izbrisan;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
