class FlightSelection {
    constructor() {
        this.$afternoon = () => $('//div[@class="_1AtVbE col-3-12"]//section[@class="_2t_2yL"][2]//div[@class="_1G1UJR"][3]')
        this.$departTime = () => $('//span[@class="_3p2vNo _2keVvy"]');
        this.$$priceOfFlight = () => $$(`//div[@class="_3Byyvw"]`)
        this.$airlineViewMore=()=>$("/div[@class='_2PXVb1']")
        this.$airIndia=()=>$("//div[@class='_325M91'][normalize-space()='Air India']")
        this.$priceTab=()=>$("//span[@class='_3W-vry']")
        this.$bookNow=()=>$('//div[@class="ZiOg5a"][1]')
        this.$loginPopUp=()=>$('//div[@class="_3wFoIb row pG1qR7"]')
    }
    /**
     * Method to get the price of flight in afternoon time
     */
    async priceOfTravel() {
        await this.$afternoon().click();
        let priceArray = []
        for (let $time of await this.$$priceOfFlight()) {
            let value = await $time.getText();
            let resultPrice = value.replace(/\D/g, "");
            priceArray.push(resultPrice);
        }
        await this.priceOrderCheck(priceArray)
    }
    /**
     * Method to check whether the flight are shown in ascending order
     * @param {price} priceArray 
     * @returns boolean
     */
    async priceOrderCheck(priceArray) {
        let priceArrayLength = priceArray.length;
        for (let i = 0; i < priceArrayLength - 1; i++) {
            if (priceArray[i] > priceArray[i + 1]) {
                return false;
            }
        }
        return true;
    }
    async airlineSelect() {
       //await this.$airlineViewMore().scrollIntoView()
       await this.$airlineViewMore().click();
       await this.$airIndia().waitForDisplayed({ timeout: 20000 })
       await this.$airIndia().click();
    }
    async bookNowclick() {
        await this.$bookNow().click();
        await this.$loginPopUp().waitForDisplayed({ timeout: 20000 })
    }
}
module.exports = {
    flightSelection: new FlightSelection()
};
