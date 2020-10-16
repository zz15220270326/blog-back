export interface Props {
  history: {
    push: any
    [otherHistoryKey: string]: any
  }
  [otherKey: string]: any
}