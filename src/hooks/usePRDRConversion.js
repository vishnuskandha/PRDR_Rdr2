import { useState, useCallback } from 'react';
import { parsePRDRFile } from '../utils/prdrParser';
import { convertJPEGtoPNG, createFileName, downloadFile } from '../utils/imageConverter';

export function usePRDRConversion() {
    const [convertedImages, setConvertedImages] = useState([]);
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState({ total: 0, completed: 0, failed: 0, currentFile: '' });

    const handleFilesSelected = useCallback(async (files) => {
        setIsConverting(true);
        setProgress({ total: files.length, completed: 0, failed: 0, currentFile: '' });

        const newImages = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setProgress(prev => ({ ...prev, currentFile: file.name }));

            try {
                const result = await parsePRDRFile(file);

                if (result.success) {
                    const pngBlob = await convertJPEGtoPNG(result.jpegBlob);
                    const timestamp = result.metadata || 'unknown';
                    const filename = createFileName(timestamp, file.name);
                    const previewUrl = URL.createObjectURL(pngBlob);

                    newImages.push({
                        id: `${Date.now()}-${i}`,
                        filename,
                        previewUrl,
                        blob: pngBlob,
                        originalSize: file.size,
                        convertedSize: pngBlob.size,
                        timestamp
                    });

                    setProgress(prev => ({ ...prev, completed: prev.completed + 1 }));
                } else {
                    setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
                }
            } catch (error) {
                console.error('Conversion error:', error);
                setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
            }
        }

        setConvertedImages(prev => [...prev, ...newImages]);
        setIsConverting(false);
    }, []);

    const handleDownloadAll = useCallback(() => {
        convertedImages.forEach(img => {
            downloadFile(img.blob, img.filename);
        });
    }, [convertedImages]);

    const handleClear = useCallback(() => {
        convertedImages.forEach(img => URL.revokeObjectURL(img.previewUrl));
        setConvertedImages([]);
        setProgress({ total: 0, completed: 0, failed: 0, currentFile: '' });
    }, [convertedImages]);

    return {
        convertedImages,
        isConverting,
        progress,
        handleFilesSelected,
        handleDownloadAll,
        handleClear
    };
}
