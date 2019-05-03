// 先入先出队列
class FIFONode {
  public element: any = null
  public next: FIFONode | null = null

  constructor(element: any = null) {
    this.element = element
  }
}

class FIFONodeList {
  private _first: FIFONode | null = null
  private _last: FIFONode | null = null

  /**
   * 添加一个节点
   * @param element 添加的内容
   */
  public enqueue(element: any) {
    if (!this._first) {
      this._last = this._first = new FIFONode(element)
    } else {
      let oldLast: FIFONode = this._last
      this._last = new FIFONode(element)
      oldLast.next = this._last
    }
    console.log(`Successfully enqueued node: ${JSON.stringify(element)}`)
  }

  /**
   * 移除一个节点
   */
  public dequeue() {
    if (!this._first) {
      console.log('All nodes are clear out.')
    } else {
      let removed: FIFONode = this._first
      this._first = this._first.next
      console.log(`Successfully dequeued node: ${JSON.stringify(removed.element)}`)
    }
  }

  /**
   * 显示所有的节点
   */
  public display() {
    let currentNode: FIFONode = this._first
      , index: number = 0
    while (currentNode) {
      console.log(`Index: ${index++}, Element: ${JSON.stringify(currentNode.element)}`)
      currentNode = currentNode.next
    }
  }
}