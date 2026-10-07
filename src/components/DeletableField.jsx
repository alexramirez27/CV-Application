import TrashIcon from "./TrashIcon.jsx";

export default function DeletableField({ label, deletable = false }) {
    return (
        <div class="deletable-field">
            <label>{label}</label>
            <input type="text"></input>
            {deletable && <TrashIcon />}
        </div>
    );
}