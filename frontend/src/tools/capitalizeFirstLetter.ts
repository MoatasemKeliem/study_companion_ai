export const capitalizeFirstLetter = (val?: string | null): string => {
    if (!val) return '';
    const trimmed = val.trim();
    if (trimmed.length === 0) return '';
    return trimmed[0].toUpperCase() + trimmed.slice(1);
}