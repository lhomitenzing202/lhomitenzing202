const accesskey = "ejWY1C1lkTdxaoQiPJcZEfXBPJIcM09sHkCK5G5KYCM"; // store apikey

const formEl = document.querySelector("form"); //to store  form section
const inputEl = document.getElementById("search input");
const searchresults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = ""; //store all the user given data
let page = 1; //default page no

async function searchimages() { //response and fetch requires async so it is used 
    inputData = inputEl.value; // holds the values from input section
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`; // dynamic url based on our input data

    const response = await fetch(url); // fetch img response from url
    const data = await response.json(); // converts into json format and stores in data variable

    const results = data.results; // data fetched stored in results

    if (page === 1) {
        searchresults.innerHTML = ""; // this will fetch the 3 default img from homepage
    }

    results.map((result) => { // map for showig some data from huge data stored in results 
        const imageWrapper = document.createElement("div"); //pushing datas in cointainor or duplicate cointainer in js
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageLink.appendChild(image); // append anchor,img into our webpage
        imageWrapper.appendChild(imageLink);
        searchresults.appendChild(imageWrapper);
    });

    page++; // increase page no
    if (page > 1) {
        showMore.style.display = "block"; // change style of show more in style if page is more than 1

    }
}
formEl.addEventListener("submit", (event) => { //call the function search
    event.preventDefault();
    page = 1;
    searchimages();
});

showMore.addEventListener("click", () => { //call the function of showMore 
    searchimages();
});