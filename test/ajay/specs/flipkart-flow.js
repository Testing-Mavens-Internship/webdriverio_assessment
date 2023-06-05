const { homePage } = require("../pageobjects/home-page.js");
const testData = require("../testdata/test-data.json");
const { travelPage } = require("../pageobjects/travel-page.js");

describe('Automating the specified flow of the website "Flipkart.com"', () => {

    it('Opening URL, maximising window and loading the application', async () => {
        await homePage.openUrl(testData.URL);
        await expect(browser).toHaveUrl(testData.URL);
        expect(await homePage.$homePageHeader().isDisplayed()).toBe(true);
    });

    it("Login pop up close", async () => {
        await homePage.loginPopupClose();
        expect(await homePage.$homePageHeader().isDisplayed()).toBe(true);
    });

    it("Clicking the 'Travel' button.", async () => {
        await homePage.clickingTravelButton();
        expect(await homePage.$travelPageHeader().isDisplayed()).toBe(true);
    })

    it("Setting the 'From' location.", async () => {
        await travelPage.settingFromField(testData.departureLocation);
        expect(await travelPage.$searchResultCOK().isDisplayed()).toBe(true);
    });

    it("Setting the 'To' location.", async () => {
        await travelPage.settingToField(testData.arrivalLocation);
        expect(await travelPage.$searchResultDXB().isDisplayed()).toBe(true);
    });

    it("Setting the departure date.", async () => {
        await travelPage.settingDepartureDate();
        expect(await travelPage.$departureCalender().isDisplayed()).toBe(true);
    });

    it("Setting the traveller information.", async () => {
        await travelPage.settingTravellerInformation();
        expect(await travelPage.$travellerInfoResponse().getText()).toBe("5 Travellers | Business ");
    });

    it("Clicking the search button.", async () => {
        await travelPage.clickingSearchButton();
        expect(await travelPage.$filterByHeader()).toBeDisplayed();
    });

});