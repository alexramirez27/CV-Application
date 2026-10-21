import { useState } from "react";
import "../styles/AddFieldSelect.css";

export default function AddFieldSelect({ labelName, fields, handleAdd }) {
    const [selectedField, setSelectedField] = useState("");

    const handleClick = () => {
        if (!selectedField) { 
            return; 
        }
        handleAdd(selectedField);
        setSelectedField("");
    };

    return (
        <div className="add-field-select">
            <label>{`${labelName}:`}</label>
            <select
                value={selectedField}
                onChange={(event) => setSelectedField(event.target.value)}
            >
                <option value="" disabled>Select a field...</option>
                {fields.map((field) => (
                    <option key={field} value={field}>
                        {field}
                    </option>
                ))}
            </select>
            <button 
                type="button" 
                className="clickable regular-btn"
                onClick={handleClick}
            >
                Add
            </button>
        </div>
    );
}