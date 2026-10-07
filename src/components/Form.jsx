import ActionButtons from "./ActionButtons.jsx";
import DeletableField from "./DeletableField.jsx";

export default function Form() {
    return (
        <form>
            <h1>Resume Builder Form</h1>
            <ActionButtons 
                firstBtnName="Reset to Default" 
                secondBtnName="Add Section" 
            />

            <h2>General Information</h2>
            <DeletableField label="Name:"/>
            <DeletableField label="Email:"/>
            <DeletableField label="Phone Number:"/>
            <DeletableField label="LinkedIn:" deletable={true}/>

            <h2>Education</h2>
            <DeletableField label="School Name:" />
            <DeletableField label="Credential:" />
            <DeletableField label="Field of Study:" />

            <h2>Experience</h2>
            <DeletableField label="Company Name:" />
            <DeletableField label="Position Title:" />

            <ActionButtons 
                firstBtnName="Reset"
                secondBtnName="Submit"
            />
        </form>
    )
}