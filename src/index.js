import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  for (var x = 0; x < 5; x++) {
    getDogPics();
  }
}

async function getDogPics() {
  const containerDiv = document.createElement("div");
  const itemDiv = document.createElement("div");
  const contentDiv = document.createElement("div");
  const imgDiv = document.createElement("div");
  const wikiHeader = document.createElement("h1");
  const textPara = document.createElement("p");
  const wikiImg = document.createElement("img");

  //asssign classes to elements
  containerDiv.className = "container";
  itemDiv.className = "wiki-item";
  contentDiv.className = "wiki-content";
  imgDiv.className = "img-container";
  wikiHeader.className = "wiki-header";
  textPara.className = "wiki-text";
  wikiImg.className = "wiki-img";

  //get breaqds
  let urlBreeds = "https://dog.ceo/api/breeds/list/all";
  let res = await fetch(urlBreeds);
  let all = await res.json();
  //get random number to get a breed
  const count = Math.floor(Math.random() * Object.keys(all.message).length);
  //console.log(Object.keys(all.message).length);

  wikiHeader.innerHTML = Object.keys(all.message)[parseInt(count, 10)];

  //get picture for the breed
  let urlPic =
    "https://dog.ceo/api/breed/" +
    Object.keys(all.message)[parseInt(count, 10)] +
    "/images/random";
  fetch(urlPic, { method: "GET" })
    .then((response) => response.json())
    .then((getpic) => {
      let pic = getpic;
      wikiImg.src = pic.message;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //get text from wikipedia
  let wikiUrl =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" +
    Object.keys(all.message)[parseInt(count, 10)];
  fetch(wikiUrl, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      textPara.innerHTML = data.extract;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //combine all
  itemDiv.appendChild(wikiHeader);
  contentDiv.appendChild(textPara);
  contentDiv.appendChild(imgDiv);
  imgDiv.appendChild(wikiImg);
  itemDiv.appendChild(contentDiv);
  containerDiv.appendChild(itemDiv);

  //add to webpage
  document.body.appendChild(containerDiv);
}
