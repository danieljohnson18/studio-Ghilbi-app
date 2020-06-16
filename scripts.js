const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class','container')

app.appendChild(logo)
app.appendChild(container)

var request = new XMLHttpRequest();

request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

request.onload = function(){
    var data = JSON.parse(this.response)

    if(request.status >= 200 && request.status < 400){
        data.forEach(movie => {
            console.log(movie.title)
            console.log(movie.description)

            //Create a div with a card class
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            //create an h1 and set the context to the film's title
            const h1 = document.createElement('h1')
            h1.textContent = movie.title

            // Create a p and set the text content to the film's description
            const p = document.createElement('p')
            movie.description = movie.description.substring(0, 300)

            p.textContent = `${movie.description}...`

            container.appendChild(card)

            card.appendChild(h1)
            card.appendChild(p)
        })
    } else{
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }

    
}

request.send()