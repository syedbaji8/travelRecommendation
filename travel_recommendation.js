const searchButton = document.getElementById('searchButton')
const resetSearchButton = document.getElementById('resetSearchButton')
const firstTextContentSection = document.getElementById('firstTextContentSection')
const searchInput = document.getElementById('searchInput')
const searchResultsSection = document.getElementById('searchResultsSection')


function showMainPage() {
    firstTextContentSection.style.display = 'flex';
    firstTextContentSection.parentElement.style.alignItems = 'center';
}
function hideMainPage() {
    firstTextContentSection.style.display = 'none';
    firstTextContentSection.parentElement.style.alignItems = 'start';
}

function showResultPage() {
    searchResultsSection.style.display = 'grid';
}
function hideResultPage() {
    searchResultsSection.style.display = 'none';
}
hideResultPage();
showMainPage();
async function searchDestination() {
    const searchInputText = document.getElementById('searchInput').value.toLowerCase();
    const response = await fetch('./travel_recommendation_api.json');
    const data = await response.json();
    const beachBool = searchInputText.includes('be') || searchInputText.includes('bea') || searchInputText.includes('beac') || searchInputText.includes('beach');
    const countryBool = searchInputText.includes('co') || searchInputText.includes('cou') || searchInputText.includes('coun') || searchInputText.includes('count') || searchInputText.includes('country');
    const templeBool = searchInputText.includes('te') || searchInputText.includes('tem') || searchInputText.includes('temp') || searchInputText.includes('templ');
    const searchKey = beachBool ? 'beaches' : countryBool ? 'countries' : templeBool ? 'temples' : null;
    const myarray = data[searchKey];
    console.log(myarray)
    showResultPage();
    hideMainPage();
    displaySearchResultsFn(myarray)
}

function displaySearchResultsFn(resultedArray) {
    const renderDestinations = resultedArray.map((place, index) => {
        if (place.hasOwnProperty('cities')) {
            return place.cities.map((city, index) => {
                return (`
                <div class="div for-gap p-0">
                    <div class="item item-1 bg-white rounded-[18px] shadow-xl">
                        <div class="p-[14px] pb-[8px]">
                            <img src="./images/${city.imageUrl}" class="w-full h-[230px] rounded-[18px] object-cover">
                        </div>
                        <div class="px-5 pb-5 text-center">
                            <h2 class="text-[25px] font-black text-[#001d73] leading-none">
                                ${city.name}
                            </h2>
                            <p class="mt-2 text-[16px] leading-[20px] text-[#3c3c3c]">
                                ${city.description}
                            </p>
                        </div>
                    </div>
                </div>
                `)
            }).join('');
        }
        return (`
                <div class="div for-gap p-0">
                    <div class="item item-1 bg-white rounded-[18px] shadow-xl">
                        <div class="p-[14px] pb-[8px]">
                            <img src="./images/${place.imageUrl}" class="w-full h-[230px] rounded-[18px] object-cover">
                        </div>
                        <div class="px-5 pb-5 text-center">
                            <h2 class="text-[25px] font-black text-[#001d73] leading-none">
                                ${place.name}
                            </h2>
                            <p class="mt-2 text-[16px] leading-[20px] text-[#3c3c3c]">
                                ${place.description}
                            </p>
                        </div>
                    </div>
                </div>
                `)
    }).join('');
    document.getElementById('searchResultsSection').innerHTML = renderDestinations;
}
searchButton.addEventListener('click', searchDestination);

searchInput.addEventListener('input', (event) => {
    // console.log(event.target.value)
    if (event.target.value === '') {
        showMainPage();
        hideResultPage();
    } else {
        hideMainPage();
        showResultPage();
    }
})

function resetSearchFn(){
    searchInput.value = '';
}
resetSearchButton.addEventListener('click', resetSearchFn)