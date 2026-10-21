// import { useState } from 'react';
// import "../styles/DateRange.css";

// export default function DateRange({ id }) {
//     const [isChecked, setIsChecked] = useState(false);

//     return (
//         <div className="date-range">
//             <div className="from-date">
//                 <label htmlFor={`from-${id}`}>From:</label>
//                 <input 
//                     type="date" 
//                     id={`from-${id}`}
//                     name={`from-${id}`}
//                     required={true}
//                 />
//             </div>
//             <div className="to-date">
//                 <label htmlFor={`to-${id}`}>To:</label>
//                 <input 
//                     type="date" 
//                     id={`to-${id}`}
//                     name={`to-${id}`}
//                     disabled={isChecked}
//                     required={true}
//                 />
//             </div>
//             <div>
//                 <input 
//                     type="checkbox" 
//                     id={`checkbox-${id}`}
//                     name={`checkbox-${id}`} 
//                     value="present"
//                     checked={isChecked}
//                     onChange={(event) => setIsChecked(event.target.checked)}
//                 />
//                 <label htmlFor={`checkbox-${id}`}>Present</label>
//             </div>
//         </div>
//     )
// }

import { useState } from 'react';
import ErrorIcon from './ErrorIcon.jsx';
import "../styles/DateRange.css";

export default function DateRange({ 
    id,
    initialFrom = "",
    initialTo = "",
    initialPresent = false
}) {
    const [isChecked, setIsChecked] = useState(false);
    const [fromError, setFromError] = useState(false);
    const [toError, setToError] = useState(false);

    return (
        <div className="date-range">
            <div className="from-date">
                <label htmlFor={`from-${id}`}>From:</label>
                <div className="from-and-error">
                    <input
                        type="date"
                        id={`from-${id}`}
                        name={`from-${id}`}
                        required
                        className={fromError ? "invalid" : ""}
                        onInvalid={() => setFromError(true)}
                        onChange={(e) => {
                            if (fromError) {
                                setFromError(!e.target.checkValidity());
                            }
                        }}
                    />

                    {fromError &&
                        <p className="error-message">
                            <ErrorIcon />
                            Please enter a start date.
                        </p>
                    }
                </div>

            </div>

            <div className="to-date">
                <label htmlFor={`to-${id}`}>To:</label>
                <div className="to-and-error">
                    <input
                        type="date"
                        id={`to-${id}`}
                        name={`to-${id}`}
                        disabled={isChecked}
                        required
                        className={toError ? "invalid" : ""}
                        onInvalid={() => setToError(true)}
                        onChange={(e) => {
                            if (toError) {
                                setToError(!e.target.checkValidity());
                            }
                        }}
                    />

                    {toError && !isChecked &&
                        <p className="error-message">
                            <ErrorIcon />
                            Please enter an end date.
                        </p>
                    }
                </div>
            </div>

            <div>
                <input
                    type="checkbox"
                    id={`checkbox-${id}`}
                    name={`checkbox-${id}`}
                    value="present"
                    checked={isChecked}
                    onChange={(e) => {
                        setIsChecked(e.target.checked);

                        if (e.target.checked) {
                            setToError(false);
                        }
                    }}
                />

                <label htmlFor={`checkbox-${id}`}>Present</label>
            </div>
        </div>
    );
}