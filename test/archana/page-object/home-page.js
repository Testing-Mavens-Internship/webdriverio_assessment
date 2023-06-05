class HomePage {
    constructor() {
        this.$homePageSearchBar = () => $('//input[@class="_3704LK"]');
        this.$searchIcon = () => $('//button[@class="L0Z3Pu"]');
        this.$loginPopUp = () => $('//button[@class="_2KpZ6l _2doB4z"]');
        this.$travelLink = () => $('//div[@class="xtXmba"][text()="Travel"]');
        this.$searchButton = () => $('//button[@class="_2KpZ6l _1QYQF8 _3dESVI"]');
    }
    /**
         * Load the application
         * @param {String} url 
         */
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.$homePageSearchBar().waitForDisplayed({ timeout: 100000, timeoutMsg: 'failed to load search bar' });
        await this.$loginPopUp().click();
    }
    /**
     * method to click on the travel link
     */
    async clickOnTravel() {
        await this.$travelLink().click();
        await this.$searchButton().waitForDisplayed({ timeout: 100000, timeoutMsg: 'failed to load search button' })
    }
}
module.exports =
{
    homePage: new HomePage()
}