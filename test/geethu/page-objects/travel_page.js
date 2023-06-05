class TravelPage {
    constructor() {
        this.$tripOPtions = (tripOptions) => $(`//input[@id="${tripOptions}"]`);
        this.$tripLocation = (locationInput) => $(`//input[@name="${locationInput}"]`);
        this.$FromLocationDiv = (name) => $(`//input[@name="${name}"]/../..//div[@class="_24hoQ2 _1EzOls"]`);
        this.$dropdownLocation = (location) => $(`//div[text()="${location}"]/parent::div`);
        this.$departDate = (depart) => $(`//input[@name="${depart}"]`);
        this.$datePickerDiv = () => $('//div[@class="ZEl_b_ CeQnEq _2ogGYG _23xUYh _3pAV4E"]');
        this.$datePickerDate = (date) => $(`(//button[text()="${date}"])[1]`);
        this.$travelInput = () => $('//input[@name="0-travellerclasscount"]');
        this.$travellerCount = () => $(`//input[@name="0-travellerclasscount"]`);
        this.$travellerDiv = () => $('//div[@class="_3_Fivj"]');
        this.$travellerType = (traveller) => $(`//div[text()="${traveller}"]`);
        this.$adultNumber = (travellerTypes) => $(`//div[text()="${travellerTypes}"]/parent::div/following-sibling::div//div/div[@class="_19cAhQ _3ahBnm"]`);
        this.$travellerPlusButton = (travellerType) => $(`//div[text()="${travellerType}"]/parent::div/following-sibling::div//div/button[@class="_2KpZ6l _34K0qG _37Ieie"]`);
        this.$cabinClassDiv = () => $('//label[text()="Cabin Class"]/..');
        this.$cabinClass = () => $('//div[text()="Business"]/../..//div[@class="_1XFPmK"]');
        this.$doneButton = () => $('//button[text()="Done"]');
        this.$searchButton = () => $('//button[@class="_2KpZ6l _1QYQF8 _3dESVI"]');
        this.$searchresultPageHeader = () => $('//span[text()="Departure from Kochi"]');
    }
    /**
     * method for select the trip type
     * @param {string} tripOption 
     * @returns boolean
     */
    async clickOnewayRadioOption(tripOption) {
        return await this.$tripOPtions(tripOption).isSelected();
    }
    /**
     * methood for fill the search form
     * @param {string} triplocatinDepature 
     * @param {string} triplocationArrival 
     */
    async fillSearchFields(triplocatinDepature, triplocationArrival) {
        await this.$tripLocation('0-departcity').setValue(triplocatinDepature);
        await this.$FromLocationDiv('0-departcity').waitForExist({ timeout: 200000 });
        await this.$dropdownLocation('COK').click();
        await this.$tripLocation('0-arrivalcity').setValue(triplocationArrival);
        await this.$FromLocationDiv('0-arrivalcity').waitForExist({ timeout: 200000 });
        await this.$dropdownLocation('DXB').click();
        await this.$departDate('0-datefrom').waitForExist({ timeout: 800000 });
        await this.$departDate('0-datefrom').click();
        await this.$datePickerDate('9').click();
        await this.$travellerDiv().waitForExist({ timeout: 800000 });
        await this.$travelInput().click();
        await this.$travellerPlusButton('Adults').click();
        await this.$travellerPlusButton('Children').click();
        await this.$travellerPlusButton('Infants').click();
        await this.$travellerDiv().waitForDisplayed({ timeout: 800000 });
        await this.$cabinClass().waitForClickable({ timeout: 800000 });
        await this.$cabinClass().click();
        await this.$doneButton().waitForClickable({ timeout: 800000 });
        await this.$doneButton().click();
        await this.$searchButton().waitForClickable({ timeout: 800000 });
        await this.$searchButton().click();
        await this.$searchresultPageHeader().waitForExist({ timeout: 8000000 });
    }
}
module.exports =
{
    travelPage: new TravelPage()
}