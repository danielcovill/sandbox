package projectEuler;

public class Problem2 extends EulerProblem {

	public Problem2(String name, String description) {
		super(name, description);
	}

	public String Solve() {
		int first = 1;
		int second = 2;
		int total = 0;
		int next = 0;
		while(second < 4000000) {
			if(second%2 == 0) {
				total += second;
			}
			next = first + second;
			first = second;
			second = next;
		}
		
		return String.valueOf(total);
	}

}
