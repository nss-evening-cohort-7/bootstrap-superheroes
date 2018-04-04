const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (heroes) => {
  let domString = "";
  for (let i = 0; i < heroes.length; i++) {
    domString +=   `<li>`;
    domString +=     `<a href="#">${heroes[i].name}</a>`;
    domString +=   ` </li>`;
  }
  printToDom(domString, "awesome-dropdown");
};

function executeThisCodeIfXHRFails() {
  console.log("something broke");
}

function executeThisCodeAfterFileLoaded() {
  const data = JSON.parse(this.responseText);
  buildDomString(data.superheroes);
}

const startApplication = () => {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
  myRequest.addEventListener("error", executeThisCodeIfXHRFails);
  myRequest.open("GET", "../db/superheroes.json");
  myRequest.send();
};

startApplication();
