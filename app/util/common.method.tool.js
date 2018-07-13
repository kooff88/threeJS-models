/**
 * 获取对象中的属性，并拼接成数组
 * @param object
 * @returns {Array}
 */
export function getKeyArray(object) {
    let keyArray = [];

    for (var key in object) {//遍历 obj
        keyArray.push(key);//存入数组
    }
    return keyArray

}

/**
 * 获取对象中各个属性对应的值。构成新的数组。
 * @param keyArray  该对象中所有属性所构成的数组
 * @param object
 * @returns {Array}
 */
export function getResultArray(keyArray, object) {
    let resultArray = [];
    for (let i = 0, length = keyArray.length; i < length; i++) {
        let data = object[keyArray[i]]
        resultArray.push(data);
    }
    return resultArray;
}



/**
 * 获取对象中各个属性对应的值。构成新的数组。
 * @param keyArray  该对象中所有属性所构成的数组
 * @param object
 * @returns {Array}
 */
export function getResultArrayAndKey(keyArray, object) {
    let resultArray = [];
    for (let i = 0, length = keyArray.length; i < length; i++) {
        let data = [keyArray[i], object[keyArray[i]]];
        resultArray.push(data);
    }
    return resultArray;
}

