/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    // initial result is s[0]
    var longestLength = 1,
        longestStr = s[0],
        currentHalfLength = 0,
        currentLength = 0,
        currentIndex = 0,
        totalLength = s.length;

    for (currentIndex = 0; currentIndex < totalLength; currentIndex++) {
        // even
        if (s[currentIndex] === s[currentIndex + 1]) {
            currentHalfLength = getEvenPalindrome(s, currentIndex, 1);
            currentLength = currentHalfLength * 2;
            if (currentLength > longestLength) {
                longestLength = currentLength;
                longestStr = s.substr(currentIndex - currentHalfLength + 1, longestLength);
            }
        }
        //odd
        if (s[currentIndex] === s[currentIndex + 2]) {
            currentHalfLength = getOddPalindrome(s, currentIndex, 1);
            currentLength = currentHalfLength * 2 + 1;
            if (currentLength > longestLength) {
                longestLength = currentLength;
                longestStr = s.substr(currentIndex - currentHalfLength + 1, longestLength);
            }
        }
    }
    return longestStr;
};

function getEvenPalindrome(s, start, halfLength) {
    // make sure the text is within the string
    if (start - halfLength >= 0 && start + halfLength + 1 <= s.length) {
        // check if the outter letters fit the rule
        if (s[start - halfLength] === s[start + halfLength + 1]) {
            return getEvenPalindrome(s, start, halfLength + 1);
        }
    }
    return halfLength;
}

function getOddPalindrome(s, start, halfLength) {
    // make sure the text is within the string
    if (start - halfLength >= 0 && start + halfLength + 2 <= s.length) {
        // check if the outter letters fit the rule
        if (s[start - halfLength] === s[start + halfLength + 2]) {
            return getOddPalindrome(s, start, halfLength + 1);
        }
    }
    return halfLength;
}