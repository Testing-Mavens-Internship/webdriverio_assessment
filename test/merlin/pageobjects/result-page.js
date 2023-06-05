const Common = require("../pageobjects/common-page.js");

let prices;

class Result extends Common {
  constructor() {
    super();
    this.$afterNoonCheckBox = () =>
      $('//div[@class="_325M91" and text()="Afternoon"]');
    this.$$noonTime = () => $$('//span[@class="_3p2vNo _2keVvy"])');
    this.$$decreasePrice = () => $$('//div[@class="_3Byyvw"]');
    this.$priceIncrease = () =>
      $('//span[@class="_3W-vry" and text()="PRICE"]');
    this.$downArrow = () => $('//div[@class="_1ysLi0"]//*[name()="svg"]');
    this.$$increasePrice = () => $$('//div[@class="_3Byyvw"]');
  }
  /**
   * Method to validate the price in ascending order
   * @returns
   */
  async validatePriceInascendingOrder() {
    prices = await this.$$decreasePrice().map((price) => price.getText());
    prices = prices.map((price) => price.replace(/₹|,/g, ""));
    prices = prices.map((price) => parseInt(price));
    return this.checkAscending(prices);
  }
  /**
   * Method Click on price to descending order
   */
  async clickOnPriceHeader() {
    await this.$priceIncrease().click();
    await this.$downArrow().waitForDisplayed({
      timeout: 50000,
      timeourMsg: "Descending Order Price Displayed",
    });
  }
  /**
   * Method to validate the price in descending order
   */
  async validateThePriceInDescending() {
    prices = await this.$$decreasePrice().map((price) => price.getText());
    prices = prices.map((price) => price.replace(/₹|,/g, ""));
    prices = prices.map((price) => parseInt(price));
    return this.checkDescending(prices);
  }
}

module.exports = {
  resultPage: new Result(),
};
