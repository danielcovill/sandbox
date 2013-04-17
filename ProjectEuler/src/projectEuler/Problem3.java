package projectEuler;

public class Problem3 extends EulerProblem {

	public Problem3(String name, String description) {
		super(name, description);
	}

	public String Solve() {
		final long inputVal = 600851475143l;
		return String.valueOf(EulerLib.getLargestPrimeFactor(inputVal));
	}
}
