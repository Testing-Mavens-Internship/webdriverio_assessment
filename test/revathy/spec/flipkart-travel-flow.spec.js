const {homePage} = require('../page-objects/home-page.js');
const {travelPage} = require('../page-objects/travel-page.js');
const {travelResultPage} = require('../page-objects/travel-result-page.js');

const testData = require('../test-data/data.json');

let fromLocation = "Kochi, COK - Cochin International Airport, India";
let toLocation = "Dubai, DXB - Dubai International Airport, United Arab Emirates";

describe('Basic flow of Flipkart application', () => {
    it('Open URL and load the application', async () => {
        await homePage.openUrl(testData.flipkartUrl);
        await expect(browser).toHaveUrl(testData.flipkartUrl);
        expect(await homePage.$homePageHeader().isDisplayed()).withContext('Homepage header not displayed').toBe(true);
    });

    it('Close Login popup by clicking on close icon.', async () => {
        await homePage.closeLoginPopUp();
        expect (await homePage.$searchBar().isDisplayed()).toBe(true);
    });

    it('Click on "Travel" icon and navigate to travels page', async () => {
        await homePage.clickTravelIcon();
        expect (await travelPage.$travelHeader().isDisplayed()).toBe(true);
        expect (await travelPage.$submitButton().isClickable());
    });

    it('Click "From" location and select "Kochi COK".', async () => {
        await travelPage.clickFromLocation(fromLocation);
        expect (await travelPage.$toLocation().isClickable());
    });

    it('Click "To" location and select "Dubai, DXB".', async () => {
        await travelPage.selectToLocation(toLocation);
        expect (await travelPage.$dateSelection().isClickable()); 
    });

    it('Select the date from the calender.', async () => {
        await travelPage.selectDate();
        expect (await travelPage.$travellerDetail().isClickable());    
    });

    it('Click and select the travellers details.', async () => {
        await travelPage.selectTravellerDetail();
        expect (await travelResultPage.$filterPageHeader().isDisplayed()).toBe(true);
    });

    it("Validating the displayed flights are in the afternoon", async () => {
        let resultSet = await travelResultPage.getTimeFromTable();
        });

})