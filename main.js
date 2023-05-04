
// console.log(document.body.children)

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

// End of background colorstyling


// Renders the percentage points inside speedometers
const renderPoints = () => {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(elem => {
        var dots = elem.getAttribute('data-dots')
        var marked = elem.getAttribute('data-percent')
        var percent = Math.floor(dots*marked/100);
        var rotate = 360/dots;
        var points = "";

        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i: ${i}; --rot: ${rotate}deg"></div>`;      
        }
        elem.innerHTML = points;

        const pointsMarked = elem.querySelectorAll('.points');
        for (let i = 0; i < percent; i++) {
            pointsMarked[i].classList.add('marked')
        }

    })
}

// Populate user's search results
const render = (data) => {

    if (data) {
        try {
            let location = document.body.children[2].children[0].children[0].children[0].children[0]
            let userTemp = document.body.children[2].children[0].children[0].children[1].children[1]
            let userFeelsLike = document.body.children[2].children[0].children[0].children[2].children[1]
            let userConditionIcon = document.body.children[2].children[0].children[0].children[3].children[1]
            let userCondition = document.body.children[2].children[0].children[0].children[3].children[2]
            let userWindSpeed = document.body.children[2].children[0].children[0].children[4].children[1]
            // let userHumidity = document.querySelector('humidCircle')
            location.innerHTML = `${data.name}`
            userTemp.innerHTML = `${data.main.temp} ˚F`
            userFeelsLike.innerHTML = `${data.main.feels_like} ˚F`
            userConditionIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">`
            userCondition.innerHTML = `${data.weather[0].main}`
            userWindSpeed.innerHTML = `${data.wind.speed} mph`
            // userHumidity.setAttribute('data-percent', data.main.humidity)

            circleData = document.querySelector('.circleContainer')
            circleData.innerHTML = `
            <div class="box">
            <div class="circle humidCircle" data-dots="100" data-percent="${data.main.humidity}" style="--bgColor: #ff0070"></div>
            <div class="text">
                <h2>${data.main.humidity}%</h2>
                <h6>Humidity</small>
            </div>
        </div>

        <div class="box">
            <div class="circle" id="cloudCircle" data-dots="100" data-percent="${data.clouds.all}" style="--bgColor: #0f0"></div>
            <div class="text">
                <h2>${data.clouds.all}%</h2>
                <h6>Cloud Cover</h6>
            </div>
        </div>

        <div class="box">
            <div class="circle" id="visiCircle" data-dots="100" data-percent="${data.visibility * 100 / 10000}" style="--bgColor: #52a8ff"></div>
            <div class="text">
                <h2>${data.visibility * 100 / 10000}%</h2>
                <h6>Visibility</h6>
                <h6>${data.visibility * .001}/10km</h6>
            </div>
        </div>
        `
        
        renderPoints()
        }
        catch {
            console.log("something isn't right...")
        }
    }
    
}


const key = "f3d6535acf9e0afa59403265ef2f8392"

// GET coordinates for user's search request
const getCoord = async (e) => {
    e.preventDefault();

    const place = e.target.location.value

    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${key}`
    const res = await fetch(url)
    const coord = await res.json()
    getWeather(coord)
};

// Use coordinates from search to get weather data
const getWeather = async (coord) => {
    const place = coord[0].name
    const lat = coord[0].lat
    const lon = coord[0].lon

    console.log(place, lat, lon)

    let req = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
    const resu = await fetch(req)
    const data = await resu.json();

    // console.log(data)
    // console.log(data.name)
    // console.log('Feels Like: ', data.main.feels_like)
    // console.log(data.visibility, 'm')
    render(data)

};

// Listen for the user to submit search request
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

    // console.log(data)
    // console.log(data.name)
    // console.log('Feels Like: ', data.main.feels_like)
    // console.log(data.visibility, 'm')
    renderUser(data)

}

// render user's local weather
const renderUser = (data) => {
    if (data) {
        try {
            let location = document.body.children[2].children[0].children[0].children[0].children[0]
            let userTemp = document.body.children[2].children[0].children[0].children[1].children[1]
            let userFeelsLike = document.body.children[2].children[0].children[0].children[2].children[1]
            let userConditionIcon = document.body.children[2].children[0].children[0].children[3].children[1]
            let userCondition = document.body.children[2].children[0].children[0].children[3].children[2]
            let userWindSpeed = document.body.children[2].children[0].children[0].children[4].children[1]
            userTemp.innerHTML = `${data.main.temp} ˚F`
            userFeelsLike.innerHTML = `${data.main.feels_like} ˚F`
            userConditionIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">`
            userCondition.innerHTML = `${data.weather[0].main}`
            userWindSpeed.innerHTML = `${data.wind.speed} mph`

            circleData = document.querySelector('.circleContainer')
            circleData.innerHTML = `
            <div class="box">
            <div class="circle" data-dots="100" data-percent="${data.main.humidity}" style="--bgColor: #ff0070"></div>
            <div class="text">
                <h2>${data.main.humidity}%</h2>
                <h6>Humidity</small>
            </div>
        </div>

        <div class="box">
            <div class="circle" data-dots="100" data-percent="${data.clouds.all}" style="--bgColor: #0f0"></div>
            <div class="text">
                <h2>${data.clouds.all}%</h2>
                <h6>Cloud Cover</small>
            </div>
        </div>

        <div class="box">
            <div class="circle" data-dots="100" data-percent="${data.visibility * 100 / 10000}" style="--bgColor: #52a8ff"></div>
            <div class="text">
                <h2>${data.visibility * 100 / 10000}%</h2>
                <h6>Visibility</h6>
                <h6>${data.visibility * .001}/10km</h6>
            </div>
        </div>
        `
        renderPoints()
        
            
        }
        catch (err) {
            console.log(err, "Something isn't working...")
        }
    }
}

// console.log(document.getElementById('humidCircle').getAttribute('data-percent'), 'here')

//END OF USER SPECIFIC WEATHER =============================================================

//<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">



// const container = document.querySelector('.weather')





