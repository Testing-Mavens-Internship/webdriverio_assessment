module.exports= class Common
{
    constructor()
    {
    }
    isAfterNoon(timeArray)
    {
      for (let i = 0; i < timeArray.length - 1; i++) {
        if (timeArray[i] > 17)
          return false;
      }
      return true;
    }
    isAirIndia(airIndiaArray)
    {
      for (let i = 0; i < airIndiaArray.length - 1; i++) {
        if (airIndiaArray.includes("Air India"));
          return false;
      }
      return true;
    }
    isDescending(priceArray)
    {
      for (let i = 0; i < priceArray.length - 1; i++) {
        if (priceArray[i] < priceArray[i + 1])
          return false;
      }
      return true;
    }
  }