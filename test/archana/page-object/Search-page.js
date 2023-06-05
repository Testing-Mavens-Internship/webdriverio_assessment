class SearchPage {
    constructor() {
        this.$fromField = () => $('//label[@class="_1osQq7"][text()="From"]');
        //this.$fromFieldData=()=>$('//div[@class="_2B0KQx"][text()="COK"]');
        this.$dateField = () => $('//input[@name="0-datefrom"]');

    }
    /**
     * method to input frpm field
     */
    async inputFromField() {
        await this.$fromField().setValue('Kochi, COK - Cochin International Airport, India');
        // await this.$fromFieldData().setValue('Kochi, COK');
    }

}
module.exports =
{
    searchPage: new SearchPage()
}