document.addEventListener('DOMContentLoaded', () => {
    let personajes = [];

    const form = document.getElementById('characterForm');
    const characterList = document.getElementById('characterList');
    const idInput = document.getElementById('characterId');

    // Guardar Personaje
    document.getElementById('guardar').addEventListener('click', () => {
        const personaje = {
            id: idInput.value || Date.now(),
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            genero: document.getElementById('genero').value,
            tipoSangre: document.getElementById('tipoSangre').value,
            imagen: URL.createObjectURL(document.getElementById('imagen').files[0])
        };

        if (idInput.value) {
            // Usando splice() para actualizar el personaje en el array
            const index = personajes.findIndex(p => p.id == personaje.id);
            if (index !== -1) {
                personajes.splice(index, 1, personaje);

                // Mostrar alerta de éxito al editar el personaje
                Swal.fire({
                    title: '¡Personaje actualizado!',
                    text: 'Los cambios se han guardado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            idInput.value = '';
        } else {
            personajes.push(personaje);

            // Mostrar alerta de éxito al guardar un nuevo personaje
            Swal.fire({
                title: '¡Personaje guardado!',
                text: 'El personaje se ha guardado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }

        form.reset();
    });

    // Listar Personajes
    document.getElementById('listar').addEventListener('click', () => {
        characterList.innerHTML = '';
        personajes.forEach(p => {
            const card = document.createElement('div');
            card.classList.add('character-card');
            
            card.innerHTML = `
                <img src="${p.imagen}" alt="${p.nombre} ${p.apellido}">
                <h3>ID: ${p.id}</h3>
                <h3>${p.nombre} ${p.apellido}</h3>
                <p>Edad: ${p.edad}</p>
                <p>Género: ${p.genero}</p>
                <p>Tipo de Sangre: ${p.tipoSangre}</p>
            `;
            characterList.appendChild(card);
        });
    });

    // Editar Personaje
    document.getElementById('editar').addEventListener('click', () => {
        const id = prompt("Ingresa el ID del personaje que deseas editar:");
        const personaje = personajes.find(p => p.id == id);

        if (personaje) {
            idInput.value = personaje.id;
            document.getElementById('nombre').value = personaje.nombre;
            document.getElementById('apellido').value = personaje.apellido;
            document.getElementById('edad').value = personaje.edad;
            document.getElementById('genero').value = personaje.genero;
            document.getElementById('tipoSangre').value = personaje.tipoSangre;
        } else {
            alert("Personaje no encontrado");
        }
    });
});

