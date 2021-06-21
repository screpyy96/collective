import create from "./create";

export const createCard = (card) => {
  const cardElement = create.createCardElement(card.id);
  const cardName = create.createCardName(card.name);
  const cardDescription = create.createCardDescription(card.description);
  const cardImageWrapper = create.createCardImageWrapper();
  const cardImage = create.createCardImage(card.image_url);
  const cardIcon = create.createCardIcon(card.id);

  cardIcon.addEventListener("click", create.iconClickListener);
  cardImageWrapper.appendChild(cardImage);
  cardImageWrapper.appendChild(cardIcon);
  cardElement.appendChild(cardName);
  cardElement.appendChild(cardDescription);
  cardElement.appendChild(cardImageWrapper);

  return cardElement;
};
