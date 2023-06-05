class HomePage {
  constructor() {
    this.$loginPopUp = () => $('//button[@class="_2KpZ6l _2doB4z"]');
    this.$loginPopUpHeader = () => $('//span[text()="Login"]');
    this.$travelIcon = () => $('//div[contains(text(),"Travel")]');
    this.$travelPageHeader = () => $('//div[@class="lAXZRO"]');
  }
  /**
   * Method to open the url
   * @param {string} url
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
  }
  /**
   * Method to close the login pop-up
   */
  async loginPopUp() {
    await this.$loginPopUp().click();
    await this.$travelIcon().waitForDisplayed(40000);
  }
  /**
   * Method to click on travel
   */
  async clickOnTravel() {
    await this.$travelIcon().click();
    await this.$travelPageHeader().waitForDisplayed({
      timeout: 40000,
      timeOutMsg: "waited for 40s to appear the header",
    });
  }
}
module.exports = {
  homePage: new HomePage(),
};
