module.exports = class Common {
  constructor() {}
  /**
   * Method to check ascending order
   * @param {string} prices
   * @returns
   */
  async checkAscending(prices) {
    let isSorted = true;
    for (let i = 0; i < prices.length - 1; i++) {
      if (prices[i] < prices[i - 1]) {
        isSorted = false;
        break;
      }
    }
    return isSorted;
  }
  /**
   * Method to checkDescending
   * @param {string} prices
   * @returns
   */
  async checkDescending(prices) {
    let isSorted = true;
    for (let i = 0; i < prices.length - 1; i++) {
      if (prices[i] > prices[i + 1]) {
        isSorted = false;
        break;
      }
    }
    return isSorted;
  }
};
