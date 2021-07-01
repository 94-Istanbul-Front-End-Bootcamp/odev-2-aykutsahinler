let data = [];

// Query Selectors

let inputs = document.querySelectorAll(".input-container");
let ageCheckBox = document.getElementById("age");
let isActiveCheckbox = document.getElementById("isActive");
let nameInput = document.getElementById("name");

// ---- Functions ---- //

// Fetch Data
const fetchData = () => {
  //verinin çekildiği yer
  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      //json'dan okunan verinin data array'ine atanması
      data = responseData;

      //veri geldikten sonra filtreleme butonu görünür olsun
      let filterButton = document.querySelector("#filterButton");

      filterButton.setAttribute("style", "");

      //verinin html içerisinde listelendiği fonksiyon
      listData(responseData);
    })
    .catch((err) => {
      //hata yönetimi
      console.log(err);
    });
};

// Filters

function filterByAge() {
    if(ageCheckBox.checked) {
        let filterAge = data.filter((person) => person.age > 18);
        listData(filterAge);
    }
    return true
}

function filterByIsActive() {
    if(isActiveCheckbox.checked) {
        let filterIsActive = data.filter((element) => element.isActive === true);
        listData(filterIsActive);
        return true
    }
}

function filterByName() {
    if(nameInput.value.length != "") {
        let filterName = data.filter((name) => name.name[0] === nameInput.value.toUpperCase());
        listData(filterName);
    }

    return true
}


function filterData() {
    filterByAge();
    filterByIsActive();
    filterByName();
}

// Manipulating DOM
const listData = (data) => {
  let list = document.querySelector(".list");
  list.innerHTML = data.map((element) => {
    return `
        <li id=${element.id}>
            <strong><span>name:</span></strong> ${element.name} <br>
            <strong><span>isActive:</span></strong> ${element.isActive}<br>
            <strong><span>age:</span></strong> ${element.age}<br>
        </li>
        `;
  });
};

//verinin filtrelenmesini sağlayan fonksiyon


// const filterData = (filter) => {
//     console.log(filter);
//   switch (filter) {
//     case "isActive":
//       let filterIsActive = data.filter((element) => element.age >= 18);
//       listData(filterIsActive);
//       break;
//     default:
//         break;

//   }
// };
