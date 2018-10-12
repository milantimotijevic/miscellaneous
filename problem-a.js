function resolveTheMysteryOfLife(deletionCost, insertionCost, acceptableDifference, arr) {
    var totalCost = 0;
    for(let i = 0; i < arr.length; i++) {
        if(i === arr.length - 1) {
            break;
        }
        const current = arr[i];
        const next = arr[i + 1];
        const diff = Math.abs(current - next);
        const costByDeletion = calculateCostByDeletion();
        const costByInsertion = calculateCostByInsertion(diff);
        const costByModification = calculateCostByModification();

        const result = findSmallest([costByInsertion, costByModification]);
        totalCost+=result;
    }

    console.log('Total cost: ' + totalCost);

    function calculateCostByDeletion(currentIndex) {
        var tempCostByDeletion = 0;
        for(let i = currentIndex; i < arr.length; i++) {
            if(Math.abs(arr[i] - arr[i + 1]) <= acceptableDifference) {
                return {value: tempCostByDeletion, index: i};
            }
            tempCostByDeletion+=deletionCost;
        }
        return {value: tempCostByDeletion, index: arr.length - 1};
    }

    function calculateCostByInsertion(diff) {
        return Math.floor(diff / acceptableDifference);
    }

    function calculateCostByModification(currentNumber, nextNumber) {

    }
}

function findSmallest(arr) {
    var smallest = arr[0];
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] < smallest) {
            smallest = arr[i];
        }
    }
    return smallest;
}

