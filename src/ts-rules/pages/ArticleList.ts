export interface ClickEvent {
  [otherKey: string]: any
}

export interface ListItem {
  id?: string | number
  title: string
  type_id: string
  add_time: string | number
  view_count: string | number
  part_count?: string | number
  article_content?: string
}

export interface MyList {
  data: [ListItem]
}