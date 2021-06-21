let beer = {
  list: [],
};

const renderCardList = (arr) => {
  console.log(arr);
  const grid = document.querySelector(".grid");

  arr.slice(0, 10).forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const cardName = document.createElement("div");
    cardName.textContent = card.name;
    cardName.classList.add("card__name");

    const cardDescription = document.createElement("div");
    cardDescription.textContent = card.description;
    cardDescription.classList.add("card__description");

    const cardImageWrapper = document.createElement("div");
    cardImageWrapper.classList.add("card__wrapper");

    const cardImage = document.createElement("div");
    cardImage.classList.add("card__image");
    cardImage.style.backgroundImage = `url(${card.image_url})`;

    cardImageWrapper.appendChild(cardImage);
    cardElement.appendChild(cardName);
    cardElement.appendChild(cardDescription);
    cardElement.appendChild(cardImageWrapper);
    grid.appendChild(cardElement);
  });
};

let beerObservable = new Proxy(beer, {
  set: (target, key, value) => {
    renderCardList(value);
    target[key] = value;
    return true;
  },
});

export const getData = () => {
  fetch("https://api.punkapi.com/v2/beers/")
    .then((res) => res.json())
    .then((res) => {
      beerObservable.list = res;
    });
};
