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

export interface Article {
  id?: string | number
  type_id: string | number
  add_time?: string
  title: string
  article_content: string
  introduce?: string
  view_count?: number | string
}

export interface InsertResult {
  insertSuccess: boolean
  insertId?: number | string
}

export interface GetArticleById {
  data: [Article]
}

