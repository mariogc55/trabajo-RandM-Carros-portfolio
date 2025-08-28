document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const main = document.getElementById('personaje-detalle');

    // Construye la URL de la API para obtener los detalles del personaje completo
    const apiUrl = `https://rickandmortyapi.com/api/character/${id}`;

    fetch(apiUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error('Error al obtener los datos del personaje.');
            }
            return res.json();
        })
        .then(personaje => {
            // Mostrar los datos principales del personaje
            main.innerHTML = `
                <div class="detalle-card">
                    <img src="${personaje.image}" alt="Imagen de ${personaje.name}" class="imagen-detalle">
                    <h2>${personaje.name}</h2>
                    <p><strong>Especie:</strong> ${personaje.species}</p>
                    <p><strong>Estado:</strong> ${personaje.status}</p>

                    <div class="episodios-detalle">
                        <p><strong>Episodios en los que aparece:</strong></p>
                        <ul class="lista-episodios-detalle"></ul>
                    </div>
                </div>
            `;

            // Obtener y mostrar los nombres de los episodios
            const listaEpisodios = document.querySelector('.lista-episodios-detalle');
            
            // Usar Promise.all para cargar todos los episodios en paralelo
            const episodePromises = personaje.episode.map(episodeUrl =>
                fetch(episodeUrl).then(res => res.json())
            );

            Promise.all(episodePromises)
                .then(episodesData => {
                    episodesData.forEach(episode => {
                        const listItem = document.createElement('li');
                        listItem.textContent = episode.name;
                        listaEpisodios.appendChild(listItem);
                    });
                })
                .catch(error => {
                    console.error('Error al cargar episodios:', error);
                    listaEpisodios.innerHTML = '<li>Error al cargar los episodios.</li>';
                });
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
            main.innerHTML = '<p>No se encontraron datos del personaje.</p>';
        });
});