package projectEuler;

public class Problem17 extends EulerProblem {

	public Problem17(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {
		int digitCount = 0;
		for (int i = 1; i <= 1000; i++) {
			digitCount += getStringValue(i).replaceAll("[- ]", "").length();
		}
		return String.valueOf(digitCount);
	}
	
	private String getStringValue(int number) {
		StringBuilder result = new StringBuilder();
		if(number/1000 > 0) {
			result.append(getValueForDigit(number/1000));
			result.append(" thousand");
			number = number%1000;
		}
		
		if(number/100 > 0) {
			if(result.length() != 0) {
				result.append(" ");
			}
			result.append(getValueForDigit(number/100));
			result.append(" hundred");
			number = number % 100;
		}
		
		if(number/10 > 0) {
			if(result.length() != 0) {
				result.append(" and ");
			}
			result.append(getValueForTensNumber(number));
		} else if (number % 10 > 0) {
			if(result.length() != 0) {
				result.append(" and ");
			}
			result.append(getValueForDigit(number % 10));			
		}
		return result.toString();
	}
	
	private String getValueForTensNumber(int number) throws IllegalArgumentException {
		if(number > 99 || number < 10) {
			throw new IllegalArgumentException("Number must be between 10 and 99 inclusive.");
		}
		StringBuilder result = new StringBuilder();
		switch (number/10) {
		case 9:
			result.append("ninety");
			break;
		case 8:
			result.append("eighty");
			break;
		case 7:
			result.append("seventy");
			break;
		case 6:
			result.append("sixty");
			break;
		case 5:
			result.append("fifty");
			break;
		case 4:
			result.append("forty");
			break;
		case 3:
			result.append("thirty");
			break;
		case 2:
			result.append("twenty");
			break;
		case 1:
			break;
		default:
			break;
		}
		
		if(result.length() == 0) {
			//teens
			switch(number%10) {
			case 9:
				result.append("nineteen");
				break;
			case 8:
				result.append("eighteen");
				break;
			case 7:
				result.append("seventeen");
				break;
			case 6:
				result.append("sixteen");
				break;
			case 5:
				result.append("fifteen");
				break;
			case 4:
				result.append("fourteen");
				break;
			case 3:
				result.append("thirteen");
				break;
			case 2:
				result.append("twelve");
				break;
			case 1:
				result.append("eleven");
				break;
			case 0:
				result.append("ten");
				break;
			default:
				break;
			}
		} else { 
			if(number%10 > 0) {
				result.append("-");
				result.append(getValueForDigit(number%10));
			}
		}
		return result.toString();
	}
	
	private String getValueForDigit(int digit) {
		String result = "";
		switch (digit) {
		case 9:
			result = "nine";
			break;
		case 8:
			result = "eight";
			break;
		case 7:
			result = "seven";
			break;
		case 6:
			result = "six";
			break;
		case 5:
			result = "five";
			break;
		case 4:
			result = "four";
			break;
		case 3:
			result = "three";
			break;
		case 2:
			result = "two";
			break;
		case 1:
			result = "one";
			break;
		default:
			break;
		}
		return result;
	}
}
