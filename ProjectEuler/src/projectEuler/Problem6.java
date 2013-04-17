package projectEuler;

public class Problem6 extends EulerProblem {

	public Problem6(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {
		double sumOfSquares = 0;
		double squareOfSum = 0;
		
		for(double i=1;i<=100;i++) {
			sumOfSquares += Math.pow(i, 2);
			squareOfSum += i;
		}
		squareOfSum = Math.pow(squareOfSum, 2);
		return String.valueOf((long)(squareOfSum - sumOfSquares));
	}

}
