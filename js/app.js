const container = document.querySelector('.container');
const result = document.querySelector('#resultado');
const form = document.querySelector('#formulario');

window.addEventListener('load', () => {
  form.addEventListener('submit', searchWeather)
})

function searchWeather(e) {
  e.preventDefault();

  const city = document.querySelector('#ciudad').value;
  const country = document.querySelector('#pais').value;

  if(city === '' || country === '') {
    showMessageError('Ambos campos son obligatorios');
    return;
  }
  form.reset();
  consultAPI(city,country);
}

function showMessageError(message) {
  const alert = document.querySelector('.alert');
  if(!alert) {
    const alertMessage = document.createElement('div');

    alertMessage.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center','alert');
  
    alertMessage.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block">${message}</span>
    `;
    container.appendChild(alertMessage);

    setTimeout(() => {
      alertMessage.remove();
    }, 3000);
  }
}

function consultAPI(city,country) {
  const appID = 'f40b5e1e8668ed9a834fc6740ef1a09f';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`;
  Spinner();
  fetch(URL)
  .then(response => response.json())
    .then(data => {
      cleanHTML();
      if(data.cod === "404") {
        showMessageError('Cuidad no encontrada :(');
        return;
      }
      showWeather(data);
    })
}

function showWeather(data) {
  const { name, main: { temp, temp_max, temp_min } } = data;
  const celsius = kelvinToCelsius(temp);
  const maxTemp = kelvinToCelsius(temp_max);
  const minTemp = kelvinToCelsius(temp_min);

  const cityName = document.createElement('p');
  cityName.classList.add('font-bold','text-2xl');
  cityName.textContent = `Clima en ${name}`;

  const actualTemperature = document.createElement('p');
  actualTemperature.innerHTML = `${celsius} &#8451`;
  actualTemperature.classList.add('font-bold','text-6xl');

  const maxTemperature = document.createElement('p');
  maxTemperature.innerHTML = `Max: ${maxTemp} &#8451`;
  maxTemperature.classList.add('text-xl');

  const minTemperature = document.createElement('p');
  minTemperature.innerHTML = `Min: ${minTemp} &#8451`;
  minTemperature.classList.add('text-xl');
  
  const resultDiv = document.createElement('div');
  resultDiv.classList.add('text-center','text-white');
  resultDiv.appendChild(cityName);
  resultDiv.appendChild(actualTemperature);
  resultDiv.appendChild(maxTemperature);
  resultDiv.appendChild(minTemperature);

  result.appendChild(resultDiv);
}

const kelvinToCelsius = degrees => parseInt(degrees - 273.15);

function Spinner() {
  cleanHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;
  result.appendChild(divSpinner);
}

function cleanHTML() {
  while(result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

