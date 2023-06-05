const Common = require("./common");
const { homePage } = require('../page-objects/home-page.js');

let priceArray = [];

class SearchPage extends Common {
    constructor() {
        super();
        this.$tripTypeButton = () => $('//button[@class="_2KpZ6l _1sTSlw _1rb3sK"]');
        this.$searchButtonText = () => $('//button[@class="_2KpZ6l _2UZh35 _3AWRsL"]/span');
        this.$depatureTimeCheckBox = (time) => $(`//div[text()="${time}"]/../../..//input[@type="checkbox"]`);
        this.$divFilterResult = () => $('//div[@class="_1YokD2 _3Mn1Gg col-9-12"]');
        this.$$departTimes = () => $$('//span[@class="_3p2vNo _2keVvy"]');
        this.$airlineFilterButton = () => $('//div[text()="+ 7 More"]');
        this.$$airIndiaLogo = () => $$('//img[@src="https://rukminim1.flixcart.com/www/100/100/promos/20/03/2023/airlineImage-AI.png?q=50"]');
        this.$$priceOfTicket = () => $$('//div[@class="_3Byyvw"]"]');
        this.$priceLink = () => $('//span[text()="PRICE"]');
        this.$bookButton = () => $('(//div[text()="Book"])[1]');
    }
    /**
     * Method For click Afternoon filter
     */
    async clickAfternoonFilter() {
        await this.$depatureTimeCheckBox('Afternoon').click();
        await this.$divFilterResult().waitForExist({ timeout: 800000 });
        let timesArray = [];
        timesArray = await this.$$departTimes().map(item => item.getText());
    }
    /**
     * method for click airindia filter and validate the result
     * @param {string} airlineLogo 
     * @returns 
     */
    async clickAirlineFilter(airlineLogo) {
        await this.$airlineFilterButton().click();
        await this.$depatureTimeCheckBox('Air India').click();
        let logoSrc = [];
        logoSrc = await this.$$airIndiaLogo().map(item => item.getAttribute('src'));
        return logoSrc.every((item) => item.includes(airlineLogo));
    }
    /**
     * Method for validate the ascending order of the price
     * @returns boolean value
     */
    async validateAscendingOrderPrice() {
        for (let $price of await this.$$priceOfTicket()) {
            let value = await $price.getText();
            let resultPrice = value.replace(/\D/g, "");
            priceArray.push(resultPrice);
        }
        return this.isAscending(priceArray);
    }
    /**
     * method for validate the price is in descending order
     * @returns boolean
     */
    async validateDescendingOrderPrice() {
        let array = [];
        await this.$priceLink().click();
        for (let $price of await this.$$priceOfTicket()) {
            let value = await $price.getText();
            let resultPrice = value.replace(/\D/g, "");
            array.push(resultPrice);
        }
        return this.isDescending(array);
    }
    /**
     * method for click book button
     */
    async clickBookButton() {
        await this.$bookButton().click();
        await homePage.$popupDiv().waitForDisplayed({ timeout: 200000, timeoutMsg: 'Failed for load the login popup' });
    }
}
module.exports =
{
    searchPage: new SearchPage()
}