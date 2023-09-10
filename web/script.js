const contenedor = document.getElementById('container-row')
const btnCrear = document.getElementById('btn-new')
const miModal = new bootstrap.Modal(document.getElementById('miModal'))
const btnSave = document.getElementById('btn-save')
// const btnEdit = document.getElementById('btn-edit')
// const btnDelete = document.getElementById('btn-delete')

let html = ''
let option = ''

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
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
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