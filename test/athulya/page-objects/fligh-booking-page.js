const Common = require("../page-objects/common.js");

let timeArray = [];
let priceArray = [];
let priceArrayDescending=[];

class FlightBookPage extends Common {
  constructor() {
    super();
    this.$afterNoonCheckBox = () => $('//div[text()="Afternoon"]');
    this.$$departureTime = () => $$('//span[@class="_3p2vNo _2keVvy"]');
    this.$airIndiaCheckBox=()=>$('//div[text()="Air India"]');
    this.$$priceAscending=()=>$$('//div[@class="_3Byyvw"]');
    this.$priceDescendingClick=()=>$('//span[@class="_3W-vry"]');
    this.$$priceDescendingValue=()=>$$('//div[@class="_3Byyvxy"]');
  }
  /**
   * Method to select the departure time section
   */
  async departureTimeSelection() {
    await this.$afterNoonCheckBox().click();
  }
  /**
   * Method to select the time
   * @returns boolean
   */
  async afterNoonTimeAscending() {
    for (let $time of await this.$$departureTime()) {
      let value = await $time.getText();
      let resultTime = value.replace(/\D/g, "");
      timeArray.push(resultTime);
    }
    return this.isAscending(resultTime);
  }
  /**
   * Method to click the air india checkbox
   */
  async airIndiaCheckBox()
  {
    await this.$afterNoonCheckBox().click();
  }
  /**
   * Method to select the price 
   * @returns 
   */
  async sortedPriceList(){
    for (let $price of await this.$$priceAscending()) {
      let value = await $price.getText();
      let resultPrice = value.replace(/\D/g, "");
      priceArray.push(resultPrice);
    }
    return this.isLowToMaximum(priceArray);
    }
    /**
     * Method to click the price descending
     */
    async priceDescendingClick(){
        await this.$priceDescendingClick().click();
    }
    /**
     * Method to check the price is descending
     * @returns boolean
     */
    async priceAscendingCheck() {
        for (let $price of await this.$$priceDescendingValue()) {
          let value = await $price.getText();
          let resultPrice = value.replace(/\D/g, "");
          priceArray.push(resultPrice);
        }
        return this.isDescending(priceArrayDescending);
      }
}
module.exports = {
  flightBookPage: new FlightBookPage(),
};
