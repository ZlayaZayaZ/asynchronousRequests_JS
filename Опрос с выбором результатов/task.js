const pollAnswers = document.getElementById('poll__answers')
const pollTitle = document.getElementById('poll__title')

const xhr = new XMLHttpRequest()
request(xhr, 'GET', 'https://students.netoservices.ru/nestjs-backend/poll')

xhr.addEventListener('readystatechange', (event) => {
    event.preventDefault()

    if (xhr.readyState === xhr.DONE) {
        let result = JSON.parse(xhr.responseText)
        let title = result.data.title
        pollTitle.textContent = title
        let answers = result.data.answers

        for (let key in answers) {
            let button  = document.createElement('button')
            pollAnswers.appendChild(button)
            button.outerHTML = `
            <button class="poll__answer" data-id="${key}">
                ${answers[key]}
            </button>
            `
        }

        let btns = document.querySelectorAll('button')
        btns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                alert( "Спасибо, ваш голос засчитан!" )
                // location.reload()

                const xhrStatistics = new XMLHttpRequest()
                options = {'vote': result.id, 'answer': btn.dataset.id}
                request(xhrStatistics, 'POST', 'https://students.netoservices.ru/nestjs-backend/poll', options)

                xhrStatistics.addEventListener('readystatechange', (event) => {
                    event.preventDefault()

                    if (xhrStatistics.readyState === xhrStatistics.DONE) {
                        let resultStatistics = JSON.parse(xhrStatistics.responseText)
                        let stat = resultStatistics.stat
                        let ArrVotes = []

                        for (let key in stat) {
                            ArrVotes.push(stat[key].votes)
                        }
                        let totalVotes = ArrVotes.map(i=>x+=i, x=0).reverse()[0]
                        pollAnswers.textContent = ''

                        for (let key in stat) {
                            let div  = document.createElement('div')
                            pollAnswers.appendChild(div)
                            div.outerHTML = `
                            <div class="poll__answer__stat">
                                ${stat[key].answer} : ${(Number(stat[key].votes) / totalVotes * 100).toFixed(2)} %
                            </div>
                            `
                        }
                    }
                })
            })    
        })
    }
})

function request(obj, method, url, options) {
    obj.open(method, url)
    
    if (options) {
        obj.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' )
        let optionsString = ''
        for (let key in options) {
            optionsString += `${key}=${options[key]}&`
        }
        obj.send( optionsString.slice(0, -1) )
    } else {
    obj.send()
    }
}