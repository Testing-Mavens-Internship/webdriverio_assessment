module.exports = class Common {
    constructor() {}
    /**
     * method to check the time is greater than 12
     * @param {string} timeArray 
     * @returns boolean
     */
    isAscending(timeArray)
    {
      for (let i = 0; i < timeArray.length - 1; i++) {
        if (timeArray[i] >12.00) {
          return false;
        }
      }
      return true;
    }

/**
 * Method to get the price 
 * @param {string} priceArray 
 * @returns boolean
 */
isAscendingPrice(priceArray)
{
  for (let i = 0; i < priceArray.length - 1; i++) {
    if (priceArray[i] < priceArray[i + 1]) {
      return false;
    }
  }
  return true;
}
isDescending(priceArrayAscending)
{
  for (let i = 0; i < priceArrayAscending.length - 1; i++) {
    if (priceArrayAscending[i] < priceArrayAscending[i + 1]) {
      return false;
    }
  }
  return true;
}
}