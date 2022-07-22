let citySearchForm = document.getElementById("citySearch");
citySearchForm.addEventListener("submit", (event) => {
event.preventDefault();
let formData = new FormData(citySearchForm);
    let cityId = formData.get("cityId");
    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=6d65bef400eb8b9b13db5e90081a85d0`
            );
            let data = await response.json();
            // HANDLE DATA
            console.log(data);
            displayResults(data);
        } catch (err) {
            console.error(err);
            console.error("Hey something went wrong");
        } finally {
            console.log("THE REQUEST HAS FINISHED");
        }
    };
    fetchWeatherData();
});

function kelvinToCel(number) {
    return Math.floor(number) - 273;
}

function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
}

let insertEl = document.getElementById("insert");

function displayResults(forecast) {
    let cityName = forecast["name"];
    let highTemp = kelvinToCel(forecast["main"]["temp_max"]);
    let lowTemp = kelvinToCel(forecast["main"]["temp_min"]);
    let cast = titleCase(forecast["weather"][0]["description"]);
    let humidity = forecast["main"]["humidity"];
    let wind = forecast["wind"]["speed"];
    let clouds = forecast["clouds"]["all"];
    let country = forecast["sys"]["country"];

    let insertHTML = `
        <div id="testing" class="card mt-5">
            <div class="card-body">
                <h4 class="card-title">City: ${cityName}, ${country}</h4>
            </div>
        </div>
        <div id="testing" class="card mt-3">
            <div class="card-body" id="insert" name="insert">
                <h4 class="card-title">High Temp: ${highTemp} ℃</h4>
            </div>
        </div>
        <div id="testing" class="card mt-3">
            <div class="card-body" id="insert" name="insert">
                <h4 id="uppercase" class="card-title">Low Temp: ${lowTemp} ℃</h4>
            </div>
        </div>
        <div id="testing" class="card mt-3">
            <div class="card-body" id="insert" name="insert">
                <h4 class="card-title">Forecast: ${cast} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i style="padding-top: 25px;" class="fas fa-cloud-sun fa-2xl"></i></h4>
            </div>
        </div>
        <div id="testing" class="card mt-3">
            <div class="card-body" id="insert" name="insert">
                <h4 class="card-title">Humidity: ${humidity}%</h4>
            </div>
        </div>
        <div id="testing" class="card mt-3">
            <div class="card-body" id="insert" name="insert">
                <h4 class="card-title">Wind: ${wind} MPH</h4>
            </div>
        </div>
        <div id="testing" class="card mt-3">
            <div class="card-body" id="insert" name="insert">
                <h4 class="card-title">Clouds: ${clouds}</h4>
            </div>
        </div>
    `;
    insertEl.innerHTML = insertHTML;
}
