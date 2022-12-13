const perChunk = 2

const inputArray = [1, 2, 1, 2]

const result = inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk)

    if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
}, [])

console.log(result);