import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link to={props.url || "#"}>
      <button
        type={props.type || "button"}
        className={`font-bold 
      rounded-lg ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </Link>
  );
};

export default Button;
