/**
 * PRDR File Parser
 * Extracts JPEG data and metadata from Red Dead Redemption 2 PRDR photo files
 * Based on reverse-engineered specifications from community converters
 */

/**
 * Parse a PRDR file and extract JPEG image data and metadata
 * @param {File} file - The PRDR file to parse
 * @returns {Promise<{jpegBlob: Blob, metadata: Object, originalName: string}>}
 */
export async function parsePRDRFile(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Extract metadata from bytes 20-54
    const metadata = extractMetadata(uint8Array);

    // Extract JPEG data using dual method approach
    const jpegData = extractJPEGData(uint8Array);

    if (!jpegData) {
      throw new Error('Could not extract JPEG data from PRDR file');
    }

    // Create blob from JPEG data
    const jpegBlob = new Blob([jpegData], { type: 'image/jpeg' });

    return {
      success: true,
      jpegBlob,
      metadata,
      originalName: file.name
    };
  } catch (error) {
    console.error('Error parsing PRDR file:', error);
    throw new Error(`Failed to parse PRDR file: ${error.message}`);
  }
}

/**
 * Extract metadata (timestamp) from bytes 20-54 of PRDR file
 * Format: "MM/DD/YYYY HH:MM:SS"
 * @param {Uint8Array} data - File data as byte array
 * @returns {Object} Parsed metadata with date, time, and formatted timestamp
 */
export function extractMetadata(data) {
  try {
    let metadataString = '';

    // Read bytes 20-54 and filter printable ASCII characters (> 31)
    for (let i = 20; i < 54 && i < data.length; i++) {
      if (data[i] > 31 && data[i] < 127) { // Printable ASCII range
        metadataString += String.fromCharCode(data[i]);
      }
    }

    metadataString = metadataString.trim();

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
    console.error('Error extracting metadata:', error);
    return {
      date: 'Unknown',
      time: 'Unknown',
      formatted: 'Error parsing metadata'
    };
  }
}

/**
 * Extract JPEG data from PRDR file using dual method approach
 * Method 1: Skip first 300 bytes (SneakyAzWhat approach)
 * Method 2: Find JPEG magic bytes FF D8 FF E0 00 10 (DanielGilbert approach)
 * @param {Uint8Array} data - File data as byte array
 * @returns {Uint8Array|null} JPEG data or null if not found
 */
export function extractJPEGData(data) {
  // JPEG magic bytes: FF D8 FF E0 00 10
  const jpegMagicBytes = [0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10];

  // Method 1: Try skipping first 300 bytes
  if (data.length > 300) {
    const method1Data = data.slice(300);

    // Check if it starts with JPEG signature (FF D8)
    if (method1Data[0] === 0xFF && method1Data[1] === 0xD8) {
      console.log('JPEG data found using Method 1 (skip 300 bytes)');
      return method1Data;
    }
  }

  // Method 2: Search for JPEG magic bytes
  const magicIndex = findJPEGMagicBytes(data, jpegMagicBytes);

  if (magicIndex !== -1) {
    console.log(`JPEG data found using Method 2 (magic bytes at index ${magicIndex})`);
    return data.slice(magicIndex);
  }

  // Fallback: Try just finding basic JPEG signature FF D8 FF
  const basicJpegSig = [0xFF, 0xD8, 0xFF];
  const basicIndex = findJPEGMagicBytes(data, basicJpegSig);

  if (basicIndex !== -1) {
    console.log(`JPEG data found using fallback method (basic signature at index ${basicIndex})`);
    return data.slice(basicIndex);
  }

  console.error('Could not find JPEG data in PRDR file');
  return null;
}

/**
 * Find JPEG magic bytes in data array
 * @param {Uint8Array} haystack - Data to search in
 * @param {Array<number>} needle - Byte pattern to find
 * @returns {number} Index where pattern starts, or -1 if not found
 */
export function findJPEGMagicBytes(haystack, needle) {
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
