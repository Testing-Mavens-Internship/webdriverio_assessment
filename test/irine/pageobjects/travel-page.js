class Travel {

    constructor() {
        this.$fromSearchBar = () => $('//input[@name="0-departcity"]');
        this.$fromCity = () => $('//div[@class="_2B0KQx"][text()="COK"]');
        this.$selectedFromOption = () => $('//input[@value="Kochi, COK - Cochin International Airport, India"]');
        this.$toSearchBar = () => $('//input[@name="0-arrivalcity"]');
        this.$toCity = () => $('//div[@class="_2B0KQx"][text()="DXB"]');
        this.$selectedToOption = () => $('//input[@name="0-arrivalcity"]');
        this.$departDateBar = () => $('//input[@name="0-datefrom"]');
        this.$departDate = () => $('(//button[@class="jkj0H4"][text()="9"])[1]');
        this.$selectedDate = () => $('//input[@value="9 Jun, Fri"]');
        this.$travellersBar = () => $('//input[@name="0-travellerclasscount"]');
        this.$travellersPopUp = () => $('//div[@class="_3BV5Vj"]');
        this.$adultsButton = () => $('//div[@class="_2g4weU _3mOkvM"]//div[1]//div[2]//div[1]//div[3]//button[1]//*[name()="svg"]//*[name()="path" and contains(@fill,"#2874f0")]');
        this.$childrenButton = () => $('//div[@class="ZEl_b_ _2pgFiz _2ogGYG _23xUYh _3pAV4E"]//div[2]//div[2]//div[1]//div[3]//button[1]//*[name()="svg"]');
        this.$infantButton = () => $('//div[@class="_3OFDG8"]//div[3]//div[2]//div[1]//div[3]//button[1]//*[name()="svg"]//*[name()="path" and contains(@fill,"#2874f0")]');
        this.$classButton = () => $('//label[@for="b"]//div[@class="_1XFPmK"]');
        this.$doneButton = () => $('//button[@class="aC49_F _14Me7y"]');
        this.$defaultTravellers = () => $('//input[@name="0-travellerclasscount"][@value="5 Travellers | Economy "]')
        this.$selectedTravellers = () => $('//input[@name="0-travellerclasscount"][@value="5 Travellers | Business "]');
        this.$searchButton = () => $('//button[@type="button"]');
        this.$flightPageHeader = () => $('//div[@class="ciVffB _2VJCG-"]')
    }
    /**
     * Method to search from city
     * @param {string} fromCity 
     */
    async searchFrom(fromCity) {
        await this.$fromSearchBar().scrollIntoView({ block: 'center' });
        await this.$fromSearchBar().click();
        await this.$fromSearchBar().setValue(fromCity);
        await this.$fromCity().waitForDisplayed({ timeout: 20000, reverse: false, timeoutMsg: ' timeout failed for Kochi' })
        await this.$fromCity().click();
    }
    /**
     * Method to search to city
     * @param {string} toCity 
     */
    async searchTo(toCity) {
        await this.$toSearchBar().scrollIntoView({ block: 'center' });
        await this.$toSearchBar().click();
        await this.$toSearchBar().setValue(toCity);
        await this.$toCity().waitForDisplayed({ timeout: 10000, reverse: false, timeoutMsg: ' timeout failed for Dubai' })
        await this.$toCity().click();
    }
    /**
     * Method to select departure date
     */
    async DepartureDate() {
        await this.$departDateBar().scrollIntoView({ block: 'center' });
        await this.$departDateBar().click();
        await this.$departDate().waitForDisplayed({ timeout: 10000, reverse: false, timeoutMsg: ' timeout failed for Date' })
        await this.$departDate().click();
    }
    /**
     * Method to select number of travellers
     */
    async Travellers() {
        await this.$travellersBar().scrollIntoView({ block: 'center' });
        await this.$travellersBar().click();
        await this.$travellersPopUp().waitForDisplayed({ timeout: 10000, reverse: false, timeoutMsg: ' timeout failed for Travellers' })
        await this.$adultsButton().click();
        await this.$childrenButton().waitForClickable({ timeout: 5000 });
        await this.$childrenButton().doubleClick();
        await this.$infantButton().waitForClickable({ timeout: 5000 });
        await this.$infantButton().click();
    }
    /**
     * Method to select desired class
     */
    async classSelection() {
        await this.$classButton().waitForClickable({ timeout: 5000 });
        await this.$classButton().click();
        await this.$doneButton().waitForClickable({ timeout: 5000 });
        await this.$doneButton().click();
    }
    /**
     * Method to click search button
     */
    async clickOnSearch() {
        await this.$searchButton().waitForClickable({ timeout: 5000 });
        await this.$searchButton().click();
        await this.$flightPageHeader().waitForDisplayed({ timeout: 30000, reverse: false, timeoutMsg: ' timeout failed for Date' })
    }

}

module.exports = {
    travelPage: new Travel()
}
