"use client";

import { useRef } from 'react';

const CopyButton = () => {
    const copyButtonRef = useRef<HTMLButtonElement>(null);

    const handleCopyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                if (copyButtonRef.current) {
                    copyButtonRef.current.textContent = 'Copied!';
                    setTimeout(() => {
                        if (copyButtonRef.current) {
                            copyButtonRef.current.textContent = 'Copy URL';
                        }
                    }, 2000);
                }
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <button 
            onClick={handleCopyUrl} 
            ref={copyButtonRef} 
            className="ml-4 text-sm text-primary-500 underline"
            title="Copy event URL to clipboard"
        >
            Copy URL
        </button>
    );
};

export default CopyButton;
