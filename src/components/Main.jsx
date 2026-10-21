import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import Form from './Form.jsx';
import Resume from './Resume.jsx';
import "../styles/Main.css";

export default function Main() {
    const [resumeData, setResumeData] = useState(null);
    const resumeContainerRef = useRef(null);

    const downloadResume = async () => {
        const resumePage = resumeContainerRef.current.querySelector(
            ".resume-page"
        );

        try {
            const canvas = await html2canvas(resumePage, {
                scale: 2,
                backgroundColor: "#FFFFFF",

                onclone: (clonedDocument) => {
                    const clonedPage = clonedDocument.querySelector(
                        ".resume-page"
                    );

                    clonedPage.style.borderColor = "transparent";
                }
            });

            const image = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "pt",
                format: "letter"
            });

            pdf.addImage(image, "PNG", 0, 0, 612, 792);

            pdf.save("resume.pdf");

        } catch (error) {
            console.error("Failed to download resume:", error);
        }
    };

    return (
        <main>
            <Form onSubmitResume={setResumeData} />

            <div className="resume-container" ref={resumeContainerRef}>
                <Resume data={resumeData} />

                <button
                    type="button"
                    className="download-btn clickable"
                    onClick={downloadResume}
                    disabled={!resumeData}
                >
                    Download
                </button>
            </div>
        </main>
    );
}