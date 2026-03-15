const apiKey = "3f7d40dfa207885e8db8145b75c166f4";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("city");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const icon = document.getElementById("icon");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const toggleBtn = document.getElementById("toggleTemp");

let currentTemp = 0;
let isCelsius = true;


/* Fetch Weather */

async function getWeather(city){

try{

loading.style.display="block";
error.textContent="";

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

updateUI(data);

}catch(err){

error.textContent="City not found. Please try again.";

}

loading.style.display="none";

}


/* Update UI */

function updateUI(data){

cityName.textContent = data.name;

currentTemp = data.main.temp;

temperature.textContent = `${Math.round(currentTemp)}°C`;

condition.textContent = data.weather[0].description;

humidity.textContent = data.main.humidity + "%";

wind.textContent = data.wind.speed + " km/h";

feelsLike.textContent = Math.round(data.main.feels_like) + "°C";

icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

changeBackground(data.weather[0].main);

}


/* Weather Background */

function changeBackground(weather){

if(weather==="Clear"){
document.body.style.background="linear-gradient(135deg,#fceabb,#f8b500)";
}

else if(weather==="Rain"){
document.body.style.background="linear-gradient(135deg,#4b79a1,#283e51)";
}

else if(weather==="Clouds"){
document.body.style.background="linear-gradient(135deg,#bdc3c7,#2c3e50)";
}

else if(weather==="Snow"){
document.body.style.background="linear-gradient(135deg,#e6dada,#274046)";
}

else{
document.body.style.background="linear-gradient(135deg,#4facfe,#00f2fe)";
}

}


/* Search */

searchBtn.addEventListener("click",()=>{
getWeather(cityInput.value);
});

cityInput.addEventListener("keypress",(e)=>{
if(e.key==="Enter"){
getWeather(cityInput.value);
}
});


/* Temperature Toggle */

toggleBtn.addEventListener("click",()=>{

if(isCelsius){

let f = (currentTemp * 9/5) + 32;

temperature.textContent = `${Math.round(f)}°F`;

toggleBtn.textContent = "Switch to °C";

isCelsius=false;

}else{

temperature.textContent = `${Math.round(currentTemp)}°C`;

toggleBtn.textContent = "Switch to °F";

isCelsius=true;

}

});


/* Default City */

getWeather("Pune");