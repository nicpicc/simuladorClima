const fs = require('fs'); // Importar módulo 'fs' para operaciones de archivo en Node.js

// Ruta al archivo JSON donde se almacenarán los datos
const jsonFilePath = './data/weather_history.json';

// Función para guardar el historial de simulaciones en el archivo JSON
function saveWeatherHistoryToFile() {
    const data = {
        user: {
            name: currentUser.name,
            city: currentUser.city,
            temperaturePreference: currentUser.temperaturePreference,
            humidityPreference: currentUser.humidityPreference,
            windPreference: currentUser.windPreference
        },
        simulations: weatherHistory
    };

    const jsonData = JSON.stringify(data, null, 2);

    try {
        fs.writeFileSync(jsonFilePath, jsonData);
        console.log('Historial de simulaciones guardado correctamente en el archivo JSON.');
    } catch (err) {
        console.error('Error al guardar el historial de simulaciones:', err);
    }
}

// Función para cargar el historial de simulaciones desde el archivo JSON al iniciar la aplicación
function loadWeatherHistoryFromFile() {
    try {
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        const parsedData = JSON.parse(jsonData);

        // Cargar información del usuario desde el archivo JSON
        currentUser = new User(
            parsedData.user.name,
            parsedData.user.city,
            parsedData.user.temperaturePreference,
            parsedData.user.humidityPreference,
            parsedData.user.windPreference
        );

        // Cargar historial de simulaciones desde el archivo JSON
        weatherHistory = parsedData.simulations;

        console.log('Historial de simulaciones cargado correctamente desde el archivo JSON.');
    } catch (err) {
        console.error('Error al cargar el historial de simulaciones:', err);
        // Si ocurre un error al cargar, se utilizará un historial vacío por defecto
        weatherHistory = [];
    }
}

// Llamada a la función para cargar el historial de simulaciones al iniciar la aplicación
loadWeatherHistoryFromFile();

// Función para simular el clima y guardar el historial actualizado en el archivo JSON
function simulateWeather() {
    // Realizar simulaciones de clima...
    // (Código existente para simular el clima y agregar al historial)

    // Guardar el historial de simulaciones en el archivo JSON después de cada simulación
    saveWeatherHistoryToFile();

    // Mostrar las simulaciones en la interfaz (si es necesario)
    displayWeatherHistory();
}



// Función constructora para el objeto User
function User(name, city, tempPreference, humidityPreference, windPreference) {
    this.name = name;
    this.city = city;
    this.temperaturePreference = tempPreference;
    this.humidityPreference = humidityPreference;
    this.windPreference = windPreference;
}

// Función constructora para el objeto WeatherReport
function WeatherReport(temperature, humidity, wind, type, timestamp) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.wind = wind;
    this.type = type;
    this.timestamp = timestamp;
}

// Variables globales
let weatherHistory = [];
let currentUser; // Variable para almacenar el usuario actual

// Función de inicio de sesión
function login() {
    // Solicitar al usuario que ingrese su nombre
    const name = prompt("Bienvenido al Simulador de Clima. Por favor, ingrese su nombre:");

    // Solicitar al usuario que ingrese su ciudad
    const city = prompt(`Hola ${name}! Por favor, ingrese su ciudad:`);

    // Solicitar preferencias de clima al usuario
    const tempPreference = prompt(`Hola ${name}! ¿Cuál es su preferencia de temperatura? (frío, neutral, caliente)`);
    const humidityPreference = prompt(`¿Y su preferencia de humedad? (seco, neutral, húmedo)`);
    const windPreference = prompt(`¿Y su preferencia de velocidad del viento? (baja, neutral, alta)`);

    // Crear instancia de User con la información del usuario y preferencias
    currentUser = new User(name, city, tempPreference, humidityPreference, windPreference);

    // Mostrar mensaje de bienvenida personalizado
    alert(`Bienvenido ${name}! Estás en ${city}. Comencemos a simular el clima.`);
}

// Función para simular el clima
function simulateWeather() {
    // Verificar si el usuario ha iniciado sesión
    if (!currentUser) {
        alert("Por favor, inicia sesión para continuar.");
        login(); // Volver a solicitar el inicio de sesión si no hay información de usuario
        return;
    }

    // Limpiar el historial antes de cada simulación
    weatherHistory = [];

    // Simular múltiples condiciones climáticas usando un ciclo for
    const numberOfSimulations = 5; // Número de simulaciones a realizar

    for (let i = 0; i < numberOfSimulations; i++) {
        // Obtener valores de simulación
        const temperature = getRandomValue(-10, 40); // Ejemplo: temperatura aleatoria entre -10 y 40
        const humidity = getRandomValue(0, 100); // Ejemplo: humedad aleatoria entre 0 y 100
        const wind = getRandomValue(0, 50); // Ejemplo: velocidad del viento aleatoria entre 0 y 50
        const weatherType = determineWeatherType(temperature, humidity); // Determinar tipo de clima

        // Crear instancia de WeatherReport y agregar al historial
        const timestamp = new Date().toLocaleString();
        const report = new WeatherReport(temperature, humidity, wind, weatherType, timestamp);
        weatherHistory.push(report);
    }

    // Mostrar todas las simulaciones en la interfaz
    displayWeatherHistory();
}

// Función auxiliar para generar un valor aleatorio dentro de un rango
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para determinar el tipo de clima según temperatura y humedad
function determineWeatherType(temperature, humidity) {
    if (temperature > 30 && humidity > 50) {
        return "Caluroso y húmedo";
    } else if (temperature > 25 && humidity < 30) {
        return "Soleado y seco";
    } else if (temperature < 5) {
        return "Frío y nevado";
    } else {
        return "Moderado";
    }
}

// Función para mostrar el historial de simulaciones en la interfaz
function displayWeatherHistory() {
    const historyDisplay = document.querySelector('.history');
    historyDisplay.innerHTML = '';

    weatherHistory.forEach((report, index) => {
        const simulationInfo = `
            <div class="simulation-info">
                <p>Simulación ${index + 1}:</p>
                <p>Temperatura: ${report.temperature}°C</p>
                <p>Humedad: ${report.humidity}%</p>
                <p>Viento: ${report.wind} km/h</p>
                <p>Tipo de Clima: ${report.type}</p>
                <p>Fecha y Hora: ${report.timestamp}</p>
            </div>
        `;
        historyDisplay.innerHTML += simulationInfo;
    });
}

// Llamar a la función de inicio de sesión al cargar la página
login();
