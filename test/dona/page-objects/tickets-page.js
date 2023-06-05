const Common = require('../page-objects/common.js');
const { homePage } = require('../page-objects/home-page.js');

let priceArray = [];

class TicketsPage extends Common {
    constructor() {
        super();
        this.$filterHeader = () => $(`//div[text()="Filter By"]`);
        this.$time = () => $(`(//div[@class="_24_Dny _1MtB6C"])[5]`);
        this.$clearFilterOption = () => $(`//div[text()="Clear filters"]`);
        this.$airlinesDropdown = () => $(`//div[text()="+ 9 More"]`);
        this.$$departTime = () => $$(`//span[@class="_3p2vNo _2keVvy"]`);
        this.$requiredChoice = (choice) => $(`//div[text()="${choice}"]`)
        this.$$priceColumn = () => $$(`//div[@class="_3Byyvw"]`);
        this.$priceHeader = () => $(`//span[@class="_3W-vry"]`);
        this.$bookButton = () => $(`//div[@class="ZiOg5a"]`);

    }
    /**
     * Method to set time
     */
    async setTime() {
        await this.$time().click();
        await this.$clearFilterOption().waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for clear all option to be displayed.", });
    }

    /**
    * Method to extract each column values from search results
    * @param {string} fieldData 
    * @returns array
    */
    async getFieldData(fieldData) {
        let resultSet = await this.$$departTime().map((item) => item.getText());
        return await resultSet.filter((item) => item === fieldData);
    }
    /**
    * Method to filter the required airlies
    */
    async filterAirlines() {
        await this.$airlinesDropdown().scrollIntoView({ block: "center" });
        await this.$airlinesDropdown().click();
        await this.$requiredFlight(testData.choice[0]).click();
        await this.$requiredChoice(testData.choice[1]).waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for reset all option to be displayed.", });
    }
    /**
     * Method to check prices are in asending order
     * @returns array
     */
    async orderCheck() {
        for (let $price of await this.$$priceColumn()) {
            let value = await $price.getText();
            let resultPrice = value.replace(/\D/g, "");
            priceArray.push(resultPrice);
        }
        console.log(priceArray);
        return this.isAscending(priceArray);
    }
    /**
     * Method to click price
     */
    async clickPrice() {
        await this.$priceHeader().click();
        await this.$priceHeader().waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for price header to be displayed.", });
    }
    /**
     * Method to check the prices are sorted in descending order
     * @returns array
     */
    async orderCheckSecond() {
        for (let $price of await this.$$priceColumn()) {
            let value = await $price.getText();
            let resultPrice = value.replace(/\D/g, "");
            priceArray.push(resultPrice);
        }
        console.log(priceArray);
        return this.isDescending(priceArray);
    }
    /**
     * Method to click Book button
     */
    async clickBookButton() {
        await this.$bookButton().click();
        await homePage.$loginClose().waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for login-popup to be displayed.", });
    }

}
module.exports = {
    ticketsPage: new TicketsPage()
}
