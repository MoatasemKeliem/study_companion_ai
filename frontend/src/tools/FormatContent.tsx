import type { JSX } from "react";

export const formatContent = (content: string): JSX.Element[] => {
    const parts = content.split(/\*\*(.*?)\*\*/g);

    return parts.map((part, index) => {
        if (index % 2 === 1) {
            return (
                <div key={index}>
                    <br />
                    <h4 > {part} </h4>
                    <br />
                </div>
            );
        } else {
            return <span key={index}> {part} </span>;
        }
    });
};
