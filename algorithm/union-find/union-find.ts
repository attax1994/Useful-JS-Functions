interface UFI {
  /**
   * 执行方法
   * @param dataSet 
   */
  apply(dataSet: number[][]): void

  /**
   * 在p和q之间添加一条连接线
   * @param p 
   * @param q 
   */
  union(p: number, q: number): void

  /**
   * p所在的分量标识符（0 到 N-1）
   * @param p 
   */
  find(p: number): number

  /**
   * 检查p和q之间是否存在连接线
   * @param p 
   * @param q 
   */
  connected(p: number, q: number): boolean
}

/**
 * Union-Find算法，核心的union-find模块使用加权quick-union的方式实现。
 */
class UF implements UFI {
  private _id: number[] = []      // 分量id
  private _size: number[] = []    // 各触点的根节点所对应的分量大小
  private _count: number = 0      // 分量数量

  // N为点的数量
  constructor(N: number) {
    this._count = N
    for (let i = 0; i < N; i++) {
      this._id[i] = i
      this._size[i] = 1
    }
  }

  apply(connectionList: number[][]): void {
    console.log('Original Id', this._id)
    for (let connection of connectionList) {
      let p: number = connection[0]
        , q: number = connection[1]
      if (!this.connected(p, q)) {
        this.union(p, q)
        console.log(`${p}  ${q}`)
      }
    }
    console.log(`${this._count} component(s)`)
    console.log('Result Id', this._id)
  }

  union(p: number, q: number): void {
    let proot = this.find(p)
      , qroot = this.find(q)

    // 已在相同分量中，则不处理
    if (proot === qroot) return

    // 将小规模的集群连接向规模较大的集群
    if (this._size[proot] < this._size[qroot]) {
      // p较小，则连向q，同时将q集群的规模对应扩大
      this._id[proot] = qroot
      this._size[qroot] += this._size[proot]
    } else {
      this._id[qroot] = proot
      this._size[proot] += this._size[qroot]
    }
    this._count--
  }

  find(p: number): number {
    // 向上溯源，找到自反的端点
    while (p !== this._id[p]) {
      p = this._id[p]
    }
    return p
  }

  connected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }
}

// 测试用例
let testSet = [
  [0, 1],
  [2, 3],
  [4, 5],
  [3, 4],
  [2, 5],
]
let uf = new UF(6)
uf.apply(testSet)



