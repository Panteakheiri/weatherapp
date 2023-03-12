// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656}`
// api.openweathermap.org/data/2.5/weather?q=tehran&appid=edc228562ac0a8aa3116d41c0687cf56&units=metric

const form = document.querySelector("form");
const input = document.querySelector("input");
const msg = document.querySelector(".msg");
const list = document.querySelector(".cities");

form.addEventListener("submit", showWeather);

function showWeather(e){
    e.preventDefault();
    const inputVal = input.value
    const apiKey = "edc228562ac0a8aa3116d41c0687cf56";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`
    fetch(url)
      .then(Response => Response.json())
      .then(data => {
        console.log(data);
        const {main , name , weather , sys } = data ;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
        const li = document.createElement("li");
        li.classList.add("city");
        const myUnicode = '&#8451'
        
        const markup = `
        <h2 class ="city-name">
           <span>${name}</span>
           <sup>${sys.country}</sup>
        </h2>
        <div class ="city-temp">${Math.round(main.temp)}
        <sup class="unicode">${myUnicode}</sup>
        </div>
        <figure>
           <img class="city-icon"  src = "${icon}" alt = "city">
           <figcaption>${weather[0].description}</figcaption> 
        </figure>
        `;
        li.innerHTML = markup
        list.appendChild(li);
        input.value = ""
        msg.innerText = ""
      })
      .catch( () => 
        msg.innerText = "enter a valid city ."
      )   
}