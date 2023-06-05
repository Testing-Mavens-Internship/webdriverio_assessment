const testData = require("../test-data/data.json");
const { homePage } = require("../page-objects/home-page.js");
const {travelPage} = require("../page-objects/travel-page.js");
const { searchResultsPage } = require("../page-objects/search-results-page.js");


describe("Basic e2E flow for the website", () => {
  it("Open url and load the application", async () => {
    await homePage.openUrl(testData.URL);
    await expect(browser).toHaveUrl(testData.URL);
  });

  it("Close the Login Pop up and continue without login in ", async () => {
    await homePage.loginPopUpClosing();
    expect(await homePage.$loginButton().isDisplayed()).withContext(`Expect the user to continue in home page `).toBe(true);
  });

  it("Click on Travel button  ", async () => {
    await homePage.clickingTravel();
    expect(await travelPage.$header().isDisplayed()).toBe(true);
  });

  it(`Search for ${testData.departCity} and Select the option with COK`, async () => {
    await travelPage.departureCityEntering("depart",testData.departCity);
    expect(await travelPage.$locationDropDownBox().isDisplayed()).toBe(true);
    await travelPage.departureCitySelectionConfirmation(testData.departureKeyword);
    expect(await travelPage.$locationDropDownBox().isDisplayed()).toBe(false);
  });

  it(`Search for ${testData.arrivalCity} and Select the option with DXB`, async () => {
    await travelPage.arrivalCityEntering("arrival",testData.arrivalCity);
    await travelPage.arrivalCitySelectionConfirmation(testData.arrivalKeyword);
    expect(await travelPage.$locationDropDownBox().isDisplayed()).toBe(false);
  });

  it(`Select the Depart Date as 9 June 2023`, async () => {
    await travelPage.departureDateSelector();
    expect(await travelPage.$travelDetailsBox().isDisplayed()).toBe(true);
  });

  it(`Select 2 Adults, 2 Child between 2-12 years and 1 infant `, async () => {
    await travelPage.travelDetailsSelection();
    
  });

  it(`Select Business Class from the Cabin Class Radio button and click on done button`, async () => {
    await travelPage.flightClassSelector(testData.flightClass);
    expect(await travelPage.$travelDetailsBox().isDisplayed()).toBe(true);
    
  });

  it(`Click on Search button`, async () => {
    await travelPage.searchButtonClicking();
    expect(await searchResultsPage.$header().isDisplayed()).toBe(true);
  });

  it(`Filter by Afternoon departure from Kochi and validate all the flights`, async () => {
    await searchResultsPage.flightTimeFiltering(testData.flightTime)
    expect(await searchResultsPage.$clearFilterButton().isDisplayed()).toBe(true);
    
  });
  
});