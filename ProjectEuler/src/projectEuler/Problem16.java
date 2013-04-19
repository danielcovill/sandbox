package projectEuler;

import java.math.BigInteger;

public class Problem16 extends EulerProblem {

	public Problem16(String name, String description) {
		super(name, description);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String Solve() {
		
		char[] nums =  new BigInteger("2").pow(1000).toString().toCharArray();
		long result = 0;
		for(char num : nums) {
			result += Integer.parseInt(String.valueOf(num));
		}
		
		return String.valueOf(result);
	}

}
