const { homePage } = require('../page-objects/home-page.js');
const { travelPage } = require('../page-objects/travel_page.js');
const { searchPage } = require('../page-objects/search-resut-page.js');
const testData = require('../test-data/testData.json');

describe('Travel flow for the site flipkart', () => {
    it('Open URL and load the application', async () => {
        await homePage.openUrl(testData.flipKartUrl, testData.optionName);
        await expect(browser).toHaveUrl(testData.flipKartUrl);
        expect(await homePage.$flipKartHeader().isDisplayed()).toBe(true);
    });

    it('Click Travel link from the top', async () => {
        await homePage.clickTravelLink(testData.optionName);
        expect(await homePage.$travelPageHeader().getText()).withContext('Message:').toBe(testData.travelPageHeader);
        expect(await homePage.$travelSearchDiv().isDisplayed()).withContext('Message:').toBe(true);
    });

    it('Click radio button "One-Way"', async () => {
        let selected = await travelPage.clickOnewayRadioOption(testData.tripOption);
        expect(await selected).withContext('Message:').toBe(true);
    });

    it('Fill Search data', async () => {
        await travelPage.fillSearchFields(testData.fromLocation, testData.toLocation);
        expect(await searchPage.$tripTypeButton().getText()).withContext('Message:').toBe(testData.tripTypeDisplayed);
        expect(await searchPage.$searchButtonText().getText()).withContext('Message:').toBe(testData.searchButttonText);
    });

    it('Click "Afternoon" option from the filter "Departure from Kochi" and validate the time', async () => {
        await searchPage.clickAfternoonFilter();
    });

    it('Click "AirIndia" option from the filter "Airlines and validate the resut', async () => {
        let result = await searchPage.clickAirlineFilter(testData.logoSrc);
        expect(await result).withContext('Message:').toBe(true);
    });

    it('Validate the Ascending order of the price ', async () => {
        let result = await searchPage.validateAscendingOrderPrice();
        expect(await result).withContext('Message:').toBe(true);
    });

    it('Click price link and validate that the price is in descending order', async () => {
        let result = await searchPage.validateDescendingOrderPrice();
        expect(await result).withContext('Message:').toBe(true);
    });

    it('Click Book button', async () => {
        await searchPage.clickBookButton();
        expect(await homePage.$popupDiv().isDisplayed()).withContext('Message:').toBe(true);
    });

});