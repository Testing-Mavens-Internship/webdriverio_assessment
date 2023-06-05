class Flight {
    constructor() {
        this.$afternoonButton = () => $('//label[@class="_2iDkf8 _1tyQUb"])[5]/input');
        this.$aireLineMoreOption = () => $('//div[text()="+ 9 More"]');
        this.$airIndiaCheckBox = () => $('//div[text()="Air India"]/ancestor::div[@class="_1G1UJR"]//input');
    }

    /**
     * Select departure time from the filter
     */
    async selectDepartureTime() {
        await this.$afternoonButton().click();
    }

    /**
     * Select airline option from the list of airlines
     */
    async selectAireline() {
        await this.$aireLineMoreOption().scrollIntoView({ block: 'end' });
        await this.$aireLineMoreOption().waitForDisplayed({ timeout: 1000000, timeoutMsg: 'time out fail for aireLineMoreOption' });
        await this.$aireLineMoreOption().click();
        await this.$airIndiaCheckBox().scrollIntoView({ block: 'end' });
        await this.$airIndiaCheckBox().click();
    }

}
module.exports = {
    flightPage: new Flight(),
}