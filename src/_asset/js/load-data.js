let beer = {
  list: [],
};

let beerObservable = new Proxy(beer, {
  set: (target, key, value) => {
    target[key] = value;
    renderCardList(value);
    return true;
  },
});

const limit = 20;
const renderCardList = (arr) => {
  console.log(arr);
  const beer = document.querySelector(".beer");

  beer.innerHTML = "";

  const grid = document.querySelector(".grid");

  const favouriteData = JSON.parse(window.localStorage.getItem("favourite"));

  arr.slice(0, limit).forEach((card) => {
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

    const cardIcon = document.createElement("div");
    cardIcon.classList.add(
      `card__icon--${favouriteData.includes(card.id) ? "thick" : "thin"}`
    );
    console.log(favouriteData);

    cardIcon.addEventListener("click", () => {
      console.log(card.id);
      const savedData =
        JSON.parse(window.localStorage.getItem("favourite")) || [];
      const favouriteList = favouriteData.includes(card.id)
        ? savedData.filter((x) => x !== card.id)
        : [...savedData, card.id];

      window.localStorage.setItem(
        "favourite",
        JSON.stringify([...new Set(favouriteList)])
      );
    });

    cardImageWrapper.appendChild(cardImage);
    cardImageWrapper.appendChild(cardIcon);
    cardElement.appendChild(cardName);
    cardElement.appendChild(cardDescription);
    cardElement.appendChild(cardImageWrapper);
    beer.appendChild(cardElement);
  });
};

export const getData = () => {
  fetch("https://api.punkapi.com/v2/beers/")
    .then((res) => res.json())
    .then((res) => {
      beerObservable.list = res;
    });
};
