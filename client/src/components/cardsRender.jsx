import React from "react";
import Card from "./card";

const CardRender = ({ cards, favs, onHandleFavs }) => {
  return (
    <div className="row">
      {cards?.length > 0 &&
        cards?.map((card) => (
          <Card
            key={card._id}
            card={card}
            favs={favs}
            onHandleFavs={() => onHandleFavs(card._id)}
          />
        ))}
    </div>
  );
};

export default CardRender;
