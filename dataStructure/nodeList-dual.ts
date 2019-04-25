; (function () {
  // 双向链表
  // 节点
  function LNode(element) {     //双向链表结点
    this.element = element;
    this.next = null;
    this.prev = null;
  }

  // 链
  function LList() {
    this.head = new LNode("head");
  }
  LList.prototype.find = find;
  LList.prototype.insert = insert;
  LList.prototype.remove = remove;
  LList.prototype.display = display;


  /**
     * 在链表中查找一个元素（从头开始，后向查找）
     * @param item 
     */
  function find(item) {
    var currNode = this.head;
    while (currNode.element != item && currNode) {
      currNode = currNode.next;
    }
    return currNode;
  }


  /**
   * 链表中目标节点后插入一个元素
   * @param newElement 
   * @param item 
   */
  function insert(newElement, item) {
    var newNode = new LNode(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next.prev = newNode;
    newNode.prev = current;
    current.next = newNode;
  }


  /**
   * 移除一个节点（删除它的相关引用）
   * @param item 
   */
  function remove(item) {
    var current = this.find(item);
    if (current.next != null) {
      current.prev.next = current.next;
      current.next.prev = current.prev;
      current.next = null;
      current.prev = null;
    }
  }


  /**
   * 查找最后一个节点
   */
  function findLast() {
    var currNode = this.head;
    while (currNode.next != null) {
      currNode = currNode.next;
    }
    return currNode;
  }


  /** 
     * 展示整张链表
    */
  function display() {
    var current = this.head;
    while (current.next != null) {
      console.log(current.next.element);
      current = current.next;
    }
  }


  /**
   * 反序显示双向链表的元素
   */
  function dispReverse() {
    var currNode = this.findLast();
    while (currNode.prev != null) {
      console.log(currNode.element);
      currNode = currNode.prev;
    }
  }
})();