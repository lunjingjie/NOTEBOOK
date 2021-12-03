// 给出如下数据格式的虚拟dom, 将其转换为真实dom
const vnode = {
  tag: 'DIV',
  attrs: {
    id: 'app'
  },
  children: [{
      tag: 'SPAN',
      children: [{
        tag: 'A',
        children: []
      }]
    },
    {
      tag: 'SPAN',
      children: [{
          tag: 'A',
          children: []
        },
        {
          tag: 'A',
          children: []
        }
      ]
    }
  ]
}

function render(vnode) {
  // 如果vnode为数字
  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }

  // 如果vnode为字符串
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }

  // 其他情况
  let element = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      element.attrs(key, vnode.attrs[key]);
    });
  }

  if (vnode.children) {
    vnode.children.forEach(child => {
      element.appendChild(render(child));
    });
  }
  return element;
}

render(vnode);