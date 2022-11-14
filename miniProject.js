let API_KEY = "9zlk60FQiadOs05Sbgoyhx3YPtcBx9m8fKZWkPeA";
// const fetch = require('node-fetch');
let a = 0;
function asteroids() {
    if (a % 2 == 0) {
        document.getElementById("sec1").style.marginTop = "1em";
        document.getElementById("sec1").style.padding = "1em";
        document.getElementById("sec1").style.height = "inherit";
        document.getElementById("sec1").style.paddingBottom = "15em";
        a++
    }
    else {
        document.getElementById("sec1").style.marginTop = "0px";
        document.getElementById("sec1").style.padding = "0px";
        document.getElementById("sec1").style.height = "0px";
        document.getElementById("sec1").style.paddingBottom = "0px";

        a++
    }
}
let p = 0;
function photos() {
    if (p % 2 == 0) {
        document.getElementById("sec2").style.marginTop = "1em";
        document.getElementById("sec2").style.padding = "1em";
        document.getElementById("sec2").style.height = "inherit";
        document.getElementById("sec2").style.paddingBottom = "15em";

        p++
    }
    else {
        document.getElementById("sec2").style.marginTop = "0px";
        document.getElementById("sec2").style.padding = "0px";
        document.getElementById("sec2").style.height = "0px";
        document.getElementById("sec2").style.paddingBottom = "0px";
        document.querySelector(".compare").style.height = "0px";
        p++
    }
}
let e = 0;
function natural() {
    if (e % 2 == 0) {
        document.getElementById("sec3").style.marginTop = "1em";
        document.getElementById("sec3").style.padding = "1em";
        document.getElementById("sec3").style.height = "inherit";
        document.getElementById("sec3").style.paddingBottom = "15em";
        e++
    }
    else {
        document.getElementById("sec3").style.marginTop = "0px";
        document.getElementById("sec3").style.padding = "0px";
        document.getElementById("sec3").style.height = "0px";
        document.getElementById("sec1").style.paddingBottom = "0px";
        e++
    }
}
nasaApi()
async function nasaApi() {
    let response = await fetch(`https://api.nasa.gov/planetary/apod?date=2022-11-10&api_key=${API_KEY}`)
    let data = await response.json()
    using(data)
}

function using(data) {
    if (data.media_type == "video") {
        document.getElementById("photoDay").innerHTML = `<iframe class="photo" src="${data.url}"></iframe>`
    }
    else {
        document.getElementById("photos").innerHTML += `<img class="col-md-12 col-lg-8" style="height: inherit;" src=${data.url}>`;
    }
}

async function DayImage() {
    document.getElementById("explanation").innerHTML = ""
    let date = document.getElementById("date").value;
    let response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`)
    let photo = await response.json()
    console.log(date)
    showPhoto(photo)
}
function showPhoto(photo) {



    if (photo.media_type == "video") {
        document.querySelector(".information").innerHTML = `<iframe width="520" height="315"src="${photo.url}"></iframe>`


    }
    else {

        document.querySelector(".information").innerHTML = `<img class="photo" " src="${photo.url}">`;

        document.getElementById("sec1").style.top = "-50px";
    }
    openButton()

}
function openButton() {

    document.getElementById("exp").style.height = "inherit";

}
let i = 0;
async function openExplanation() {
    if (i % 2 == 0) {
        let date = document.getElementById("date").value;
        let response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`)
        let photo = await response.json()

        document.getElementById("explanation").innerHTML += `<h4 class ="explanation"> ${photo.explanation}</h4>`
        i++

    }
    else {
        document.getElementById("explanation").innerHTML = ""
        i++
    }
}


async function asteroid() {
    document.querySelector(".astinfo").innerHTML = ""

    document.querySelector(".compare").style.height = "0px";
    let choiceDay = document.getElementById("dateast").value;
    let response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${choiceDay}&end_date=${choiceDay}&api_key=${API_KEY}`)
    let data = await response.json()
    let hazard = data.near_earth_objects;
    document.getElementById("some").innerHTML = ""
    let day = hazard[choiceDay]



    let fal = 0;
    let total = 0;
    for (let i in day) {

        if (day[i].is_potentially_hazardous_asteroid === true) {


            document.querySelector(".astinfo").innerHTML += `<p>The asteroid ${day[i].name} maybe will hit us,<br> have been seen on ${choiceDay}</p>  `

        }
        else {
            fal++
        }
        total++
    }
    if (fal === total) {
        document.querySelector(".astinfo").innerHTML += `<p>no asteroid wich represent a hazard <br> have been see on ${choiceDay}</p>`
    }
    else {
        document.querySelector(".astinfo").innerHTML += `<button type="button" onclick="compare(), asteroidscompare()" class="btn btn-outline-success">compare the size of the asteroids</button>`
    }

}
let ac = 0;
function asteroidscompare() {
    if (ac % 2 == 0) {
        document.querySelector(".compare").style.height = "inherit";
        ac++
    }
    else {
        document.querySelector(".compare").style.height = "0px";
        ac++
    }
}
async function compare() {
    let choiceDay = document.getElementById("dateast").value;
    let response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${choiceDay}&end_date=${choiceDay}&api_key=${API_KEY}`)
    let data = await response.json()
    let hazard = data.near_earth_objects;
    document.getElementById("some").innerHTML = ""
    let day = hazard[choiceDay]

    for (let i in day) {

        if (day[i].is_potentially_hazardous_asteroid === true) {

            var size = await day[i].estimated_diameter.kilometers;
            let avergeSize = ((size.estimated_diameter_min + size.estimated_diameter_max) / 2).toPrecision(5)

            let some = await day[i].estimated_diameter.kilometers.estimated_diameter_max;
            let km = Number(some) * 600

            document.getElementById("some").innerHTML += ` <tr><td> The asteroid ${day[i].name} maybe will hit us </td>
            <td>The asteroid have averge ${avergeSize}km of diameter</td><td><img class="earthsize" style="height:180px " 
            src="${'https://i.pinimg.com/originals/e8/60/ba/e860ba744a2cfe5f182d089b44e54e21.jpg'}"> </td><td><img class="asteroidsize" style=" border-radius: 50%; width:${km}px" 
            src="${'https://solarsystem.nasa.gov/internal_resources/4898/'}"></td></tr>`

        }

    }
}


let titles = []
let map1 = {}
let names = []
let numberOf = []
let n = 0;

async function naturalEvents() {
    let response = await fetch(`https://eonet.gsfc.nasa.gov/api/v2.1/events`)
    let data1 = await response.json()
    let catego = data1.events;

    for (let i in catego) {
        let find = await catego[i].categories
        titles.push(find[0].title)
    }
    titles.forEach(keys => {
        map1[keys] = (map1[keys] || 0) + 1;
    });

    for (let i in map1) {

        names[n] = i;
        numberOf[n] = map1[i]
        n++
    }

    let myMap = []
    let f = 0;
    for (let i in map1) {
        myMap[f] = { value: numberOf[f], name: names[f] };
        f++
    }


    document.getElementById("main1").innerHTML = `<div id="main"></div>`

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom, 'dark');
    var option;

    option = {
        title: {
            text: '',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: myMap,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    option && myChart.setOption(option);
    whereVulcan()

}









