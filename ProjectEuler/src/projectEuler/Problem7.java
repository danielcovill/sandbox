package projectEuler;

public class Problem7 extends EulerProblem {

	public Problem7(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {
		return String.valueOf(EulerLib.getNthPrime(10001));
	}

}
