const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes= [];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}

function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote(){
    showLoadingSpinner();
    
    //Picking a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if Athour is blank(null) and replace it with 'unknown'
    quote.author?authorText.textContent=quote.author:authorText.textContent='Unknown'

    //Check quite_length to determine the styling
    quote.text.length>120?quoteText.classList.add('long-quote'):quoteText.classList.remove('long-quote');

    //Set quote Hide Loader
    quoteText.textContent=quote.text;
    removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes(){

    showLoadingSpinner();
    const apiUrl="https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try{
        const resp = await fetch(apiUrl);
        apiQuotes= await resp.json();
        newQuote();
    }catch(error){
        // Catch Error
        alert(`Oops! Something went wrong.. ${error.message}, ${error.stack}`);
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();

