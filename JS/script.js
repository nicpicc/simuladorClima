// Array para almacenar historial de simulaciones
let weatherHistory = [];
let userName;
let userCity;

function login() {
    // Solicitar al usuario que ingrese su nombre
    userName = prompt("Bienvenido al Simulador de Clima. Por favor, ingrese su nombre:");

    // Solicitar al usuario que ingrese su ciudad
    userCity = prompt(`Hola ${userName}! Por favor, ingrese su ciudad:`);

    // Mostrar mensaje de bienvenida personalizado
    alert(`Bienvenido ${userName}! Estás en ${userCity}. Comencemos a simular el clima.`);
}


function simulateWeather() {
    // Verificar si el usuario ha iniciado sesión
    if (!userName || !userCity) {
        alert("Por favor, inicia sesión para continuar.");
        login(); // Volver a solicitar el login si no hay información de usuario
        return;
    }

    // Limpiar el historial antes de cada simulación
    weatherHistory = [];

    // Simular múltiples condiciones climáticas usando un ciclo for
    const numberOfSimulations = 5; // Número de simulaciones a realizar

    for (let i = 0; i < numberOfSimulations; i++) {
    
        // Obtener los valores de los controles
        const temperature = parseInt(document.getElementById('temperature').value);
        const humidity = parseInt(document.getElementById('humidity').value);
        const wind = parseInt(document.getElementById('wind').value);

        // Determinar el tipo de clima basado en los valores
        let weatherType;

        if (temperature > 30 && humidity > 50) {
            weatherType = "Caluroso y húmedo";
        } else if (temperature > 25 && humidity < 30) {
            weatherType = "Soleado y seco";
        } else if (temperature < 5) {
            weatherType = "Frío y nevado";
        } else {
            weatherType = "Moderado";
        }


        // Simular el clima 
        const weatherSimulation = {
            temperature: temperature,
            humidity: humidity,
            wind: wind,
            type: weatherType
        };

        // Agregar la simulación al historial
        weatherHistory.push(weatherSimulation);

        // Mostrar todas las simulaciones en la interfaz
        displayWeatherHistory();
}

function displayWeatherHistory() {
    // Obtener el elemento donde se mostrará el historial
    const historyDisplay = document.querySelector('.history');

    // Limpiar contenido previo
    historyDisplay.innerHTML = '';

    // Mostrar cada simulación en el historial
    weatherHistory.forEach((simulation, index) => {
        const simulationInfo = `
            <div class="simulation-info">
                <p>Simulación ${index + 1}:</p>
                <p>Temperatura: ${simulation.temperature}°C</p>
                <p>Humedad: ${simulation.humidity}%</p>
                <p>Viento: ${simulation.wind} km/h</p>
            </div>
        `;
        historyDisplay.innerHTML += simulationInfo;
    });
}

// Llamar a la función de login al cargar la página
login();