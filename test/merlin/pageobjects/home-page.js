class Home {
  constructor() {
    this.$homePageHeader = () => $('//img[@title="Flipkart"]');
    this.$loginPopUpCloseButton = () => $('//button[@class="_2KpZ6l _2doB4z"]');
    this.$travelButton = () => $('//img[@alt="Travel"]');
    this.$travelPageHeader = () =>
      $('//div[@class="lAXZRO" and text()="Travel"]');
  }
  /**
   * Method to open url
   * @param {string}url
   *
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    await this.$homePageHeader().waitForDisplayed({
      timeOut: 5000,
      timeoutMsg: " HomePage Loading failed",
    });
    await this.$loginPopUpCloseButton().click();
  }
  /**
   * Method to click on Travel Button
   */
  async clickOnTravelButton() {
    await this.$travelButton().click();
    await this.$travelPageHeader().waitForDisplayed({
      timeOut: 5000,
      timeoutMsg: " Travel page Loading failed",
    });
  }
}

module.exports = {
  homePage: new Home(),
};
