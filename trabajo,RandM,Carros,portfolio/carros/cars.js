// Espera a que el DOM esté completamente cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {
    const carContainer = document.getElementById('car-container');
    const notFoundMessage = document.getElementById('no-encontrado');

    // Función para crear y mostrar las tarjetas de los coches en la página.
    function displayCars(cars) {
        // Limpia el contenedor para evitar duplicados.
        carContainer.innerHTML = '';
        notFoundMessage.innerHTML = '';

        if (cars.length === 0) {
            notFoundMessage.textContent = 'No se encontraron vehículos que coincidan con la búsqueda.';
            return;
        }

        cars.forEach(car => {
            const card = document.createElement('div');
            card.className = 'car-card rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105';
            
            card.innerHTML = `
                <img src="${car.imageUrl}" alt="Imagen del ${car.brand} ${car.model}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h2 class="text-xl font-bold text-gray-800">${car.brand}</h2>
                    <h3 class="text-lg text-gray-600">${car.model} (${car.year})</h3>
                    <p class="text-gray-500 mt-2 text-sm">${car.description}</p>
                </div>
            `;
            carContainer.appendChild(card);
        });
    }

    // Usamos fetch() para obtener los datos del archivo JSON.
    fetch('cars.json')
        .then(response => {
            // Verifica si la respuesta es exitosa.
            if (!response.ok) {
                throw new Error('Error al cargar los datos del archivo JSON.');
            }
            return response.json();
        })
        .then(carData => {
            // Muestra todos los vehículos al cargar la página.
            displayCars(carData);
        })
        .catch(error => {
            // Manejo de errores en caso de que la carga del JSON falle.
            console.error('Ha ocurrido un error:', error);
            notFoundMessage.textContent = 'No se pudieron cargar los datos de los vehículos. Inténtalo de nuevo más tarde.';
        });
});
