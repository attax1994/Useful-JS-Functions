/**
 * Find median from two SORTED arrays.
 * @param arr1 
 * @param arr2 
 */
function findMedianSortedArray(arr1: Array<any>, arr2: Array<any>) {
    var m = arr1.length,
        n = arr2.length,
        total = m + n,
        half = total >> 1;

    // judge if total is odd by AND operation with 0x01
    if (total & 1) {
        return findKth(arr1, m, arr2, n, half + 1);
    } else {
        return (findKth(arr1, m, arr2, n, half) + findKth(arr1, m, arr2, n, half)) / 2;
    }
}

/**
 * Find kth number in two arrays.
 * @param arr1 
 * @param m 
 * @param arr2 
 * @param n 
 * @param k 
 */
function findKth(arr1: Array<any>, m: number, arr2: Array<any>, n: number, k: number) {
    // keep m smaller than or equal to n.
    if (m > n) {
        return findKth(arr2, n, arr1, m, k);
    }
    // special circumstances
    if (m === 0) {
        return arr2[k - 1];
    }
    if (k === 1) {
        return Math.min(arr1[0], arr2[0]);
    }

    // divide k into two parts
    // start searching from shorter array
    var pa = Math.min(k >> 1, m),
        pb = k - pa;
    if (arr1[pa - 1] < arr2[pb - 1]) {
        return findKth(arr1.slice(pa), m - pa, arr2, n, k - pa);
    } else if (arr1[pa - 1] > arr2[pb - 1]) {
        return findKth(arr1, m, arr2.slice(pb), n - pb, k - pb);
    } else {
        return arr1[pa - 1];
    }

}