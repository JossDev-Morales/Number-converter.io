"use strict";

/**
 * Convert a number in decimal base to a some other base betwen 2 and 36 under the rules for bases, see at www.github.com
 * @param {string} decimal The number representation 
 * @param {'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31'|'32'|'33'|'34'|'35'|'36'} radix The base to convert, betwen 1 and 36
 * @see www.github.com decimalToBase Doc
 * @returns {string} The representation of the number converted to the numeric base
 */
function decimalToBase(decimal, radix) {
  let result = "";
  while (decimal > 0) {
    let remainder = decimal % radix;
    if (remainder < 10) {
      result = remainder + result;
    } else {
      result = String.fromCharCode(65 + remainder - 10) + result;
    }
    decimal = Math.floor(decimal / radix);
  }
  return result || "0";
}
module.exports = decimalToBase;