class TrvelPage {
  constructor() {
    this.$fromSearchTab = () => $('//label[text()="From"]');
    this.$placeFromDropDown = () => $('//div[text()="COK"]');
    this.$toFromSeachBar = () => $('//input[@name="0-arrivalcity"]');
    this.$toFromDropDown = () => $('//div[text()="DXB"]');
    this.$departOnSearchBar = () => $('//input[@name="0-datefrom"]');
    this.$dateSelectionFromCalender = () => $('//input[@value="9 Jun, Fri"]');
    this.$travellerDetailsTab = () =>
      $('//input[@class="_1w3ZZo zO-_Xz _2mFmU7"]');
    this.$adultsIncrementIcon = () =>
      $('(//button[@class="_2KpZ6l _34K0qG _37Ieie"])[1]');
    this.$adultCount = () => $('//div[@class="_19cAhQ _3ahBnm"]');
    this.$childrenIncrementIcon = () =>
      $('(//button[@class="_2KpZ6l _34K0qG _37Ieie"])[2]');
    this.$childrenCount = () =>
      $(
        '//div[text()="Children"]/ancestor::div[@class="_2g4weU"]//div[@class="_19cAhQ _3ahBnm"]'
      );
    this.$infantIncrementIcon = () =>
      $('(//button[@class="_2KpZ6l _34K0qG _37Ieie"])[3]');
    this.$economyClassSelect = () =>
      $('//div[@class="_2jIO64 _1NhOqr"]//div[text()="Economy"]');
    this.$doneButton = () => $('//button[text()="Done"]');
    this.$searchIconClick = () => $('//span[text()="SEARCH"]');
    this.$searchAgainTab = () => $('//span[text()="Search Again"]');
  }
  /**
   * Method to search a place in from tab
   */
  async fromSearchBar(fromPlace) {
    await this.$fromSearchTab().setValue(fromPlace);
    await this.$placeFromDropDown().click();
  }
  /**
   * Method to enter a to place
   */
  async toSearchBar(toPlace) {
    await this.$toFromSeachBar().setValue(toPlace);
    await this.$toFromDropDown().click();
  }
  /**
   * Method to search a date from calender
   */
  async departOnDateSelection() {
    await this.$departOnSearchBar().click();
    await this.$dateSelectionFromCalender().waitForDispLayed(40000);
  }
  /**
   * Method to enter the traveller details
   */
  async travellersDetails() {
    await this.$travellerDetailsTab().click();
    await this.$adultsIncrementIcon().click();
    await this.$childrenIncrementIcon().waitForDisplayed({
      timeout: 40000,
      timeOutMsg: "expect the children increment icon to appear",
    });
    await this.$adultsIncrementIcon().click();
    await this.$infantIncrementIcon().click();
  }
  /**
   * Method to click on search icon
   */
  async cabinClassSelect() {
    await this.$economyClassSelect().click();
    await this.$doneButton().click();
  }
  /**
   * Method to click on search button
   */
  async searchButtonClick() {
    await this.$searchIconClick().click();
    await this.$searchAgainTab().waitforDisplayed({
      timeout: 40000,
      timeOutMsg: "Search again tab to appear",
    });
  }
}
module.exports = {
  travelPage: new TrvelPage(),
};
