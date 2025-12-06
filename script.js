const apiurl = "https://api.nobelprize.org/2.1/laureates?sort=asc&limit=1000";
const tablebody = document.querySelector('#lauratetable tbody');
const loadMoreBtn = document.getElementById('loadMore');
const PreviousBtn = document.getElementById('goback')


let data = [];
let currentindex = 0;
const limit = 20;


// API fetching start
fetch(apiurl)
  .then(res => res.json())
  .then(json => {
    data = json.laureates;
    displaydata();
  })
// API fetching end

// Displaying the data start

function displaydata() {
  tablebody.innerHTML = "";
  const nextset = data.slice(currentindex, currentindex + limit);
  nextset.forEach(laureate => {
    const firstPrize = laureate.nobelPrizes?.[0] || {};
    const row = document.createElement('tr');
    row.innerHTML = `
  <td>${laureate.fullName?.en || "N/A"}</td>
      <td>${laureate.gender || "N/A"}</td>
      <td>${firstPrize.awardYear || "N/A"}</td>
      <td>${firstPrize.motivation?.en || "N/A"}</td>
`;
    tablebody.appendChild(row);
  });
  // displaying the data end
  // button action
  PreviousBtn.style.display = currentindex === 0 ? "none" : "inline-block";
  loadMoreBtn.style.display = (currentindex + limit >= data.length) ? "none" : "inline-block";
}
// Load more click event
loadMoreBtn.addEventListener('click', () => {
  currentindex += limit;
  displaydata();
})
// go previous
PreviousBtn.addEventListener('click', () => {
  currentindex = Math.max(0, currentindex - limit);
  displaydata();
})


// Showing the JSON data 
fetch('engines.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('engines-container');

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'engine-card';
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Fuel Type:</strong> ${item.fueltype}</p>
        <p><strong>Year Invented:</strong> ${item['year-invented']}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading JSON:', err));
// end of private api one

// start of private api two
  fetch('coins.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('coin-container');

    data.forEach(coin => {
      const card = document.createElement('div');
      card.className = 'coin-card';
      card.innerHTML = `
        <img src="${coin.image}" alt="${coin.name}">
        <h3>${coin.name}</h3>
        <p><strong>Symbol:</strong> ${coin.symbol}</p>
        <p><strong>Price (USD):</strong> ${coin.price_usd}</p>
        <p><strong>Market cap (USD):</strong> ${coin.market_cap_usd}</p>
        
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading JSON:', err));
// end of private api two


function copyCode(button) {
  const code = button.nextElementSibling.innerText;
  navigator.clipboard.writeText(code);
  button.textContent = "Copied!";
  setTimeout(() => (button.textContent = "Copy"), 2000);
}

document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const scriptURL = "https://script.google.com/macros/s/AKfycbwOf9Pa-kPxwSi11SlqNBhM92rnGvcFfeXhz0FlsQt3CQ5hkHSQMSboz-zP3u7-RDHq/exec";

    try {
        await fetch(scriptURL, {
            method: "POST",
            body: formData,
            mode: 'no-cors'
        });

        alert("Thank you! Your review has been submitted.");
        form.reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert("Network error. Please try again.");
    }
});


