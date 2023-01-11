const quoteContainer = document.getElementById("quote-container");
const tText = document.getElementById("quote");
const tAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

let apiQuotes = [];

// loading function to show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading function
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// function to show new quote
function newQuote() {
  // here sinceon pressing the button weare bypassing the getQuote function
  loading();

  // to pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // check author field
  if (!quote.author) {
    tAuthor.textContent = "Unknown";
  } else {
    tAuthor.textContent = quote.author;
  }

  // check quote length, for font size
  if (quote.text.length > 90) {
    tText.classList.add("long-quote");
  } else {
    tText.classList.remove("long-quote");
  }
  // set Quote, hide loader so calling complete() function
  complete();
  tText.textContent = quote.text;
}

// get quote from API
async function getQuote() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  //right on this line, i can also attach a proxyUrl for solving cors problem

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // getQuote
  }
}

// to tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=I recently read an encouraging quote, so here it is: 
  
  "${tText.textContent}" - ${tAuthor.textContent}.`;
  window.open(twitterUrl, "_blank");
}

// event listeers
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuote();
