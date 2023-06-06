const Common = require("./common");
let timeArray = [];
class AkbarFlights extends Common {
  constructor() {
    super();
    this.$clickOnFromPoint = () => $("#liFrom");
    this.$verifyFromDropDown = () => $("//input[@placeholder='From']");
    this.$enterFromPlace = () => $('//h3[text()="Cochin"]');
    this.$clickOnToPoint = () => $("//label[text()='To ']");
    this.$verifyToDropDown = () => $("(//div[@class='mat-form-field-infix'])[1]");
    this.$enterToPlace = () => $('//strong[text()="DXB"]');
    this.$chooseDeparture = () => $("#liOn");
    this.$verifyCalenderPopUp = () => $('//div[text()="June "]');
    this.$chooseDepartureDate = () => $('(//div[text()=" 9 "])[1]');
    this.$clickOnTravellers = () => $('//li[@class="travellers"]');
    this.$verifyTravellersDropDwon = () => $('//p[text()="Adults"]');
    this.$incrementAdultsAndChild = (fieldNumber) =>
      $(`(//div[text()="+"])[${fieldNumber}]`);
    this.$incrementInfant = () => $('(//div[text()="+ "])');
    this.$verifyAdultNumber = () =>
      $('//p[text()="Adults"]/following-sibling::h6[text()="2"]');
    this.$verifyChildrenNumber = () =>
      $('//p[text()="Children "]/following-sibling::h6[text()="2"]');
    this.$verifyInfantNumber = () =>
      $('//p[text()="Children "]/following-sibling::h6[text()="2"]');
    this.$clickOnBusiness = () => $('//div[text()=" Business"]');
    this.$clickOnApply = () => $('//span[text()="Apply"]');
    this.$clickOnSearchFlight = () => $('(//span[text()="Search Flights"])[1]');
    this.$searchPage = () => $('//span[text()="Modify Search"]');
    this.clickOnAfterNoon = () => $('(//span[@class="ak-sunrise icon"])[1]');
    this.$$departureTime = () => $$('//li[@class="departure"]');
    this.$clickOnFlightCompany = () => $('//span[@title="Air India"]');
    this.$$flightComapany = () => $$('//h3[@title="Air India"]');
    this.$$flightPrice = () => $$('//h2[@class="ng-star-inserted"]');
    this.$changingPrice = () => $('//span[text()=" Price "]');
  }

  /**
   * Methode to Launch the Url of the application.
   * @param {string} url
   */
  async openUrl(url) {
    await browser.maximizeWindow();
    await browser.url(url);
  }

  /**
   * Method to set the Destination.
   */
  async travellingDestinations() {
    await this.$clickOnFromPoint().click();
    await this.$verifyFromDropDown().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "Not displayig the 'Form' drop down menu",
    });
    await this.$verifyFromDropDown().setValue("Cochin");
    await this.$enterFromPlace().click();
    await this.$clickOnToPoint().click();
    await this.$verifyToDropDown().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "Not displayig the 'To' drop down menu",
    });
    await this.$verifyToDropDown().setValue("Dubai");
    await this.$enterToPlace().click();
  }

  /**
   * Method to set the Departure date.
   */
  async travellingDate() {
    await this.$chooseDeparture().click();
    await this.$verifyCalenderPopUp().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "Calender Pop Up not displayed",
    });
    await this.$chooseDepartureDate().click();
  }

  /**
   * Method to set number of Travellers.
   */
  async numberOfTravellers() {
    await this.$clickOnTravellers().click();
    await this.$verifyTravellersDropDwon().waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "Travellers drop down is not displayed",
    });
    await this.$incrementAdultsAndChild(1).click();
    await this.$incrementAdultsAndChild(2).click();
    await this.$incrementAdultsAndChild(2).click();
    await this.$incrementInfant().click();
  }

  /**
   * Method to choose 'Business' Class.
   */
  async clickOnBusinessClass() {
    await this.$clickOnBusiness().click();
    await this.$clickOnApply().click();
    await this.$clickOnSearchFlight().click();
    await this.$searchPage().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "Search Page is not displayed",
    });
  }

  /**
   * Method to filter the flight .time
   */
  async filterByFlightTime() {
    await this.clickOnAfterNoon().click();
  }

  /**
   * Method to check listed time are as per the filter
   * @returns boolean
   */
  async departureTime() {
    for (let $time of await this.$$departureTime()) {
      let value = await $time.getText();
      let resultTime = value.replace(/\D/g, "");
      timeArray.push(resultTime);
    }
    return this.isAfterNoon(timeArray);
  }

  /**
   * Method to choose the Flight Company.
   */
  async flightCompany() {
    await this.$clickOnFlightCompany().click();
  }

  /**
   * Method to verify that the listed flights are as per filter.
   * @returns bolean
   */
  async isListedAirIndia() {
    for (let $airIndia of await this.$$flightComapany()) {
      let value = await $airIndia.getText();
      let resultairIndia = value.replace(/\D/g, "");
      airIndiaArray.push(resultairIndia);
    }
    return this.isAirIndia(airIndiaArray);
  }
  
  /**
   * Method to verify that the listed flights are in acenting order.
   * @returns bolean
   */
  async verifySortedFlightPrice() {
    for (let $Price of await this.$$flightPrice()) {
        let value = await $Price.getText();
        let resultPrice = value.replace(/\D/g, "");
        priceArray.push(resultPrice);
      }
      return this.isDescending(priceArray);
    }
}
module.exports = {
  ticketBooking: new AkbarFlights(),
};
