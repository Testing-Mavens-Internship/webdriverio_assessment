const { searchResultsPage } = require("./search-results-page.js");

class TravelPage {
  constructor() {
    this.$header = () => $('//div[@class="lAXZRO"]');
    this.$travelCityTextField = (type) => $(`//input[@name="0-${type}city"]`);
    this.$locationDropDownBox = () => $('//div[@class="_24hoQ2 _1EzOls"]');
    this.$locationConfirmation = (keyword) =>
      $(`//div[@class="_3uA4ax"]//div[text()="${keyword}"]`);
    this.$arrivalDropDown = () =>
      $('//div[@class="_1fa_Yn HQlQNF nAiqQV _18Y7Fu"]');
    this.$dateDropDown = () => $('//div[@class="PgmDJX"]');
    this.$dateInput = () => $('//div[@class="zzPDhz _1Jqgld"]');
    this.$departureTime = () =>
      $('//button[@class="jkj0H4 _2v-mAi _3vGgRD"]/div[@class="KxNUF-"]');
    this.$travelDetailsBox = () => $('//div[@class="_3_Fivj"]');
    this.$travelDetailsInput = () =>
      $('//input[@name="0-travellerclasscount"]');
    this.$travelDetailsIncrementButton = (travelerType) =>
      $(
        `//div[text()="${travelerType}"]/../..//button[@class="_2KpZ6l _34K0qG _37Ieie"]`
      );
    this.$flightClassButton = (flightClass) =>
      $(`//div[text()="${flightClass}"]/../..//input`);
    this.$doneButton = () => $('//button[text()="Done"]');
    this.$searchButton = () => $('//button[@class="_2KpZ6l _1QYQF8 _3dESVI"]');
  }
  /**
   * Method to enter the name of departure city for travel
   * @param {String} cityType
   * @param {String} cityName
   */
  async departureCityEntering(cityType, cityName) {
    await this.$travelCityTextField(cityType).scrollIntoView({
      block: "center",
    });
    await this.$travelCityTextField(cityType).setValue(cityName);
    await this.$locationDropDownBox().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "wait time out failed for entering the depart city name",
    });
  }
  /**
   * Method to select the city form the list of drop down based on keyword provided
   * @param {String} confirmationKeyword
   */
  async departureCitySelectionConfirmation(confirmationKeyword) {
    await this.$locationConfirmation(confirmationKeyword).click();
    await this.$locationDropDownBox().waitForDisplayed({
      timeout: 10000,
      reverse: true,
      timeoutMsg: "wait time out failed for entering the depart city name",
    });
  }
  /**
   * Method to select the arrival city
   * @param {String} cityType
   * @param {STring} cityName
   */
  async arrivalCityEntering(cityType, cityName) {
    await this.$travelCityTextField(cityType).scrollIntoView({
      block: "center",
    });
    await this.$travelCityTextField(cityType).setValue(cityName);
    await this.$arrivalDropDown().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "wait time out failed for entering the arrival city name",
    });
  }

  /**
   * Select the city form the drop down list
   * @param {String} confirmationKeyword
   */
  async arrivalCitySelectionConfirmation(confirmationKeyword) {
    await this.$locationConfirmation(confirmationKeyword).click();
    await this.$arrivalDropDown().waitForDisplayed({
      timeout: 10000,
      reverse: true,
      timeoutMsg: "wait time out failed for entering the arrival city name",
    });
  }
  /**
   * Method to enter the date
   * @param {String} date
   */
  async departureDateSelector() {
    await this.$dateInput().click();
    await this.$departureTime().click();
    await this.$travelDetailsBox().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "wait time out failed for entering date details",
    });
  }
  /**
   * Method to increment teh travel arrangement details
   */
  async travelDetailsSelection() {
    await this.$travelDetailsInput().click();
    await this.$travelDetailsIncrementButton("Above 12 years").click();
    await this.$travelDetailsIncrementButton("Between 2-12 years").click();
    await this.$travelDetailsIncrementButton("Between 2-12 years").click();
    await this.$travelDetailsIncrementButton("Below 2 years").click();
  }
  /**
   * Selecting teh flight class for the travel
   * @param {String} flightClass
   */
  async flightClassSelector(flightClass) {
    await this.$travelDetailsInput().click();
    await this.$flightClassButton(flightClass).click();
    await this.$doneButton().click();
    await this.$travelDetailsBox().waitForDisplayed({
      timeout: 10000,
      reverse: true,
      timeoutMsg: "wait time out failed for selecting flight class details",
    });
  }

  /**
   * Clicking on the search button
   */
  async searchButtonClicking() {
    await this.$searchButton().click();
    await searchResultsPage.$header().waitForDisplayed({
      timeout: 20000,
      timeoutMsg: "wait time out failed for search results page to be loaded",
    });
  }
}

module.exports = {
  travelPage: new TravelPage(),
};
