class Travel {
  constructor() {
    this.$searchButton = () => $("//span[normalize-space()='SEARCH']")
    this.$City = (City) => $(`//input[@name="${City}"]`)
    this.$departureCity = () => $("//input[@name='0-departcity']")
    this.$cokCity = () => $('//*[@id="container"]/div/div[2]/div[1]/div/div[2]/div/div[2]/form/div/div[1]/div[1]/div/div[2]/div/div[1]/div[2]')
    this.$arrivalCity = () => $("//input[@name='0-arrivalcity']")
    this.$dxbCity = () => $('//*[@id="container"]/div/div[2]/div[1]/div/div[2]/div/div[2]/form/div/div[1]/div[3]/div/div[2]/div/div[1]/div[2]')
    this.$fromDate = () => $("//input[@name='0-datefrom']")
    // this.$depatureDate=()=>$('//table[@class="aSgzfL"]//div[contains(text(),"9"]')
    this.$departureDate = () => $('//table[1]/tbody[1]/tr[2]/td[6]/div[1]/button[1]')
    this.$travellersClass = () => $("//input[@name='0-travellerclasscount']")
    this.$adultAdd = () => $("//div[@class='_2g4weU _3mOkvM']//div[1]//div[2]//div[1]//div[3]//button[1]//*[name()='svg']")
    this.$childAdd = () => $("//div[@class='ZEl_b_ _2pgFiz _2ogGYG _23xUYh _3pAV4E']//div[2]//div[2]//div[1]//div[3]//button[1]//*[name()='svg']//*[name()='path' and contains(@fill,'#2874f0')]")
    this.$infantAdd = () => $("//div[@class='_3OFDG8']//div[3]//div[2]//div[1]//div[3]//button[1]//*[name()='svg']")
    this.$classAdd = () => $("//div[contains(text(),'Business')]")
    this.$filterByHeader = () => $("//div[@class='_2CzBsO']")
  }
  /**
   * Method for booking a flight matching the requirements
   * @param {string} departure 
   * @param {string} arrival 
   */
  async travelDetails(departure, arrival) {
    await this.$departureCity().setValue(departure);
    await this.$cokCity().waitForDisplayed({ timeout: 20000 })
    await this.$cokCity().click()
    await this.$arrivalCity().setValue(arrival);
    await this.$dxbCity().waitForDisplayed({ timeout: 20000 })
    await this.$dxbCity().click();
    await this.$fromDate().click();
    await this.$departureDate().waitForDisplayed({ timeout: 20000 })
    await this.$departureDate().click();
    await this.$travellersClass().waitForDisplayed({ timeout: 20000 })
    await this.$travellersClass().click();
    await this.$adultAdd().doubleClick();
    await this.$infantAdd().click();
    await this.$classAdd().click();
    await this.$searchButton().click();
    await this.$filterByHeader().waitForDisplayed({ timeout: 20000 })
  }
}

module.exports = {
  travel: new Travel(),
};
