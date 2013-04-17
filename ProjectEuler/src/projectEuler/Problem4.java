package projectEuler;

public class Problem4 extends EulerProblem {

	public Problem4(String name, String description) {
		super(name, description);
	}

	public String Solve() {			
		for(int i = 998001;i>10000;i--) {
			if(EulerLib.isPalendrome(String.valueOf(i))) {
				if(findGreatestDivisor(i, 100, 999) > 0) {
					return String.valueOf(i);
				}
			}
		}
		return "No solution found";
	}

	private int findGreatestDivisor(int value, int minDivisor, int maxDivisor) {
		for(int i=maxDivisor;i>=minDivisor;i--) {
			if(value%i==0 && value/i < 1000) {
				return i;
			}
		}
		return 0;
	}
}
