
import fs from 'fs';
import path from 'path';

const filePath = "c:/Users/admin/Downloads/Projects pending/Rdr2/PRDR/PRDR31155361589_1";

function log(msg) {
    fs.appendFileSync('debug_output.txt', msg + '\n');
}

function extractMetadata(data) {
    try {
        let metadataString = '';

        // Read bytes 20-54 and filter printable ASCII characters (> 31)
        for (let i = 20; i < 54 && i < data.length; i++) {
            if (data[i] > 31 && data[i] < 127) { // Printable ASCII range
                metadataString += String.fromCharCode(data[i]);
            }
        }

        metadataString = metadataString.trim();
        log('Raw metadata string: ' + metadataString);

        if (!metadataString) {
            return {
                date: 'Unknown',
                time: 'Unknown',
                formatted: 'Unknown Date'
            };
        }

        // Parse format: "MM/DD/YYYY HH:MM:SS"
        const parts = metadataString.split(' ');

        if (parts.length >= 2) {
            const dateParts = parts[0].split('/');
            const timeParts = parts[1].split(':');

            if (dateParts.length === 3 && timeParts.length === 3) {
                const [month, day, year] = dateParts;
                const [hour, minute, second] = timeParts;

                // Format as: YYYY-MM-DD HH.MM.SS (same as original converter)
                const formatted = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour.padStart(2, '0')}.${minute.padStart(2, '0')}.${second.padStart(2, '0')}`;

                return {
                    date: parts[0],
                    time: parts[1],
                    formatted,
                    raw: metadataString
                };
            }
        }

        return {
            date: 'Unknown',
            time: 'Unknown',
            formatted: metadataString,
            raw: metadataString
        };
    } catch (error) {
        log('Error extracting metadata: ' + error);
        return {
            date: 'Unknown',
            time: 'Unknown',
            formatted: 'Error parsing metadata'
        };
    }
}

function findJPEGMagicBytes(haystack, needle) {
    const len = needle.length;
    const limit = haystack.length - len;

    for (let i = 0; i <= limit; i++) {
        let match = true;

        for (let j = 0; j < len; j++) {
            if (needle[j] !== haystack[i + j]) {
                match = false;
                break;
            }
        }

        if (match) {
            return i;
        }
    }

    return -1;
}

function extractJPEGData(data) {
    // JPEG magic bytes: FF D8 FF E0 00 10
    const jpegMagicBytes = [0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10];

    // Method 1: Try skipping first 300 bytes
    if (data.length > 300) {
        const method1Data = data.slice(300);

        // Check if it starts with JPEG signature (FF D8)
        if (method1Data[0] === 0xFF && method1Data[1] === 0xD8) {
            log('JPEG data found using Method 1 (skip 300 bytes)');
            return method1Data;
        } else {
            log('Method 1 failed: Byte at 300 is ' + method1Data[0].toString(16) + ' Byte at 301 is ' + method1Data[1].toString(16));
        }
    }

    // Method 2: Search for JPEG magic bytes
    const magicIndex = findJPEGMagicBytes(data, jpegMagicBytes);

    if (magicIndex !== -1) {
        log(`JPEG data found using Method 2 (magic bytes at index ${magicIndex})`);
        return data.slice(magicIndex);
    } else {
        log('Method 2 failed: Magic bytes not found');
    }

    // Fallback: Try just finding basic JPEG signature FF D8 FF
    const basicJpegSig = [0xFF, 0xD8, 0xFF];
    const basicIndex = findJPEGMagicBytes(data, basicJpegSig);

    if (basicIndex !== -1) {
        log(`JPEG data found using fallback method (basic signature at index ${basicIndex})`);
        return data.slice(basicIndex);
    }

    log('Could not find JPEG data in PRDR file');
    return null;
}

async function run() {
    try {
        fs.writeFileSync('debug_output.txt', 'START\n');
        log('Reading file: ' + filePath);
        const buffer = fs.readFileSync(filePath);
        const uint8Array = new Uint8Array(buffer);
        log('File read, size: ' + uint8Array.length);

        log('Extracting metadata...');
        const metadata = extractMetadata(uint8Array);
        log('Metadata: ' + JSON.stringify(metadata));

        log('Extracting JPEG data...');
        const jpegData = extractJPEGData(uint8Array);

        if (jpegData) {
            log('SUCCESS: JPEG data extracted, size: ' + jpegData.length);
        } else {
            log('FAILURE: Could not extract JPEG data');
        }

    } catch (err) {
        log('Error running script: ' + err);
    }
}

run();
