const searchPhone = () => {
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
    
    if (data.length == 0) {
        // show no result found;
        const noResult = document.getElementById('no-result');
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
            <button class='btn btn-primary btn-lg btn-block' >Explore</button>
            </div>
            
        </div>
        `;
        searchResult.appendChild(div);
    })
}