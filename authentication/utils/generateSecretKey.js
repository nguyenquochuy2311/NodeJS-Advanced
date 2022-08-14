function getRandomSecretKey() {
    const charactersList = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'];
    const randomIdLength = 20;

    const shuffle = (list) => {
        return list.sort(() => Math.random() - 0.5);
    };

    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const getRandomCharacter = () => {
        const shuffledCharacterList = shuffle(charactersList);
        const randomItemIndex = getRandomIntInclusive(0, shuffledCharacterList.length - 1);
        return shuffledCharacterList[randomItemIndex];
    };

    return Array.from({ length: randomIdLength }, () => getRandomCharacter()).join('');
}

const key = getRandomSecretKey();

console.log(key);