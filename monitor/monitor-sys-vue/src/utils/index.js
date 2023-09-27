/**
 * 根据nodeId获取对应节点下的数据
 * @param {object} treeData 树形数据
 * @param {string} id 节点id
 * @returns 节点
 */
export const getTreeNodeById = (treeData, id) => {
  if (!isNotEmptyObject(treeData)) {
    return {};
  }
  return loopChildren(treeData, id);
};

const loopChildren = (treeData, id) => {
  // console.log(treeData.id, id, treeData.id === id);
  let result = null;
  if (treeData.id === id) {
    result = treeData;
    return result;
  }
  if (treeData.children && treeData.children.length) {
    treeData.children.forEach((item) => {
      result = loopChildren(item, id);
    });
  }
  return result;
};

/**
 * 判断是否是空对象
 * @param {object} obj 对象
 * @returns 布尔值
 */
export const isNotEmptyObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]' && Reflect.ownKeys(obj).length;
};

/**
 * 判断是否空对象时，处理返回值
 * @param {object} object 对象
 * @param {string} returnKey key
 * @param {string} errorVal 错误替代值
 * @returns 处理值
 */
export const isNull2ReturnValue = (object, returnKey, errorVal) => {
  return isNotEmptyObject(object) ? object[returnKey] : errorVal;
};

/**
 * 合并行
 * @param {String} key 列value
 * @param {Array} tableData 数组
 * @returns 合并后数组
 */
export const combineRow = (key, tableData) => {
  for (let i = 0; i < tableData.length; i += 1) {
    const item = tableData[i];
    let count = 1;
    for (let j = i + 1; j < tableData.length; j += 1) {
      // 如果是同一个值，往后递增
      if (item[key] === tableData[j][key]) {
        count++;
        // 往后相同的值都设为空单元格
        tableData[j][`${key}RowSpan`] = 0;
        // 只有同值第一个才设置合并的单元格数
        item[`${key}RowSpan`] = count;
        // 所有都是为同一个值的情况
        // 如果到了尾部，则循环结束
        if (j === tableData.length - 1) {
          return;
        }
      } else {
        // 指针跳转到下一个，从下一排开始
        i = j - 1;
        count = 1;
        tableData[j][`${key}RowSpan`] = 1;
        break;
      }
    }
  }
  return tableData;
};

/**
 * 根据对象的key进行排序
 * @param {*} object 对象
 * @returns 排序后的新对象
 */
export const objKeySort = (object) => {
  const newkey = Object.keys(object).sort();
  const newObj = {};
  for (let i = 0; i < newkey.length; i += 1) {
    newObj[newkey[i]] = object[newkey[i]];
  }
  return newObj;
};

/**
 * 对象深拷贝
 * @param {*} obj 原始对象
 * @param {*} hash 存放对象集合
 * @returns 拷贝对象
 */
export const deepClone = (obj, hash = new WeakMap()) => {
  if (obj === null) {
    return null;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  const resObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, resObj);
  Reflect.ownKeys(obj).forEach((key) => {
    resObj[key] = deepClone(obj[key], hash);
  });
  return resObj;
};

// 本地下载文件
export const getDownloadFile = (res, fileName) => {
  if (!res) {
    return;
  }
  if (window.navigator.msSaveBlob) {
    try {
      window.navigator.msSaveBlob(res, fileName);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  } else {
    const url = window.URL.createObjectURL(new Blob([res]));
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};

// 密码校验
export const passwordVerify = (res) => {
  const regPassword =
    /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,64}$/;
  return regPassword.test(res);
};

/**
 * 通过key去重数组
 * @param {*} arr 原数组
 * @param {*} key 字段
 * @returns 去重后数组
 */
export const dropRepetitionByKey = (arr, key) => {
  const target = [];
  let tempArr = [];
  // 将字符串转成数组
  tempArr = Array.from(arr);
  tempArr.forEach((item) => {
    // 如果target数组中没有该value，则将其添加到数组中
    if (!target.filter((tar) => tar[key] === item[key]).length > 0) {
      target.push(item);
    }
  });
  return target;
};

export const colorMap = {
  一般: '#1E88E5', // 蓝
  较大: '#FFEE58', // 黄
  重大: '#EF5350', // 红
  数据不完整: '#1E88E5', // 蓝
  M1: '#43A047', // 绿
  M2: '#1E88E5',
  M3: '#FFEE58',
  M4: '#EF5350',
  Q0: '#43A047',
  Q1: '#1E88E5',
  Q2: '#FFEE58',
  Q3: '#EF5350',
  E1: '#FFEE58',
  E2: '#1E88E5',
  E3: '#43A047',
};

export const getRawRoute = (route) => {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined,
  };
};
