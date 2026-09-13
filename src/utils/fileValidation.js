export function isPRDRFileName(name) {
    if (typeof name !== 'string') {
        return false;
    }

    const normalizedName = name.trim();
    return /^PRDR[^.]*$/i.test(normalizedName);
}
