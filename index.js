let inputTextEl = document.getElementById("inputText");
let loaderEl = document.getElementById("loader");
let resultEl = document.getElementById("resultContainer");

function createAndAppendSearchResult(result) {
  let { link, title, description } = result;
  // console.log(result);

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);

  let titleBreakEl = document.createElement("br");
  resultItemEl.appendChild(titleBreakEl);

  let urlEl = document.createElement("a");
  urlEl.classList.add("result-url");
  urlEl.href = link;
  urlEl.target = "_blank";
  urlEl.textContent = link;
  resultItemEl.appendChild(urlEl);

  let lineBreakEl = document.createElement("br");
  resultItemEl.appendChild(lineBreakEl);

  let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("link-description");
  descriptionEl.textContent = description;
  resultItemEl.appendChild(descriptionEl);

  resultEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
  loaderEl.classList.add("hidden");

  for (let result of searchResults) {
    createAndAppendSearchResult(result);
  }
}

function searchWikipedia(event) {
  if (event.key === "Enter") {
    // console.log(event.target.value);
    resultEl.textContent = "";
    loaderEl.classList.remove("hidden");

    let searchInput = event.target.value; // (or inputTextEl.value)
    let url = `https://apis.ccbp.in/wiki-search?search=${searchInput}`;
    // console.log(url);
    let options = {
      method: "GET",
    };

    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        // console.log(jsonData);
        let { search_results } = jsonData;
        // console.log(search_results);
        displayResults(search_results);
      });
  }
}

inputTextEl.addEventListener("keyup", searchWikipedia);
