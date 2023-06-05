const testData = require('../test-data/data.json');
const { travelPage } = require('../page-objects/travel-page.js');


class HomePage {
    constructor() {
        this.$homeBanner = () => $('//img[contains(@title,"Flipkart")]');
        this.$loginClose = () => $('//button[@class="_2KpZ6l _2doB4z"]');
        this.$travelHeader = () => $('//div[text()="Travel"]');

    }

    /**
     * Method to load the application
     */
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.$homeBanner().waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for flipkart icon header to be displayed.", });
    }

    /**
     * Method to close Login popup
     */
    async closeLogin() {
        await this.$loginClose().click();
        await this.$homeBanner().waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for login close button to be displayed.", });

    }
    /**
     * Method to click on Travel Header
     */
    async clickOnTravel() {
        await this.$travelHeader().click();
        await travelPage.$roundTripRadioButton().waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for round trip radio button to be displayed.", });

    }
}

module.exports = {
    homePage: new HomePage()
}