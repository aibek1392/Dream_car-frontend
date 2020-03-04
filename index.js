
const listBrand = document.getElementById("toy-header")
let carCollectionDiv = document.querySelector("#toy-collection")
let addCarButton = document.querySelector("#form-create")
let submitBtn = addCarButton.querySelector("#submit")
let addCar = false
let carForm = document.querySelector(".container")
let carCollection = document.querySelector("#add-toy-form")
let selectedBrand = ""
let selectedBrandId = ""

////////////toggle-button\\\\\\\\\\
addCarButton.addEventListener('click', () => {
  addCar = true
  if (addCar) {
    carForm.style.display = 'block'
  } else {
    carForm.style.display = 'none'
  }
})

///////////**********create a new CAR**********\\\\\\\\\\\\\\\\\\\
let carFormButton = carForm.querySelector(".submit")
carFormButton.addEventListener('click', event => {
  event.preventDefault()
  let carName = event.target.parentElement.name.value
  let carImage = event.target.parentElement.image.value
  let carPrice = event.target.parentElement.price.value
  fetch("http://localhost:3000/cars", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: carName,
      image: carImage,
      price: carPrice,
      brand_id: selectedBrandId,
      likes: 0
    })
  })
    .then(r => r.json())
    .then((car) => {
      if (!car.errors) {
        carCollectionDiv.innerHTML += `
        <div class="car" data-id=${car.id}>
        <center data-id=${car.id}> <h2 style='color: white'>${car.name}</h2></center>
             <img class="car-image" src=${car.image}  />
             <center> <p style='color: white'> ${car.price}</p> </center>
             <center> <div  class="fa fa-heart like" style="font-size:20px;" data-id=${car.id}><span>${car.likes}</span></like></center>
             <center> <button class = "delete-button" data-id=${car.id}> ❌</button></center> 
             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
             <i onclick="myFunction(this)" class="far fa-grin-beam	"></i> 
             <button class="bratt" data-id="${car.id}">BTTT</button>
            </div>
        `
        carForm.querySelector('form').reset();

      }
      else {
        window.alert(car.errors.join("\n"))
      }
    })
})
///////////**********function for close button in create forM**********\\\\\\\\\\\\\\\\\\\
let closeButton = carForm.lastElementChild.lastElementChild
closeButton.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.name === 'hide') {
    carForm.style.display = 'none'
    addCar = false
  }
})

///////////**********show all brands**********\\\\\\\\\\\\\\\\\\\
fetch("http://localhost:3000/brands")
  .then(resp => resp.json())
  .then(brands => {
    brands.forEach(brand => {
      listBrand.innerHTML +=
        `<div data-id=${brand.id} class="card">
      <img data-id=${brand.id} src=${brand.image}  class="toy-avatar card"  />
     
      </div>
      `
    });
  })
  .catch(err => console.log(err.message))

//////////////**********show all cars which belong to the specific brand**********\\\\\\\\\\\\\\\\\\\
listBrand.addEventListener('click', event => {
  if (event.target.classList.contains("card")) {
    const id = event.target.dataset.id;
    selectedBrandId = id
    fetch(`http://localhost:3000/brands/${id}`)
      .then(resp => resp.json())
      .then(brand => {
        carCollectionDiv.innerHTML = ""
        brand.cars.forEach(car => {
          carCollectionDiv.innerHTML += `
                <div class="car" data-id=${car.id}>
                <center data-id=${car.id}> <h2 style='color: white'><span>${car.name}</span></h2></center>
                <img class="car-image" src=${car.image}  />
                <center> <p style='color: white'> ${car.price}</p> </center>
                <center> <div  class="fa fa-heart like" style="font-size:20px;" data-id=${car.id}><span>${car.likes}</span></like></center>
                <center> <button class = "delete-button" data-id=${car.id}> ❌</button></center> 
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <i onclick="myFunction(this)" class="far fa-grin-beam	"></i>
                <button class="bratt" data-id="${car.id}">BTTT</button>
                </div>
              `
        })

        ///////////**********delete car**********\\\\\\\\\\\\\\\\\\\
        carCollectionDiv.addEventListener('click', event => {
          if (event.target.classList.contains("delete-button")) {
            // debugger
            let divCar = event.target.dataset.id
            fetch(`http://localhost:3000/cars/${divCar}`, {
              method: "DELETE"
            })
              .then(resp => resp.json())
              .then(data => {
                event.target.parentElement.parentElement.remove()
              })
              .catch(err => console.log(err.message))
          }

        })

      }
      )
  }
})

///////////**********Like Cars**********\\\\\\\\\\\\\\\\\\\
carCollectionDiv.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.classList.contains("like")) {
    let id = event.target.dataset.id
    let carLike = event.target.querySelector('span').innerText
    let newLike = parseInt(carLike) + 1
    fetch(`http://localhost:3000/cars/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: newLike
      })
    })
      .then(r => r.json())
      .then(data => {
        event.target.querySelector('span').innerText = newLike
      })
  }
})

carCollectionDiv.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.classList.contains("bratt")) {
  }
})