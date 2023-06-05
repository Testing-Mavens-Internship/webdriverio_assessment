class FlightPrice {
    constructor() {
        this.$priceTab=()=>$("//span[@class='_3W-vry']")
        this.$$priceOfFlight1 = () => $$(`//div[@class="_3Byyvw"]`)
    }/**
     * Method to get the fare of airline
     */
    async priceOfTravel() {
        await this.$priceTab().click();
        let priceArray1 = []
        for (let $price of await this.$$priceOfFlight1()) {
            let value = await $price.getText();
            let resultPrice1 = value.replace(/\D/g, "");
            priceArray1.push(resultPrice1);
        }
        await this.priceOrderCheck(priceArray1)
    }
    /**
     * Method to check whether price are in descending order
     * @param {number} priceArray 
     * @returns boolean
     */
    async priceOrderCheck(priceArray) {
        let timeArrayLength = timeArray.length;
        for (let i = 0; i < timeArrayLength - 1; i++) {
            if (priceArray[i] < priceArray[i + 1]) {
                return false;
            }
        }
        return true;
    }
}module.exports = {
    flightPrice: new FlightPrice()
};
