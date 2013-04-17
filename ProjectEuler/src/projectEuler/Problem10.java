package projectEuler;

public class Problem10 extends EulerProblem {

	public Problem10(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {
		long[] primes = EulerLib.getPrimesLessThanN(2000001);
		long total = 0;
		for(long i : primes) {
			total += i;
		}
		return String.valueOf(total);
	}
}
