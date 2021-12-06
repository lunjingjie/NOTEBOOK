// 将如下格式数组, 转为树结构? 递归和迭代两种方法?
const arr = [{
    id: 2,
    name: '部门B',
    parentId: 0
  },
  {
    id: 3,
    name: '部门C',
    parentId: 1
  },
  {
    id: 1,
    name: '部门A',
    parentId: 2
  },
  {
    id: 4,
    name: '部门D',
    parentId: 1
  },
  {
    id: 5,
    name: '部门E',
    parentId: 2
  },
  {
    id: 6,
    name: '部门F',
    parentId: 3
  },
  {
    id: 7,
    name: '部门G',
    parentId: 2
  },
  {
    id: 8,
    name: '部门H',
    parentId: 4
  }
]

// 递归
function transform2Tree(arr, parentId = 0) {
  const res = [];
  arr.forEach(item => {
    if (item.parentId === parentId) {
      // 继续递归寻找该项下的子对象
      const children = transform2Tree(arr, item.id);
      // 找到的对象
      if (children.length) {
        item.children = children;
      }
      res.push(item);
    }
  });
  return res;
}

// 迭代
function transform2TreeFor(arr) {
  const map = {};
  arr.forEach(item => {
    map[item.id] = item;
  });
  const res = [];
  arr.forEach(item => {
    const parent = map[item.parentId];
    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(item);
    } else {
      res.push(item);
    }
  });
  return res;
}

console.log(JSON.stringify(transform2TreeFor(arr)));