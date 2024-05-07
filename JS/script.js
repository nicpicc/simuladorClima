// Lógica de inicio de sesión al cargar la página
const login = () => {
    currentUser = User('Juan', 'Ciudad de México', 'neutral', 'neutral', 'neutral');
    setupEventListeners(); // Configurar oyentes de eventos después del inicio de sesión
    simulateWeather(); // Simular clima automáticamente al iniciar sesión
};

// Función para configurar oyentes de eventos en los controles de simulación
const setupEventListeners = () => {
    const simulateButton = document.querySelector('button');
    simulateButton.addEventListener('click', () => {
        // Evento al hacer clic en el botón de simulación
        simulateWeather(); // Simular clima al hacer clic en el botón
    });

    const temperatureRange = document.getElementById('temperature');
    temperatureRange.addEventListener('input', () => {
        // Evento al cambiar el valor de la temperatura
        console.log('Nueva temperatura seleccionada:', temperatureRange.value);
    });

    const humidityRange = document.getElementById('humidity');
    humidityRange.addEventListener('input', () => {
        // Evento al cambiar el valor de la humedad
        console.log('Nueva humedad seleccionada:', humidityRange.value);
    });

    const windRange = document.getElementById('wind');
    windRange.addEventListener('input', () => {
        // Evento al cambiar el valor de la velocidad del viento
        console.log('Nueva velocidad del viento seleccionada:', windRange.value);
    });
};

// Función para simular el clima y mostrar resultados en la interfaz
const simulateWeather = () => {
    // Obtener los valores de los controles de simulación
    const temperature = parseInt(document.getElementById('temperature').value);
    const humidity = parseInt(document.getElementById('humidity').value);
    const wind = parseInt(document.getElementById('wind').value);

    // Realizar simulaciones de clima...
    // (Código existente para simular el clima y agregar al historial)

    // Mostrar imágenes animadas de cada simulación en la interfaz
    const historyDisplay = document.querySelector('.history');
    historyDisplay.innerHTML = ''; // Limpiar el historial antes de mostrar las simulaciones

    weatherHistory.forEach((simulation, index) => {
        const simulationInfo = document.createElement('div');
        simulationInfo.classList.add('simulation-info');
        simulationInfo.innerHTML = `
            <p>Simulación ${index + 1}:</p>
            <p>Tipo de Clima: ${simulation.type}</p>
            <p>Fecha: ${new Date(simulation.timestamp).toLocaleDateString()}</p>
        `;
        historyDisplay.appendChild(simulationInfo);

        // Generar y mostrar la imagen animada de la simulación
        generateAnimatedImage(simulation);
    });

    // Mostrar las simulaciones en la interfaz (si es necesario)
    console.log('Simulaciones de clima mostradas en la interfaz.');
};

// Llamar a la función de login al cargar la página
login();
