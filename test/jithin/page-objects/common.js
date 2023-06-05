module.exports = class Common {
  
  constructor() {}
  /**
   * Methods
   */

  /**
   * Method to load the url in a new maximized browser window.
   * @param {String} url
   */
  async openUrl(url, $selectorToWait) {
    await browser.maximizeWindow();
    await browser.url(url);
    await $selectorToWait.waitForDisplayed({
      timeout: 50000,
      timeoutMsg: "Wait time for home page to be displayed.",
    });
  }

  /**
   * method to click on an element with passed selector
   * @param {String} $selectorToClick
   * @param {String} $selectorToWait
   * @param {String} selectorName
   */
  async clickOn($selectorToClick, $selectorToWait, selectorName) {
    await $selectorToClick.click();
    await $selectorToWait.waitForDisplayed({
      timeout: 20000,
      timeoutMsg: `Wait time for ${selectorName} to be displayed.`,
    });
    await $selectorToWait.waitForClickable({
      timeout: 20000,
    });
  }

  /**
   * Method to validate whether array elements are in ascending order or not.
   * @param {String<Array>} array
   * @returns true if array elements are in descending order else false
   */
  async sortChecker(array) {
    array = array.map((item) => item.replace(/[₹|,]/g, ""));
    array = array.map((item) => parseInt(item));
    return array.slice(1).every((item, index) => item >= array[index]);
  }

  /**
   * Method to validate whether array elements are in descending order or not.
   * @param {String<Array>} array
   * @returns true if array elements are in descending order else false
   */
  async sortDChecker(array) {
    array = array.map((item) => item.replace(/[₹|,]/g, ""));
    array = array.map((item) => parseInt(item));
    return array.slice(1).every((item, index) => item <= array[index]);
  }
};
