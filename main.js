
console.log(document.body.children)

// Background colorstyling

const root = document.documentElement;
const hue = document.querySelector('.hue');

root.addEventListener('mousemove', e => {
    let x = e.clientX / innerWidth,
        y = e.clientY / innerWidth;
    x = Math.floor(Math.sqrt(x) * 230);

    root.style.setProperty('--h', x)
    //    hue.innerHTML = `${x=null ? 255: x}`;
});

// End of background color styling

const key = "f3d6535acf9e0afa59403265ef2f8392"

const getCoord = async (e) => {
    e.preventDefault();

    const place = e.target.location.value

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${key}`
    const res = await fetch(url)
    const coord = await res.json()
    getWeather(coord)
};

const getWeather = async (coord) => {
    const place = coord[0].name
    const lat = coord[0].lat
    const lon = coord[0].lon

    console.log(place, lat, lon)

    let req = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
    const resu = await fetch(req)
    const data = await resu.json();

    console.log(data)
    console.log(data.name)
    console.log('Feels Like: ', data.main.feels_like)

    render(data)

};

const form = document.getElementById('locationSearch');
form.addEventListener('submit', getCoord)


// THIS GETS THE USERS LOCATION & WEATHER =============================================================
function getLocation() {
    return new Promise(function (resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject("Geolocation is not supported.");
        }
    });
}

function showPosition(position) {
    var userlatitude = position.coords.latitude;
    var userlongitude = position.coords.longitude;
    userWeather(userlatitude, userlongitude)
}
//   console.log("Latitude: " + latitude);
//   console.log("Longitude: " + longitude);


getLocation().then(showPosition).catch(function (error) { console.log(error) });

const userWeather = async (userlatitude, userlongitude) => {
    let req = `https://api.openweathermap.org/data/2.5/weather?lat=${userlatitude}&lon=${userlongitude}&appid=${key}&units=imperial`
    const resu = await fetch(req)
    const data = await resu.json()

    console.log(data)
    console.log(data.name)
    console.log('Feels Like: ', data.main.feels_like)

    // These target the <p> tags in the current weather bar
    let userTemp = document.body.children[1].children[0].children[1].children[1]
    let userFeelsLike = document.body.children[1].children[0].children[2].children[1]
    let userCondition = document.body.children[1].children[0].children[3].children[1]
    let userWindSpeed = document.body.children[1].children[0].children[4].children[1]
    let userHumidity = document.body.children[1].children[0].children[5].children[1]
    userTemp.innerHTML = `${data.main.temp} ˚F`
    userFeelsLike.innerHTML = `${data.main.feels_like} ˚F`
    userCondition.innerHTML = `${data.weather[0].main}`
    userWindSpeed.innerHTML = `${data.wind.speed} mph`
    userHumidity.innerHTML = `${data.main.humidity}%`


}

// console.log(document.body.children[1].children[0].children, 'here')

//END OF USER SPECIFIC WEATHER =============================================================

//<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">


const visiPercent = (num) => {
    return ((num * 100) / 10)
}

const container = document.querySelector('.weather')

const render = (data) => {
    container.innerHTML = ''
    let newHTML
    if (data) {
        try {
            newHTML = document.createElement('div')
            newHTML.innerHTML = `
            <div class="main">

        <div class="container">
            <div class="mainStats">
                <div style="margin-bottom: 50px; white-space: nowrap; border-style: none none solid none;">
                    <h4>${data.name}</h5>
                </div>
                <div>
                    <h5>Current Temp</h5>
                    <p>${data.main.temp} ˚F</p>
                </div>
                <div>
                    <h5>Feels Like</h5>
                    <p>${data.main.feels_like} ˚F</p>
                </div>
                <div>
                    <h5>Condition</h5>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
                    <p>${data.weather[0].main}</p>
                </div>

                <div>
                    <h5>Wind Speed</h5>
                    <p>${data.wind.speed} mph</p>
                </div>
            </div>

            <div>
                <div class="box">
                    <div class="circle" data-dots="100" data-percent="${data.main.humidity}" style="--bgColor: #ff0070"></div>
                    <div class="text">
                        <h2>${data.main.humidity}%</h2>
                        <h6>Humidity</small>
                    </div>
                </div>

                <div class="box">
                    <div class="circle" data-dots="100" data-percent="70" style="--bgColor: #0f0"></div>
                    <div class="text">
                        <h2>${data.clouds.all}%</h2>
                        <h6>Cloud Cover</small>
                    </div>
                </div>

                <div class="box">
                    <div class="circle" data-dots="100" data-percent="${visiPercent(data.visibility)}" style="--bgColor: #52a8ff"></div>
                    <div class="text">
                        <h2>${data.visibility}%</h2>
                        <h6>Visibility</small>
                    </div>
                </div>
            </div>

        </div>
    </div>
            `
        }
        catch {
            newHtml = document.createElement('h2')
            newHtml.innerText = "something isn't right..."
        }
    }
    container.append(newHTML);
}

