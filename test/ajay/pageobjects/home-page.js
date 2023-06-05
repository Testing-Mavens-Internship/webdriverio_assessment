class Home {

    constructor() {

        this.$homePageHeader = () => $("//img[@title='Flipkart']");
        this.$loginCloseButton = () => $("//button[@class='_2KpZ6l _2doB4z']");
        this.$travelButton = () => $("//img[@alt='Travel']");
        this.$travelPageHeader = () => $("//div[@class='lAXZRO']");
    
    }

    /**
      * Method to open url
      * @param {String} url
      */
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url)
        await this.$homePageHeader().waitForDisplayed({ timeout: 5000, timeoutMsg: "wait time out failed for header to be displayed." });
    }

    /**
     * Method to close the login pop up
     */
    async loginPopupClose() {
        await this.$loginCloseButton().click();
        await this.$homePageHeader().waitForDisplayed({ timeout: 5000, timeoutMsg: "wait timed out for header to be displayed." });
    }

    /**
     * Method to click "Travel" button
     */
    async clickingTravelButton() {
        await this.$travelButton().click();
        await this.$travelPageHeader().waitForDisplayed({ timeout: 5000, timeoutMsg: "wait timed out for header to be displayed." });
    }

}
module.exports = {
    homePage: new Home()
}