
class HomePage {
  constructor() {
    this.$flipkartPageHeader = () => $('//img[@title="Flipkart"]');
    this.$travelMenu = () =>
      $('//div[@class="xtXmba"][contains(text(),"Travel")]');
    this.$travelPopupMenu = () => $('//div[@class="_3--Dt3"]');
    this.$enterFromCity = () =>
      $('//input[@class="_1w3ZZo _1YBGQV _2EjOJB lZd1T6 _2vegSu _2mFmU7"]');
    this.$enterToCity = () =>
      $('//input[@class="_1w3ZZo _1YBGQV _2EjOJB lZd1T6 _2dqBfU _2mFmU7"]');
    this.$departureDate = () =>
      $('//input[@class="_1w3ZZo _2gKfhi _2mFmU7"][@name="0-datefrom"]');
    this.$calenderDropDown = () => $('//div[@class="PgmDJX"]');
    this.$selectDeparatureDate9 = () =>
      $('//button[@class="jkj0H4 _2v-mAi _3vGgRD"]');
    this.$travellersClassPopUp = () => $('//div[@class="_3_Fivj"]');
    this.$loginPopUpCloseButton = () => $('//button[@class="_2KpZ6l _2doB4z"]');

    this.$adultAddButton = () => $('(//div[@class="_1_YMe_"])[1]');
    this.$adultAddedValue = () => $('(//div[@class="_19cAhQ _3ahBnm"])[1]');
    this.$childrenAddButton = () => $('(//div[@class="_1_YMe_"])[2]');
    this.$childrenAddedValue = () => $('(//div[@class="_19cAhQ _3ahBnm"])[2]');
    this.$infantsAddButton = () => $('(//div[@class="_1_YMe_"])[3]');
    this.$infantsAddedValue = () => $('(//div[@class="_19cAhQ _3ahBnm"])[3]');

    this.$businessRadioButton = () =>
      $('//label[@class="_2Fn-Ln _2WzguY _3L7Pww"]');
    this.$doneButtonInTravellerTab = () =>
      $('//button[@class="aC49_F _14Me7y"]');
    this.$searchButtonInTravellerTab = () =>
      $('//button[@class="_2KpZ6l _1QYQF8 _3dESVI"]');

    this.$travelPageWindow = () =>
      $('//div[@class="_1YokD2 _2GoDe3 col-12-12"]');
  }

  /**
   * Method for opening url
   * @param {url} url
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
    await this.$loginPopUpCloseButton().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Time out fail for login",
    });
  }
  /**
   * Method for closing the login pop up
   */
  async closeLoginPopUp() {
    await this.$loginPopUpCloseButton().click();
    await this.$flipkartPageHeader().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Time out fail for login",
    });
  }

  /**
   * Method for clicking on travel menu
   */
  async clickOnTravelMenu() {
    await this.$travelMenu().click();
    await this.$travelPopupMenu().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Time out fail for travel pop up",
    });
  }

  /**
   * Method for entering from city
   * @param {String} fromCity
   */
  async clickOnFromCity(fromCity) {
    await this.$enterFromCity().click();
    await this.$enterFromCity().setValue(fromCity);
  }
  /**
   * Method for entering to city
   * @param {string} toCity
   */
  async clickOnToCity(toCity) {
    await this.$enterToCity().click();
    await this.$enterToCity().setValue(toCity);
  }

  /**
   * Method for selecting departure date
   */
  async departureDate() {
    await this.$departureDate().click();
    await this.$calenderDropDown().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Time out fail for calender drop down",
    });
    await this.$selectDeparatureDate9().click();
    await this.$travellersClassPopUp().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Time out fail for return date pop up",
    });
  }

  /**
   * Method for selecting number of adults
   */
  async selectNumberOfAdults() {
    await this.$adultAddButton().click();
    await this.$adultAddedValue().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Time out adult added value",
    });
  }
  /**
   * Method for selecting number of children
   */
  async selectNumberOfChildren() {
    await this.$childrenAddButton().Click();
    await this.$childrenAddButton().Click();
    await this.$childrenAddedValue().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Time out children added value",
    });
  }

  /**
   * Method for selecting number of infants
   */
  async selectNumberOfInfants() {
    await this.$infantsAddButton().click();
    await this.$infantsAddedValue().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Time out infants added value",
    });
  }

  /**
   * Method for clicking on Business radio button and Done button
   */
  async clickOnBusinessRadioButtonAndDone() {
    await this.$businessRadioButton().click();
    await this.$doneButtonInTravellerTab().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Time out for done button",
    });
    await this.$doneButtonInTravellerTab().click();
    await this.$searchButtonInTravellerTab().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Time out for searching",
    });
  }

  /**
   * Method for clicking on search button
   */
  async clickOnSearchButton() {
    await this.$searchButtonInTravellerTab().click();
    await this.$travelPageWindow().waitForDisplayed({
      timeout: 100000,
      timeoutMsg: "Time out for loading travel page",
    });
  }
}

module.exports = {
  homePage: new HomePage(),
};
