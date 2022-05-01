const url = `http://api.tvmaze.com/shows`;
const input = document.querySelector("input");
const main = document.querySelector("main");
const urlSearch = `https://api.tvmaze.com/search/shows?q=`;
const header = document.querySelector("header");
const dropdown = document.querySelector('.dropdown')
const btn = document.querySelector("button");
const searchingList = document.createElement("ul");
let watchlist = document.querySelector('.watchlist')

const renderSingleShow = (show) => {
//   console.log(show);
  const wrapper = document.createElement("div");
  wrapper.classList.add('wrapper')

  const card = document.createElement("div");
  const title = document.createElement("h2");
  const poster = document.createElement("img");
  let plus = document.createElement('button')
  let lista = document.createElement('div')
  
  main.append(lista)

  lista.classList.add('listafilmova1')
  title.innerHTML = show.name;
  poster.setAttribute("src", show.image.medium);
  plus.innerHTML = "+"
  
  plus.addEventListener('click', (event)=>{
    event.stopPropagation()

    let film = document.createElement('p')
    lista.append(film)
  })

  watchlist.addEventListener('click', ()=>{
    lista.classList.add('listafilmova')

  })

  card.append(poster, title, plus);
  wrapper.append(card)
  main.appendChild(wrapper);
  card.addEventListener("click", () => {
    window.location.href = "./single.html";
    localStorage.setItem("user", show.id);
  });
};

const searchList = (inputs) => {
  console.log(inputs);
  
  searchingList.innerHTML = ""
  inputs.forEach((e) => {
    let searchingItems = document.createElement("li");
    searchingItems.innerHTML = e.show.name;
    searchingItems.addEventListener('click', ()=>{
        window.location.href = './single.html';
        localStorage.setItem('user',e.show.id)
    })

    searchingList.append(searchingItems);
  });
  dropdown.append(searchingList);
};

const fetchDataSearch = () => {
  fetch(urlSearch + input.value)
    .then((res) => res.json())
    .then((res) => {searchList(res);
      
    });
};

const fetchData = fetch(url)
  .then((res) => res.json())
  .then((res) => {
    res
      .filter((e, i) => i < 50)
      .forEach((e) => {
        renderSingleShow(e);
      });
  });


input.addEventListener("keyup", fetchDataSearch);
window.addEventListener("load", fetchData);
