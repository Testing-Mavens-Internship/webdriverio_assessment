let timeArray = [];
let airLineArray = [];
let priceArray = [];

class BookingPage {

    constructor() {
        this.$afternoon = () => $('//div[@class="Lzv7l6 row"]//div[text()="Afternoon"]');
        this.$$timeList = () => $$('//span[@class="_3p2vNo _2keVvy"]');
        this.$airIndia = () => $('//div[@class="_325M91"][text()="Air India"]');
        this.$expantAirline = () => $('//div[text()="+ 7 More"]');
        this.$$listAirIndia = () => $$('//div[@class="_2HFgmY"]');
        this.$$priceList = () => $$('//div[@class="_3Byyvw"]');
        this.$priceSort = () => $('//span[@class="_3W-vry"]');
        this.$bookButton = () => $('(//div[@class="ZiOg5a"][contains(text(),"Book")])[1]');
        this.$loginPopUpHeader = () => $('//span[@class="_36KMOx"]');
        this.$closeIcon = () => $('//button[@class="_2KpZ6l _1KAjNd"]');
        this.$searchButton = () => $('//button[@class="_2KpZ6l _2UZh35 _3AWRsL"]');
        this.$requestOTPButton = () => $('//button[@class="_2KpZ6l _2HKlqd _3AWRsL"]');
    }
    /**
     * load the booking page
     * @param {string} url 
     */
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        //await this.$homePageSearchBar().waitForDisplayed({ timeout: 100000, timeoutMsg: 'failed to load search bar' });
        //await this.$loginPopUp().click();
    }
    /**
     * select the afternoon filter
     */
    async selectAfternoon() {
        await this.$afternoon().click();
    }
    /**
     * for checking the time of the flight
     * @returns boolean
     */
    async timeCheck() {
        for (let $time of await this.$$timeList()) {
            let value = await $time.getText();
            let afternoon = value.replace(/\D/g, "");
            timeArray.push(afternoon);
        }
        return this.afternoonTime(timeArray);
    }
    /**
     * method to check the flight timing
     * @returns boolean
     */
    async afternoonTime() {
        for (let i = 0; i < timeArray.length - 1; i++) {
            if (timeArray[i] <= 30000)
                return true;
        }
        return false;
    }
    /**
     * method to click on the air india flight
     */
    async clickAirIndia() {
        await this.$expantAirline().click();
        await this.$airIndia().click();
    }
    /**
     * method to check air india flight 
     * @returns boolean
     */
    async getAirlineName() {
        for (let $airline of await this.$$listAirIndia()) {
            let airindia = await $airline.getText();
            airLineArray.push(airindia);
        }
        return airLineArray;
    }
    /**
     * method to sort the price in ascending order
     * @returns boolean
     */
    async priceListInAscendingOrder() {
        for (let $price of await this.$$priceList()) {
            let amount = await $price.getText();
            let amountList = amount.replace(/\D/g, "");
            priceArray.push(amountList);
        }
        return this.priceFromMinToMax(priceArray);

    }
    /**
     * method to check the price fro minmum to maximum
     * @returns boolean
     */
    async priceFromMinToMax() {

        for (let i = 0; i < priceArray.length - 1; i++) {
            if (priceArray[i] > priceArray[i + 1])
                return true;

        }
        return false;
    }
    /**
     * click on the price link
     */
    async clickPriceSort() {
        await this.$priceSort().click();
    }
    /**
     * method to convert the price in descending order
     * @returns boolean
     */
    async priceFromDescendingOrder() {
        for (let $price of await this.$$priceList()) {
            let amount = await $price.getText();
            let amountList = amount.replace(/\D/g, "");
            priceArray.push(amountList);
        }
        return this.priceFromMaxToMin(priceArray);

    }
    /**
     * method to check the price is in descending order
     * @returns boolean
     */
    async priceFromMaxToMin() {
        for (let i = 0; i < priceArray.length - 1; i++) {
            if (priceArray[i] < priceArray[i + 1])
                return true;

        }
        return false;
    }
    /**
     * method to click on the book button
     */
    async clickBookButton() {
        await this.$bookButton().click();
        await this.$loginPopUpHeader().waitForDisplayed({ timeout: 10000, timeoutMsg: 'failed to load login pop up' });
        await this.$requestOTPButton().waitForDisplayed({ timeout: 10000, timeoutMsg: 'failed to load request OTP button' });
    }
    /**
     * method to close the login pop up
     */
    async closePopUp() {
        await this.$closeIcon().click();
    }
}

module.exports =
{
    bookingPage: new BookingPage()
}