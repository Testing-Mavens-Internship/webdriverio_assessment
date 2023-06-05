const testData = require('../test-data/test-data.json');
const { homePage } = require('../page-object/home-page.js');
const { searchPage } = require('../page-object/Search-page.js');
const { bookingPage } = require('../page-object/booking-page.js');

describe('Basic flow of flipcart', () => {

    it('Open url and load the application', async () => {
        await homePage.openUrl(testData.flipcartUrl);
        await expect(browser).toHaveUrl('https://www.flipkart.com/');
    });

    it('Click on travel', async () => {
        await homePage.clickOnTravel();
        expect(await homePage.$searchButton().isDisplayed()).withContext('Failed to view the search button').toBe(true);
    });

    xit('Search for Kochi and Select the option with COK', async () => {
        await searchPage.inputFromField();
    });

    it('Search for Dubai and Select the option with DXB', async () => {

    });

    it('Select the Depart Date as 9 June 2023', async () => {

    });

    it('Select 2 Adults, 2 Child between 2-12 years and 1 infant', async () => {

    });

    it('Filter by Afternoon departure from Kochi and validate all the flights', async () => {
        await bookingPage.openUrl('https://www.flipkart.com/travel/flights/search?trips=COK-DXB-09062023&travellers=2-1-1&class=b&tripType=ONE_WAY&isIntl=true&source=Search%20Form');
        await bookingPage.selectAfternoon();
        expect(await bookingPage.timeCheck()).toBe(true);
    });

    it('Filter by Air India Airline and Validate', async () => {
        await bookingPage.clickAirIndia();
        let airLineCheck = await bookingPage.getAirlineName();
        let text = 'AirIndia';
        expect(airLineCheck.every(item => item.toLowerCase().includes(text.toLowerCase()))).withContext('not matching with airindia').toBe(true)
    });

    it('Validate if price is sorted in ascending order', async () => {
        expect(await bookingPage.priceListInAscendingOrder()).withContext('price is not sorted in ascending order').toBe(true);
    });

    it('Click on Price header and validate if the price is sorted in descending order', async () => {
        await bookingPage.clickPriceSort();
        expect(await bookingPage.priceFromDescendingOrder()).withContext('price is not sorted in descending order').toBe(true);
    });

    it('Click on Book button and Validate the login popup', async () => {
        await bookingPage.clickBookButton();
        expect(await bookingPage.$requestOTPButton().isDisplayed).withContext('requestOTP button is not displayed').toBe(true);
    });

    it('Close the login pop up', async () => {
        await bookingPage.closePopUp();
        expect(await bookingPage.$searchButton().isDisplayed()).withContext('search button is not displayed').toBe(true);
    });


});
