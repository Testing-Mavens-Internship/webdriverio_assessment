const { travelPage } = require("./travel-page.js");

class HomePage {
  constructor() {
    this.$loginButton = () =>
      $('//div[@class="_1psGvi _3BvnxG"]//a[text()="Login"]');
    this.$travelButton = () => $('//img[@alt="Travel"]');
    this.$initialLoginPopUpCloseButton = () =>
      $('//button[@class="_2KpZ6l _2doB4z"]');
  }

  /**
   * Load the url for the site and open the website
   * @param {String} url
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    await this.$initialLoginPopUpCloseButton().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed for loading URL",
    });
  }
  /**
   * Method to close the pop up window for login when entering the URL
   */
  async loginPopUpClosing() {
    await this.$initialLoginPopUpCloseButton().click();
    await this.$loginButton().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait time out failed for loading URL",
    });
  }

  /**
   * Method to select Travel option from the home page menu
   */
  async clickingTravel() {
    await this.$travelButton().click();
    await travelPage.$header().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "wait timeout due to failure to load travel page ",
    });
  }
}

module.exports = {
  homePage: new HomePage(),
};
