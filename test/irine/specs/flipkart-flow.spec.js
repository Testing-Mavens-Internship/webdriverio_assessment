const testData = require('../testdata/testData.json');
const { homePage } = require('../pageobjects/home-page.js');
const { travelPage } = require('../pageobjects/travel-page.js');
const { flightPage } = require('../pageobjects/flight-page');

describe('Flow of Flipkart Application', () => {

    it('Open URL and load the application', async () => {
        await homePage.openUrl(testData.pageURL);
        await expect(browser).toHaveUrl(testData.pageURL);
    });

    it('Click on Travel', async () => {
        await homePage.clickOnTravel();
        expect(await homePage.$travelPageHeader().isDisplayed()).toBe(true);
    });

    it('Search for Kochi and Select the option with COK', async () => {
        await travelPage.searchFrom("kochi");
        expect(await travelPage.$selectedFromOption().isDisplayed()).toBe(true)
    });

    it('Search for Dubai and Select the option with DXB', async () => {
        await travelPage.searchTo("dubai");
        expect(await travelPage.$selectedToOption().isDisplayed()).toBe(true);
    });

    it('Select the Depart Date as 9 June 2023', async () => {
        await travelPage.DepartureDate();
        expect(await travelPage.$selectedDate().isDisplayed()).toBe(true);
    });

    it('Select 2 Adults, 2 Child between 2-12 years and 1 infant from Travellers', async () => {
        await travelPage.Travellers();
        expect(await travelPage.$defaultTravellers().isDisplayed()).toBe(true);
    });

    it('Select Business Class from the Cabin Class Radio button and click on done button', async () => {
        await travelPage.classSelection();
        expect(await travelPage.$selectedTravellers().isDisplayed()).toBe(true);
    });

    it('Click on Search button', async () => {
        await travelPage.clickOnSearch();
        expect(await travelPage.$flightPageHeader().isDisplayed()).toBe(true);
    });

    it('Filter by Afternoon departure from Kochi and validate all the flights', async () => {
        await flightPage.filterAfternoon();
       
    });

    it('Filter by Air India Airline and Validate', async () => {
        await flightPage.filterFlight();
        
    });

    it('Validate if price is sorted in ascending order', async () => {
        expect(await flightPage.ascendingPriceCheck()).toBe(true);
    });

    it('Click on Price header and validate if the price is sorted in descending order', async () => {
        expect(await flightPage.descendingPriceCheck()).toBe(true);
    });

    it('Click on Book button and Validate the login popup', async () => {
        await flightPage.filterFlight();
        expect(await flightPage.$loginPopUp().isDisplayed()).toBe(false);
    });

});