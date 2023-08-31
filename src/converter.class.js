const baseChecker = require("./baseChecker.tool")
const baseToDecimal = require("./baseToDecimal.op")
const decimalToBase = require("./decimalToBase.op")
const sanitizer = require("./sanitizer.tool")
/**
 * @class Converter is a class to parse a number and convert it to other number bases such as Binary, Octal, Decimal, Hexadecimal and custom bases between 2 and 36.
 * @public
 * @see www.github.com
 */
class converter {
    #number
    #base
    /**
     * @constructor A converter betwen numeric bases
     * @param {string} number A number representation in some numeric base
     * @param {("binary"|"octal"|"decimal"|"hexadecimal"|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31'|'32'|'33'|'34'|'35'|'36')} base A numeric base betwen 2 and 36
     * @see www.github.com
     */
    constructor(number, base) {
        this.composition = sanitizer(String(number), base)
        this.#number = this.composition.number
        this.#base = this.composition.base
        //checker
        baseChecker(this.#number,this.composition.base)
    }
    /**
     * @method toBinary This method converts the current number to binary base.
     * @see www.github.com
     * @returns {string} The numeric representation in Binary
     */
    toBinary() {
        if (!this.#number.decimals) {
            return this.composition.sign==='-'?this.composition.sign:''+decimalToBase(this.toDecimal(), '2')
        } else {
            return `${this.composition.sign==='-'?this.composition.sign:''}${decimalToBase(baseToDecimal(this.#number.ints, this.#base), '2')}.${decimalToBase(baseToDecimal(this.#number.decimals, this.#base), '2')}`
        }
    }
    /**
     * @method toOctal This method converts the current number to octal base.
     * @see www.github.com
     * @returns {string} The numeric representation in Octal
     */
    toOctal() {
        if (!this.#number.decimals) {
            return this.composition.sign==='-'?this.composition.sign:''+decimalToBase(this.toDecimal(), '8')
        } else {
            return `${this.composition.sign==='-'?this.composition.sign:''}${decimalToBase(baseToDecimal(this.#number.ints, this.#base), '8')}.${decimalToBase(baseToDecimal(this.#number.decimals, this.#base), '8')}`
        }
    }
    /**
     * @method toDecimal This method converts the current number to decimal base.
     * @see www.github.com
     * @returns {string} The numeric representation in Decimal
     */
    toDecimal() {
        if (!this.#number.decimals) {
            return this.composition.sign==='-'?this.composition.sign:''+baseToDecimal(this.#number.ints, this.#base)
        } else {
            return `${this.composition.sign==='-'?this.composition.sign:''}${baseToDecimal(this.#number.ints, this.#base)}.${baseToDecimal(this.#number.decimals, this.#base)}`
        }
    }
    /**
     * @method toHexadecimal This method converts the current number to hexadecimal base.
     * @see www.github.com
     * @returns {string} The numeric representation in Hexadecimal
     */
    toHexadecimal() {
        if (!this.#number.decimals) {
            return this.composition.sign==='-'?this.composition.sign:''+decimalToBase(this.toDecimal(),'16')
        }else{
            return `${this.composition.sign==='-'?this.composition.sign:''}${decimalToBase(baseToDecimal(this.#number.ints,this.#base),'16')}.${decimalToBase(baseToDecimal(this.#number.decimals,this.#base),'16')}`
        }
    }
    /**
     * @method toCustomBase This method converts the current number to other base under the rules for the bases, see at www.github.com
     * @see www.github.com toCustomBase Doc
     * @param {string} base The custom base to convert 
     * @returns {string} The numeric representation of the custom base.
     */
    toCustomBase(base){
        if (!this.#number.decimals) {
            return this.composition.sign==='-'?this.composition.sign:''+decimalToBase(this.toDecimal(),base)
        }else{
            return `${this.composition.sign==='-'?this.composition.sign:''}${decimalToBase(baseToDecimal(this.#number.ints,this.#base),'8')}.${decimalToBase(baseToDecimal(this.#number.decimals,this.#base),'8')}`
        }
    }
    /**
     * @method fromCustomToCustom An static method to convert from a number in some base to other base under the rules for the bases, see at www.github.com
     * @see www.github.com fromCustomToCustom Doc
     * @param {{number:string,base:string}} from The representation of an number in a custom base
     * @param {string} to The custom base to convert
     */
    static fromCustomToCustom(from,to){
        const fromNumber=sanitizer(from.number,from.base)
        if (!fromNumber.number.decimals) {
            return fromNumber.sign==='-'?fromNumber.sign:''+decimalToBase(baseToDecimal(fromNumber.number.ints,from.base),to)
        }else{
            return `${fromNumber.sign==='-'?fromNumber.sign:''}${decimalToBase(baseToDecimal(fromNumber.number.ints,from.base),to)}.${decimalToBase(baseToDecimal(fromNumber.number.decimals,from.base),to)}`
        }
    }
}
module.exports=converter