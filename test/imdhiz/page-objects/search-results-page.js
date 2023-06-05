class SearchResults {
  constructor() {
    this.$searchAgainButton = () =>
      $('//button[@class="_2KpZ6l _2UZh35 _3AWRsL"]');
    this.$header = () => $('//div[@class="ciVffB _2VJCG-"]');
    this.$flightTimeFilter = (flightTime) =>
      $(`//div[text()="${flightTime}"]/../../..//input`);
    this.$clearFilterButton = () => $('//div[@class="_3gFykB"]');
  }
  /**
   * Method to select filtering option on flight time
   * @param {String} flightTime
   */
  async flightTimeFiltering(flightTime) {
    await this.$flightTimeFilter(flightTime).click();
    await this.$clearFilterButton().waitForDisplayed({
      timeout: 10000,
      timeoutMsg: "wait time out waiting for filter to be applied ",
    });
  }
}
module.exports = {
  searchResultsPage: new SearchResults(),
};
