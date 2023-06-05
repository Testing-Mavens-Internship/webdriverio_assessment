class TravelResultPage {
    constructor() {
        this.$clickAfternoon = () => $('(//div[@class="_24_Dny _1MtB6C"])[5]');
        this.$filterPageHeader = () => $('//div[text()="Filter By"]');
        this.$resetAllButton = () => $('//div[text()="Filter By"]');
        this.$$afterNoonTime = () => $$(`//span[@class="_3p2vNo _2keVvy"]`);
    }

    /**
     * select afternoon fight by clicking on the checkbox
     */
    async selectAfternoonFlight() {
        await this.$clickAfternoon().click();
        await this.$resetAllButton().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out failed for loading result' });
    }
    
    /**
     * Method to get time from table using map
     * @returns array
     */
    async getTimeFromTable() {
        return this.$$afterNoonTime().map(item => item.getText());
   }

}
module.exports = {
    travelResultPage: new TravelResultPage()
}

