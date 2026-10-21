import { useState } from 'react';
import LabeledInput from "./LabeledInput.jsx";
import AddFieldSelect from "./AddFieldSelect.jsx";
import ActionButtons from "./ActionButtons.jsx";
import SubheadingsDateBPs from './SubheadingsDateBPs.jsx';
import "../styles/AddSectionModal.css";

export default function AddSectionModal({ dialogRef, cancelFunction, submitFunction }) {
    const [addSectionModalId] = useState(() => crypto.randomUUID());
    const [modalResetKey, setModalResetKey] = useState(0);

    const availableOptions = [
        "Bullet Points only",
        "Subheading, Date, Bullet Points"
    ];

    const [optionPicked, setOptionPicked] = useState("none");

    const handleAddition = (option) => {
        setOptionPicked(option);
    };

    const handleDeletion = () => {
        setOptionPicked("none");
    };

    const handleBackdropClick = (e) => {
        const dialogDimensions = dialogRef.current.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            dialogRef.current.close();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (!form.checkValidity()) return;
        if (optionPicked === "none") return;

        const inputs = form.querySelectorAll('input[type="text"]');

        const newSection = {
            heading: inputs[0].value.trim(),
            type: optionPicked
        };

        if (optionPicked === "Bullet Points only") {
            newSection.bulletSubheading = inputs[1].value.trim();
        } else {
            newSection.subheading1 = inputs[1].value.trim();
            newSection.subheading2 = inputs[2].value.trim();
            newSection.bulletSubheading = inputs[3].value.trim();
        }

        submitFunction(newSection);

        setOptionPicked("none");
        setModalResetKey(prev => prev + 1);
    };

    return (
        <dialog ref={dialogRef} onClick={handleBackdropClick}>
            <form key={modalResetKey} onSubmit={handleSubmit} noValidate className="modal-form">
                <h2>Add Section</h2>
                <LabeledInput 
                    key={`${addSectionModalId}-heading`} 
                    id={`${addSectionModalId}-heading`} 
                    label="Heading" 
                    required={true}
                    errorMessage="Please add a heading."
                />

                {optionPicked === "Bullet Points only" &&
                    <LabeledInput 
                        key={`${addSectionModalId}-bullet-points-only`}
                        id={`${addSectionModalId}-bullet-points-only`}
                        label="Bullet Points Subheading"
                        handleDelete={handleDeletion}
                        trashWidth={17.2}
                        trashHeight={20}
                        deletable={true}
                        required={true}
                        errorMessage="Please add a bullet points subheading."
                    />
                }

                {optionPicked === "Subheading, Date, Bullet Points" &&
                    <SubheadingsDateBPs 
                        sadId={addSectionModalId}
                        handleRemoval={handleDeletion}
                        deletable={true}
                        showDateRange={false}
                    />
                }

                {optionPicked === "none" &&
                    <AddFieldSelect 
                        labelName="Section Type"
                        fields={availableOptions}
                        handleAdd={handleAddition}
                    />
                }
                
                <ActionButtons 
                    firstBtnName="Cancel"
                    secondBtnName="Add"
                    firstBtnFunction={cancelFunction}
                    formSubmitBtn={true}
                />
            </form>
        </dialog>
    );
}