package projectEuler;

public class Problem17b extends EulerProblem {

	public Problem17b(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {
		int digitCount = 0;
		for (int i = 1; i <= 1000; i++) {
			digitCount += getStringValueLength(i);
		}
		return String.valueOf(digitCount);
	}
	
	private int getStringValueLength(int number) {
		int result = 0;
		if(number / 1000 > 0) {
			result += getValueLengthForDigit(number/1000) + 8;
			number = number % 1000;
		}
		
		if(number/100 > 0) {
			result += getValueLengthForDigit(number/100) + 7;
			number = number % 100;
		}
		
		if(number/10 > 0) {
			if(result != 0) {
				result += 3;
			}
			result += getValueLengthForTensNumber(number);
		} else if (number % 10 > 0) {
			if(result != 0) {
				result += 3;
			}
			result += getValueLengthForDigit(number % 10);			
		}
		return result;
	}
	
	private int getValueLengthForTensNumber(int number) throws IllegalArgumentException {
		if(number > 99 || number < 10) {
			throw new IllegalArgumentException("Number must be between 10 and 99 inclusive.");
		}
		int result = 0;
		switch (number/10) {
		case 9:
			result += 6;
			break;
		case 8:
			result += 6;
			break;
		case 7:
			result += 7;
			break;
		case 6:
			result += 5;
			break;
		case 5:
			result += 5;
			break;
		case 4:
			result += 5;
			break;
		case 3:
			result += 6;
			break;
		case 2:
			result += 6;
			break;
		case 1:
			break;
		default:
			break;
		}
		if(result == 0) {
			//teens
			switch(number%10) {
			case 9:
				result += 8;
				break;
			case 8:
				result += 8;
				break;
			case 7:
				result += 9;
				break;
			case 6:
				result += 7;
				break;
			case 5:
				result += 7;
				break;
			case 4:
				result += 8;
				break;
			case 3:
				result += 8;
				break;
			case 2:
				result += 6;
				break;
			case 1:
				result += 6;
				break;
			case 0:
				result += 3;
				break;
			default:
				break;
			}
		} else { 
			if(number%10 > 0) {
				result += getValueLengthForDigit(number%10);
			}
		}
		return result;
	}
	
	private int getValueLengthForDigit(int digit) {
		switch (digit) {
		case 9:
			return 4;
		case 8:
			return 5;
		case 7:
			return 5;
		case 6:
			return 3;
		case 5:
			return 4;
		case 4:
			return 4;
		case 3:
			return 5;
		case 2:
			return 3;
		case 1:
			return 3;
		default:
			break;
		}
		return 0;
	}
}
