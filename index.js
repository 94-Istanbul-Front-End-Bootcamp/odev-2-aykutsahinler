let data = [];

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
      data = responseData;

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
    let filterAge = data.filter((person) => person.age > 18);
    listData(filterAge);
  }
}

function filterByIsActive() {
  if (isActiveCheckbox.checked) {
    let filterIsActive = data.filter((element) => element.isActive === true);
    listData(filterIsActive);
  }
}

function filterByName() {
  if (nameInput.value.length != "") {
    let filterName = data.filter(
      (name) => name.name[0] === nameInput.value.toUpperCase()
    );
    listData(filterName);
  }
}

function filterData() {
  filterByAge();
  filterByIsActive();
  filterByName();
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
  });
};
