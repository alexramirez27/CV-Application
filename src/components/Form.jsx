import ActionButtons from "./ActionButtons.jsx";

export default function Form() {
    return (
        <form>
            <h1>Resume Builder Form</h1>
            <ActionButtons 
                firstBtnName="Reset to Default" 
                secondBtnName="Add Section" 
            />
        </form>
    )
}