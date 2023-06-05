class Home {
    constructor() {
        this.$travelIcon = () => $('//div[contains(text(),"Travel")]');
        this.$loginCloseButton = () => $('//button[@class="_2KpZ6l _2doB4z"]');
        this.$travelHeader = () => $('//div[@class="lAXZRO"]');
        this.$afternoonButton = () => $('(//label[@class="_2iDkf8 _1tyQUb"])[5]/input');
    }

    /**
     * Open url and load the flipkart application
     * @param {*} url 
     */
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.$loginCloseButton().click();
        await this.$travelIcon().waitForClickable({ timeout: 1000000, timeoutMsg: 'time out fail for travelIcon' });
    }

    /**
     * Click on travel icon and navigate to travel page
     */
    async clickTravelIcon() {
        await this.$travelIcon().click();
        await this.$travelHeader().waitForDisplayed({ timeout: 1000000, timeoutMsg: 'time out fail for travelHeader' });
    }
}
module.exports = {
    homePage: new Home(),
}