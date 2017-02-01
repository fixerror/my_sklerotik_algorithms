/**
 * Created by FixError on 02.02.2017.
 */

const singlenton = Symbol();
const singletonEnforcer = Symbol();


const bubbleSort = Symbol();
const heapSort = Symbol();
const insertionSort = Symbol();
const selectionSort = Symbol();
const mergeSort = Symbol();
const shekerSort = Symbol();
const quickSort = Symbol();

class SinglentonSort {

    /***************
     * CONSTRUCTOR *
     ***************/
    constructor(enforcer) {
        if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
    }

    /*************************
     * PUBLIC STATIC METHODS *
     *************************/
    static get instance() {
        if (!this[singlenton]) {
            this[singlenton] = new SinglentonSort(singletonEnforcer)
        }
        return this[singlenton];
    }

    /******************
     * PUBLIC METHODS *
     ******************/
    /**
     * Method sort
     * @param {Array} arrayData
     * @param {String} typeSort
     * @returns {*}
     */
    sort(arrayData, typeSort) {
        switch (typeSort) {
            case 'bubble':
                return this[bubbleSort](arrayData);
            case 'heap':
                return this[heapSort](arrayData);
            case 'insertion':
                return this[insertionSort](arrayData);
            case 'selection':
                return this[selectionSort](arrayData);
            case 'merge':
                return this[mergeSort](arrayData);
            case 'sheker':
                return this[shekerSort](arrayData);
            case 'quick':
            default:
                return this[quickSort](arrayData);
        }

    }
}

/*******************
 * PRIVATE METHODS *
 *******************/
/**
 * Method bubbleSort
 * @param {Array} arrayData
 * @returns {*}
 */
SinglentonSort.prototype[bubbleSort] = (arrayData)=> {
    let tmp, counter, arraDataLenght = arrayData.length - 1;

    for (var i = arraDataLenght; i > 0; i--) {
        counter = 0;
        for (var j = 0; j < i; j++) {
            if (arrayData[j] > arrayData[j + 1]) {
                tmp = arrayData[j];
                arrayData[j] = arrayData[j + 1];
                arrayData[j + 1] = tmp;
                counter++;
            }
        }
        if (counter == 0) {
            break;
        }
    }
    return arrayData;
};
/**
 * Method heapSort
 * @param {Array} arrayData
 * @returns {*}
 */
SinglentonSort.prototype[heapSort] = (arrayData)=> {
    let heapSize;
    buildHeap();
    while (heapSize > 1) {
        swap(arrayData, 0, heapSize - 1);
        heapSize--;
        heapify(arrayData, 0);
    }

    return arrayData;

    function buildHeap() {
        heapSize = arrayData.length;
        for (let i = heapSize / 2; i >= 0; i--) {
            heapify(arrayData, i);
        }
    }

    function heapify(a, i) {
        let l = left(i),
            r = right(i), largest = i;
        if (l < heapSize && a[i] < a[l]) {
            largest = l;
        }
        if (r < heapSize && a[largest] < a[r]) {
            largest = r;
        }
        if (i != largest) {
            swap(a, i, largest);
            heapify(a, largest);
        }
    }

    function right(i) {
        return 2 * i + 1;
    }

    function left(i) {
        return 2 * i + 2;
    }

    function swap(a, i, j) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
};
/**
 * Method insertionSort
 * @param {Array} arrayData
 * @returns {*}
 */
SinglentonSort.prototype[insertionSort] = (arrayData)=> {
    let i, j, x,
        arrayLength = arrayData.length;
    for (i = 0; i < arrayLength; i++) {
        x = arrayData[i];
        for (j = i - 1; j >= 0 && arrayData[j] > x; j--) {
            arrayData[j + 1] = arrayData[j];
        }
        arrayData[j + 1] = x;
    }
    return arrayData;
};
/**
 * Method selectionSort
 * @param {Array} arrayData
 * @returns {*}
 */
SinglentonSort.prototype[selectionSort] = (arrayData)=> {
    let min, temp,
        arrayLength = arrayData.length;
    for (let i = 0; i < arrayLength; i++) {
        min = i;
        for (let j = i + 1; j < arrayLength; j++) {
            if (arrayData[j] < arrayData[min]) {
                min = j;
            }
        }
        if (min != i) {
            temp = arrayData[i];
            arrayData[i] = arrayData[min];
            arrayData[min] = temp;
        }
    }
    return arrayData;
};
/**
 * Method mergeSort
 * @param {Array} arrayData
 * @returns {*}
 */
