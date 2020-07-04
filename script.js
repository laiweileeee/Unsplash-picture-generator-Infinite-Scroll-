const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let allImagesLoaded = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
let count = '5';
const apiKey = 'tug8lHzTlkODl9gq9EoCWQK3zks1G68ktRqCmQQvV-E';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded () {
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        allImagesLoaded = true;
        loader.hidden = true;
        console.log('all Image Loaded = true');
        count = '10';
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

//helper function to make DRY code, using a HASH table/ object
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
    totalImages += photosArray.length;
    photosArray.forEach(photo => {
        //create <a> link to Unsplash
        const item = document.createElement('a');
        // //make link open in new tab
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        //Check when each is finished loading
        img.addEventListener('load', imageLoaded)

        //Put <img> in <a>, then put both insde imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);       
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && allImagesLoaded) {
        //reset boolean 
        allImagesLoaded = false;
        getPhotos();
    }
})

getPhotos();