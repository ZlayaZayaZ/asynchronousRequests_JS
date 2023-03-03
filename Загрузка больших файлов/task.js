const progress = document.getElementById("progress")
const form = document.getElementById('form')

form.onsubmit = function(e) {
    e.preventDefault();
    let file = document.getElementById('file').files[0];
    
    if (file) {
        upload(file);
    }
}

function upload(file) {
    let ajax = new XMLHttpRequest();
    ajax.upload.onprogress = function(event) {
        let div = document.createElement('div')
        form.appendChild(div)
        div.outerHTML = `
        <div class="status_text size_text">
            ${event.loaded} из ${event.total} МБ
        </div>
        `
        progress.value = event.loaded / event.total;
    }

    ajax.onload = ajax.onerror = function() {
        if (this.status == 201) {
            alert('Файл успешно загружен')
        } else {
            alert('Не удалось загрузить файл')
        }
    }

    var formData = new FormData();
    formData.append("file", file);
    
    ajax.open("POST", "https://students.netoservices.ru/nestjs-backend/upload", true);
    ajax.send(formData);
}