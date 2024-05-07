const fs = require('fs'); // Importar módulo 'fs' para operaciones de archivo en Node.js

// Ruta al archivo JSON donde se almacenarán los datos
const jsonFilePath = './data/weather_history.json';

// Definir funciones constructoras para objetos User y WeatherReport
function User(name, city, tempPreference, humidityPreference, windPreference) {
    this.name = name;
    this.city = city;
    this.temperaturePreference = tempPreference;
    this.humidityPreference = humidityPreference;
    this.windPreference = windPreference;
}

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
        weatherHistory = parsedData.simulations.map(simulation => new WeatherReport(
            simulation.temperature,
            simulation.humidity,
            simulation.wind,
            simulation.type,
            simulation.timestamp
        ));

        console.log('Historial de simulaciones cargado correctamente desde el archivo JSON.');
    } catch (err) {
        console.error('Error al cargar el historial de simulaciones:', err);
        // Si ocurre un error al cargar, se utilizará un historial vacío por defecto
        weatherHistory = [];
    }
}

// Llamada a la función para cargar el historial de simulaciones al iniciar la aplicación
loadWeatherHistoryFromFile();

// Función de orden superior para filtrar simulaciones
function filterSimulations(simulations, filterFunction) {
    return simulations.filter(filterFunction);
}

// Ejemplo de función de filtro: Simulaciones con temperatura superior a 25°C
function filterByTemperatureAbove25(simulation) {
    return simulation.temperature > 25;
}

// Función de orden superior para procesar simulaciones
function processSimulations(simulations, processFunction) {
    return simulations.map(processFunction);
}

// Ejemplo de función de procesamiento: Obtener tipo de clima y fecha formateada
function processSimulation(simulation) {
    return {
        type: simulation.type,
        formattedDate: new Date(simulation.timestamp).toLocaleDateString()
    };
}

// Función para simular el clima y guardar el historial actualizado en el archivo JSON
function simulateWeather() {
    // Realizar simulaciones de clima...
    // (Código existente para simular el clima y agregar al historial)

    // Guardar el historial de simulaciones en el archivo JSON después de cada simulación
    saveWeatherHistoryToFile();

    // Mostrar las simulaciones en la interfaz (si es necesario)
    displayWeatherHistory();
}

// Función para mostrar el historial de simulaciones en la interfaz
function displayWeatherHistory() {
    const historyDisplay = document.querySelector('.history');
    historyDisplay.innerHTML = '';

    processSimulations(weatherHistory, processSimulation).forEach((processedSimulation, index) => {
        const simulationInfo = `
            <div class="simulation-info">
                <p>Simulación ${index + 1}:</p>
                <p>Tipo de Clima: ${processedSimulation.type}</p>
                <p>Fecha: ${processedSimulation.formattedDate}</p>
            </div>
        `;
        historyDisplay.innerHTML += simulationInfo;
    });
}

// Lógica de inicio de sesión al cargar la página
function login() {
    currentUser = new User('Juan', 'Ciudad de México', 'neutral', 'neutral', 'neutral');
    simulateWeather(); // Simular clima automáticamente al iniciar sesión
}

// Llamar a la función de login al cargar la página
login();
