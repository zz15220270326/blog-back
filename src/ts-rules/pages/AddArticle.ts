export interface InputEvent {
  target: {
    value: string
    [targetOtherKeys: string]: any
  }
  [eventOtherKeys: string]: any
}

export interface TypeInfo {
  data: TypeInfoChild[] | string
}

export interface TypeInfoChild {
  id: string
  typeName: string
  orderNumber: string
}