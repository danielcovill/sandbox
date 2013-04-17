package projectEuler;

public abstract class EulerProblem {
	private final String Description;
	private final String Name;
	private long ExecutionTime;
	
	public EulerProblem(String name, String description) {
		this.Name = name;
		this.Description = description;
	}
	
	public String getSolution() {
		long startTime = System.nanoTime();
		String result = this.Solve();
		long endTime = System.nanoTime();
		ExecutionTime = endTime - startTime;
		return String.format("%s: %s", this.Name, result);
	}
	
	public String getDescription() {
		return this.Description;
	}
	
	public final long getLastExecutionTimeNS() {
		return this.ExecutionTime;
	}
	
	public final String getLastExecutionTime() {
		String result;

		if(ExecutionTime > 1000000000) { 
			result = String.format("%,.2f(s)", (float)ExecutionTime / 1000000000);
		} else if (ExecutionTime > 1000000) {
			result = String.format("%,.2f(ms)", (float)ExecutionTime / 1000000);
		} else {
			result = String.format("%,d(ns)", ExecutionTime);
		}
		
		return result;
	}
	
	public abstract String Solve();
}
