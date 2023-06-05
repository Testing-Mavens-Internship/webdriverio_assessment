const { homePage } = require("../page-objects/home-page.js");
const { travelPage } = require("../page-objects/travel-page.js");
const testData = require("../test-data/test-data.json");
const { flightBookPage } = require("../page-objects/fligh-booking-page.js");

describe("Basic flow of booking a flight ticket in flipkart", () => {
  it("Open the url and load the application", async () => {
    await homePage.openUrl(testData.url);
    await expect(browser).toHaveUrl("https://www.flipkart.com/");
  });

  it("close the login pop-up", async () => {
    await homePage.loginPopUp();
    expect(await homePage.$loginPopUpHeader()).isDisplayed();
  });

  it('click on the "Travel" tab in menu ', async () => {
    await homePage.clickOnTravel();
    expect(await homePage.$travelIcon().getText())
      .withContext("Expect header to appear")
      .toBe("Travel");
  });

  it("Search for Kochi and Select the option with COK", async () => {
    await travelPage.fromSearchBar("Kochi");
    expect(await travelPage.$fromSearchTab()).toBeDisplayed();
  });

  it("Search for Dubai and Select the option with DXB", async () => {
    await travelPage.toSearchBar("Dubai");
    expect(await travelPage.$toFromSeachBar()).toBeDisplayed();
  });

  it("Select the Depart Date as 9 June 2023", async () => {
    await travelPage.departOnDateSelection();
    expect(
      await travelPage.$dateSelectionFromCalender().getvalue()
    ).toBeDisplayed();
  });

  it("Select 2 Adults, 2 Child between 2-12 years and 1 infant", async () => {
    await travelPage.travellersDetails();
    expect(await travelPage.$adultCount().getText()).toBe("2");
    expect(await travelPage.$childrenCount().getText()).toBe("2");
  });

  it("Select Business Class from the Cabin Class Radio button and click on done button", async () => {
    await travelPage.cabinClassSelect();
    expect(await travelPage.$economyClassSelect().isSelected()).toBe("true");
  });

  it("Click on Search button", async () => {
    await travelPage.searchButtonClick();
    expect(await travelPage.$searchAgainTab().getText()).toBe("Search Again");
  });

  it("Filter by Afternoon departure from Kochi and validate all the flights", async () => {
    await flightBookPage.departureTimeSelection();
     expect(await flightBookPage.$afterNoonCheckBox().isSelected()).toBe("true");
     expect(await flightBookPage.afterNoonTimeAscending()).toBe(true);
  });

  it('Filter by Air India Airline and Validate',async()=>{
 await flightBookPage.airIndiaCheckBox();
 expect(await flightBookPage.$airIndiaCheckBox().isSelected()).toBe("true");
  });
  
  it('Validate if price is sorted in ascending order',async()=>{
 await flightBookPage.sortedPriceList();
 expect (await homePage.sortedPriceList()).toBe(true);
});

it('Click on Price header and validate if the price is sorted in descending order',async()=>{
await flightBookPage.priceDescendingClick()
expect (await flightBookPage.priceDescendingClick()).toBe(true);
});

});
