export interface ILangeLocales {
	resource?: {
		[key: string]: any
	},
  component?: {
    [componentName: string]: {
      title?: string,
      description?: string,
      [key: string]: any,
    },
  },
  tools?: {
    [key: string]: any,
  },
  [key: string]: any,
}

export interface ILocales {
  [ISOCode: string]: ILangeLocales,
}
