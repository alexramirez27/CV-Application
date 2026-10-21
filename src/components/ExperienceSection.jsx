import LabeledInput from './LabeledInput.jsx';
import DateRange from './DateRange.jsx';
import TrashIcon from './TrashIcon.jsx';
import BulletPointsSection from './BulletPointsSection.jsx';
import "../styles/ExperienceSection.css";

export default function ExperienceSection({ eId, handleRemoval, deletable = false }) {
    return (
        <div className="experience-section" data-experience-entry>
            <div className="fields-and-trash">
                <div className="fieldset-fields">
                    <LabeledInput 
                        key={`${eId}-company-name`}
                        id={`${eId}-company-name`} 
                        label="Company Name" 
                        fieldName="companyName"
                        required
                        errorMessage="Please enter your company name."
                    />
                    <LabeledInput 
                        key={`${eId}-position-title`}
                        id={`${eId}-position-title`} 
                        label="Position Title" 
                        fieldName="positionTitle"
                        required
                        errorMessage="Please enter your position title."
                    />
                </div>
                <button type="button" className="clickable" onClick={handleRemoval}>
                    {deletable &&
                        <TrashIcon />
                    }
                </button>
            </div>

            <DateRange id={eId} />

            <BulletPointsSection subheading="Responsibilities" />
            
        </div>
    );
}