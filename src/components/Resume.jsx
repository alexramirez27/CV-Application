import "../styles/Resume.css";

function formatDate(date) {
    if (!date) return "";

    const [year, month] = date.split("-");

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return `${months[Number(month) - 1]} ${year}`;
}

function formatDateRange(fromDate, toDate, isPresent) {
    const start = formatDate(fromDate);

    if (isPresent) {
        return `${start} – Present`;
    }

    if (fromDate && toDate && fromDate.slice(0, 7) === toDate.slice(0, 7)) {
        return start;
    }

    return `${start} – ${formatDate(toDate)}`;
}

export default function Resume({ data }) {
    const generalInfo = data?.generalInformation;

    const contactFields = generalInfo
        ? [
            generalInfo.email,
            generalInfo.phone,
            generalInfo.LinkedIn,
            generalInfo.GitHub,
            generalInfo["Personal Website"],
            generalInfo["State/Province"]
        ].filter(Boolean)
        : [];

    return (
        <div className="resume-page">
            {generalInfo && (
                <header className="resume-header">
                    <h1>{generalInfo.name}</h1>

                    <div className="resume-contact-info">
                        <div>
                            {contactFields.slice(0, 3).join(" | ")}
                            {contactFields.length > 3 && " |"}
                        </div>

                        {contactFields.length > 3 && (
                            <div>
                                {contactFields.slice(3).join(" | ")}
                            </div>
                        )}
                    </div>
                </header>
            )}
            {data?.education?.length > 0 && (
                <section className="resume-education">
                    <h2>EDUCATION</h2>

                    {data.education.map((entry, index) => (
                        <div className="resume-education-entry" key={index}>
                            <div className="resume-education-details">
                                {entry.credential} in {entry.fieldOfStudy} | {entry.schoolName}
                            </div>

                            <div className="resume-education-date">
                                {formatDateRange(entry.fromDate, entry.toDate, entry.isPresent)}
                            </div>
                        </div>
                    ))}
                </section>
            )}
            {data?.experience?.length > 0 && (
                <section className="resume-experience">
                    <h2>EXPERIENCE</h2>

                    {data.experience.map((entry, index) => (
                        <div className="resume-experience-entry" key={index}>
                            <div className="resume-experience-heading">
                                <div>
                                    {entry.positionTitle} | {entry.companyName}
                                </div>

                                <div className="resume-experience-date">
                                    {formatDateRange(entry.fromDate, entry.toDate, entry.isPresent)}
                                </div>
                            </div>

                            <ul>
                                {entry.bulletPoints.map((point, pointIndex) => (
                                    <li key={pointIndex}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}
            {data?.customSections?.map(section => (
                <section className="resume-custom-section" key={section.id}>
                    <h2>{section.heading.toUpperCase()}</h2>

                    {section.type === "Bullet Points only" ? (
                        <ul>
                            {section.bulletPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    ) : (
                        section.entries.map((entry, index) => (
                            <div className="resume-custom-entry" key={entry.id}>
                                <div className="resume-custom-heading">
                                    <div>
                                        {entry.subheading1} | {entry.subheading2}
                                    </div>

                                    <div className="resume-custom-date">
                                        {formatDateRange(
                                            entry.fromDate,
                                            entry.toDate,
                                            entry.isPresent
                                        )}
                                    </div>
                                </div>

                                <ul>
                                    {entry.bulletPoints.map((point, pointIndex) => (
                                        <li key={pointIndex}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </section>
            ))}
        </div>
    );
}