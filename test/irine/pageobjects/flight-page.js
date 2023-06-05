const Common = require('../pageobjects/common.js');

class Flights extends Common {

    constructor() {
        super();
        this.$afternoonFilter = () => $('/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/section[3]/div[2]/div[3]/label[1]/div[1]');
        this.$$flightTime = () => $$('//span[@class="_3p2vNo _2keVvy"]');
        this.$airIndiaFilter = () => $('//div[contains(text(),"Air India")]');
        this.$flightDetailsButton = () => $('//span[@class="_34RY98"]');
        this.$moreFilter = () => $('//div[@class="_2PXVb1"]');
        this.$$priceOptions = () => $$('//div[@class="_3Byyvw"]');
        this.$priceFilter = () => $('//span[@class="_3W-vry"]');
        this.$bookButton = () => $('(//div[@class="ZiOg5a"][text()="Book"])[1]');
        this.$loginPopUp = () => $('//button[@class="_2KpZ6l _1KAjNd"]');


    }
    /**
     * Method to click afternoon filter
     */
    async filterAfternoon() {
        await this.$afternoonFilter().click();
        await this.$moreFilter().scrollIntoView({ block: 'end' });
        await this.$moreFilter().click();
        await this.$airIndiaFilter().waitForClickable({ timeout: 5000 });
       
    }
    /**
     * Method to click Flight name Air India
     */
    async filterFlight() {
        await this.$airIndiaFilter().click();
    }
    /**
     * Method to check if price is in ascending order
     * @returns boolean
     */
    async ascendingPriceCheck() {
        let priceArray = await this.$$priceOptions().map(item => item.getText());
        priceArray = priceArray.map(item => item.replace(/₹|,/g, ""));
        priceArray = priceArray.map(item => parseInt(item));
        return this.ascendingSort(priceArray);
    }
    /**
     * Method to chek if price is in descending order
     * @returns boolean
     */
    async descendingPriceCheck() {
        await this.$priceFilter().waitForClickable({ timeout: 10000 });
        await this.$priceFilter().click();
        let priceArray = await this.$$priceOptions().map(item => item.getText());
        priceArray = priceArray.map(item => item.replace(/₹|,/g, ""));
        priceArray = priceArray.map(item => parseInt(item));
        return this.descendingSort(priceArray);
    }
    /**
     * Method to click on book option
     */
    async clickOnBook() {
        await this.$bookButton().waitForClickable({ timeout: 10000 });
        await this.$bookButton().click();
        await this.$loginPopUp().waitForDisplayed({ timeout: 500, reverse: false, timeoutMsg: ' timeout failed for log-in popup' });
        await this.$loginPopUp.click();
    }
}

module.exports = {
    flightPage: new Flights()
}
