const testData = require('../test-data/data.json');

class TravelPage {
    constructor() {
        this.$travelHeader = () => $('//div[text()="Travel"]');
        this.$submitButton = () => $('//button[@type="button"]');
        this.$travelIcon = () => $('//div[text()="Travel"]');
        this.$fromIcon = () => $('//input[@class="_1w3ZZo _1YBGQV _2EjOJB lZd1T6 _2vegSu _2mFmU7"]');
        this.$fromLocation = () => $('(//div[@class="_3uA4ax"])[1]');
        this.$fromLocator = (fromLocation) => $(`//input[@value="${fromLocation}"]`);
        this.$toLocation = () => $('//input[@name="0-arrivalcity"]');
        this.$toLocator = (toLocation) => $(`//input[@value="${toLocation}"]`);
        this.$dateSelection = () => $('//input[@value="6 Jun, Tue"]');
        this.$travellerDetail = () => $('//input[@value="1 Traveller | Economy "]');
        this.$plusAdult = () => $('(//button[@class="_2KpZ6l _34K0qG _37Ieie"])[1]');
        this.$plusChildren = () => $('(//button[@class="_2KpZ6l _34K0qG _37Ieie"])[2]');
        this.$plusInfant = () => $('(//button[@class="_2KpZ6l _34K0qG _37Ieie"])[3]');
        this.$doneButton = () => $('//button[text()="Done"]');
        this.$filterPageHeader = () => $('//div[text()="Filter By"]');
    }

    /**
     * Select From Location 
     */
    async clickFromLocation() {
        await this.$fromIcon().setValue(fromLocation);
        await this.$fromLocator(fromLocation).click();
    }

    /*select To location*
     * 
     */
    async selectToLocation() {
        await this.$toLocation().setValue(toLocation);
        await this.$toLocator(toLocation).click();
    }

    /**
     * Select the date
     */
    async selectDate(){
        await this.$dateSelection().click();
    }
    
    /**
     * select the traveller details and click submit button
     */
    async selectTravellerDetail(){
        await this.$travellerDetail().click();
        await this.$plusAdult().click();
        await this.$plusChildren().click();
        await this.$plusInfant().click();
        await this.$doneButton().click();
        await this.$submitButton().click();
        await this.$filterPageHeader().waitForDisplayed({ timeout: 1000000, timeoutMsg: 'time out failed for loading search page' });
    }

}
module.exports = {
    travelPage: new TravelPage()
}
