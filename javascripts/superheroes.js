const printToDom = (string, id) => {
    document.getElementById(id).innerHTML = string;
}

const buildDomString = (array) => {
    let domString = "";
    array.forEach((superhero)=>{
        domString += `<div>`;
        domString += `<img src="${superhero.image}">`;
        domString += `<h2>${superhero.name}</h2>`;
        domString += `<div>`;
        domString += `<div>`;
        domString += `<div>`;
    })
    printToDom(domString, "superheroes-container");
}


function executeThisFunctionAfterFileLoads(){
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
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