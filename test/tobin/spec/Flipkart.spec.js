const { homePage } = require("../page-objects/homepage.js")
const testData = require("../page-objects/testdata.json")
const { travel } = require("../page-objects/travel.js")
const { flightSelection } = require("../page-objects/flight-selection.js")
const { flightPrice } = require("../page-objects/flight-price.js")

describe("Automation exercise of Flipkart basic flow", () => {
    it("Open Url and load the application", async () => {
        await homePage.openUrl(testData.flipkartURL)
        await expect(browser).toHaveUrl(testData.flipkartURL)
        expect(await homePage.$logo()).toBeDisplayed()
    })
    it("Login pop up close", async () => {
        await homePage.loginPopupClose();
        expect(await homePage.$logo()).withContext("Logo Not displayed").toBeDisplayed()
    })
    it("Click on  travel tab for start booking", async () => {
        await homePage.travel();
        await homePage.alerts();
        expect(await homePage.$searchButton().isDisplayed()).toBe(false)

    })
    it("Enter travel details on the search bar", async () => {
        await travel.travelDetails(testData.departCity, testData.arrivalcity);
        expect(await travel.$filterByHeader().isDisplayed()).toBe(true)
    })

    it("Select price of departure of flight and checking its in ascending order", async () => {
        await flightSelection.priceOfTravel();
        expect(await flightSelection.priceOfTravel()).toBe(true);
    })
    
    it("Filter by air india airline and validate",async()=>{
        await flightSelection.airlineSelect();
        await flightSelection.priceOfTravel();
        expect(await flightSelection.priceOfTravel()).toBe(true);
    })

    it("Click the price tag and check the fare list are in descending order",async ()=>{
        await flightPrice.priceOfTravel();
        expect(await flightPrice.priceOfTravel()).toBe(true);

    })
    it("Clickbook now button",async()=>{
        await flightSelection.bookNowclick();
        expect(await flightSelection.bookNowclick().isDisplayed()).toBe(true)
    })
})