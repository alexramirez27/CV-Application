import { useRef, useState } from 'react';
import ActionButtons from "./ActionButtons.jsx";
import GeneralInformation from "./GeneralInformation.jsx";
import Education from "./Education.jsx";
import Experience from "./Experience.jsx";
import AddSectionModal from "./AddSectionModal.jsx";
import BulletPointsSection from './BulletPointsSection.jsx';
import TrashIcon from './TrashIcon.jsx';
import SubheadingsDateBPs from './SubheadingsDateBPs.jsx';
import PlusIcon from './PlusIcon.jsx';
import "../styles/Form.css";

export default function Form({ onSubmitResume }) {
    const modalRef = useRef(null);
    const [resetKey, setResetKey] = useState(0);
    const [customSections, setCustomSections] = useState([]);

    const addCustomSection = (section) => {
        setCustomSections(prev => [
            ...prev,
            {
                ...section,
                id: crypto.randomUUID(),
                entries: section.type === "Subheading, Date, Bullet Points"
                    ? [{
                        id: crypto.randomUUID(),
                        subheading1: section.subheading1,
                        subheading2: section.subheading2,
                        bulletSubheading: section.bulletSubheading
                    }]
                    : []
            }
        ]);

        modalRef.current.close();
    };

    const addCustomEntry = (sectionId) => {
        setCustomSections(prev =>
            prev.map(section => {
                if (section.id !== sectionId) {
                    return section;
                }

                return {
                    ...section,
                    entries: [
                        ...section.entries,
                        {
                            id: crypto.randomUUID(),
                            subheading1: "",
                            subheading2: "",
                            bulletSubheading: section.bulletSubheading
                        }
                    ]
                };
            })
        );
    };

    const removeCustomEntry = (sectionId, entryId) => {
        setCustomSections(prev =>
            prev.map(section => {
                if (section.id !== sectionId) {
                    return section;
                }

                return {
                    ...section,
                    entries: section.entries.filter(
                        entry => entry.id !== entryId
                    )
                };
            })
        );
    };

    const deleteCustomSection = (id) => {
        setCustomSections(prev =>
            prev.filter(section => section.id !== id)
        );
    };

    const resetToDefault = () => {
        setResetKey(prev => prev + 1);
        setCustomSections([]);
    };

    const clearForm = () => {
        setResetKey(prev => prev + 1);

        setCustomSections(prev =>
            prev.map(section => ({
                ...section,
                subheading1: "",
                subheading2: "",
                fromDate: "",
                toDate: "",
                isPresent: false
            }))
        );
    };

    const closeAddSectionModal = () => {
        modalRef.current.close();
    }

    const openAddSectionModal = () => {
        modalRef.current.showModal();
    };

    const submitForm = (e) => {
        e.preventDefault();

        const isValid = e.currentTarget.checkValidity();

        if (!isValid) {
            return;
        }

        const formData = new FormData(e.currentTarget);

        const education = Array.from(
            e.currentTarget.querySelectorAll("[data-education-entry]")
        ).map(entry => {
            const isPresent = entry.querySelector('input[type="checkbox"]').checked;

            return {
                schoolName: entry.querySelector('[name="schoolName"]').value,
                credential: entry.querySelector('[name="credential"]').value,
                fieldOfStudy: entry.querySelector('[name="fieldOfStudy"]').value,
                fromDate: entry.querySelector('.from-date input').value,
                toDate: isPresent ? null : entry.querySelector('.to-date input').value,
                isPresent
            };
        });

        const experience = Array.from(
            e.currentTarget.querySelectorAll("[data-experience-entry]")
        ).map(entry => {
            const isPresent = entry.querySelector('input[type="checkbox"]').checked;

            const bulletPoints = Array.from(
                entry.querySelectorAll('[name="bulletPoint"]')
            ).map(input => input.value);

            return {
                companyName: entry.querySelector('[name="companyName"]').value,
                positionTitle: entry.querySelector('[name="positionTitle"]').value,
                fromDate: entry.querySelector('.from-date input').value,
                toDate: isPresent ? null : entry.querySelector('.to-date input').value,
                isPresent,
                bulletPoints
            };
        });

        const submittedCustomSections = customSections.map(section => {
            const container = e.currentTarget.querySelector(
                `[data-custom-section="${section.id}"]`
            );

            // Bullet Points only
            if (section.type === "Bullet Points only") {
                const bulletPoints = Array.from(
                    container.querySelectorAll('[name="bulletPoint"]')
                ).map(input => input.value);

                return {
                    ...section,
                    bulletPoints
                };
            }

            // Subheading, Date, Bullet Points
            const entries = Array.from(
                container.querySelectorAll("[data-custom-entry]")
            ).map(entry => {
                const isPresent = entry.querySelector('input[type="checkbox"]').checked;

                const bulletPoints = Array.from(
                    entry.querySelectorAll('[name="bulletPoint"]')
                ).map(input => input.value);

                return {
                    id: entry.dataset.customEntry,
                    subheading1: entry.querySelector('[name="subheading1"]').value,
                    subheading2: entry.querySelector('[name="subheading2"]').value,
                    bulletSubheading: entry.querySelector('[name="bulletSubheading"]').value,
                    fromDate: entry.querySelector('.from-date input').value,
                    toDate: isPresent
                        ? null
                        : entry.querySelector('.to-date input').value,
                    isPresent,
                    bulletPoints
                };
            });

            return {
                ...section,
                entries
            };
        });

        const resumeData = {
            generalInformation: {
                name: formData.get("name"),
                email: formData.get("email"),
                phone: formData.get("phone"),
            },
            education,
            experience,
            customSections: submittedCustomSections
        };

        const optionalFields = [
            "LinkedIn",
            "GitHub",
            "Personal Website",
            "State/Province"
        ];

        optionalFields.forEach(field => {
            if (formData.has(field)) {
                resumeData.generalInformation[field] = formData.get(field);
            }
        });

        onSubmitResume(resumeData);
    };

    return (
        <>
            <form key={resetKey} onSubmit={submitForm} noValidate>
                <h1>Resume Builder Form</h1>
                <ActionButtons 
                    firstBtnName="Reset to Default" 
                    secondBtnName="Add Section" 
                    firstBtnFunction={resetToDefault}
                    secondBtnFunction={openAddSectionModal}
                />

                <GeneralInformation />

                <Education />
                
                <Experience />

                {customSections.map(section =>
                    <fieldset
                        className="custom-section"
                        key={section.id}
                        data-custom-section={section.id}
                    >
                        <legend>{section.heading}</legend>

                        <button
                            type="button"
                            className="clickable"
                            onClick={() => deleteCustomSection(section.id)}
                        >
                            <TrashIcon />
                        </button>
                        
                        {section.type === "Subheading, Date, Bullet Points" ? (
                            <>
                                {section.entries.map((entry, index) => (
                                    <div
                                        className="custom-section-entry"
                                        data-custom-entry={entry.id}
                                        key={entry.id}
                                    >
                                        <SubheadingsDateBPs
                                            sadId={entry.id}
                                            initialValues={entry}
                                            handleRemoval={() =>
                                                removeCustomEntry(section.id, entry.id)
                                            }
                                            deletable={index > 0}
                                        />

                                        <BulletPointsSection
                                            subheading={entry.bulletSubheading}
                                        />
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className="clickable custom-entry-add-btn"
                                    onClick={() => addCustomEntry(section.id)}
                                >
                                    <PlusIcon width={20} height={20} />
                                </button>
                            </>
                        ) : (
                            <BulletPointsSection
                                subheading={section.bulletSubheading}
                            />
                        )}
                    </fieldset>
                )}

                <ActionButtons
                    firstBtnName="Clear"
                    secondBtnName="Submit"
                    firstBtnFunction={clearForm}
                    formSubmitBtn={true}
                />
            </form>

            <AddSectionModal 
                dialogRef={modalRef} 
                cancelFunction={closeAddSectionModal}
                submitFunction={addCustomSection}
            />
        </>
    )
}