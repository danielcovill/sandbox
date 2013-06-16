package projectEuler;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;


public class Problem22 extends EulerProblem {

	public Problem22(String name, String description) {
		super(name, description);
	}

	@Override
	public String Solve() {
		int asciiOffset = 96;
		String path = "../resources/names.txt";
		FileReader namesFileReader;
		BufferedReader br = null;
		String[] names;
		
		try {
			namesFileReader = new FileReader(path);
			br = new BufferedReader(namesFileReader);
			String input;
			while ((input = br.readLine()) != null) {
				names = input.split(",");
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
		return null;
	}

}
