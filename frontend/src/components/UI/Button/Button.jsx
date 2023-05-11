import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link to={props.url || "#"}>
      <button
        type={props.type || "button"}
        className={`text-xl font-bold text-white
      rounded-lg ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </Link>
  );
};

export default Button;
