class HomePage {
    constructor() {
        this.$flipKartHeader = () => $('//img[@alt="Flipkart"]');
        this.$popupDiv = () => $('//div[@class="_2QfC02"]');
        this.$loginPopupClose = () => $('//button[@class="_2KpZ6l _2doB4z"]');
        this.$travelLink = (linkName) => $(`//div[text()="${linkName}"]`);
        this.$travelPageHeader = () => $('//div[@class="lAXZRO"]');
        this.$travelSearchDiv = () => $('//div[@class="_1dTDqB"]');

    }
    /**
     * method for open url
     * @param {string} url 
     * @param {string} linkName 
     */
    async openUrl(url, linkName) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.$popupDiv().waitForDisplayed({ timeout: 200000, timeoutMsg: 'Failed for load the login popup' });
        await this.$loginPopupClose().click();
        await this.$travelLink(linkName).waitForExist({ timeout: 800000 });
    }
    /**
     * method for click the travel link rom the home page
     * @param {string} linkName 
     */
    async clickTravelLink(linkName) {
        await this.$travelLink(linkName).click();
        await this.$travelPageHeader().waitForDisplayed({ timeout: 200000, timeoutMsg: 'Failed for Travel Page Header' });
        await this.$travelSearchDiv().waitForExist({ timeout: 800000 });
    }
}
module.exports = {
    homePage: new HomePage()
}