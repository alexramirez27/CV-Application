import { useState } from 'react';
import TrashIcon from "./TrashIcon.jsx";
import ErrorIcon from './ErrorIcon.jsx';
import "../styles/LabeledInput.css";

export default function LabeledInput({
    id, 
    label,
    fieldName, 
    handleDelete,
    trashWidth, 
    trashHeight, 
    showLabel = true,
    deletable = false, 
    required = false,
    inputType = "text",
    errorMessage,
    defaultValue = ""
}) {
    const [errorStatus, setErrorStatus] = useState(false);
    const [hasBlurred, setHasBlurred] = useState(false);

    const handleError = (e) => {
        const input = e.target;

        if (input.value === "") {
            setErrorStatus(false);
            setHasBlurred(false);
        } else if (hasBlurred || errorStatus) {
            const isInvalid = !input.checkValidity();
            setErrorStatus(isInvalid);

            if (!isInvalid) {
                setHasBlurred(false);
            }
        }
    };

    const handleBlur = (e) => {
        const input = e.target;

        if (input.value === "") {
            setErrorStatus(false);
            setHasBlurred(false);
        } else {
            setHasBlurred(true);
            setErrorStatus(!input.checkValidity());
        }
    };

    return (
        <div className="labeled-input-and-error">
            <div className="labeled-input">
                {showLabel &&
                    <label 
                        htmlFor={`${label.toLowerCase().split(' ').join('-')}-${id}`}>
                        {`${label}:`}
                    </label>
                }
                <input 
                    type={inputType} 
                    id={`${label.toLowerCase().split(' ').join('-')}-${id}`} 
                    className={errorStatus ? "invalid" : ""}
                    name={fieldName ?? `${label.toLowerCase().split(' ').join('-')}-${id}`}
                    required={required}
                    onChange={handleError} 
                    onBlur={handleBlur}
                    onInvalid={() => setErrorStatus(true)}
                    defaultValue={defaultValue}
                />
                {deletable && 
                    <button 
                        type="button" 
                        className="clickable field-trash" 
                        onClick={handleDelete}
                    >
                        <TrashIcon 
                            width={trashWidth} 
                            trashHeight={trashHeight} 
                        />
                    </button>
                }
            </div>
            {errorStatus &&
                <p className="error-message">
                    <ErrorIcon />
                    {errorMessage}
                </p>
            }
        </div>
    );
}