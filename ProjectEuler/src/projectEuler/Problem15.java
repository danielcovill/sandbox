package projectEuler;

import java.util.LinkedList;

public class Problem15 extends EulerProblem {

	public Problem15(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {
		Coordinate base = new Coordinate(0,0);
		LinkedList<Coordinate> currentRow = new LinkedList<Coordinate>();
		double routeCount = 0;
		currentRow.push(base);
		int squareSize = 20;
		
		while(!currentRow.isEmpty()) {
			Coordinate current = currentRow.removeFirst();
			if(current.x < squareSize) {
				currentRow.addLast(new Coordinate(current.x + 1, current.y));
			}
			if(current.y < squareSize) {
				currentRow.addLast(new Coordinate(current.x, current.y + 1));
			}
			if(current.y == squareSize && current.x == squareSize) {
				routeCount++;
			}
		}
		
		return String.valueOf(routeCount);
	}
	private class Coordinate {
		public final int x;
		public final int y;
		
		public Coordinate(int a, int b) {
			x=a;
			y=b;
		}
		public String toString() {
			return String.format("(%d,%d)", x, y);
		}
	}
	
}