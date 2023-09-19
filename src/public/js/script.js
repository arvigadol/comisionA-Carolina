const contenedor = document.getElementById('container-row')
const btnNuevaPublicacion = document.getElementById('btn-new')
const miModal = new bootstrap.Modal(document.getElementById('miModal'))
const btnSave = document.getElementById('btn-save');
const form = document.getElementById('formulario');

let option = ''
let idForm = ''

const inputTitle = document.getElementById('inputTitle')
const inputContent = document.getElementById('inputContent')
const inputUrl_image = document.getElementById('inputUrl_image')

//Este es el botón Nueva Publicación. Utiliza el mismo modal que el Editar del article, por eso le pedimos al btnSave que le ponga el textcontent Publicar. Aún no se conecta con la base de datos, esto es sólo para mostrar el formulario y que aparezca vacío cada vez que se abre
btnNuevaPublicacion.addEventListener('click', () => {
    option = "new"
    inputTitle.value = ""
    inputContent.value = ""
    inputUrl_image.value = ""
    btnSave.textContent = '¡Publicar!';
    miModal.show()
})

document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-delete')) {
        const article = event.target.closest('.mb-3')
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
            fetch(`http://localhost:3000/api/posteos/${idArticle}`, {
                method: 'DELETE'
            }).then(res => {
                if (res.ok) {

            Swal.fire(
            '¡Listo!',
            'Tu publicación fue eliminada',
            'success'
            )
                article.remove()
                    
                }
            }).catch (error => {
                console.error(error)
            })
        }
        })
    }
})

//Este es el botón Editar del article. Utiliza el mismo modal que el Nueva Publicación, por eso le pedimos al btnSave que le ponga el textcontent Editar. Esto muestra lo que se ingresó en la publicación anterior y permite editar el contenido de cada input
document.addEventListener('click', (event) => {
    if (event.target.matches('#btn-edit')) {
        const article = event.target.closest('.mb-3')

        const idArticle = article.dataset.id;
        const url_imageEdit = article.children[0].children[0].children[0].src;
        const titleEdit = article.children[0].children[1].children[0].children[2].textContent;
        const contentEdit = article.children[0].children[1].children[0].children[3].textContent;

        
        idForm = idArticle;
        inputTitle.value = titleEdit;
        inputContent.value = contentEdit;
        inputUrl_image.value = url_imageEdit; 
               
        option = 'edit';
        btnSave.textContent = 'Editar';
        miModal.show();
    }
});
//El formulario escucha el evento submit. Dado que se usa el mismo modal (formulario) tanto para la publicación nueva como para editar una publicación anterior, entonces se llama a este modal desde dos botones distintos, es por ello que utilizamos las opciones new y edit, dependiendo de qué estemos haciendo va a pasar una cosa o la otra. Acá se conecta con la base de datos mediante fetch
form.addEventListener('submit',(event) => {
    event.preventDefault();
//Acá se realiza una nueva publicación, al apretar el botón Publicar, la option=new la seteamos en el botón btnNuevaPublicacion cuando escucha el click. Acá se conecta con la base de datos. Luego, muestra la alerta correspondiente.
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
                Swal.fire({
                    icon: 'success',
                    title: '¡Publicación creada!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    miModal.hide();
                    location.reload();
                })
            }
        }).catch(error => {
            console.error(error);
        })
    }
//Acá se edita una publicación anterior, en el article, apretando el botón Editar y se conecta con la base de datos. La option=edit la seteamos cuando pusimos al documento a escuchar el evento click, en caso de que el mismo coincida con el id='#btn-edit'. Luego, muestra la alerta correspondiente.
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
                Swal.fire({
                    title: '¡Publicación modificada!',
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                    `
                }).then(() => {
                    miModal.hide();
                    location.reload();
                })
            }
        }).catch(error => {
            console.error(error);
        })
    }
});


