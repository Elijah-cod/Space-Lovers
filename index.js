//Capture DOM elements
const home = document.querySelector('#home')
const card = document.querySelector('.card')
const cardBody = document.querySelector('.card-body')
const cardTitle = document.querySelector('.card-title')
const cardText = document.querySelector('.card-text')
const readMore = document.querySelector('.card-link')
const apod = document.getElementById('apod')
const search = document.getElementById('search')
const input = document.getElementById('input')
const result = document.getElementById('result')

//Display random images every time the page loads
window.onload = async function () {
    //Capture of the Nasa Count api key
    const url = 'https://api.nasa.gov/planetary/apod?api_key=uh5Hr2gPTUW6ZznWiHgghsswiDaRbO7NbymLe4bt&count='

    //Capture of the count that will help generate random images on the photo of the day
    const count = () => Math.floor(Math.random() * 50) + 1
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
    home.innerHTML = ' '
    card.innerHTML = ' '

    //Display the data on the DOM
    data.forEach(element => {
        //Adding the card to the Dom
        const card = document.createElement('div')
        card.classList.add('card')
        card.style = "width: 18rem;"

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
        // cardLink.target = "_blank"
        cardLink.classList.add('card-link')
        cardLink.textContent = "Read more"
        //Adding an event listener to redirect users to where they can get more information
        cardLink.addEventListener('click', () => moreDetails(element))
        cardBody.append(cardLink)

        //Adding the card elements to the card
        card.append(cardBody)
        // Adding the card to the home section
        home.append(card)
    });
}

//Function to show more details on specific elements
function moreDetails(element) {
    //Create an object that we should be adding more details to
    const moreDetails = {
        title: element.title,
        image: element.url,
        description: element.explanation,
        date: element.date
    }

    // Save the object to localStorage
    localStorage.setItem("details", JSON.stringify(moreDetails))

    // Redirect and open the target HTML file in a new tab
    window.open("explanation.html", "_blank");
}

//Function to switch to the different tabs
function switchTab(tab) {
    // Select the tab elements
    const homeTab = document.getElementById('home-tab');
    const apodTab = document.getElementById('apod-tab');

    if (tab === 'home') {
        // Show Home content and hide Discover content
        home.classList.remove('hide');
        apod.classList.add('hide');

        // Set active tab
        homeTab.classList.add('active');
        apodTab.classList.remove('active');
    } else if (tab === "apod") {
        pictureOfTheDay()
        // Show Discover content and hide Discover content
        apod.classList.remove('hide');
        home.classList.add('hide');

        // Set active tab
        apodTab.classList.add('active');
        homeTab.classList.remove('active');
    }
}

//Function to display the Astronomy Picture of the Day
function pictureOfTheDay () {
    //Nasa APOD url API
    const url = "https://api.nasa.gov/planetary/apod?api_key=uh5Hr2gPTUW6ZznWiHgghsswiDaRbO7NbymLe4bt"

    fetch(url)
    .then(response => response.json())
    .then(data => {
        //Clear the previous data because it updates the POD everyday
        apod.innerHTML = " "
        apod.innerHTML = `
            <div class="heading"> 
            <img src=${data.url} alt=${data.title}>
            <h1>Astronomy Picture of the Day</h1>
            </div>
            <img id="image" src=${data.url} alt=${data.title}>
            <h2>${data.title}</h2>
            <p>${data.explanation}</p>
            <p class="date"><strong>DATE: </strong>${data.date}</p>
            `
    })
}

//Function to capture the input item and use it for search and then update the DOM
search.addEventListener('click', ()=>{
    result.classList.remove('hide')
    home.classList.add('hide');
    apod.classList.add('hide');

    const searchItem = input.value

    //If the input field is not empty perform search
    if (searchItem) {
        const url = `https://images-api.nasa.gov/search?q=${searchItem}`

        fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
    } 
})