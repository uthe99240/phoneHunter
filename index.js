const searchPhone = () => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML='';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
    // .catch(error => displayError(error));
}

const displaySearchResult = data => {
    // console.log(meals);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const noResult = document.getElementById('no-result');
    noResult.innerHTML = '';
    if (data.length == 0) {
        // show no result found;

        const div = document.createElement('div')
        div.innerHTML = `<p class="card-text ">No Result Found !!!</p>`;
        noResult.appendChild(div);
    }
    data.forEach(data => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div  class="card h-100 mx-4">
        <div class='mx-auto m-5'>
             <img class='img-fluid' src="${data.image}" class="card-img-top" alt="...">
        </div>
            
            <div class="card-body px-4">
                <h5 class="card-title font-weight-bold">${data.phone_name}</h5>
                <p class="card-text ">Brand : ${data.brand}</p>
            <button onclick="loadPhoneDetail('${data.slug}')" class='btn btn-primary btn-lg btn-block' >Explore</button>
            </div>
            
        </div>
        `;
        searchResult.appendChild(div);
        noResult.innerHTML = '';
    })
}

const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = detail => {
    // console.log(detail);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML='';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class='mx-auto'>
             <img class='img-fluid py-3' src="${detail.image}" class="card-img-top" alt="...">
        </div>
    <div class="card-body">
        <h5 class="card-title">Release-Date : ${detail.releaseDate ?detail.releaseDate:'Not Found'}</h5>
        <p class="card-text">Name : ${detail.name}</p>
        <p class="card-text">Brand : ${detail.brand}</p>
        <p class="card-text">Storage : ${detail.mainFeatures.storage}</p>
        <p class="card-text">Display : ${detail.mainFeatures.displaySize}</p>      
        <p class="card-text">Sensors : ${detail.mainFeatures.sensors} </p>
        <p class="card-text">Others :  </p>
        <p class="card-text">Bluetooth : ${detail.others.Bluetooth}</p>
    </div>
    `;
    phoneDetails.appendChild(div);
}