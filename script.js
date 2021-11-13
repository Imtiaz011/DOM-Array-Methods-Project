const main= document.getElementById('main');
const addUserBtn = document.getElementById('add-User');
const doubleBtn = document.getElementById('double');
const showMillonaireBtn = document.getElementById('show-millonaries');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// function callings for random users

getRandomUser();
getRandomUser();
getRandomUser();


let data = [];

// fetch random user and add money 
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    // console.log(data);
    const user = data.results[0];
    //console.log(user); // getting user from array

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000),
    };
    //console.log(newUser); // username money value added

    addData(newUser);
}

// double money            
function doubleMoney() {
    data = data.map((user) =>{
        return { ...user,money: user.money * 2 };
    });

    updateDOM();
}

// filter only millonaries

function showMillonaires() {
    data = data.filter((user) =>
        user.money > 1000000
    );
    updateDOM();
}

// sort by richest

function sortByRichest() {
    data = data.sort((a,b) =>
        b.money - a.money);
    
    updateDOM();
}

// Calculate entire wealth 

function calculateWealth() {
    const wealth = data.reduce((acc, user) =>(acc += user.money), 0);
    
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong>`;
    main.appendChild(wealthElement);
}



// add new obj to data array

function addData(obj) {
    data.push(obj);

    updateDOM();
}

// update DOM 
function updateDOM(providedData = data){
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// format numbers to money

function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// ADD USER by clicking the button(Event Listener)

addUserBtn.addEventListener('click',getRandomUser);

// DOUBLE MONEY

doubleBtn.addEventListener('click',doubleMoney);

// SHOW ONLY MILLONARIES

showMillonaireBtn.addEventListener('click',showMillonaires);

// SORT BY RICHEST

sortBtn.addEventListener('click',sortByRichest);

// CALCULATE ENTIRE WEALTH  

calculateWealthBtn.addEventListener('click',calculateWealth);

