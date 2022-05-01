const timi = localStorage.getItem('user')
const urlcard = `http://api.tvmaze.com/shows/`
const casting = `/cast`
const seasonslist = `/seasons`
const main = document.querySelector('main')
const divOne = document.createElement('div')
const divTwo = document.createElement('div')

divOne.classList.add('divone')
divTwo.classList.add('divtwo')

main.append(divOne, divTwo)

let renderSingleShow = (show) => {
    let title = document.createElement('h2')
    let poster = document.createElement('img')
    let showDetails = document.createElement('h3')
    let summary = document.createElement('p')


    title.innerHTML = show.name
    poster.setAttribute('src', show.image.original)
    showDetails.innerHTML = "Show Details"
    summary.innerHTML = show.summary


    divOne.append(title, poster, showDetails, summary)
}    

let cast = (cast) => {
    let desc = document.createElement('div')
    let titleCast = document.createElement('h3')
    let actorsList = document.createElement('ul')
    
        
    console.log(cast);
    titleCast.innerHTML = "Cast"
    cast.forEach((e,i)=> {
        if (i<10){

            let actors = document.createElement('li')
            actors.innerHTML = e.person.name
            actorsList.append(actors)
        }
    })
    
    
    desc.classList.add('descdiv')
    
    desc.append(titleCast, actorsList)
    divTwo.appendChild(desc)
    
}

let seasonTV = (seasonS) => {
    let seasonDiv = document.createElement('div')
    let seasons = document.createElement('h3')
    let seasonList = document.createElement('ul')
    
    console.log(seasonS);
    seasonS.forEach((e)=>{
        seasons.innerHTML = `Seasons(${seasonS.length})`
        let seasonsPremEnd = document.createElement('li')
        seasonsPremEnd.innerHTML = `${e.premiereDate} - ${e.endDate}`
        seasonList.append(seasonsPremEnd)
    })
    
    seasonDiv.append(seasons, seasonList)
    divTwo.appendChild(seasonDiv)
    
    
}



let fetchDataSeason = fetch (urlcard + timi + seasonslist)
.then((res)=>res.json())
.then((res)=> {seasonTV(res)
    console.log(res)
})


let fetchDataCast = fetch (urlcard + timi + casting)
.then((res)=>res.json())
.then((res)=> {cast(res)
console.log(res)
})

let fetchData = fetch (urlcard + timi)
.then((res)=>res.json())
.then((res)=> {renderSingleShow(res)
    console.log(res)
})

window.addEventListener('load', fetchData)
window.addEventListener('load', fetchDataCast)
window.addEventListener('load', fetchDataSeason)