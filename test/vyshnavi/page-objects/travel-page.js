class Travel{
    constructor(){
        this.$fromField = ()=> $('//input[@name="0-departcity"]');
        this.$toField = ()=> $('//input[@name="0-arrivalcity"]');
        this.$fromSearchValue = ()=> $('//div[@class="_1fa_Yn HQlQNF nAiqQV _18Y7Fu"]//div[contains(text(),"COK")]');
        this.$toSearchValue = ()=> $('//div[@class="_1fa_Yn HQlQNF nAiqQV _18Y7Fu"]/div//div[text()="DXB"]');
        this.$departureDate = ()=> $('(//table[@class="aSgzfL"])[1]//button[text()="9"]');
        this.$departueDateDisplay = ()=> $('//input[@name="0-datefrom"]');
        this.$travellersAndCabinClass = ()=> $('//input[@class="_1w3ZZo zO-_Xz _2mFmU7"]');
        this.$travellersHeader = ()=> $('//label[normalize-space()="Travellers"]');
        this.$adultAddButton = ()=> $('(//div[@class="VjWsXZ"]/button[@class="_2KpZ6l _34K0qG _37Ieie"])[2]');
        this.$childAddButton = ()=> $('(//div[@class="_1Di8FC"])[2]/div/following-sibling::div/div/div[3]');
        this.$infantsAddButton = ()=> $('(//div[@class="VjWsXZ"])[6]/button');
        this.$businessButton = ()=> $('//div[text()="Business"]');
        this.$doneButton = ()=> $('//button[text()="Done"]');
        this.$searchButton = ()=> $('//button[@class="_2KpZ6l _1QYQF8 _3dESVI"]');
        this.$filterByHeader = ()=> $('//div[text()="Filter By"]');
    }

    /**
     * Enter a value in the "From" field and from the search list select the desired value.
     * @param {string} fromPlace 
     */
    async selectFromValue(fromPlace){
        await this.$fromField().setValue(fromPlace);
        await this.$fromSearchValue().click();
    }
    
    /**
     * Enter a value in the "To" field and from the search list select the desired value.
     * @param {string} toPlace 
     */
    async selectToValue(toPlace){
        await this.$toField().setValue(toPlace);
        await this.$toSearchValue().waitForClickable({ timeout: 1000000, timeoutMsg: 'time out fail for toSearchValue'});
        await this.$toSearchValue().click();
    }
    
    /**
     * Select departure date from the calendar
     */
    async selectDepartureDate(){
        await this.$departureDate().click();
        await this.$departueDateDisplay().waitForDisplayed({ timeout: 1000000, timeoutMsg: 'time out fail for departueDateDisplay'});
    }
    
    /**
     * Select number of passengers from the travel class
     */
    async selectTravellersClass(){
        await this.$travellersAndCabinClass().click();
        await this.$travellersHeader().waitForDisplayed({ timeout: 1000000, timeoutMsg: 'time out fail for travellersHeader'});
        await this.$adultAddButton().click();
        await this.$adultAddButton().click();
        await this.$childAddButton().click();
        await this.$childAddButton().click();
        await this.$infantsAddButton().click();
    }
    
    /**
     * Select business class from the cabin class list
     */
    async selectCabinClass(){
        await this.$businessButton().click();
    }

    /**
     * After selecting all the details click on search button
     */
    async clickOnSearchButton(){
        await this.$searchButton().click();
        await this.$filterByHeader().waitForDisplayed({ timeout: 1000000, timeoutMsg: 'time out fail for filterByHeader'});
        await this.$afternoonButton().waitForDisplayed({ timeout: 1000000, timeoutMsg: 'time out fail for afternoonButton'});
    }

}
module.exports = {
    travelPage : new Travel(),
}