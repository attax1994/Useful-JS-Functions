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
        hash = hash * seed + str.charCodeAt(index++);
    }

    return (hash & 0xFFFF);
}


function SDBMHash(str) {
    let hash = 0,
        index = 0;

    while (str[index]) {
        // equivalent to: hash = 65599*hash + (str[index++]);  
        hash = str.charCodeAt(index++) + (hash << 6) + (hash << 16) - hash;
    }

    return (hash & 0x7FFFFFFF);
}


function RSHash(str) {
    let b = 378551;
    let a = 63689;
    let hash = 0,
        index = 0;

    while (str[index]) {
        hash = hash * a + str.charCodeAt(index++);
        a *= b;
    }

    return (hash & 0x7FFFFFFF);
}


function JSHash(str) {
    let hash = 1315423911,
        index = 0;

    while (str[index]) {
        hash ^= ((hash << 5) + (str.charCodeAt(index++)) + (hash >> 2));
    }

    return (hash & 0x7FFFFFFF);
}


function ELFHash(str) {
    let hash = 0,
        x = 0,
        index = 0;

    while (str[index]) {
        hash = (hash << 4) + (str.charCodeAt(index++));
        if ((x = hash & 0xF0000000) != 0) {
            hash ^= (x >> 24);
            hash &= ~x;
        }
    }

    return (hash & 0x7FFFFFFF);
}


function DJBHash(str) {
    let hash = 5381,
        index = 0;

    while (str[index]) {
        hash += (hash << 5) + (str.charCodeAt(index++));
    }

    return (hash & 0x7FFFFFFF);
}


function APHash(str) {
    let hash = 0,
        i;
    const len = str.length;

    for (i = 0; i < len; i++) {
        if ((i & 1) == 0) {
            hash ^= ((hash << 7) ^ (str.charCodeAt(i)) ^ (hash >> 3));
        }
        else {
            hash ^= (~((hash << 11) ^ (str.charCodeAt(i)) ^ (hash >> 5)));
        }
    }

    return (hash & 0x7FFFFFFF);
}  