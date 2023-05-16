import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const cityName = new URLSearchParams(search).get("city");
  return cityName;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  if(adventures.length === 0){
    const divEl = document.createElement("div");
    divEl.style.color = "red"
    divEl.innerText = "No Data Found!"
    document.getElementById("data").appendChild(divEl);
  }
  adventures?.forEach((item) => {
    const divEl = document.createElement("div");
    divEl.className = "col-6 col-md-3 mb-4";
    divEl.innerHTML = `
      <a href=${`detail/?adventure=${item.id}`} class="activity-card" id=${
      item.id
    }>
      <div class="category-banner">${item.category}</div>
      <div class="h-100 w-100 overflow-hidden">
        <img src=${item.image} className="img-responsive"/>
      </div> 
        <div class="activity-card-text w-100 text-md-center mt-3 px-2">
          <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <h5 class="text-left">${item.name}</h5>
            <p>${item.costPerHead}</p>
          </div>
          <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <h5 class="text-left">Duration</h5>
            <p>${item.duration} Hours</p>
          </div>
        </div>
      </a>
    `;

    document.getElementById("data").appendChild(divEl);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  let newDuration = [];
  list.filter((item) => {
    if (item.duration >= low && item.duration <= high) {
      newDuration.push(item);
    }
  });
  return newDuration;
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  let newCategory = [];
  list.filter((item) => {
    if (categoryList.includes(item.category)) {
      newCategory.push(item);
    }
  });
  return newCategory;
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // let filteredList = [];
  let filteredList = list;
  const [low, high] = filters["duration"].split("-");
  
  if (filters.duration != null && filters.duration != "") {
    filteredList = filterByDuration(list, parseInt(low), parseInt(high));
  } 
  if (filters.category.length != null && filters.category.length != 0) {
    filteredList = filterByCategory(filteredList, filters.category);
  }
  return filteredList;
  // Place holder for functionality to work in the Stubs
  // return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const dataFromLocal = JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return dataFromLocal;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  const pills = document.getElementById("category-list");
  document.getElementById("duration-select").value = filters["duration"];

  filters["category"].forEach((item) => {
    const divEl = document.createElement("div");
    divEl.className = "category-filter";
    divEl.innerHTML = item;
    pills.appendChild(divEl);
    // const closeEl = document.createElement('div')
    // closeEl.textContent = "x";
    // closeEl.style.color = "red";
    // closeEl.style.cursor = "pointer";
    // divEl.style.display = "flex";
    // divEl.style.alignItems = "center";
    // divEl.style.gap = "4px";
    // divEl.append(closeEl)
  });
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
