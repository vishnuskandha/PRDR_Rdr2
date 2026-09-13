import { useState, useRef, memo } from 'react';
import { isPRDRFileName } from '../utils/fileValidation';
import './FileUploader.css';

const FileUploader = memo(function FileUploader({ onFilesSelected }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileInput = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
        e.target.value = '';
    };

    const handleFiles = (files) => {
        const prdrFiles = files.filter(file => isPRDRFileName(file.name));

        if (prdrFiles.length === 0) {
            alert('No PRDR files found. Please select PRDR files (files starting with "PRDR" without a file extension).');
            return;
        }

        if (prdrFiles.length < files.length) {
            alert(`Found ${prdrFiles.length} PRDR files out of ${files.length} selected files.`);
        }

        onFilesSelected(prdrFiles);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="file-uploader-container">
            <div
                className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                    accept="*"
                />

                <div className="upload-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                </div>

                <h3>Drag & Drop PRDR Files</h3>
                <p>or click to browse</p>

                <div className="file-info">
                    <span className="info-badge">Supports multiple files</span>
                    <span className="info-badge">PRDR format only</span>
                </div>
            </div>

            <div className="instructions">
                <h4>Where to find PRDR files?</h4>
                <p className="path-text">
                    <code>Documents\Rockstar Games\Red Dead Redemption 2\Profiles\[YourProfile]\</code>
                </p>
                <p className="tip">PRDR files start with "PRDR" and have no file extension</p>
            </div>
        </div>
    );
});

export default FileUploader;
