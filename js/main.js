// get total price function
// create product
// save in local storage
// clear inputs
// read
// count
// delete
// update
// search
// clean data
let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let deletAll = document.getElementById("deletAll");
let search = document.getElementById("search");

// localStorage.clear()

let mood = "Create";
let idGlobal;

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// function get total
function getTotalPrice() {
  if (price.value != "") {
    let totalPrice = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = totalPrice;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "brown";
  }
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// function Create Product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

create.addEventListener("click", function () {
  if (
    title.value != "" &&
    price.value != "" &&
    // count.value != "" &&
    category.value != ""
  ) {
    let newPro = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };

    if (mood === "Create") {
      if (newPro.count > 1) {
        if (newPro.count <= 100) {
          for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
          }
        } else {
          alert("maximum of count is 100");
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[idGlobal] = newPro;
      mood = "Create";
      create.innerHTML = "Create";
      count.style.display = "block";
    }

    // save localStorage
    localStorage.setItem("product", JSON.stringify(dataPro));
    console.log(dataPro);
    clearInput();
    readDataInTable();
  } else {
    alert("you must fill input");
  }
});

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// funtcion clear input
function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
  total.style.backgroundColor = "brown";
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function readDataInTable() {
  getTotalPrice();
  tbody.innerHTML = "";
  for (let i = 0; i < dataPro.length; i++) {
    tbody.innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick="updateItem(${i})">update</button></td>
            <td><button id="delete" onclick="deletItem(${i})">delete</button></td>
        </tr>
        `;
    // console.log(table);
  }

  if (dataPro.length > 0) {
    deletAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</botton>
        `;
  } else {
    deletAll.innerHTML = "";
  }
}
readDataInTable();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// function deleteItem
function deletItem(id) {
  dataPro.splice(id, 1);
  localStorage.product = JSON.stringify(dataPro);
  readDataInTable();
}

// function delete all
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  readDataInTable();
}

// function updateItem

function updateItem(id) {
  console.log(dataPro[id]);
  title.value = dataPro[id].title;
  price.value = dataPro[id].price;
  taxes.value = dataPro[id].taxes;
  ads.value = dataPro[id].ads;
  discount.value = dataPro[id].discount;
  getTotalPrice();
  count.style.display = "none";
  category.value = dataPro[id].category;
  create.innerHTML = "Update";
  mood = "Update";
  idGlobal = id;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// function Search
let searchMood = "title";

function getSearchMood(id) {
  if (id === "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "Category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  readDataInTable();
}

// function searchData

function searchData(value) {
  // console.log(value);
  tbody.innerHTML = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === "title") {
      // console.log(dataPro[i].title);
      if (dataPro[i].title.includes(value.toLowerCase())) {
        // console.log(i);
        tbody.innerHTML += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick="updateItem(${i})">update</button></td>
                        <td><button id="delete" onclick="deletItem(${i})">delete</button></td>
                    </tr>
                    `;
      }
    } else {
      // console.log(dataPro[i].title);
      if (dataPro[i].category.includes(value.toLowerCase())) {
        // console.log(i);
        tbody.innerHTML += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick="updateItem(${i})">update</button></td>
                        <td><button id="delete" onclick="deletItem(${i})">delete</button></td>
                    </tr>
                    `;
      }
    }
  }
}
