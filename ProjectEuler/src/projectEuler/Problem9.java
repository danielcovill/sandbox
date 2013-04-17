package projectEuler;

public class Problem9 extends EulerProblem {

	public Problem9(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {
		int c;
		for(int b = 0; b < 500; b++) {
			for(int a = 0; a < b; a++) {
				c = (int)Math.sqrt(Math.pow((double)a, 2) + Math.pow((double)b, 2));
				if(a + b + c == 1000 && Math.pow((double)a, 2) + Math.pow((double)b, 2) == Math.pow((double)c, 2)) {
					return String.valueOf(a * b * c);
				}
			}
		}
		return "Solution not found";		
	}

}
