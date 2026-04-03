import { useState, useCallback, memo } from 'react';
import { AnimatePresence, m as M } from 'framer-motion';
import { downloadFile } from '../utils/imageConverter';
import './ImageGallery.css';

const ImageGallery = memo(function ImageGallery({ images, onDownloadAll, onClear }) {
    const [lightboxImage, setLightboxImage] = useState(null);

    const handleDownload = useCallback((image) => {
        downloadFile(image.pngBlob, image.filename);
    }, []);

    const handleImageClick = useCallback((image) => {
        setLightboxImage(image);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxImage(null);
    }, []);

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    if (images.length === 0) {
        return null;
    }

    return (
            <>
            <M.div
                className="gallery-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="gallery-header">
                    <div className="gallery-title">
                        <h2>Converted Images</h2>
                        <span className="count-badge">{images.length} {images.length === 1 ? 'image' : 'images'}</span>
                    </div>
                    <div className="gallery-actions">
                        <button onClick={onDownloadAll} className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download All
                        </button>
                        <button onClick={onClear} className="btn btn-secondary">
                            Clear All
                        </button>
                    </div>
                </div>

                <M.div
                    className="image-grid"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    <AnimatePresence>
                        {images.map((image, index) => (
                            <M.div
                                key={index}
                                className="image-card"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            >
                                <div className="image-preview" onClick={() => handleImageClick(image)}>
                                    <img
                                        src={image.previewUrl}
                                        alt={image.filename}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="image-overlay">
                                        <span className="zoom-icon">🔍</span>
                                    </div>
                                </div>

                                <div className="image-info">
                                    <div className="image-filename" title={image.filename}>
                                        {image.filename}
                                    </div>

                                    {image.metadata && image.metadata.formatted !== 'Unknown Date' && (
                                        <div className="image-metadata">
                                            <span className="metadata-icon">📅</span>
                                            <span>{image.metadata.formatted}</span>
                                        </div>
                                    )}

                                    <div className="image-size-info">
                                        <span className="size-label">Original:</span>
                                        <span className="size-value">{formatFileSize(image.originalSize)}</span>
                                        <span className="size-separator">→</span>
                                        <span className="size-label">PNG:</span>
                                        <span className="size-value">{formatFileSize(image.pngSize)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDownload(image)}
                                    className="download-btn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    Download
                                </button>
                            </M.div>
                        ))}
                    </AnimatePresence>
                </M.div>
            </M.div>

            <AnimatePresence>
                {lightboxImage && (
                    <M.div
                        className="lightbox"
                        onClick={closeLightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <M.div
                            className="lightbox-content"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <button className="lightbox-close" onClick={closeLightbox}>
                                ✕
                            </button>
                            <img
                                src={lightboxImage.previewUrl}
                                alt={lightboxImage.filename}
                                loading="eager"
                                decoding="async"
                            />
                            <div className="lightbox-info">
                                <p className="lightbox-filename">{lightboxImage.filename}</p>
                                {lightboxImage.metadata && (
                                    <p className="lightbox-metadata">{lightboxImage.metadata.formatted}</p>
                                )}
                            </div>
                        </M.div>
                    </M.div>
                )}
            </AnimatePresence>
        </>
    );
});

export default ImageGallery;
