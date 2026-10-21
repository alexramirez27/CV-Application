import LabeledInput from "./LabeledInput.jsx";
import TrashIcon from "./TrashIcon.jsx";
import DateRange from "./DateRange.jsx";
import "../styles/SubheadingsDateBPs.css";

export default function SubheadingsDateBPs({ 
    sadId,
    handleRemoval,
    deletable = false,
    initialValues = {},
    showDateRange = true
}) {
    return (
        <div className="subheadings-and-date">
            <div className="fields-and-trash">
                <div className="fieldset-fields">
                    <LabeledInput 
                        id={`${sadId}-subheading-1`} 
                        label="Subheading 1" 
                        fieldName="subheading1"
                        required
                        errorMessage="Please add a subheading."
                        defaultValue={initialValues.subheading1 ?? ""}
                    />
                    <LabeledInput 
                        id={`${sadId}-subheading-2`} 
                        label="Subheading 2" 
                        fieldName="subheading2"
                        required
                        errorMessage="Please add a subheading."
                        defaultValue={initialValues.subheading2 ?? ""}
                    />
                    <LabeledInput 
                        id={`${sadId}-bullet-points-subheading`} 
                        label="Bullet Points Subheading" 
                        fieldName="bulletSubheading"
                        required
                        errorMessage="Please add a bullet points subheading."
                        defaultValue={initialValues.bulletSubheading ?? ""}
                    />
                </div>
                <button type="button" className="clickable" onClick={handleRemoval}>
                    {deletable &&
                        <TrashIcon />
                    }
                </button>
            </div>

            {showDateRange && (
                <DateRange
                    id={sadId}
                    initialFrom={initialValues.fromDate}
                    initialTo={initialValues.toDate}
                    initialPresent={initialValues.isPresent}
                />
            )}
        </div>
    );
}