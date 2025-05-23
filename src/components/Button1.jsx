import "../assets/css/Button1.css";

//props에 따라 각각 다르게 동작하도록 만들기 
const Button1 = ({ text, type, icon, onClick }) => {
    return (
      <button 
        onClick={onClick} 
        className={`Button Button_${type}`}>
        {icon && <img src={icon} alt="icon" className="button-icon" />}
        {text && <span>{text}</span>}
      </button>
    );
  };

export default Button1;