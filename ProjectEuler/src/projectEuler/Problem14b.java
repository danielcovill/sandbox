package projectEuler;


public class Problem14b extends EulerProblem {

	public Problem14b(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {	
		long currentVal;
		long currentDistance;
		int maxKey = -1;
		long maxDistance = -1;
		
		for(int startVal=1000000;startVal>=2;startVal--) {
			currentVal = startVal;
			currentDistance = 1;
			while(currentVal != 1) { 
				currentDistance++;
				currentVal = currentVal%2==0 ? currentVal/2 : (currentVal*3)+1;
			}
			if(currentDistance > maxDistance) {
				maxKey = startVal;
				maxDistance = currentDistance;
			}
		}
		
		return String.valueOf(maxKey);
	}
}
