import "../styles/ActionButtons.css";

export default function ActionButtons({ 
    firstBtnName, 
    secondBtnName, 
    firstBtnFunction, 
    secondBtnFunction, 
    formSubmitBtn = false
}) {
    return (
        <div className="action-buttons">
            <button 
                type="button"
                className="first-btn clickable" 
                onClick={firstBtnFunction}>
                {firstBtnName}</button>
            <button 
                type={formSubmitBtn ? "submit" : "button"}
                className="second-btn clickable" 
                onClick={secondBtnFunction}>
                {secondBtnName}
            </button>
        </div>
    );
}