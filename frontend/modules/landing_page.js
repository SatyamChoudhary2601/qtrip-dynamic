import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const res = await fetch(`${config.backendEndpoint}/cities`)
    const data = await res.json()
    return data;
  }catch(error){
    return null
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const rowEl = document.querySelector("#data")
  const divElement = document.createElement("div")
  divElement.style.color = "#fff";
  divElement.style.marginBottom = "20px";
  divElement.className = "col-lg-3 col-6";

  divElement.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}" class="d-flex contentContainer">
    <img src=${image} width="100%" height="100%" class="img"/>
    <div class="textContainer">
      <h4>${city}</h4>
      <p>${description}</p>
    </div>
  </a>
  `
  rowEl.append(divElement)

}

export { init, fetchCities, addCityToDOM };
