import apikey from "./config.js"
let currentLocation=document.querySelector('.curr-location')
let tempCount=document.querySelector('#curr-temp-count')
let weatherDescription=document.querySelector('.js-weather-dec')
let weatherImage=document.querySelector('#weather-image')
let minTemp=document.querySelector('.min-temp')
let maxTemp=document.querySelector('.max-temp')
let humidityCount=document.querySelector('.humidity-count')
let humidityBarValue=document.querySelector('.humidity-value')

document.querySelector('.js-search-button').addEventListener('click',getWeatherDetails)
async function getWeatherDetails(){
    const location=document.querySelector('.city-input').value
    console.log(isNaN(location))
    try{
        if(location && isNaN(location)){
            // const keyResponse = await fetch('/api/get-api-key');
            // const keyData = await keyResponse.json();
            // const api = keyData.apiKey;

            const api=apikey

            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`)
            const data= await response.json()
            console.log(data)
            if(response.status=='200'){
                UpdateWeatherDetails(data.weather[0])
                UpdateCurrentTemperature(data.main)
                UpdateCurrentLocation(data.name,data.sys.country)
                UpdateHumidity(data.main)
                UpdateWindSpeed(data.wind.speed)
            }
            alertMessage(response.status)
        }else{
            alert("Enter value")
        }
    }catch(error){
        console.log(error)
    }
}

function alertMessage(code){
    const alert=document.querySelector('#alert')
    if(code=='200'){
        alert.classList.add('alert-success')
        alert.classList.add('show')
        alert.innerHTML=`<strong>Data Fetched Successfully !</strong>`
        setTimeout(() => {
            alert.classList.remove('alert-success')
            alert.classList.remove('show');
        }, 3000);
    }else{
        alert.classList.add('alert-danger')
        alert.classList.add('show')
        alert.innerHTML=`<strong>City Not Found</strong>`
        setTimeout(() => {
            alert.classList.remove('alert-danger')
            alert.classList.remove('show');
        }, 3000);
    }
}
function UpdateCurrentLocation(cityName,country){
    currentLocation.value=`${cityName}, ${country}`
}

function UpdateCurrentTemperature(tempObj){
    tempCount.innerText=Math.floor(tempObj.temp- 273.15)
    minTemp.innerText=Math.floor(tempObj.temp_min-273.15)
    maxTemp.innerText=Math.floor(tempObj.temp_max-273.15)
    

}

function UpdateWeatherDetails(weather){
    weatherDescription.innerText=(weather.description).toUpperCase()
    weatherImage.src=`http://openweathermap.org/img/wn/${weather.icon}.png`
    const imageUrl = `images/${weather.icon}.jpg`;
    preloadImage(imageUrl).then(() => {
        // Once preloaded, set it as the background
        document.body.style.backgroundImage = `url(${imageUrl})`;
    });
}

function UpdateHumidity(tempObj){
    humidityCount.innerText=`${tempObj.humidity}%`
    let bgColor=tempObj.humidity<=30?'rgb(7, 143, 211)':tempObj.humidity>30 && tempObj.humidity<=60?'Green':'rgb(249, 98, 47)'
    humidityBarValue.style.height=`${tempObj.humidity}%`
    humidityBarValue.style.backgroundColor=bgColor
}

function UpdateWindSpeed(speed){
    let guageValueDisplay=document.querySelector('#guage-value')
    let needle=document.querySelector('.needle')
    const speedInKmh=Math.floor(speed*3.6)
    guageValueDisplay.innerText=`${speedInKmh}`
    const maxSpeed = 100;
    const rotation = (speedInKmh / maxSpeed) * 180;
    needle.style.transform=`rotate(${rotation}deg)`
}

function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = () => {
            resolve(url);
        };

        img.onerror = () => {
            reject(new Error(`Failed to load image: ${url}`));
        };
    });
}