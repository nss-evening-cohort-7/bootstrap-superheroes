const printToDom = (string, id) => {
    document.getElementById(id).innerHTML = string;
}

const buildDomString = (array) => {
    let domString = "";
    array.forEach((superhero)=>{
        domString += `<div class="col-sm-3">`;
        domString +=    `<div class="panel">`;
        domString +=        `<div class="panel-heading">`;
        domString +=            `<h3 class="panel-title">${superhero.name}</h3>`;
        domString +=        `</div>`;
        domString +=     `<div class="panel-body">`;
        domString +=        `<img class="charImage" src="${superhero.image}">`;
        domString +=        `<p class="charDescription">${superhero.description}</p>`;
        domString +=     `</div>`;
        domString +=    `</div>`;
        domString += `</div>`;
        // domString += `<p>${superhero.description}</p>`;
        domString += ``;
        domString += ``;
    })
    printToDom(domString, "superheroes-container");
}


function executeThisFunctionAfterFileLoads(){
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
    console.log(data.superheroes);
  }

  function WTF(){
    console.log("something went wrong");
  }
  
  const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisFunctionAfterFileLoads);
    myRequest.addEventListener("error", WTF);
    myRequest.open("GET", "../db/superheroes.json");
    myRequest.send();
  };

  startApplication();