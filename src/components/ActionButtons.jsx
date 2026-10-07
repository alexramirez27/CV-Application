export default function ActionButtons({ firstBtnName, secondBtnName }) {
    return (
        <div className="action-buttons">
            <button type="button" className="first-btn clickable">{firstBtnName}</button>
            <button type="button" className="second-btn clickable">{secondBtnName}</button>
        </div>
    );
}