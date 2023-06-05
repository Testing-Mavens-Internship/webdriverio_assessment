const testData = require('../test-data/data.json');

class HomePage {
    constructor() {
        this.$homePageHeader = () => $('//img[contains(@title,"Flipkart")]');
        this.$searchBar = () => $('//input[@placeholder="Search for products, brands and more"]');
        this.$loginCloseIcon = () => $('//button[@class="_2KpZ6l _2doB4z"]');
        this.$searchPageHeader = () => $('//a[@title="Mobiles"]');
        this.$travelIcon = () => $('//div[text()="Travel"]');
        this.$travelHeader = () => $('//div[text()="Travel"]');
    }

    /**
     * open url and launch the application.
     * @param {string} url 
     */
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.$homePageHeader().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out failed for loading Url' });
    }

    /**
     * close login popup
     */
    async closeLoginPopUp() {
        await this.$loginCloseIcon().click();
    }
    
    /**
     * click on "Travel" icon
     */
    async clickTravelIcon() {
        await this.$travelIcon().click();
        await this.$travelHeader().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out failed for loading Url' });
    }

}
module.exports = {
    homePage: new HomePage()
}