package projectEuler;

import java.util.HashMap;
import java.util.Map.Entry;

public class Problem14 extends EulerProblem {

	public Problem14(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {	
		long currentVal;
		long currentDistance;
		HashMap<Long, Long> collatzDistances = new HashMap<Long, Long>(1000000);
		for(long startVal=1000000;startVal>2;startVal--) {
			currentVal = startVal;
			currentDistance = 1;
			while(currentVal != 1) { 
				//surprisingly, using this caching method actually makes the program run slower
				if(collatzDistances.containsKey(currentVal)) {
					currentDistance += collatzDistances.get(currentVal);
					break;
				}
				currentDistance++;
				currentVal = currentVal%2==0 ? currentVal/2 : (currentVal*3)+1;
			}
			collatzDistances.put(startVal, currentDistance);
		}
		
		long maxKey = -1;
		long maxVal = -1;
		for(Entry<Long, Long> val : collatzDistances.entrySet()) {
			if(val.getValue() > maxVal) {
				maxKey = val.getKey();
				maxVal = val.getValue();
			}
		}
		return String.valueOf(maxKey);
	}
}
