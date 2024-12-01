let weather = [];

async function fetchdata() {
    let city = document.getElementById("location").value;

    console.log(city);

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=602bd899607fd77a2b771155d97dfa64`);
        const data = await res.json();
        console.log(data);

        let temp = (data.main.temp - 273.15).toFixed();
        let humidity = data.main.humidity;
        let visibility = (data.visibility / 1000)
        let windSpeed = data.wind.speed;
        let place = data.name;
        let notes=(data.weather[0].description);
        let cloud=data.weather[0].main;
        let pressure=data.main.pressure;
        weather = [...data.weather];


console.log(cloud);
        switch (cloud) {
            case "Clouds":
                logos=`./images/cloud.png`
                break;
            case "mist":
                logos=`./images/mistt.png`
                break;
            case "Rain":
                logos=`./images/rainy.png`
                break;
            case "Clear":
                logos=`./images/sun.png`
                break;
            default:
                logos=`./images/rainthunder.png`
                break;
        }

        let str = `
          <div class="leftbox">
            <div class="clouddiv">
              <div class="placediv">
                <p class="place"><i class="material-icons">place</i> ${place}</p>
              </div>
              <div class="childplacediv">
                <div class="clouds"><img class="logos" src="${logos}" alt="weather-icon"></div>
                <div class="temp">
                  <p class="tempvalue">${temp}</p>
                  <p class="degreec">°C <i class="fa fa-thermometer-half"></i></p>
                </div>
              </div>
              <div class="something"><p class="discription">${notes}</p></div>
            </div>
            
          </div>
          <div class="rightbox">
            <div class="details">
              <div class="humidity det"><div class="title"><p>Humidity</p></div><div class="value"><p class="values">${humidity}%</p></div></div>
              <div class="visibility det"><div class="title"><p>Visibility</p></div><div class="value"><p class="values">${visibility} km</p></div></div>
              <div class="wind det"><div class="title"><p>Wind Speed</p></div><div class="value"><p class="values">${windSpeed} m/s</p></div></div>
               <div class="wind det"><div class="title"><p>pressure</p></div><div class="value"><p class="values">${pressure} mb</p></div></div>
            </div>
          </div>
        `;

        document.querySelector('.box').innerHTML = str;

    } catch (error) {
        document.querySelector('.box').innerHTML = `<p style="color:red;">Error: Could not fetch weather data. Please check the city name.</p>`;
        console.error(error);
    }
}
