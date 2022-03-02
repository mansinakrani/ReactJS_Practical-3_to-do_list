import React from "react";
//import classes from "./card.css";
import classes from "./card.css";
const Card = (props: { className: any; children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};
export default Card;