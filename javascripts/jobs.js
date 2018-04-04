let selectedHero = "";

const printToDom = (domString, divId) => {
  document.getElementById(divId).innerHTML = domString;
};

const buildDomString = heroes => {
  let domString = "";
  for (let i = 0; i < heroes.length; i++) {
    domString += `<li>`;
    domString += `<a class="hero-name" data-hero-id="${heroes[i].id}">${
      heroes[i].name
    }</a>`;
    domString += ` </li>`;
  }
  printToDom(domString, "awesome-dropdown");
};

const selectHero = e => {
  selectedHero = e.target.dataset.heroId;
  document.getElementById('awesome-button').classList.add('hide');
  genericHeroRequest(loadFileforSingleHero);
};

const addheroSelectionEventListeners = () => {
  const heroNames = document.getElementsByClassName("hero-name");
  for (let i = 0; i < heroNames.length; i++) {
    heroNames[i].addEventListener("click", selectHero);
  }
};

const displaySuperhero = heroes => {
  let domString = "";
  heroes.forEach(hero => {
    if (hero.id === selectedHero) {
      domString += `<div class="row">`;
      domString += `<div class="col-sm-4">`;
      if (hero.gender === "Male") {
        domString += `<img class="charImage maleImage" src="${
          hero.image
        }">`;
      } else {
        domString += `<img class="charImage femaleImage" src="${
          hero.image
        }">`;
      }
      domString += `</div>`;
      domString += `<div class="col-sm-6">`;
      domString += `<h2>Selected Hero: ${hero.name}</h2>`;
      domString +=     `<p class='charDescription'>${hero.description}</p>`;
      domString += `</div>`;
    }
  });
  printToDom(domString, "selected-hero");
  getJobs(heroes);
};

const displayJobs = (heroes) => {
  let domString = "";
  heroes.forEach(hero => {
    if (hero.id === selectedHero) {
      hero.jobs.forEach((job) =>{
        domString += `<div>${job}</div>`;
      })
    }
  });
  printToDom(domString, "jobs");

}

const megaSmash = (jobsArray, heroesArray) => {
  heroesArray.forEach((hero) => {
    hero.jobs = [];
    hero.jobIds.forEach((jobId) =>{
      jobsArray.forEach((job) => {
        if(job.id === jobId){
          hero.jobs.push(job.title);
        }
      })
    })
  })
  return heroesArray;
};

const getJobs = (heroesArray) =>{
  let jobsRequest = new XMLHttpRequest();
  jobsRequest.addEventListener("load", jobsJSONConvert);
  jobsRequest.addEventListener("error", executeThisCodeIfXHRFails);
  jobsRequest.open("GET", "../db/jobs.json");
  jobsRequest.send();

  function jobsJSONConvert() {
    const jobsData = JSON.parse(this.responseText).jobs;
    const completeHeroes = megaSmash(jobsData, heroesArray);
    displayJobs(completeHeroes);
  }
}


function loadFileforSingleHero() {
  const data = JSON.parse(this.responseText);
  displaySuperhero(data.superheroes);
}

function executeThisCodeIfXHRFails() {
  console.log("something broke");
}

function executeThisCodeAfterFileLoaded() {
  const data = JSON.parse(this.responseText);
  buildDomString(data.superheroes);
  addheroSelectionEventListeners();
}

const genericHeroRequest = successFunction => {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", successFunction);
  myRequest.addEventListener("error", executeThisCodeIfXHRFails);
  myRequest.open("GET", "../db/superheroes.json");
  myRequest.send();
};

const startApplication = () => {
  genericHeroRequest(executeThisCodeAfterFileLoaded);
};

startApplication();
