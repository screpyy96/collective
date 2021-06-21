import { createCard } from "./card";

const maxElements = 25;

let beer = {
  list: [],
  limit: 0,
};

let beerObservable = new Proxy(beer, {
  set: (target, key, value) => {
    target[key] = value;
    if (key === "limit") {
      // eslint-disable-next-line no-use-before-define
      renderCardList(value);
    }
    return true;
  },
});

const loadMoreBeers = () => {
  if (beer.limit < maxElements - 10) {
    beerObservable.limit = beer.limit + 10;
  }
  // eslint-disable-next-line no-use-before-define
  else {
    beerObservable.limit = maxElements;
  }
};

const button = document.querySelector(".button__load-more");

button.addEventListener("click", loadMoreBeers);

const renderCardList = (limit) => {
  const beerElement = document.querySelector(".beer");

  beerElement.innerHTML = "";

  beer.list.slice(0, limit).forEach((card) => {
    const cardElement = createCard(card);
    beerElement.appendChild(cardElement);
  });
};

export const getData = () => {
  fetch("https://api.punkapi.com/v2/beers/")
    .then((res) => res.json())
    .then((res) => {
      beerObservable.list = res;
      beerObservable.limit = 10;
    });
};
