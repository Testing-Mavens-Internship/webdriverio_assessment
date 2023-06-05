/****************************************************
 *                     Imports                      *
 ****************************************************/
const Common = require("./common.js");

class HomePage extends Common {

  constructor() {
    
    super();
    /**
     * Elements
     */
    this.$homePageIcon = () => $('//img[@title="Flipkart"]');
    this.$loginPopUpCloseButton = () => $('//button[@class="_2KpZ6l _2doB4z"]');
    this.$selectService = (serviceName) => $(`//img[@alt="${serviceName}"]`);
  }

  /**
   * Methods
   */

  /**
   * Method to close login popup.
   */
  async loginPopUpClose() {
    await this.$loginPopUpCloseButton().click();
    await this.$homePageIcon().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Wait time for home page icon to be displayed.",
    });
  }
}

module.exports = {
  homePage: new HomePage(),
};
