import { useState } from 'react';
import LabeledInput from './LabeledInput.jsx';
import AddFieldSelect from './AddFieldSelect.jsx';
import "../styles/GeneralInformation.css";

export default function GeneralInformation() {
    const [genInfoId] = useState(() => crypto.randomUUID());

    const optionalFields = [
        "LinkedIn",
        "GitHub",
        "Personal Website",
        "City, State/Province"
    ];

    const [fieldsPlaced, setFieldsPlaced] = useState([]);

    const handleAddition = (fieldToAdd) => {
        setFieldsPlaced([...fieldsPlaced, fieldToAdd]);
    };

    const handleDeletion = (fieldToDelete) => {
        setFieldsPlaced(fieldsPlaced.filter((field) => field !== fieldToDelete));
    };

    const availableFields = optionalFields.filter(
        field => !fieldsPlaced.includes(field)
    );

    return (
        <fieldset className="general-info-fields">
            <legend>General Information</legend>
            <LabeledInput 
                key={`name-${genInfoId}`}
                id={`name-${genInfoId}`} 
                label="Name" 
                fieldName="name"
                required
                errorMessage="Please enter your name."
            />
            <LabeledInput 
                key={`email-${genInfoId}`}
                id={`email-${genInfoId}`} 
                label="Email" 
                fieldName="email"
                inputType="email"
                required
                errorMessage="Please enter your email."
            />

            <LabeledInput 
                key={`phone-number-${genInfoId}`}
                id={`phone-number-${genInfoId}`} 
                label="Phone Number" 
                fieldName="phone"
                inputType="tel" 
                required
                errorMessage="Please enter your phone number."
            />

            {fieldsPlaced.map(field => 
                <LabeledInput
                    key={field}
                    id={`${field}-${genInfoId}`}
                    label={field}
                    fieldName={field}
                    handleDelete={() => handleDeletion(field)}
                    trashWidth={17.2}
                    trashHeight={20}
                    deletable={true}
                    required
                    errorMessage={`Please enter your ${field}.`}
                />
            )}

            <AddFieldSelect 
                labelName="Add Field"
                fields={availableFields}
                handleAdd={handleAddition}
            />
        </fieldset>
    );
}