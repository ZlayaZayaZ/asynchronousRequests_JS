const loader = document.querySelector('.loader')
const items = document.getElementById('items')

let xhr = new XMLHttpRequest()
xhr.addEventListener('readystatechange', (event) => {
    event.preventDefault()

    if (xhr.readyState === xhr.DONE) {
        loader.classList.toggle('loader_active')
        let result = JSON.parse(xhr.responseText)
        let valutes = result.response.Valute

        for (let key in valutes) {
            let item  = document.createElement('div')
            items.appendChild(item)
            item.outerHTML = `
                <div class="item">
                    <div class="item__code">
                        ${valutes[key].CharCode}
                    </div>
                    <div class="item__value">
                        ${valutes[key].Value}
                    </div>
                    <div class="item__currency">
                        руб.
                    </div>
                </div>
            `
        }
    }
})

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses')
xhr.send()