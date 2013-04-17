import static org.junit.Assert.*;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import projectEuler.EulerLib;


public class EulerLibTest {

	/*
	 * This test depends on the isPrime method. Failures there could result
	 * in failures here.
	 */
	@Rule
	public ExpectedException expectedException = ExpectedException.none();
	
	@Test
	public void testGetFactorization() {
		assertArrayEquals(new int[] { }, EulerLib.getFactorization(0));
		assertArrayEquals(new int[] { 2, 3 }, EulerLib.getFactorization(6));
		assertArrayEquals(new int[] { 2, 3 }, EulerLib.getFactorization(-6));
		assertArrayEquals(new int[] { }, EulerLib.getFactorization(1));
		assertArrayEquals(new int[] { 7 }, EulerLib.getFactorization(7));
	}
	
	@Test
	public void testGetNumberOfDivisors() {
		assertEquals(4, EulerLib.getNumberOfDivisors(6));
		assertEquals(0, EulerLib.getNumberOfDivisors(0));
		assertEquals(4, EulerLib.getNumberOfDivisors(-6));
		assertEquals(2, EulerLib.getNumberOfDivisors(7));
	}
	
	@Test
	public void testGetAllDivisors() {
		assertArrayEquals(new int[] { }, EulerLib.getAllDivisors(0));
		assertArrayEquals(new int[] { 1, 2, 5, 10 }, EulerLib.getAllDivisors(10));
		assertArrayEquals(new int[] { -1, -17 }, EulerLib.getAllDivisors(-17));
		assertArrayEquals(new int[] { 1 }, EulerLib.getAllDivisors(1));
	}
	
	@Test
	public void testGetPrimesgetPrimesLessThanNArgumentException0() {
		expectedException.expect(IllegalArgumentException.class);
		expectedException.expectMessage("No primes exist less than 2");
		EulerLib.getPrimesLessThanN(0);
	}

	@Test
	public void testGetPrimesgetPrimesLessThanNArgumentException2() {
		expectedException.expect(IllegalArgumentException.class);
		expectedException.expectMessage("No primes exist less than 2");
		EulerLib.getPrimesLessThanN(2);
	}

	@Test
	public void testGetPrimesLessThanN() {
		
		assertArrayEquals(new long[] { 2 }, EulerLib.getPrimesLessThanN(3));
		assertArrayEquals(new long[] { 2, 3 }, EulerLib.getPrimesLessThanN(5));
		assertArrayEquals(new long[] { 2, 3, 5, 7, 11 }, EulerLib.getPrimesLessThanN(12)); 
	}
	
	@Test
	public void testGetFirstNPrimesArgumentException() {
		expectedException.expect(IllegalArgumentException.class);
		expectedException.expectMessage("Number of primes must be positive");
		EulerLib.getFirstNPrimes(0); 
	}

	@Test
	public void testGetFirstNPrimes() {
		assertArrayEquals(new long[] {2}, EulerLib.getFirstNPrimes(1));
		assertArrayEquals(new long[] {2, 3}, EulerLib.getFirstNPrimes(2));
		assertArrayEquals(new long[] {2, 3, 5, 7, 11}, EulerLib.getFirstNPrimes(5)); 
	}
	
	@Test
	public void testGetLargestPrimeFactorArgumentExceptionZero() {
		expectedException.expect(IllegalArgumentException.class);
		expectedException.expectMessage("Values <= 0 will not have prime factors");
		EulerLib.getLargestPrimeFactor(0); 
	}
	
	@Test
	public void testGetLargestPrimeFactorArgumentExceptionNegative() {
		expectedException.expect(IllegalArgumentException.class);
		expectedException.expectMessage("Values <= 0 will not have prime factors");
		EulerLib.getLargestPrimeFactor(-20); 
	}

	@Test
	public void testGetNthPrimeNegativeArgument() {
		expectedException.expect(IllegalArgumentException.class);
		expectedException.expectMessage("Value for Nth prime must be positive");
		EulerLib.getNthPrime(-1); 
	}
	@Test
	public void testGetNthPrimeZeroArgument() {
		expectedException.expect(IllegalArgumentException.class);
		expectedException.expectMessage("Value for Nth prime must be positive");
		EulerLib.getNthPrime(0); 
	}		
	@Test
	public void testGetNthPrime() {
		assertEquals(2, EulerLib.getNthPrime(1));
		assertEquals(3, EulerLib.getNthPrime(2));
		assertEquals(11, EulerLib.getNthPrime(5));
		assertEquals(7919, EulerLib.getNthPrime(1000));
		assertEquals(15485863, EulerLib.getNthPrime(1000000));
	}
	
	@Test
	public void testGetLargestPrimeFactor() {
		assertEquals(7, EulerLib.getLargestPrimeFactor(7));
		assertEquals(3, EulerLib.getLargestPrimeFactor(12));
		assertEquals(1, EulerLib.getLargestPrimeFactor(1));
	}
	
	@Test
	public void testIsPrime() {
		try {
			//one case
			assertFalse(EulerLib.isPrime(1));
			//zero case
			assertFalse(EulerLib.isPrime(0));
			//negative case
			assertFalse(EulerLib.isPrime(-3));
			assertFalse(EulerLib.isPrime(-4));
			//very negative case
			assertFalse(EulerLib.isPrime(-17351207));
			assertFalse(EulerLib.isPrime(-17351208));
			//large non prime number case
			assertFalse(EulerLib.isPrime(17351208));
			
			
			//very small case
			assertTrue(EulerLib.isPrime(3));
			//normal case
			assertTrue(EulerLib.isPrime(31));
			//large case
			assertTrue(EulerLib.isPrime(17351207));
			
		} catch(Exception e) {
			fail("Exception thrown");
		}
	}

	@Test
	public void testIsPalendrome() {
		try {
			assertFalse(EulerLib.isPalendrome(null));
			assertFalse(EulerLib.isPalendrome("123"));
			assertFalse(EulerLib.isPalendrome("12"));
			
			assertTrue(EulerLib.isPalendrome(""));
			assertTrue(EulerLib.isPalendrome("a"));
			assertTrue(EulerLib.isPalendrome("112211"));
			assertTrue(EulerLib.isPalendrome("11211"));
			assertTrue(EulerLib.isPalendrome("--||%%^^%%||--"));
			assertTrue(EulerLib.isPalendrome("---------------"));
		} catch(Exception e) {
			fail("Exception thrown");
		}
	}

}
