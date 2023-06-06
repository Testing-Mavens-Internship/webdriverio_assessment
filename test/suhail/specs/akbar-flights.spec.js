const {ticketBooking} =  require('../page-objects/flight')
const testData = require("../testdata/test-data.json");

describe("Book a fligt ticket from 'akbar flights' appliaction" , () => {

    it("Launch the application url" , async() => {
        await ticketBooking.openUrl(testData.akbarTravelsUrl);
        await expect(browser).toHaveUrl(testData.akbarTravelsUrl);
    });

    it("Select the 'From' and 'To' destination points" , async() => {
        await ticketBooking.travellingDestinations();
        expect(await ticketBooking.$enterFromPlace()).withContext('From point not displayed').toBeDisplayed();
        expect(await ticketBooking.$enterToPlace()).withContext('To point not displayed').toBeDisplayed();

    });

    it("Select the 'Departure' points" , async() => {
        await ticketBooking.travellingDate();
        expect(await ticketBooking.$chooseDepartureDate()).withContext('From date is not displayed').toBeDisplayed();
    });
    
    it("Select the 'Travellers' details" , async() => {
        await ticketBooking.numberOfTravellers();
        expect(await ticketBooking.$verifyAdultNumber()).withContext('Adult number is not displayed').toBeDisplayed();
        expect(await ticketBooking.$verifyChildrenNumber()).withContext('Children number is displayed').toBeDisplayed();
        expect(await ticketBooking.$verifyInfantNumber()).withContext('Infant number is not displayed').toBeDisplayed();
    });

    it("Choose the 'Business' class" , async() => {
        await ticketBooking.clickOnBusinessClass();
    });
     
    it("Filter afternoon flights and verify listed flights" , async() => {
        await ticketBooking.filterByFlightTime();
       expect(await ticketBooking.departureTime()).toBe(true);
    });

    it("Filter as per the flights company and verify listed flights and verify the listed price" , async() => {
        await ticketBooking.flightCompany();
       expect(await ticketBooking.isListedAirIndia()).toBe(true);
       expect(await ticketBooking.verifySortedFlightPrice()).toBe(true);
    });

});
