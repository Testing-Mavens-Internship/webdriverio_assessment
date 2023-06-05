class TravelPage {
  constructor() {
    this.$travelPageHeader = () => $('//div[@class="lAXZRO"]');
    this.$afternoonCheckBox = () => $('(//div[@class="_24_Dny _1MtB6C"])[5]');
    this.$$afternoonFlightPriceList = () => $$('//div[@class="_3Byyvw"]');
    this.$travelAfternoonFilteredResult = () =>
      $('//div[@class="_1YokD2 _3Mn1Gg col-9-12"]');
  }

  /**
   * Method for clicking on afternoon filter
   */
  async clickOnAfternoonFilter() {
    await this.$afternoonCheckBox().click();
    await this.$travelAfternoonFilteredResult().waitForDisplayed({
      timeout: 100000,
      timeoutMsg: "Time out for loading result",
    });
  }

  /**
   * Method for checking the order of price in ascending order
   * @returns boolean value
   */
  async orderCheck() {
    for (let $price of await this.$$afternoonFlightPriceList()) {
      let value = await $price.getText();
      let resultPrice = value.replace(/\D/g, "");
      priceArray.push(resultPrice);
    }
    return this.isDescending(priceArray);
  }
}

module.exports = {
  travelPage: new TravelPage(),
};
