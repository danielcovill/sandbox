package projectEuler;

import java.util.LinkedList;

public class Problem15b extends EulerProblem {

	public Problem15b(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {
		int squareSize = 20;
		LinkedList<Long> previousRow = new LinkedList<Long>();
		for(int row = 0; row < 2*squareSize; row++) {
			LinkedList<Long> currentRow = new LinkedList<Long>();
			currentRow.add(1l);
			while(previousRow.size() > 1) {
				currentRow.add(previousRow.removeFirst() + previousRow.getFirst());
			}
			currentRow.add(1l);
			previousRow = currentRow;
		}
		
		return String.valueOf(previousRow.get(previousRow.size() / 2));
	}
}