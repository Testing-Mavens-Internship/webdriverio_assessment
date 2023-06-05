class Home {

    constructor() {
        this.$homePageHeader = () => $('//img[@title="Flipkart"]');
        this.$travelIcon = () => $('//div[contains(text(),"Travel")]');
        this.$travelPageHeader = () => $('//div[@class="lAXZRO"]');
        this.$closeButton = () => $('//button[@class="_2KpZ6l _2doB4z"]');
    }
    /**
     * Method to open URL and load the application
     * @param {string} url 
     */
    async openUrl(url) {
        await browser.maximizeWindow()
        await browser.url(url)
        await this.$homePageHeader().waitForDisplayed({ timeout: 20000, timeoutMsg: ' timeout failed ' });
        await this.$closeButton().click();
    }
    /**
     * Click on travel icon
     */
    async clickOnTravel() {
        await this.$travelIcon().click();
        await this.$travelPageHeader().waitForDisplayed({ timeout: 10000, timeoutMsg: ' timeout failed for travel page ' });
    }
}

module.exports = {
    homePage: new Home()
}
