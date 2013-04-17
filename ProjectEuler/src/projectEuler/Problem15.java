package projectEuler;

public class Problem15 extends EulerProblem {

	public Problem15(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {
		int result = 0;
		for(int i=1;i<4;i++) {
			result += 2*i;
		}
		result*=2;
		return String.valueOf(result);
		
	}

}