SinglentonSort.prototype[mergeSort] = (arrayData) => {
    if (arrayData.length < 2) {
        return arrayData;
    }

    var middle = Math.floor(arrayData.length / 2),
        left = arrayData.slice(0, middle),
        right = arrayData.slice(middle),
        params = merge(SinglentonSort.prototype[mergeSort](left), SinglentonSort.prototype[mergeSort](right));
    params.unshift(0, arrayData.length);
    arrayData.splice.apply(arrayData, params);
    return arrayData;

    function merge(left, right) {
        var result = [],
            il = 0,
            ir = 0;

        while (il < left.length && ir < right.length) {
            if (left[il] < right[ir]) {
                result.push(left[il++]);
            } else {
                result.push(right[ir++]);
            }
        }

        return result.concat(left.slice(il)).concat(right.slice(ir));
    }
};
/**
 * Method shekerSort
 * @param {Array} arrayData
 * @returns {*}
 */
SinglentonSort.prototype[shekerSort] = (arrayData) => {
    function swap(j) {
        let x = arrayData[j], y = arrayData[j - 1];
        arrayData[j] = y;
        arrayData[j - 1] = x;
    }

    let last = arrayData.length - 1, left = 0,
        right = arrayData.length + 2;
    while (left < right) {
        for (let j = right; j >= left; j--) {
            if (arrayData[j - 1] > arrayData[j]) {
                swap(j);
                last = j
            }
        }
        left = last - 1;

        for (let i = left; i <= right; i++) {
            if (arrayData[i - 1] > arrayData[i]) {
                swap(i);
                last = i
            }
        }

        right = last - 1;
    }
    return arrayData;
};
/**
 * Method quickSort
 * @param {Array} arrayData
 * @returns {*}
 */
SinglentonSort.prototype[quickSort] = (arrayData) => {
    if (!arrayData instanceof Array) {
        return undefined;
    }
    qsNext(0, arrayData.length - 1, arrayData);

    return arrayData;

    function change(arrayData, i, j) {
        let c = arrayData[i];
        arrayData[i] = arrayData[j];
        arrayData[j] = c;
    }

    function compare(a, b) {
        return ((a == b) ? 0 : ((a > b) ? 1 : -1));
    }

    function qsNext(left, right, arrayData) {
        let i = left,
            j = right,
            x = arrayData[(left + right) >> 1];

        while (i <= j) {
            while (compare(arrayData[i], x) == -1) {
                i++;
            }
            while (compare(arrayData[j], x) == 1) {
                j--;
            }
            if (i <= j) {
                change(arrayData, i++, j--);
            }
        }
        if (left < j) {
            qsNext(left, j, arrayData);
        }
        if (i < right) {
            qsNext(i, right, arrayData);
        }
    }
};

/******************************
 * CREATE INSTANCE SORT CLASS *
 ******************************/

const sortClass = SinglentonSort.instance;

/********
 * TEST *
 ********/

//TODO: test mocha

const tempArray1 = [1, 20, 30, 5, 6, 7, 3, 2];
const rezult1 = sortClass.sort(tempArray1, 'bubble');
console.log(`bubbleSort    : ${rezult1}`);


const tempArray2 = [1, 20, 30, 5, 6, 7, 3, 2];
const rezult2 = sortClass.sort(tempArray2, 'heap');
console.log(`heapSort      : ${rezult2}`);

const tempArray3 = [1, 20, 30, 5, 6, 7, 3, 2];
const rezult3 = sortClass.sort(tempArray3, 'insertion');
console.log(`insertionSort : ${rezult3}`);

const tempArray4 = [1, 20, 30, 5, 6, 7, 3, 2];
const rezult4 = sortClass.sort(tempArray4, 'selection');
console.log(`selectionSort : ${rezult4}`);

const tempArray5 = [1, 20, 30, 5, 6, 7, 3, 2];
const rezult5 = sortClass.sort(tempArray5, 'merge');
console.log(`bubbleSort    : ${rezult5}`);

const tempArray6 = [1, 20, 30, 5, 6, 7, 3, 2];
const rezult6 = sortClass.sort(tempArray6, 'sheker');
console.log(`shekerSort    : ${rezult6}`);

const tempArray7 = [1, 20, 30, 5, 6, 7, 3, 2];
const rezult7 = sortClass.sort(tempArray7, 'quick');
console.log(`quickSort     : ${rezult7}`);