class HomePage {
    constructor() {
        this.$logo = () => $("//img[@title='Flipkart']")
        this.$loginClose = () => $("//button[@class='_2KpZ6l _2doB4z']")
        this.$travelIcon = () => $("//img[@alt='Travel']")
        this.$travelPageHeader = () => $('//div[@class="_1rH5Jn"]')
        this.$searchButton = () => $("//span[normalize-space()='SEARCH']")
    }
    /**
     * Method to launch the url 
     * @param {String} url 
     */
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url)
        await this.$logo().waitForDisplayed({ timeout: 5000, timeoutMsg: "wait time out failed for logo to be displayed" })
    }
    /**
 * Method to close the login popup
 */
    async loginPopupClose() {
        await this.$loginClose().click();
    }/**
     * Method to click on travel icon to start with booking flights
     */
    async travel() {
        await this.$travelIcon().click();
    }
    /**
     * Method to handle alerts for allowing location detection
     */
    async alerts() {
        const isAlertOpen = await browser.isAlertOpen(); //get the status of alert open or not
        if (isAlertOpen) {
            const alertText = await browser.getAlertText(); //get the alert text
            console.log(" The alert text is: " + alertText)
            await browser.dismissAlert(); //accepts the alert popup
            await this.$travelPageHeader().waitForDisplayed({ timeout: 1000 })
            await this.$searchButton().waitForDisplayed({ timeout: 1000 })
        }
    }
}
module.exports = {
    homePage: new HomePage(),
};
