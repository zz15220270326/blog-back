export interface Props {
  history: {
    push: any
    [otherHistoryKey: string]: any
  }
  [otherKey: string]: any
}

export interface HandleEvent {
  key: string | number
  [otherKeys: string]: any
}