let personajes = [];

function consumoAPI() {
    const url = 'https://rickandmortyapi.com/api/character';
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            personajes = data.results;
            let main = document.querySelector('main');
            main.innerHTML = '';

            personajes.forEach(personaje => {
                const articleElement = document.createElement('article');

                const urlPersonaje = `personaje.html?id=${personaje.id}&name=${encodeURIComponent(personaje.name)}&image=${encodeURIComponent(personaje.image)}&species=${encodeURIComponent(personaje.species)}&status=${encodeURIComponent(personaje.status)}`;

                articleElement.innerHTML = `
                    <a href="${urlPersonaje}" target="_self">
                        <div class="imagen-personaje">
                            <img src="${personaje.image}" alt="Imagen de ${personaje.name}">
                        </div>
                    </a>
                    <div class="principal">
                        <p class="nombre-personaje">${personaje.name}</p>
                    </div>
                    <hr>
                    <div class="datos1">
                        <p class="estado-personaje"><img src="assets/icons/svg/bx-pulse.svg" alt="Estado">${personaje.status}</p>
                        <p class="especie-personaje"><img src="assets/icons/svg/bx-user.svg" alt="Especie">${personaje.species}</p>
                    </div>
                    
                `;
                main.appendChild(articleElement);

                // Obtener y mostrar los nombres de los episodios
                const listaEpisodios = articleElement.querySelector('.lista-episodios');
                personaje.episode.forEach(episodeUrl => {
                    fetch(episodeUrl)
                        .then(res => res.json())
                        .then(episodeData => {
                            const episodeName = episodeData.name;
                            const listItem = document.createElement('li');
                            listItem.textContent = episodeName;
                            listaEpisodios.appendChild(listItem);
                        })
                        .catch(error => console.error('Error al cargar episodio:', error));
                });
            });
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
            document.querySelector('main').innerHTML = '<p>Lo siento, no se pudieron cargar los personajes.</p>';
        });
}

// Llamar a la función para cargar los personajes
consumoAPI();