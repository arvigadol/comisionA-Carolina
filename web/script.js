const contenedor = document.getElementById('container-row')
const btnCrear = document.getElementById('btn-new')
const miModal = new bootstrap.Modal(document.getElementById('miModal'))
const btnSave = document.getElementById('btn-save');
const form = document.getElementById('formulario');
// const btnEdit = document.getElementById('btn-edit')
// const btnDelete = document.getElementById('btn-delete')

let html = ''
let option = ''
let idForm = ''

const inputTitle = document.getElementById('inputTitle')
const inputContent = document.getElementById('inputContent')
const inputUrl_image = document.getElementById('inputUrl_image')

btnCrear.addEventListener('click', () => {
    option = "new"
    btnSave.textContent = "Publicar!"
    inputTitle.value = ""
    inputContent.value = ""
    inputUrl_image.value = ""
    miModal.show()
})

document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-delete')) {
        const article = event.target.closest('.container-fluid')
        const idArticle = article.dataset.id
        
        Swal.fire({
            title: '¿Estás segurx?',
            text: "¡No habrá vuelta atrás!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                '¡Listo!',
                'Tu publicación fue eliminada',
                'success'
              )
            }
          })

        fetch(`http://localhost:3000/api/posteos/${idArticle}`, {
            method: 'DELETE'
        }).then(res => {
            if (res.ok) {
                article.remove()
            }
        }).catch (error => {
            console.error(error)
        })
    }
})

// document.addEventListener('click', (event) => {
//     if (event.target.matches('#btn-delete')) {
//         const article = event.target.closest('.container-fluid')
//         const idArticle = article.dataset.id

//         fetch(`http://localhost:3000/api/posteos/${idArticle}`, {
//             method: 'DELETE'
//         }).then(res => {
//             if (res.ok) {
//                 article.remove()
//             }
//         }).catch (error => {
//             console.error(error)
//         })
//     }
// })

document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-edit')) {
        const article = event.target.closest('.container-fluid')

        const idArticle = article.dataset.id;
        const url_imageEdit = article.children[0].children[0].src;
        const titleEdit = article.children[0].children[1].children[0].textContent;
        const contentEdit = article.children[0].children[1].children[1].textContent;
        
        idForm = idArticle;
        inputTitle.value = titleEdit;
        inputContent.value = contentEdit;
        inputUrl_image.value = url_imageEdit;        
        option = 'edit';
        btnSave.textContent = 'Editar';
        miModal.show();
    }
});

form.addEventListener('submit',(event) => {
    event.preventDefault();

    if (option === "new") {
        const newPosteo = {
            title: inputTitle.value,
            content: inputContent.value,
            url_image: inputUrl_image.value,
        };
        fetch ('http://localhost:3000/api/posteos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPosteo),
        }).then((res) => {
            if (res.ok) {
                alert("Tarea creada con éxito");
                miModal.hide();
                location.reload();
            }
        }).catch(error => {
            console.error(error);
        })
       }

    if (option === "edit") {
        const newPosteo = {
            title: inputTitle.value,
            content: inputContent.value,
            url_image: inputUrl_image.value,
    };
    fetch(`http://localhost:3000/api/posteos/${idForm}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPosteo),
      }).then((res) => {
        if (res.ok) {
            alert("Tarea modificada con éxito");
            miModal.hide();
            location.reload();
        }
        }).catch(error => {
            console.error(error);
        })
    }
});


fetch('http://localhost:3000/api/posteos')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(posteo => {
            html+= `
            <article class="container-fluid" data-id="${posteo.id}">
                <div class="card" style="width: 30rem;">
                    <img src="${posteo.url_image}">
                    <div class="card-body">
                        <h5 class="card-title">${posteo.title}</h5>
                        <p class="card-text">${posteo.content}</p>
                        <div>
                            <button class="btn btn-secondary" id="btn-edit">Editar</button>
                            <button type="" class="btn btn-danger" id="btn-delete">Eliminar</button>
                        </div>
                    </div>
                </div>
            </article>
            `
            contenedor.innerHTML = html;
        });
        
    })