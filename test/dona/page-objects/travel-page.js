const testData = require('../test-data/data.json');
const { ticketsPage } = require('../page-objects/tickets-page.js');

class TravelPage {
    constructor() {
        this.$roundTripRadioButton = () => $('//div[text()="Round Trip"]');
        this.$inputFields = (field) => $(`//input[@name="${field}"]`);
        this.$departAndArrivalFields = (airport) => $(`//input[@value="${airport}"]`);
        this.$defaultDepartDate = () => $(`//input[@value="6 Jun, Tue"]`);
        this.$changedDepartDate = () => $(`//button[@class="jkj0H4"][text()="9"]`);
        this.$numberOfPeople = (number) => $(`(//button[@class="_2KpZ6l _34K0qG _37Ieie"])${number}`);
        this.$changedNumber = () => $(`//div[@class="_19cAhQ _3ahBnm"][text()="2"]`);
        this.$travelClass = () => $(`//label[@for="b"]//input[@name="travel-cabin-class"]`);
        this.$travelClassHighlighted = () => $(`//label[@for="b"][@class="_2Fn-Ln _2WzguY _3L7Pww"]`);
        this.$doneButton = () => $(`//button[text()="Done"]`);
        this.$searchButton = () => $(`//span[text()="SEARCH"]`);

    }
    /**
     * Method to search and select the departure city
     * @param {string} city 
     */
    async searchAndSelectDepartCity(city) {
        await this.$inputFields(testData.field[0]).click();
        await this.$inputFields(testData.field[0]).setValue(city);
        await this.$departAndArrivalFields(testData.airport[0]).click();
        await this.$departAndArrivalFields(testData.airport[0]).waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for departure city to be displayed.", });

    }
    /**
     * Method to search and select the arrival city
     * @param {string} city 
     */
    async searchAndSelectArrivalCity(city) {
        await this.$inputFields(testData.field[1]).click();
        await this.$inputFields(testData.field[1]).setValue(city);
        await this.$departAndArrivalFields(testData.airport[1]).click();
        await this.$departAndArrivalFields(testData.airport[1]).waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for arrival city to be displayed.", });
    }
    /**
     * Method to set departure date
     */
    async setDepartDate() {
        await this.$defaultDepartDate().click();
        await this.$changedDepartDate().click();
        await this.$changedDepartDate().waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for departure date to be displayed.", });
    }
    /**
     * Method to set number of travellers
     */
    async setTravellers() {
        await this.$inputFields(testData.field[3]).click();
        await this.$numberOfPeople(testData.number[0]).click();
        await this.$numberOfPeople(testData.number[1]).doubleClick();
        await this.$numberOfPeople(testData.number[2]).click();
        await this.$changedNumber().waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for required number of people to be displayed.", });
    }
    /**
     *  Method to set the required class
     */
    async setTravelClass() {
        await this.$inputFields(testData.field[3]).click();
        await this.$travelClass().click();
        await this.$travelClassHighlighted().waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for required class to be displayed.", });
        await this.$doneButton().click();
        await this.$searchButton().waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for search button to be displayed.", });

    }
    /**
     * Method to click on Search Button
     */
    async clickSearchButton() {
        await this.$searchButton().click();
        await ticketsPage.$filterHeader().waitForDisplayed({ timeout: 10000, timeoutMsg: "Wait time for filter header to be displayed.", });
    }
}

module.exports = {
    travelPage: new TravelPage()
}