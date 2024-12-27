import React from 'react';

interface FormattedTextProps {
    content: string;
    format?: 'paragraph' | 'bulletPoints' | 'numbered';
}

const FormattedText: React.FC<FormattedTextProps> = ({ content, format = 'paragraph' }) => {
    const formatText = (text: string) => {
        // Remove markdown formatting
        const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '').trim();

        // Split by double newlines to separate paragraphs
        const paragraphs = cleanText.split(/\n\n+/);

        switch (format) {
            case 'bulletPoints':
                return (
                    <ul className="formatted-list">
                        {paragraphs.map((paragraph, idx) => (
                            <li key={idx} className="formatted-list-item">
                                {paragraph.trim()}
                            </li>
                        ))}
                    </ul>
                );
            case 'numbered':
                return (
                    <ol className="formatted-list">
                        {paragraphs.map((paragraph, idx) => (
                            <li key={idx} className="formatted-list-item">
                                {paragraph.trim()}
                            </li>
                        ))}
                    </ol>
                );
            default:
                return (
                    <div className="formatted-paragraphs">
                        {paragraphs.map((paragraph, idx) => (
                            <p key={idx} className="formatted-paragraph">
                                {paragraph.trim()}
                            </p>
                        ))}
                    </div>
                );
        }
    };

    return <div className="formatted-content">{formatText(content)}</div>;
};

export default FormattedText;
