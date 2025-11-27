/**
 * Image Converter - JPEG to PNG
 * Converts JPEG blobs to PNG with maximum quality preservation
 */

/**
 * Convert JPEG blob to PNG blob using Canvas API
 * @param {Blob} jpegBlob - JPEG image as Blob
 * @returns {Promise<Blob>} PNG image as Blob
 */
export async function convertJPEGtoPNG(jpegBlob) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(jpegBlob);

        img.onload = () => {
            try {
                // Create canvas with image dimensions
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw image to canvas
                const ctx = canvas.getContext('2d', { alpha: true });
                ctx.drawImage(img, 0, 0);

                // Convert canvas to PNG blob with maximum quality
                canvas.toBlob(
                    (blob) => {
                        URL.revokeObjectURL(url);
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Failed to convert image to PNG'));
                        }
                    },
                    'image/png',
                    1.0 // Maximum quality
                );
            } catch (error) {
                URL.revokeObjectURL(url);
                reject(error);
            }
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load JPEG image'));
        };

        img.src = url;
    });
}

/**
 * Create filename for converted image using metadata
 * @param {Object} metadata - Metadata object with formatted timestamp
 * @param {string} originalName - Original PRDR filename
 * @returns {string} Formatted filename for PNG
 */
export function createFileName(metadata, originalName) {
    if (metadata && metadata.formatted && metadata.formatted !== 'Unknown Date') {
        // Use timestamp + original name
        return `${metadata.formatted} ${originalName}.png`;
    }

    // Fallback to just original name
    return `${originalName}.png`;
}

/**
 * Download blob as file
 * @param {Blob} blob - File data as Blob
 * @param {string} filename - Name for downloaded file
 */
export function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
