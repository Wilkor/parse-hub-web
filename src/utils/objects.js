const filterDuplicatedByObjectKey = (array_object, key) => {
    if (!key || !array_object) {
        return [];
    }

    return array_object.filter(
        (currentValue, index, array) =>
            array.findIndex((element) => element[key] === currentValue[key]) ===
            index
    );
};

const checkArrayDuplicate = (array) => {
    return new Set(array).size !== array.length;
};

const checkUnderlineTitles = (array) => {
    return array.filter(
        (value) => value.includes('_') || value?.trim().includes(' ')
    ).length;
};

const filterObjectAllowedKeys = (allowed, object) => {
    return Object.keys(object)
        .filter((key) => allowed.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: object[key]
            };
        }, {});
};

const filterPromiseArray = (promise_array) => {
    return promise_array
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);
};

export {
    filterDuplicatedByObjectKey,
    checkArrayDuplicate,
    checkUnderlineTitles,
    filterObjectAllowedKeys,
    filterPromiseArray
};
