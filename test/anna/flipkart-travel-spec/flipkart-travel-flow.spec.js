const { homePage } = require("../page-objects/home-page.js");
const { travelPage } = require("../page-objects/travel-page.js");

const testData = require("../test-data/test-data.json");

describe("Basic flow of Flipkart Application", () => {
  it("Open URL and load the application", async () => {
    await homePage.openUrl(testData.url);
    await expect(browser).toHaveUrl("https://www.flipkart.com/");
    await homePage.closeLoginPopUp();
  });

  it("Click on travel menu and validations", async () => {
    await homePage.clickOnTravelMenu();
    expect(await homePage.$travelPopupMenu()).toBeDisplayed();
  });

  it("Search for Kochi in from city, Select the option with COK and its validations", async () => {
    await homePage.clickOnFromCity("Kochi,In");
  });

  it("Search for Dubai in to city, Select the option with DXB and its validations", async () => {
    await homePage.clickOnToCity("Dubai,AE");
  });

  it("Select depart date as 9 June 2023", async () => {
    await homePage.departureDate();
    expect(await homePage.$travellersClassPopUp()).toBeDisplayed();
  });

  it("Select 2 Adults, 2 Child between 2-12 years and 1 infant", async () => {
    await homePage.selectNumberOfAdults();
    expect(await homePage.$adultAddedValue()).toBeDisplayed();
    await homePage.selectNumberOfChildren();
    expect(await homePage.$childrenAddedValue()).toBeDisplayed();
    await homePage.selectNumberOfInfants();
    expect(await homePage.$infantsAddedValue()).toBeDisplayed();
  });

  it("Select Business Class from the Cabin Class Radio button and click on done button", async () => {
    await homePage.clickOnBusinessRadioButtonAndDone();
    expect(await homePage.$doneButtonInTravellerTab()).toBeDisplayed();
    expect(await homePage.$searchButtonInTravellerTab().getText()).toBe(
      "SEARCH"
    );
  });

  it("Filter by Afternoon departure from Kochi and validate all the flights", async () => {
    await travelPage.clickOnAfternoonFilter();
    expect(await travelPage.$travelAfternoonFilteredResult()).toBeDisplayed();
    expect(await travelPage.orderCheck()).toBe(true);
  });
});
