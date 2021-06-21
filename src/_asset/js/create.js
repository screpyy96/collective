const favouriteData = JSON.parse(window.localStorage.getItem("favourite"));

const createCardElement = (id) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.id = `card-${id}`;
  return cardElement;
};

const createCardName = (name) => {
  const cardName = document.createElement("div");
  cardName.textContent = name;
  cardName.classList.add("card__name");
  return cardName;
};

const createCardDescription = (description) => {
  const cardDescription = document.createElement("div");
  cardDescription.textContent = description;
  cardDescription.classList.add("card__description");
  return cardDescription;
};

const createCardImageWrapper = () => {
  const cardImageWrapper = document.createElement("div");
  cardImageWrapper.classList.add("card__wrapper");
  return cardImageWrapper;
};

const createCardImage = (imageUrl) => {
  const cardImage = document.createElement("div");
  cardImage.classList.add("card__image");
  cardImage.style.backgroundImage = `url(${imageUrl})`;
  return cardImage;
};

const createCardIcon = (id) => {
  const cardIcon = document.createElement("div");
  cardIcon.id = id;
  cardIcon.classList.add(
    `card__icon--${
      favouriteData !== null && favouriteData.includes(id) ? "thick" : "thin"
    }`
  );
  return cardIcon;
};

const iconClickListener = (e) => {
  const { id } = e.target;
  const favouriteData = JSON.parse(window.localStorage.getItem("favourite"));
  e.target.classList.toggle("card__icon--thick");
  e.target.classList.toggle("card__icon--thin");

  const favouriteList = favouriteData.includes(id)
    ? favouriteData.filter((x) => x !== id)
    : [...favouriteData, id];

  window.localStorage.setItem(
    "favourite",
    JSON.stringify([...new Set(favouriteList)])
  );
};

export default {
  createCardElement,
  createCardImage,
  createCardName,
  createCardImageWrapper,
  iconClickListener,
  createCardIcon,
  createCardDescription,
};
