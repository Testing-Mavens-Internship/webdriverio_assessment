/****************************************************
 *                     Imports                      *
 ****************************************************/
const Common = require("./common.js");

class TravelFlightsPage extends Common {

  constructor() {
    super();
    /**
     * Elements
     */
    this.$flightsTravelPageHeader = () => $('//div[@class="lAXZRO"]');
    this.$departureCity = () => $('//input[@name="0-departcity"]');
    this.$airportCode = (label, airportCode) =>
      $(
        `//label[text()="${label}"]/../following-sibling::div//div[text()="${airportCode}"]`
      );
    this.$arrivalCity = () => $('//input[@name="0-arrivalcity"]');
    this.$fromToDropDown = (label) =>
      $(
        `//label[text()="${label}"]/../following-sibling::div//div[@class="_24hoQ2 _1EzOls"]`
      );
    this.$departOn = (monthAndYear, day) =>
      $(
        `//div[text()="${monthAndYear}"]/ancestor::table//button[text()="${day}"]`
      );
    this.$travelersDropDown = () => $('//div[@class="_3_Fivj"]');
    this.$travelersDetailsUpdater = (travelerType) =>
      $(
        `//div[text()="${travelerType}"]/../..//button[@class="_2KpZ6l _34K0qG _37Ieie"]`
      );
    this.$travelerClass = (travelerClass) =>
      $(`//div[text()="${travelerClass}"]/../preceding-sibling::div`);
    this.$doneButton = () => $('//button[text()="Done"]');
    this.$searchButton = () => $("//button/span");
    this.$searchResultFirstRow = () => $('(//div[text()="Book"])[1]');
    this.$searchInputDisplayed = (label) =>
      $(`//div[text()="${label}"]/..//input`);
    this.$filterByDepartureFromKochi = (filterCriteria) =>
      $(
        `//span[text()="Departure from Kochi"]/../../following-sibling::div//div[text()="${filterCriteria}"]/../../preceding-sibling::div`
      );
    this.$clearFilterOption = () => $('//div[text()="Clear filters"]');
    this.$$timeOfFlightDeparture = () =>
      $$('//span[text()="COK"]/following-sibling::span');
    this.$moreFilters = () => $('//div[@class="_2PXVb1"]');
    this.$filterByAirLines = (airLine) =>
      $(`//div[text()="${airLine}"]/../../preceding-sibling::div`);
    this.$$filterByAirLines = (airLine) =>
      $$(`//div[@class="_2HFgmY"]/span[contains(text(),"${airLine}")]`);
    this.$clearFilterAirlines = () =>
      $('//span[text()="Airlines"]/following-sibling::div');
    this.$$ticketPrice = () => $$('//div[@class="_3Byyvw"]');
    this.$priceDescendingSort = () => $('//div[@class="_1ysLi0"]');
    this.$loginPopUpHeading = () => $('//span[text()="Login"]');
  }

  /**
   * Methods
   */

  /**
   * Method to search departure city and select departure city from drop down.
   * @param {String} from
   * @param {String} airportCode
   */
  async departureCitySelector(from, airportCode) {
    await this.$departureCity().setValue(from);
    await this.$airportCode("From", airportCode).waitForClickable({
      timeout: 10000,
    });
    await this.$airportCode("From", airportCode).click();
    await this.$arrivalCity().waitForDisplayed({ timeout: 10000 });
  }

  /**
   * Method to search arrival city and select arrival city from drop down.
   * @param {String} to
   * @param {String} airportCode
   */
  async arrivalCitySelector(to, airportCode) {
    await this.$arrivalCity().setValue(to);
    await this.$airportCode("To", airportCode).waitForClickable({
      timeout: 10000,
    });
    await this.$airportCode("To", airportCode).click();
  }

  /**
   * Method to select departure date.
   * @param {String} monthAndYear
   * @param {String} day
   */
  async departAndReturnDateSelector(monthAndYear, day) {
    await this.clickOn(
      this.$departOn(monthAndYear, day),
      this.$travelersDropDown(),
      "travelers drop down"
    );
  }

  /**
   * Method to select travelers count.
   * @param {String} adultCount
   * @param {String} childCount
   * @param {String} infantCount
   */
  async travelerCountSetter(adultCount, childCount, infantCount) {
    for (let i = 1; i < adultCount; i++)
      await this.$travelersDetailsUpdater("Adults").click();
    await this.$travelersDetailsUpdater("Children").waitForClickable({
      timeout: 10000,
    });
    for (let i = 0; i < childCount; i++)
      await this.$travelersDetailsUpdater("Children").click();
    await this.$travelersDetailsUpdater("Infants").waitForClickable({
      timeout: 10000,
    });
    for (let i = 0; i < infantCount; i++)
      await this.$travelersDetailsUpdater("Infants").click();
  }

  /**
   * Method to check whether displayed results are correct according to the filter applied.
   * @returns true if results displayed are correct else false.
   */
  async flightTimeChecker() {
    let resultSet = await this.$$timeOfFlightDeparture().map((item) =>
      item.getText()
    );
    return resultSet.every((item) => parseInt(item) >= 12);
  }

  /**
   * Method to filter by airline and validate the filter results.
   * @param {String} airLineName
   * @returns true if filter results are correct according to filter criteria else false.
   */
  async filterByAirLine(airLineName) {
    await this.$filterByAirLines(airLineName).click();
    let resultSet = await this.$$filterByAirLines(airLineName).map((item) =>
      item.getText()
    );
    return resultSet.every((item) => item.includes(airLineName));
  }

  /**
   * Method to validate price  is sorted or not.
   * @returns returns true if valid sort else false
   */
  async priceSort() {
    let resultList = await this.$$ticketPrice().map((item) => item.getText());
    return await this.sortChecker(resultList);
  }

  /**
   * Method to click on "Price -- High to Low" sort
   * @returns returns true if valid sort else false
   */
  async priceDSort() {
    await this.$priceDescendingSort().scrollIntoView({block:'center'});
    await this.$priceDescendingSort().click();
    let resultList = await this.$$ticketPrice().map((item) => item.getText());
    return await this.sortDChecker(resultList);
  }
}

module.exports = {
  travelFlightsPage: new TravelFlightsPage(),
};
