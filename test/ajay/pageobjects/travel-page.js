class Travel {

    constructor() {

        this.$fromField = () => $("//input[@name='0-departcity']");
        this.$toField = () => $("//input[@name='0-arrivalcity']");
        this.$departureDateField = () => $("//input[@name='0-datefrom']");
        this.$travelPageHeader = () => $("//div[@class='lAXZRO']");
        this.$departureDate = () => $("//button[@class='jkj0H4 _2v-mAi _3vGgRD']");
        this.$searchResultCOK = () => $('//div[text()="COK"]');
        this.$searchResultDXB = () => $('//div[text()="DXB"]');
        this.$departureCalender = () => $("//div[@class='PgmDJX']");
        this.$travellerInfoField = () => $("//input[@name='0-travellerclasscount']");
        this.$adultsAddButton = () => $("//div[@class='_2g4weU _3mOkvM']//div[1]//div[2]//div[1]//div[3]//button[1]");
        this.$childrenAddButton = () => $("//div[@class='ZEl_b_ _2pgFiz _2ogGYG _23xUYh _3pAV4E']//div[2]//div[2]//div[1]//div[3]//button[1]//*[name()='svg']");
        this.$infantAddButton = () => $("//div[@class='_3OFDG8']//div[3]//div[2]//div[1]//div[3]//button[1]//*[name()='svg']");
        this.$businessClassButton = () => $("//label[@for='b']//div[@class='_1XFPmK']");
        this.$doneButton = () => $("//button[@class='aC49_F _14Me7y']");
        this.$travellerInfoResponse = () => $('//input[contains(@value,"5 Travellers | Business ")]');
        this.$searchButton = () => $("//span[normalize-space()='SEARCH']");
        this.$filterByHeader = () => $("//div[@class='_2CzBsO']");

    }

    /**
     * Method to set the departure(From) location
     */
    async settingFromField(departureLocation) {
        await this.$fromField().setValue(departureLocation);
        await this.$searchResultCOK().waitForDisplayed({ timeout: 5000, timeoutMsg: "wait time out failed for suggestion to be displayed." });
        await this.$searchResultCOK().click();
    }

    /**
     * Method to set the arrival(To) location
     */
    async settingToField(arrivalLocation) {
        await this.$toField().setValue(arrivalLocation);
        await this.$searchResultDXB().waitForDisplayed({ timeout: 5000, timeoutMsg: "wait time out failed for suggestion to be displayed." });
        await this.$searchResultDXB().click();
    }

    /**
     * Method to set the departure date
     */
    async settingDepartureDate() {
        await this.$departureDateField().click();
        await this.$departureCalender().waitForDisplayed({ timeout: 5000, timeoutMsg: "wait time out failed for calender to be displayed." });
        await this.$departureDate().scrollIntoView({ block: 'center', inline: 'center' });
        await this.$departureDate().click();
    }

    /**
     * Method to set the travellers details
     */
    async settingTravellerInformation() {
        await this.$travellerInfoField().click();
        await this.$adultsAddButton().click();
        await this.$childrenAddButton().doubleClick();
        await this.$infantAddButton().click();
        await this.$businessClassButton().click();
        await this.$doneButton().click();
        await this.$travellerInfoResponse().getText();
    }

    /**
     * Method to click the search button
     */
    async clickingSearchButton() {
        await this.$searchButton().click();
        await this.$filterByHeader().waitForDisplayed({ timeout: 5000, timeoutMsg: 'time out to load the header' });
    }

}

module.exports = {
    travelPage: new Travel()
}
