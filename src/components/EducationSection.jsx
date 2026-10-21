import LabeledInput from './LabeledInput.jsx';
import DateRange from './DateRange.jsx';
import TrashIcon from './TrashIcon.jsx';
import "../styles/EducationSection.css";

export default function EducationSection({ eId, handleRemoval, deletable = false }) {
    return (
        <div className="education-section" data-education-entry>
            <div className="fields-and-trash">
                <div className="fieldset-fields">
                    <LabeledInput 
                        key={`${eId}-school-name`} 
                        id={`${eId}-school-name`} 
                        label="School Name"
                        fieldName="schoolName"
                        required
                        errorMessage="Please enter your school name."
                    />
                    <LabeledInput 
                        key={`${eId}-credential`} 
                        id={`${eId}-credential`} 
                        label="Credential"
                        fieldName="credential"
                        required
                        errorMessage="Please enter your credential."
                    />
                    <LabeledInput 
                        key={`${eId}-field-of-study`}
                        id={`${eId}-field-of-study`} 
                        label="Field of Study"
                        fieldName="fieldOfStudy"
                        required
                        errorMessage="Please enter your field of study."
                    />
                </div>
                <button 
                    type="button" 
                    className="clickable" 
                    onClick={handleRemoval}>
                    {deletable &&
                        <TrashIcon />
                    }
                </button>
            </div>

            <DateRange id={eId} />
            
        </div>
    );
}