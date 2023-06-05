const { homePage } = require('../page-objects/home-page.js');
const testData = require('../test-data/data.json');
const { travelPage } = require('../page-objects/travel-page.js');
const { ticketsPage } = require('../page-objects/tickets-page.js');

describe('Basic flow to book a flight in Flipkart Application', () => {

    it(`Navigate to ${testData.flipkartUrl} and load the application in a new chrome window.`, async () => {
        await homePage.openUrl(testData.flipkartUrl);
        expect(await homePage.$homeBanner().isDisplayed()).withContext(`Expected url: ${testData.flipkartUrl}`).toBe(true);
    });

    it('Close the "Login" popup', async () => {
        await homePage.closeLogin();
        expect(await homePage.$loginClose().isDisplayed()).toBe(false);

    });

    it(`Click on travel.`, async () => {
        await homePage.clickOnTravel();
        expect(await travelPage.$roundTripRadioButton().isDisplayed()).withContext(`Expected button: round trip radio button`).toBe(true);
    });

    it(`Search for Kochi and Select the option with COK`, async () => {
        await travelPage.searchAndSelectDepartCity("Kochi");
        expect(await travelPage.$departAndArrivalFields(testData.airport[0]).isDisplayed()).withContext(`Expected city: Kochi`).toBe(true);
    });

    it(`Search for Dubai and Select the option with DXB`, async () => {
        await travelPage.searchAndSelectArrivalCity("Dubai");
        expect(await travelPage.$departAndArrivalFields(testData.airport[1]).isDisplayed()).withContext(`Expected city: Dubai`).toBe(true);
    });

    it(`Select the Depart Date as 9 June 2023`, async () => {
        await travelPage.setDepartDate();
        expect(await travelPage.$changedDepartDate().isDisplayed()).withContext(`Expected date: 09 Jun 2023`).toBe(true);
    });

    it(`Select 2 Adults, 2 Child between 2-12 years and 1 infant`, async () => {
        await travelPage.setTravellers();
        expect(await travelPage.$changedNumber().isDisplayed()).withContext(`Expected travellers: 2 Adults, 2 Child between 2-12 years and 1 infant`).toBe(true);
    });

    it(`Select Business Class from the Cabin Class Radio button and click on done button`, async () => {
        await travelPage.setTravelClass();
        expect(await travelPage.$travelClassHighlighted().isDisplayed()).withContext(`Expected travel class: Business`).toBe(true);
    });

    it(`Click on Search button`, async () => {
        await travelPage.clickSearchButton();
        expect(await ticketsPage.$travelClassHighlighted().isDisplayed()).withContext(`Expected result: Filter header is displayed`).toBe(true);
    });

    it(`Filter by Afternoon departure from Kochi and validate all the flights`, async () => {
        await ticketsPage.setTime();
        let resultSet = await ticketsPage.getFieldData();
        expect(await resultSet.every(item => item.toBeGreaterThan("12:00")));
    });

    it(`Filter by Air India Airline and Validate if price is sorted in ascending order`, async () => {
        await ticketsPage.filterAirlines();
        expect(await ticketsPage.$requiredChoice(testData.choice[1]).isDisplayed()).toBe(true);
        expect(await ticketsPage.orderCheck()).toBe(true);
    });

    it(`Click on Price header and validate if the price is sorted in descending order`, async () => {
        await ticketsPage.clickPrice();
        expect(await ticketsPage.$clickPrice().isDisplayed()).withContext(`Expected result: Price header with down arrow is displayed`).toBe(true);
        expect(await ticketsPage.orderCheckSecond()).toBe(true);
    });

    it(`Click on Book button and Validate the login popup`, async () => {
        await ticketsPage.clickBookButton();
        await homePage.closeLogin();
        expect(await homePage.$loginClose().isDisplayed()).toBe(false);
    });
});