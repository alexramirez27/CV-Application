export default function ActionButtons({ firstBtnName, secondBtnName }) {
    return (
        <div className="action-buttons">
            <button className="first-btn clickable">{firstBtnName}</button>
            <button className="second-btn clickable">{secondBtnName}</button>
        </div>
    );
}