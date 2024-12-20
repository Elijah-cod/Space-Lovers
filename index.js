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
const homeTab = document.getElementById('home-tab');
const apodTab = document.getElementById('apod-tab');


//Display random images every time the page loads
window.onload = async function () {
    //Capture of the Nasa Count api key
    const url = 'https://api.nasa.gov/planetary/apod?api_key=uh5Hr2gPTUW6ZznWiHgghsswiDaRbO7NbymLe4bt&count='

    //Capture of the count that will help generate random images on the photo of the day
    const count = () => Math.floor(Math.random() * 60) + 1
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
    //Create an object of contents we would like to share with explantions.html
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
    if (tab === 'home') {
        // Show Home content and hide Discover content
        home.classList.remove('hide');
        apod.classList.add('hide');
        result.classList.add('hide')


        // Set active tab
        homeTab.classList.add('active');
        apodTab.classList.remove('active');
    } else if (tab === "apod") {
        pictureOfTheDay()
        // Show Discover content and hide Discover content
        apod.classList.remove('hide');
        home.classList.add('hide');
        result.classList.add('hide')


        // Set active tab
        apodTab.classList.add('active');
        homeTab.classList.remove('active');
    }
}

//Function to display the Astronomy Picture of the Day
function pictureOfTheDay() {
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
search.addEventListener('click', () => {
    result.classList.remove('hide')
    home.classList.add('hide')
    apod.classList.add('hide')

    homeTab.classList.remove('active');
    apodTab.classList.remove('active');

    const searchItem = input.value

    //If the input field is not empty perform search
    if (searchItem) {
        const url = `https://images-api.nasa.gov/search?q=${searchItem}`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displaySearch(data.collection.items)
            })
    }
    input.value = " "
})

//Function to update the DOM with if search results are videos
function displaySearch(data) {
    result.innerHTML = '';  // Clear any existing content in the result
    data.forEach(item => {
        //Condition to determine which format to use to display content on the DOM
        if (item.data[0].media_type === "video") {
            fetch(item.href)
                .then(response => response.json())
                .then(video => {
                    //Passing the video links and the items
                    createVideoPlayer(video, item)
                })
        }
    })
}

//Function to update the DOM with the videos
function createVideoPlayer(vids, item) {
    //Retuns a list of video links
    const videoLink = vids.filter(data => data.endsWith('.mp4'))
    
    //Create a card for the videos
    const card = document.createElement('div')
    card.classList.add('card')
    card.style = "width: 640px;"

    // Create a video element
    const video = document.createElement('video');
    video.src = videoLink[0];
    video.width = 640;  // Set the video width (optional)
    video.controls = true;  // Enable video controls (play, pause, volume)

    card.append(video)

    //Creating the card body and adding it to the card
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    //Getting the card title
    const cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-title')
    cardTitle.textContent = item.data[0].title
    cardBody.append(cardTitle)

    //Getting the descritpion
    const cardText = document.createElement('p')
    cardText.classList.add("card-text")
    cardText.textContent =  item.data[0].description
    cardBody.append(cardText)

    //Adding the card elements to the card
    card.append(cardBody)

    //Adding the card to the search result container
    result.append(card);
}

