package projectEuler;

public class Problem12 extends EulerProblem {

	public Problem12(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {
		int index = 1;
		int result = 0;
		int currentTriangle;
		do {
			currentTriangle = 0;
			for(int i=index;i>0;i--) {
				currentTriangle += i;
			}
			int divisorCount = EulerLib.getNumberOfDivisors(currentTriangle);
			if(divisorCount >= 500) {
				result = currentTriangle;
			} else {
				index++;
			}
		} while(result == 0);
		return String.valueOf(result);
	}

}
