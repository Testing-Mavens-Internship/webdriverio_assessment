module.exports = class Common {
    constructor() { }
    /**
    * Method to check values are in ascending order
    * @param {string} priceArray 
    * @returns boolean
    */
    isAscending(priceArray) {
        for (let i = 0; i < priceArray.length - 1; i++) {
            if (priceArray[i] > priceArray[i + 1]) {
                return false;
            }
        }
        return true;
    }
    /**
    * Method to check values are in ascending order
    * @param {string} priceArray 
    * @returns boolean
    */
    isDescending(priceArray) {
        for (let i = 0; i < priceArray.length - 1; i++) {
            if (priceArray[i] < priceArray[i + 1]) {
                return false;
            }
        }
        return true;
    }
}
