import { useState } from 'react';
import PlusIcon from "./PlusIcon.jsx";
import LabeledInput from './LabeledInput.jsx';
import "../styles/BulletPointsSection.css";

export default function BulletPointsSection({ subheading }) {
    const [labelIds, setLabelIds] = useState([crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()]);

    const addLabel = () => {
        if (labelIds.length < 5) {
            setLabelIds([...labelIds, crypto.randomUUID()]);
        }
    }

    const removeLabel = (id) => {
        setLabelIds(labelIds.filter(labelId => labelId !== id));
    }

    return (
        <div className="bullet-points-section">
            <div className="bullet-points-heading">
                <h2>{`${subheading}:`}</h2>
                <button type="button" className="clickable" onClick={addLabel}>
                    <PlusIcon width={16} height={16} />
                </button>
            </div>
            {labelIds.map((labelId, index) => 
                <LabeledInput 
                    key={labelId} 
                    id={labelId} 
                    label="bullet point" 
                    fieldName="bulletPoint"
                    handleDelete={() => removeLabel(labelId)} 
                    trashWidth={17.2}
                    trashHeight={20}
                    showLabel={false} 
                    deletable={index > 2}
                    errorMessage="Please enter a bullet point."
                    required
                />
            )}
        </div>
    );
}