import { useState } from 'react';
import PlusIcon from "./PlusIcon.jsx";
import ExperienceSection from './ExperienceSection.jsx';
import "../styles/Experience.css";

export default function Experience() {
    const [experienceIds, setExperienceIds] = useState(() => [
        crypto.randomUUID()
    ]);

    const addExperience = () => {
        setExperienceIds([...experienceIds, crypto.randomUUID()]);
    }

    const removeExperience = (id) => {
        if (id === experienceIds[0]) { 
            return; 
        }
        setExperienceIds(experienceIds.filter(experienceId => experienceId !== id));
    }

    return (
        <fieldset className="experience-fields">
            <legend>Experience</legend>
            {experienceIds.map((experienceId, index) => 
                <ExperienceSection key={experienceId} 
                    eId={experienceId} 
                    handleRemoval={() => removeExperience(experienceId)}
                    deletable={index > 0}
                />
            )}
            <button type="button" className="clickable" onClick={addExperience}>
                <PlusIcon width={20} height={20} />
            </button>
        </fieldset>
    );
}