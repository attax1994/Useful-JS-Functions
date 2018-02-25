/**
 * Encode string to BKDR hash code.
 * @param str String to be encoded
 * @returns BKDR hash code of str
 */
function BKDRHash(str: String) {
    const seed: number = 31; // 31 131 1313 13131 131313 etc..  
    let hash: number = 0,
        index: number = 0;

    while (str[index]) {
        hash = hash * seed + (str.charCodeAt(index++));
    }

    return (hash & 0xFFFF);
}