import { useState } from 'react';
import EducationSection from './EducationSection.jsx';
import PlusIcon from "./PlusIcon.jsx";
import "../styles/Education.css";

export default function Education() {
    const [educationIds, setEducationIds] = useState(() => [
        crypto.randomUUID()
    ]);

    const addEducation = () => {
        setEducationIds([...educationIds, crypto.randomUUID()]);
    }

    const removeEducation = (id) => {
        if (id === educationIds[0]) { 
            return; 
        }
        setEducationIds(educationIds.filter(educationId => educationId !== id));
    }

    return (
        <fieldset className="education-fields">
            <legend>Education</legend>
            {educationIds.map((educationId, index) => 
                <EducationSection key={educationId} 
                    eId={educationId} 
                    handleRemoval={() => removeEducation(educationId)}
                    deletable={index > 0}
                />
            )}
            <button type="button" className="clickable" onClick={addEducation}>
                <PlusIcon width={20} height={20} />
            </button>
        </fieldset>
    );
    
}