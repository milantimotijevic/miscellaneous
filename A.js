var totalCost = 0;

function calculateBeautificationCost(deletionCost, insertionCost, acceptableDifference, arr) {
    for(var i = 0; i < arr.length; i++) {
        const previous = arr[i - 1];
        const current = arr[i];
        const next = arr[i + 1];
        if(isAcceptableDifference(previous, current) && isAcceptableDifference(current, next)) {
            continue;
        }
        const cheapestStratWrapper = findCheapestStrat(previous, current, next);
        totalCost+=cheapestStratWrapper.cost;
        // re-position cursor if needed and adjust current value accordingly
        if(cheapestStratWrapper.strategy === 'deletion') {
            arr.splice(i, 1);
            i--;
        } else if(cheapestStratWrapper.strategy === 'insertion') {

        } else { // strat will be 'alteration', no other possibility

        }
    }

    function isAcceptableDifference(a, b) {
        const difference = Math.abs(a - b);
        if(isNaN(difference)) {
            return true; // means we are on the first/last index so either the previous or next is missing
        }
        return difference <= acceptableDifference;
    }

    function findCheapestStrat(prev, curr, nxt) {
        const costOfInsertion = calculateCostOfInsertion(curr, nxt);
        const alterationCostWrapper = calculateCostOfAlteration(prev, curr, nxt);
        const costOfAlteration = alterationCostWrapper.cost;

        const evaluationWrapper = {alteration: costOfAlteration, insertion: costOfInsertion, deletion: deletionCost};
        const smallestProp = findPropNameOfSmallestInObj(evaluationWrapper);
        return {strategy: smallestProp, cost: evaluationWrapper[smallestProp], newValue: alterationCostWrapper.newValue};
    }

    function calculateCostOfInsertion(curr, nxt) {
        const diff = Math.abs(curr - nxt);
        return Math.floor(diff / acceptableDifference);
    }

    function calculateCostOfAlteration(prev, curr, nxt) {
        const lowestPossible = prev - acceptableDifference;
        const highestPossible = prev + acceptableDifference;

        var necessaryChange;
        if(curr > nxt) {
            necessaryChange = nxt + acceptableDifference;
        } else {
            necessaryChange = nxt - acceptableDifference;
        }
        const postChangeValue = curr + necessaryChange;

        if(postChangeValue > highestPossible || postChangeValue < lowestPossible) {
            return {cost: 999999, newValue: postChangeValue}; // placeholder for 'modification not possible without messing up relations with previous neighbor'
        }
        return {cost: Math.abs(curr - postChangeValue), newValue: postChangeValue};
    }

    function findLastAlterationInducedNumber() {

    }
}

function findSmallestInArr(arr) {
    var smallest = arr[0];
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] < smallest) {
            smallest = arr[i];
        }
    }
    return smallest;
}

function findPropNameOfSmallestInObj(obj) {
    var smallest = Object.keys(obj)[0]; // need to start with one
    for(var prop in obj) {
        if(obj[prop] < obj[smallest]) {
            smallest = prop;
        }
    }
    return smallest;
}

calculateBeautificationCost(100, 1, 2, [1, 7, 5]);

