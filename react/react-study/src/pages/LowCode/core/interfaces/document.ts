export interface INodeMeta<IField = any, IReactions = any> {
  componentName: string,
  props?: {
    [key: string]: any,
  },
  'x-fields'?: IField,
  'x-reactions'?: IReactions,
  // 锁定子组件
  locked?: boolean,
  // 自己渲染，引擎不渲染
  selfRender?: boolean,
}

export interface INodeSchema<IField = any, IReactions = any> extends INodeMeta<IField, IReactions> {
   children?: INodeSchema[],
   slots?: {
    // name只是一个别名，可以是任意字符串，数值为INodeSchema类型
    [name: string]: INodeSchema | undefined,
   }
}