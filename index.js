//Capture DOM elements
const body = document.querySelector('.space')
const card = document.querySelector('.card')
const cardBody = document.querySelector('.card-body')
const cardTitle = document.querySelector('.card-title')
const cardText = document.querySelector('.card-text')
const readMore = document.querySelector('.card-link')

//Capture of the Nasa APOD api key
const url = 'https://api.nasa.gov/planetary/apod?api_key=uh5Hr2gPTUW6ZznWiHgghsswiDaRbO7NbymLe4bt&count='

//Capture of the count that will help generate random images on the photo of the day
const count = () => Math.floor(Math.random() * 20) + 1

//Display random images every time the page loads
window.onload = async function () {
    try {
        const response = await fetch(url + count())
        const data = await response.json()
        render(data)
    } catch (error) {
        console.error('Error:', error)
    }
}



//Function to update the DOM with the data captured
function render(data) {
    body.innerHTML = ' '
    card.innerHTML = ' '

    //Display the data on the DOM
    data.forEach(element => {
        //Adding the card to the Dom
        const card = document.createElement('div')
        card.classList.add('card')
        card.style = "width: 18rem;"
        body.append(card)

        //Adding the image to the card
        const image = document.createElement('img')
        image.src = element.url
        image.alt = element.title
        card.append(image)

        //Creating the card body and adding it to the card
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        //Getting the card title
        const cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title')
        cardTitle.textContent = element.title
        cardBody.append(cardTitle)

        //Getting the descritpion
        const cardText = document.createElement('p')
        cardText.classList.add("card-text")
        cardText.textContent = element.explanation.substring(0, 300) + "......"
        cardBody.append(cardText)

        //Getting the card link
        const cardLink = document.createElement('a')
        cardLink.href = "#"
        cardLink.classList.add('card-link')
        cardLink.textContent = "Read more"
        cardBody.append(cardLink)

        //Adding the card elements to the card
        card.append(cardBody)

    });
}

