/**
 * Utility functions for currency formatting
 */

/**
 * Format price in Indian Rupees (INR)
 * @param price - Price in paise (smallest unit)
 * @returns Formatted price string with ₹ symbol
 */
export function formatINR(price: number): string {
  // Convert paise to rupees (divide by 100)
  const rupees = price / 100
  
  // Format with Indian number system (lakhs, crores)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(rupees)
}

/**
 * Format price in a simple format (₹X,XXX)
 * @param price - Price in paise
 * @returns Simple formatted price string
 */
export function formatSimpleINR(price: number): string {
  const rupees = price / 100
  return `₹${rupees.toLocaleString('en-IN')}`
}

/**
 * Convert USD to INR (approximate conversion)
 * @param usdPrice - Price in USD
 * @param exchangeRate - Current exchange rate (default: 83)
 * @returns Price in paise (INR * 100)
 */
export function convertUSDToINR(usdPrice: number, exchangeRate: number = 83): number {
  return Math.round(usdPrice * exchangeRate * 100)
}
