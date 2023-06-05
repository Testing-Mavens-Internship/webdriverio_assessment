/****************************************************
 *                     Imports                      *
 ****************************************************/
const { homePage } = require("../page-objects/home-page.js");
const { travelFlightsPage } = require("../page-objects/travel-flights-page.js");
const testData = require("../test-data/testData.json");

describe("Validate flight booking without login.", () => {
  
  it(`Navigate to "${testData.url}" and load the application in a new browser window.`, async () => {
    await homePage.openUrl(testData.url, homePage.$loginPopUpCloseButton());
    expect(await homePage.$homePageIcon())
      .withContext("Expect home page icon to be displayed.")
      .toBeDisplayed();
    expect(browser).toHaveUrl(testData.url);
  });

  it("Close login popup.", async () => {
    await homePage.loginPopUpClose();
    expect(await homePage.$loginPopUpCloseButton()).not.toBeDisplayed();
  });

  it(' Click on "Travel" from services menu.', async () => {
    await homePage.clickOn(
      homePage.$selectService(testData.serviceName),
      travelFlightsPage.$flightsTravelPageHeader(),
      "flights-travel page"
    );
    expect(await travelFlightsPage.$flightsTravelPageHeader().getText())
      .withContext("Expect home page heading text to be 'Travel'.")
      .toBe(testData.serviceName);
    expect(browser).toHaveTitleContaining("Flight Booking");
  });

  it(` Search for ${testData.from} and select the airport with code "${testData.fromAirportCode}.`, async () => {
    await travelFlightsPage.departureCitySelector(
      testData.from,
      testData.fromAirportCode
    );
    expect(await travelFlightsPage.$fromToDropDown("From"))
      .withContext("Expect search matched drop down to be displayed.")
      .toBeDisplayed();
  });

  it(` Search for ${testData.to} and select the airport with code "${testData.toAirportCode}.`, async () => {
    await travelFlightsPage.arrivalCitySelector(
      testData.to,
      testData.toAirportCode
    );
    expect(await travelFlightsPage.$fromToDropDown("To"))
      .withContext("Expect search matched drop down to be displayed.")
      .toBeDisplayed();
  });

  it(`Select "Depart On" date  as ${testData.day} ${testData.monthAndYear}.`, async () => {
    await travelFlightsPage.departAndReturnDateSelector(
      testData.monthAndYear,
      testData.day
    );
    expect(await travelFlightsPage.$travelersDropDown())
      .withContext("Expect 'travellers' dropdown to be displayed.")
      .toBeDisplayed();
  });

  it(`Select ${testData.adultsCount} Adults, ${testData.childCount} Children between 2-12 years and ${testData.infantCount} infant.`, async () => {
    await travelFlightsPage.travelerCountSetter(
      testData.adultsCount,
      testData.childCount,
      testData.infantCount
    );
    // validation - please check line 67 ( value is in shadow DOM).
  });

  it(`Select ${testData.travelClass} class from the cabin class radio button and click on done button`, async () => {
    await travelFlightsPage.clickOn(
      travelFlightsPage.$travelerClass(testData.travelClass),
      travelFlightsPage.$doneButton(),
      "done button"
    );
    expect(await travelFlightsPage.$doneButton())
      .withContext("Expect 'Done' button not to be displayed.")
      .not.toBeDisplayed();
    await travelFlightsPage.clickOn(
      travelFlightsPage.$doneButton(),
      travelFlightsPage.$searchButton(),
      "search button"
    );
    expect(browser)
      .withContext(
        `Expect url contains departure airport code ${testData.fromAirportCode}.`
      )
      .toHaveUrlContaining(`${testData.fromAirportCode}`);
  });

  it('Click on "Search" button.', async () => {
    await travelFlightsPage.clickOn(
      travelFlightsPage.$searchButton(),
      travelFlightsPage.$searchResultFirstRow(),
      "search results"
    );
    expect(await travelFlightsPage.$searchInputDisplayed("From").getValue())
      .withContext(
        "Expect value displayed in under 'From' is 'Kochi, COK - Cochin International Airport, India.'"
      )
      .toBe("Kochi, COK - Cochin International Airport, India");
    expect(await travelFlightsPage.$searchInputDisplayed("To").getValue())
      .withContext(
        "Expect value displayed in under 'To' is 'Dubai, DXB - Dubai International Airport, United Arab Emirates'."
      )
      .toBe("Dubai, DXB - Dubai International Airport, United Arab Emirates");
    expect(await travelFlightsPage.$searchInputDisplayed("Depart").getValue())
      .withContext("Expect value displayed in under 'Depart' is '9 Jun, Fri'.")
      .toBe("9 Jun, Fri");
    expect(
      await travelFlightsPage
        .$searchInputDisplayed("Travellers & Class")
        .getValue()
    )
      .withContext(
        "Expect value displayed in under 'Travellers & Class' is '5 Travellers | Business '."
      )
      .toBe("3 Travellers | Business ");
  });

  it(`Filter by ${testData.filterByTime} departure from Kochi and validate all the flights`, async () => {
    await travelFlightsPage.clickOn(
      travelFlightsPage.$filterByDepartureFromKochi(testData.filterByTime),
      travelFlightsPage.$clearFilterOption(),
      "clear filter"
    );
    expect(await travelFlightsPage.flightTimeChecker())
      .withContext("Expect flightTimeChecker return value to be true.")
      .toBe(true);
  });

  it(`Filter by ${testData.airLines} departure from Kochi and validate all the flights`, async () => {
    await travelFlightsPage.$moreFilters().scrollIntoView({ block: "center" });
    await travelFlightsPage.clickOn(
      travelFlightsPage.$moreFilters(),
      travelFlightsPage.$filterByAirLines(testData.airLines),
      "airline 'Air India' "
    );
    await travelFlightsPage.clickOn(
      travelFlightsPage.$filterByAirLines(testData.airLines),
      travelFlightsPage.$clearFilterAirlines(),
      "clear filter near 'Airlines'"
    );
    expect(await travelFlightsPage.filterByAirLine(testData.airLines))
      .withContext("Expect filterByAirline returns true.")
      .toBe(true);
  });

  it("Validate filter results are shown in ascending order of ticket price.", async () => {
    let isSorted = await travelFlightsPage.priceSort();
    expect(isSorted).toBe(true);
  });

  it("Click on Price header and validate if the price is sorted in descending order", async () => {
    let isSorted = await travelFlightsPage.priceDSort();
    expect(isSorted).toBe(true);
  });

  it('Click on "Book" button and validate the login popup', async () => {
    await travelFlightsPage.clickOn(
      travelFlightsPage.$searchResultFirstRow(),
      travelFlightsPage.$loginPopUpHeading(),
      "login popup"
    );
    expect(await travelFlightsPage.$loginPopUpHeading()).toBeDisplayed();
  });
});
