//declaration of variables for country names to be displayed
let nameOfCountry0 = document
  .querySelector(".country1")
  .querySelector(".countryName1");
let nameOfCountry1 = document
  .querySelector(".country2")
  .querySelector(".countryName2");
let nameOfCountry2 = document
  .querySelector(".country3")
  .querySelector(".countryName3");
let nameOfCountry3 = document
  .querySelector(".country4")
  .querySelector(".countryName4");
let nameOfCountry4 = document
  .querySelector(".country5")
  .querySelector(".countryName5");
// declaration of variables for flags images to be displayed
let flag0 = document.querySelector(".flag1").querySelector("img");
let flag1 = document.querySelector(".flag2").querySelector("img");
let flag2 = document.querySelector(".flag3").querySelector("img");
let flag3 = document.querySelector(".flag4").querySelector("img");
let flag4 = document.querySelector(".flag5").querySelector("img");
//
let ageResult = document.querySelector(".ageResult");
let genderResult = document.querySelector(".genderResult");
let submit = document.querySelector("button");
let genderURL = "https://api.genderize.io/?name=";
let ageURL = "https://api.agify.io?name=";
let nationalURL = "https://api.nationalize.io/?name=";
let flagsURL = "https://restcountries.com/v3.1/alpha?codes=";
//------------------------------------------------
submit.addEventListener("click", (event) => {
  event.preventDefault();
  check();
});
//----------------------------------------------
function getAge(ageURL) {
  let Name = document.querySelector("#name").value;
  let GetAge = fetch(ageURL + Name);
  GetAge.then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).then((json) => {
    let userAge = json.age;
    ageResult.innerText = userAge;
  });
}
//-----------------------------------------------
function getGender(genderURL) {
  let Name = document.querySelector("#name").value;
  let GetGender = fetch(genderURL + Name);
  GetGender.then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("error from gender api link");
    }
  }).then((json) => {
    let userGender = json.gender;
    genderResult.innerText = userGender;
  });
}
//-------------------------------------------------
function getnationality(nationalURL) {
  let Name = document.querySelector("#name").value;
  let Getnational = fetch(nationalURL + Name);
  Getnational.then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert("error from gender api link");
    }
  }).then((json) => {
    flags(json);
  });
}

async function flags(json) {
  let countryID0 = json.country[0].country_id;
  let countryID1 = json.country[1].country_id;
  let countryID2 = json.country[2].country_id;
  let countryID3 = json.country[3].country_id;
  let countryID4 = json.country[4].country_id;
  let response0 = await fetch(flagsURL + countryID0);
  let response1 = await fetch(flagsURL + countryID1);
  let response2 = await fetch(flagsURL + countryID2);
  let response3 = await fetch(flagsURL + countryID3);
  let response4 = await fetch(flagsURL + countryID4);
  let json0 = await response0.json();
  let json1 = await response1.json();
  let json2 = await response2.json();
  let json3 = await response3.json();
  let json4 = await response4.json();

  let countryNames = {
    country0: json0[0].name.common,
    country1: json1[0].name.common,
    country2: json2[0].name.common,
    country3: json3[0].name.common,
    country4: json4[0].name.common,
  };
  let countryFlags = {
    flag0: json0[0].flags.png,
    flag1: json1[0].flags.png,
    flag2: json2[0].flags.png,
    flag3: json3[0].flags.png,
    flag4: json4[0].flags.png,
  };
  nameOfCountry0.innerText = countryNames.country0;
  nameOfCountry1.innerText = countryNames.country1;
  nameOfCountry2.innerText = countryNames.country2;
  nameOfCountry3.innerText = countryNames.country3;
  nameOfCountry4.innerText = countryNames.country4;
  flag0.src = countryFlags.flag0;
  flag1.src = countryFlags.flag1;
  flag2.src = countryFlags.flag2;
  flag3.src = countryFlags.flag3;
  flag4.src = countryFlags.flag4;
}
function check() {
  let Name = document.querySelector("#name").value;
  let letters = Array.from(Name);
  if (letters.includes(" ") || Name == "") {
    ageResult.innerText = "";
    genderResult.innerText = "";
    flag0.src = "";
    flag1.src = "";
    flag2.src = "";
    flag3.src = "";
    flag4.src = "";
    nameOfCountry0.innerText = "";
    nameOfCountry1.innerText = "";
    nameOfCountry2.innerText = "";
    nameOfCountry3.innerText = "";
    nameOfCountry4.innerText = "";
    alert("only one word and no spaces ");
    return;
  } else {
    Promise.allSettled([
      getAge(ageURL),
      getGender(genderURL),
      getnationality(nationalURL),
    ]);
      for (let x = 0; x < localStorage.length; x++) {
        if (localStorage.getItem(`name${x}`) == Name) {
          return;
        }
      }

      let div = document.createElement("div");
      div.innerText = Name;
      document
        .querySelector(".container0")
        .querySelector(".container2")
        .querySelector(".listNames")
        .appendChild(div);

      save(Name);
    
  }
}
function save(Name) {
 
  for(let x=0;x<localStorage.length;x++) {if(localStorage.getItem(`name${x}`)==Name){return;} }
    let i = localStorage.length;
    localStorage.setItem(`name${i}`, Name);

  
}
function load() {
 let x=localStorage.length;
 for(let i=0;i<x;i++){
  let div = document.createElement("div");
  div.innerText = localStorage.getItem(`name${i}`);

  document
    .querySelector(".container0")
    .querySelector(".container2")
    .querySelector(".listNames")
    .appendChild(div);}
}
load();
