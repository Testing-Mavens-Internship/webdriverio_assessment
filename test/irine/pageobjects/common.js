module.exports = class Common {
    constructor() {
    }
    /**
     * 
     * @param {interger} priceSet 
     * @returns boolean
     */
    async ascendingSort(priceSet) {
        let flag = true;
        for (let i = 0; i <= priceSet.length; i++) {
            if ((priceSet[i + 1] <= priceSet[i]))
                flag = false;
            return flag;
        }

    }
    /**
     * 
     * @param {interger} priceSet 
     * @returns boolean
     */
    async descendingSort(priceSet) {
        let flag = true;
        for (let i = 0; i <= priceSet.length; i++) {
            if (!(priceSet[i + 1] <= priceSet[i]))
                flag = false;
            return flag;
        }

    }
}
