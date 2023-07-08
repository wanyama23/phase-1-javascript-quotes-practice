const likesNode = document.querySelector("#quote-list");
const formNode = document.querySelector("#new-quote-form");
const newQuoteNode = document.querySelector("#new-quote");
const authorNode = document.querySelector("#author");

const fetchQuotesFromServer = () => {
  fetch("http://localhost:3000/quotes?_embed=likes")
    // get method.
    .then((res) => res.json())
    .then((data) => buildQuotesOnDom(data));
};

const postQuoteToServer = (quote) => {
  fetch("http://localhost:3000/quotes", {
    method: "POST",
    body: JSON.stringify(quote),
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  }).then(async function (res) {
    if (res.status === 201) {
      const quote = await res.json();
      createQuoteNode(quote);
    }
  });
};

const createQuoteNode = (quote) => {
  const li = document.createElement("li");
  const blockquote = document.createElement("blockquote");
  const p = document.createElement("p");
  const br = document.createElement("br");
  const footer = document.createElement("footer");
  const successButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const span = document.createElement("span");

  li.classList.add("quote-card");
  blockquote.classList.add("blockquote");
  p.classList.add("mb-0");
  p.textContent = quote.quote;
  footer.classList.add("blockquote-footer");
  footer.textContent = quote.author;
  successButton.classList.add("btn-success");
  successButton.textContent = "Likes: ";
  span.textContent = "likes" in quote ? quote.likes.length : 0;
  deleteButton.classList.add("btn-danger");
  deleteButton.textContent = "Delete";

  blockquote.appendChild(p);
  blockquote.appendChild(footer);
  blockquote.appendChild(br);
  successButton.append(span);
  blockquote.appendChild(successButton);
  blockquote.appendChild(deleteButton);
  li.appendChild(blockquote);
  likesNode.appendChild(li);
};

const buildQuotesOnDom = (quotes) => {
  quotes.forEach((quote) => {
    createQuoteNode(quote);
  });
};

const handleQuoteSubmission = (e) => {
  e.preventDefault();
  const newQuote = newQuoteNode.value;
  const author = authorNode.value;
  const quote = {
    quote: newQuote,
    author: author,
  };
  postQuoteToServer(quote);
};

const init = () => {
  fetchQuotesFromServer();
};

formNode.addEventListener("submit", handleQuoteSubmission);
window.onload = init;
