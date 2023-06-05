class Travel {
  constructor() {
    this.$fromSearchBar = () => $('//input[@name="0-departcity"]');
    this.$fromLocation = () => $('//div[@class="_2B0KQx" and text()="COK"]');
    this.$displayedFromlocation = () =>
      $('//input[@value="Kochi, COK - Cochin International Airport, India"]');
    this.$toSearchBar = () => $('//input[@name="0-arrivalcity"]');
    this.$toLocation = () => $('//div[@class="_2B0KQx" and text()="DXB"]');
    this.$displayedToLocation = () =>
      $(
        '//input[@value="Dubai, DXB - Dubai International Airport, United Arab Emirates"]'
      );
    this.$selectFromDate = () => $('//input[@name="0-datefrom"]');
    this.$juneNine = () =>
      $('//button[@class="jkj0H4 _2v-mAi _3vGgRD" and text()="9"]');
    this.$dateDisplayed = () => $('//input[@value="9 Jun, Fri"]');
    this.$travellersAndClass = () =>
      $('//input[@name="0-travellerclasscount"]');
    this.$travellersSelectionDropDown = () =>
      $('//div[@class="_2g4weU _3mOkvM"]');
    this.$adultPlusButton = () =>
      $(
        '//div[@class="_2g4weU _3mOkvM"]//div[1]//div[2]//div[1]//div[3]//button[1]//*[name()="svg"]'
      );
    this.$noOfAdultDisplayed = () =>
      $('//div[@class="_19cAhQ _3ahBnm" and text()="2"]');
    this.$childrenPlusButton = () =>
      $(
        "/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/form[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[3]/button[1]"
      );
    this.$noOfChildrenDisplayed = () =>
      $('//div[@class="_2g4weU _3mOkvM"]//div[2]//div[2]//div[1]//div[2]');
    this.$infantPlusButton = () =>
      $(
        '//div[@class="_3OFDG8"]//div[3]//div[2]//div[1]//div[3]//button[1]//*[name()="svg"]'
      );
    this.$noOfInfantDisplayed = () =>
      $('//div[@class="_19cAhQ _3ahBnm" and text()="1"]');
    this.$businessClassRadioButton = () =>
      $('//div[@class="_2jIO64 _1NhOqr"]//div[text()="Business"]');
    this.$doneButton = () =>
      $('//button[@class="aC49_F _14Me7y" and text()="Done"]');
    this.$selectedclass = () =>
      $(
        '//div[@class="_2jIO64 _1NhOqr"]//div[@data-checked="true" and text()="Business"]'
      );
    this.$searchButton = () => $('//button[@type="button"]');
    this.$resultPageHeader = () =>
      $('//div[@class="_2CzBsO" and text()="Filter By"]');
  }
  /**
   * Method to enter the from location
   * @param {string} location
   */
  async enterFromLocation(location) {
    await this.$fromSearchBar().setValue(location);
    await this.$fromLocation().waitForDisplayed({
      timeout: 10000,
      timeourMsg: "Failed for from location loading",
    });
    await this.$fromLocation().click();
  }
  /**
   * Method to enter the to location
   * @param {string} location
   */
  async enterToLocation(location) {
    await this.$toSearchBar().setValue(location);
    await this.$toLocation().waitForDisplayed({
      timeout: 10000,
      timeourMsg: "Failed for to location loading",
    });
    await this.$toLocation().click();
    await this.$displayedToLocation().waitForDisplayed({
      timeout: 10000,
      timeourMsg: "Failed for to   display location loading",
    });
  }
  /**
   * Method to select the date
   */
  async selectDate() {
    await this.$selectFromDate().click();
    await this.$juneNine().click();
    await this.$dateDisplayed().waitForDisplayed({
      timeout: 10000,
      timeourMsg: "Failed for date displayed loading",
    });
  }
  /**
   * Method to select the travellers
   */
  async selectTravellers() {
    await this.$travellersAndClass().click();
    await this.$travellersSelectionDropDown().waitForDisplayed({
      timeout: 10000,
      timeourMsg: "Failed for traveller slection dropdown loading",
    });
    await this.$adultPlusButton().click();
    await this.$noOfAdultDisplayed().waitForDisplayed({
      timeout: 10000,
      timeourMsg: " no of adults displaying Failed loading ",
    });
    await this.$childrenPlusButton().doubleClick();
    await this.$noOfChildrenDisplayed().waitForDisplayed({
      timeout: 10000,
      timeourMsg: "no of children displaying Failed loading",
    });
    await this.$noOfInfantDisplayed().waitForDisplayed({
      timeout: 10000,
      timeourMsg: " no of infant displaying Failed loading ",
    });
  }
  /**
   * Method to select business class
   */
  async selectBusinessClass() {
    await this.$businessClassRadioButton().click();
    await this.$selectedclass().waitForDisplayed({
      timeout: 10000,
      timeourMsg: " selected class loading  Failed loading ",
    });
    await this.$doneButton().click();
  }
  /**
   * Method to search for flight
   */
  async searchForFlight() {
    await this.$searchButton().click();
    await this.$resultPageHeader().waitForDisplayed({
      timeout: 50000,
      timeourMsg: " Result Page Loading Failed ",
    });
  }
}
module.exports = {
  travelPage: new Travel(),
};
