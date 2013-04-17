package projectEuler;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;

public class EulerLib {

	public static int getNumberOfDivisors(int n) {
		if(n == 0) {
			return 0;
		}
		int total = 1;
		HashMap<Integer, Integer> divisorCount = new HashMap<Integer, Integer>();
		for(int i : getFactorization(n)) {
			if(divisorCount.containsKey(i)) {
				divisorCount.put(i, divisorCount.get(i)+1);
			} else {
				divisorCount.put(i, 1);
			}
		}
		Iterator<Integer> values = divisorCount.values().iterator();
		while(values.hasNext()) {
			total*=(values.next() + 1);
		}
		return total;
	}
	
	/*
	 * Gets the prime factorization of a number. 
	 * For example if the number is 8 the value returned will be a linked 
	 * list containing 2,2,2,2 because 8 = 2^4. Another example, 15 will 
	 * return 3,5 because 15=3*5.
	 */
	public static int[] getFactorization(int n) {
		int m = Math.abs(n);
		LinkedList<Integer> result = new LinkedList<Integer>();
		for(int i=2;i<=m;i++) {
			while(m%i==0) {
				result.offer(i);
				m/=i;
			}
		}
		int[] arrayResult = new int[result.size()];
		int i = 0;
		for(Integer value : result) {
			arrayResult[i++] = value;
		}
		return arrayResult;
	}
	
	//this needs some work, very inefficient
	public static int[] getAllDivisors(int n) {
		if(n == 0) {
			return new int[0];
		}
		LinkedList<Integer> divisors = new LinkedList<Integer>();
		for(int i=1;i<=Math.abs(n);i++) {
			if(n % i == 0) {
				divisors.offer(i);
			}
		}
		int[] result = new int[divisors.size()];
		
		int index=0;
		if(n>0) {
			for(int i : divisors) {
				result[index++] = i;
			}	
		} else {
			for(int i : divisors) {
				result[index++] = -i;
			}
		}
		return result;
	}
	
	public static long[] getFirstNPrimes(int n) {
		if(n <= 0) {
			throw new IllegalArgumentException("Number of primes must be positive");
		}
		long[] primes = new long[n];
		primes[0] = 2;
		int primesPointer = 1;
		long currentNumber = 3;
		while(primesPointer < n) {
			if(isNewPrimeForArray(primes, primesPointer, currentNumber)) {
				primes[primesPointer++] = currentNumber;
			}
			currentNumber+=2;
		}
		return primes;
	}
	
	public static long[] getPrimesLessThanN(int n) {
		if(n <= 2) {
			throw new IllegalArgumentException("No primes exist less than 2");
		}
		LinkedList<Long> primes = new LinkedList<Long>();
		primes.offer(2l);
		long currentNumber = 3;
		while(currentNumber < n) {
			if(isNewPrimeForLinkedList(primes, currentNumber)) {
				primes.offer(currentNumber);
			}
			currentNumber+=2;
		}
		long[] result = new long[primes.size()];
		int i = 0;
		for(long prime : primes) {
			result[i++] = prime;
		}
		return result;
	}
	
	private static boolean isNewPrimeForLinkedList(LinkedList<Long> primesList, long value) {
		long upperBound = (long)Math.sqrt(value);
		Iterator<Long> listIterator = primesList.iterator();
		while(listIterator.hasNext()) {
			long prevPrime = listIterator.next();
			if(value % prevPrime == 0) {
				return false;
			}
			if(upperBound <= prevPrime)
			{
				break;
			}
		}

		return true;
	}
	
	public static long getNthPrime(int n) {
		if(n <= 0) {
			throw new IllegalArgumentException("Value for Nth prime must be positive");
		}
		long[] primes = getFirstNPrimes(n);
		return primes[n-1];
	}
	
	private static boolean isNewPrimeForArray(long[] primesList, int currentPointer, long value) {
		long upperBound = (long)Math.sqrt(value);

		for(int i=0;i<currentPointer;i++) {
			if(value % primesList[i] == 0) {
				return false;
			}
			if(upperBound <= primesList[i]) {
				return true;
			}
		}
		return true;
	}
	
	
	public static long getLargestPrimeFactor(long inputVal) {
		if(inputVal <= 0) {
			throw new IllegalArgumentException("Values <= 0 will not have prime factors");
		}
		long myval = inputVal;
		long answer = myval;

		for(long i=2;i<myval;i++) {
			if(isPrime(i)) {
				while(myval % i == 0) {
					myval = myval / i;
					answer = myval;
				}
			}
			if(myval == 1) {
				break;
			}
		}
		return answer;
	}
	
	public static boolean isPrime(long value) {
		if(value <= 1) {
			return false;
		}
		
		for(long i=2;i<value;i++) {
			if(value%i == 0) {
				return false;
			}
		}
		return true;
	}
	
	public static boolean isPalendrome(String value) {
		if(value == null) {
			return false;
		}
		int endPointer = value.length() - 1;
		int startPointer = 0;
		StringBuilder sb = new StringBuilder(value);
		while(endPointer > startPointer) {
			if(sb.charAt(startPointer) != sb.charAt(endPointer)) {
				return false;
			}
			startPointer++;
			endPointer--;
		}
		return true;
	}
}
