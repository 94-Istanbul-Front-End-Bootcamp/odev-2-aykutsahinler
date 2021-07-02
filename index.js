let initialData = [];
let filteredData = [];

// Query Selectors

let inputs = document.getElementById("inputsContainer");
let ageCheckBox = document.getElementById("age");
let isActiveCheckbox = document.getElementById("isActive");
let nameInput = document.getElementById("name");
let fetchButton = document.getElementById("fetchButton");
let filterButton = document.querySelector("#filterButton");
let list = document.getElementById("list");

// Event Listeners

fetchButton.addEventListener("click", fetchData);

// ---- Functions ---- //

// Fetch Data

function fetchData() {
  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      //json'dan okunan verinin data array'ine atanması
      initialData = responseData;

      //veri geldikten sonra filtreleme butonu görünür olsun
      showElements()
      
      //verinin html içerisinde listelendiği fonksiyon
      listData(responseData);
    })
    .catch((err) => {
      //hata yönetimi
      console.log(err);
    });
}

// Filters

function showElements() {
    filterButton.style.display = "block";
    inputsContainer.style.display = "block";
}

function filterByAge() {
  if (ageCheckBox.checked) {
    filteredData = filteredData.filter((person) => person.age > 18);
    listData(filteredData);
  }
}

function filterByIsActive() {
  if (isActiveCheckbox.checked) {
    filteredData = filteredData.filter((element) => element.isActive === true);
    listData(filteredData);
  }
}

function filterByName() {
  if (nameInput.value.length != "") {
    filteredData = filteredData.filter(
      (name) => name.name[0] === nameInput.value.toUpperCase()
    );
    listData(filteredData);
  }
}

async function filterData() {
    filteredData = initialData;
    await filterByAge();
    await filterByIsActive();
    await filterByName();
}

// Manipulating DOM

const listData = (data) => {
    list.innerHTML = data.map((element) => {
        return `
        <li id=${element.id}>
            <strong><span>Name: </span></strong> <span>${element.name}</span> <br>    
            <strong><span>IsActive: </span></strong> <span>${element.isActive}</span> <br>
            <strong><span>Age: </span></strong> <span>${element.age}</span> <br>
        </li> <br><hr> 
        `;
  }).join('');
};
