const { homePage } = require('../page-objects/home-page.js');
const { travelPage } = require('../page-objects/travel-page.js');
const { flightPage } = require('../page-objects/flight-page.js');
const testData = require('../test-data/testData.json');

describe('Basic flow of flipkart travel page', () => {

    it('Open url and load the application', async () => {
        await homePage.openUrl(testData.pageURL);
        await expect(browser).toHaveUrl(testData.pageURL);
    });

    it('Click on travel icon and navigate to travel page', async () => {
        await homePage.clickTravelIcon();
        expect(await homePage.$travelHeader().isDisplayed()).toBe(true);
    });

    it('Enter a place name in the "From" field and select the place from the search list', async () => {
        await travelPage.selectFromValue(testData.fromPlace);
        expect(await travelPage.$fromField().getAttribute('value')).toBe(testData.selectedValueOfFromField);
    });

    it('Enter a place name in the "To" field and select the place from the search list', async () => {
        await travelPage.selectToValue(testData.toPlace);
        expect(await travelPage.$toField().getAttribute('value')).toBe(testData.selectedValueOfToField);
    });

    it('Select the "depart on" date', async () => {
        await travelPage.selectDepartureDate();
        expect(await travelPage.$departueDateDisplay().getAttribute('value')).toBe('9 Jun, Fri');
    });

    it('Select number of adults,children and infants from travellers and select business button from cabin class and click done', async () => {
        await travelPage.selectTravellersClass();
        await travelPage.selectCabinClass();
        await travelPage.clickOnSearchButton();
        expect(await travelPage.$filterByHeader().isDisplayed()).toBe(true);
    });

    it('Select the departure time and airlines from the filter', async () => {
        await flightPage.selectDepartureTime();
        await flightPage.selectAireline();

    });

});