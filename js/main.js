let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let prinp = document.querySelectorAll(".price input");
let mood = "create";
let tmp;
// console.log(prinp);
// console.log(title);
// console.log(price);
// console.log(taxes);
// console.log(ads);
// console.log(discount);
// console.log(total);
// console.log(count);
// console.log(category);
// console.log(submit);

//get total

// prinp.forEach((ele) => {
//   ele.addEventListener("onkeyup", (e) => {
//     console.log("up2");
//   });
// });

function getTotal() {
  if (price.value != "" && taxes.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

//create product
let datapro = [];
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}
submit.addEventListener("click", () => {
  let newpro = {
    // .tolowerCase()
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  //count mor
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
      // End count mor
    } else {
      //update
      datapro[tmp] = newpro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    // Call Function
    clearDate();
  }
  // End count mor
  //save localstorage
  localStorage.setItem("product", JSON.stringify(datapro));
  //   console.log(JSON.stringify(datapro));
  // Call Function

  showData();
  // Call Function
});

// clear inputs
function clearDate() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//read
let tbody = document.getElementById("tbody");
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button id="update" onclick="updateData(${i}) " >update</button></td>
      <td><button  onclick="deletData(${i})" id="delete">delete</button></td>
  </tr>
    `;
    // console.log(table);
  }
  tbody.innerHTML = table;

  // delet All
  let btnDelet = document.getElementById("deletAll");
  if (datapro.length > 0) {
    btnDelet.innerHTML = `
    <button onclick="deleteAll()" >delete All (${datapro.length})</button>
    `;
  } else {
    btnDelet.innerHTML = "";
  }
}
showData();

//delete
function deletData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}

function deleteAll() {
  localStorage.clear;
  datapro.splice(0);
  showData();
}

//update
function updateData(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;

  getTotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// search
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "catagory";
    search.placeholder = "Search By Catagory";
  }
  // search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  console.log(searchMood, "searchMood");
  for (let i = 0; i < datapro.length; i++) {
    if (searchMood === "title") {
      // .tolowerCase() {
      if (datapro[i].title.includes(value)) {
        table += `
    <tr>
      <td>${i}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button id="update" onclick="updateData(${i}) " >update</button></td>
      <td><button  onclick="deletData(${i})" id="delete">delete</button></td>
  </tr>
    `;
      }
    } else {
      // console.log(i);

      if (datapro[i].category.includes(value)) {
        table += `
        
    <tr>
      <td>${i}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button id="update" onclick="updateData(${i}) " >update</button></td>
      <td><button  onclick="deletData(${i})" id="delete">delete</button></td>
  </tr>
    `;
      }
    }
  }
  tbody.innerHTML = table;
}

// clean data
