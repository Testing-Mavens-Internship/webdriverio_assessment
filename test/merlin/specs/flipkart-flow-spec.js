const testData = require("../testdata/testData.json");
const { homePage } = require("../pageobjects/home-page.js");
const { travelPage } = require("../pageobjects/travel-page.js");
const { resultPage } = require("../pageobjects/result-page.js");

describe("WorkFlow of FlipKart", () => {
  it("Open Url and load the application", async () => {
    await homePage.openUrl(testData.pageUrl);
    await expect(browser).toHaveUrl(testData.pageUrl);
    expect(await homePage.$homePageHeader().isDisplayed()).toBe(true);
  });

  it("Click on Travel", async () => {
    await homePage.clickOnTravelButton();
    expect(await homePage.$travelPageHeader().getText()).toBe("Travel");
  });

  it("Search for Kochi and Select the option with COK", async () => {
    await travelPage.enterFromLocation(testData.fromLocation);
    expect(await travelPage.$displayedFromlocation().getValue()).toBe(
      "Kochi, COK - Cochin International Airport, India"
    );
  });

  it("Search for Dubai and Select the option with DXB", async () => {
    await travelPage.enterToLocation(testData.toLocation);
    expect(await travelPage.$displayedToLocation().getValue()).toBe(
      "Dubai, DXB - Dubai International Airport, United Arab Emirates"
    );
  });

  it("Select the Depart Date as 9 June 2023", async () => {
    await travelPage.selectDate();
    expect(await travelPage.$dateDisplayed().getValue()).toBe("9 Jun, Fri");
  });

  it("Select 2 Adults, 2 Child between 2-12 years and 1 infant from Travellers", async () => {
    await travelPage.selectTravellers();
    expect(await travelPage.$noOfAdultDisplayed().getText()).toBe(2);
    expect(await travelPage.$noOfInfantDisplayed().getText()).toBe(1);
  });

  it("Select Business Class from the Cabin Class Radio button and click on done button", async () => {
    await travelPage.selectBusinessClass();
    expect(await travelPage.$selectedclass().getText()).toBe("Business");
  });

  it("click on searchbutton", async () => {
    await travelPage.searchForFlight();
    expect(await travelPage.$resultPageHeader().getText()).toBe("Filter By");
  });

  it("Validate if price is sorted in ascending order", async () => {
    await resultPage.validatePriceInascendingOrder();
    expect(await resultPage.validatePriceInascendingOrder()).toBe(true);
  });

  it("Click on Price header and validate if the price is sorted in descending order", async () => {
    await resultPage.clickOnPriceHeader();
    expect(await resultPage.$downArrow().isDisplayed()).toBe(true);
    expect(await resultPage.validateThePriceInDescending()).toBe(true);
  });
});
