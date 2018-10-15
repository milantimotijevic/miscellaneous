function calculateAdjustmentCost(deletionCost, insertionCost, acceptableDifference, arr) {
    const matrix = [];
    for(let i = 0; i < arr.length; i++) {
        matrix[i] = [];
    }

    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j <= 10; j++) {
            let tempValue = Math.abs(arr[i] - j);
            if(i > 0) {
                tempValue += findSmallestInArrWithConstraints(matrix[i - 1], j);
                if(tempValue > deletionCost) {
                    tempValue = deletionCost;
                }
            }
            matrix[i][j] = tempValue;
        }
    }

    function findSmallestInArrWithConstraints(arr, referenceIndex) {
        let start = referenceIndex - acceptableDifference;
        if(start < 0) {
            start = 0;
        }
        let end = referenceIndex + acceptableDifference;
        if(end > arr.length - 1) {
            end = arr.length - 1;
        }

        const tempArr = arr.slice(start, end + 1);

        let smallest = tempArr[0];

        for(let i = 0; i < tempArr.length; i++) {
            if(tempArr[i] < smallest) {
                smallest = tempArr[i];
            }
        }
        return smallest;
    }

    console.log(matrix);
    return findSmallestInArr(matrix[matrix.length - 1]);
}

function findSmallestInArr(arr) {
    let smallest = arr[0];
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] < smallest) {
            smallest = arr[i];
        }
    }
    return smallest;
}

const result = calculateAdjustmentCost(1, 6, 2, [1, 50, 7]);
console.log(result);
