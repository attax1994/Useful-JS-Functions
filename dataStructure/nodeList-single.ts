; (function () {
  // 单向链表
  // 节点
  function _Node(element) {
    this.element = element;
    this.next = null;
  }

  // 链
  function List() {
    this.head = new _Node("head");
  }
  List.prototype.find = find;
  List.prototype.insert = insert;
  List.prototype.remove = remove;
  List.prototype.display = display;
  List.prototype.findPrevious = findPrevious;


  /**
   * 在链表中查找一个元素（从头开始，后向查找）
   * @param item 
   */
  function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }


  /**
   * 在链表中的目标元素后方插入一个元素
   * @param newElement 
   * @param item 
   */
  function insert(newElement, item) {
    var newNode = new _Node(newElement),
      // 查找当前插入位置的元素
      current = this.find(item);

    if (current == null) {
      return console.log("can't find the item");
    }

    // 用next将其连起来
    newNode.next = current.next;
    current.next = newNode;
  }


  /**
   * 从头开始查找目标元素的前一个元素
   * @param item 
   */
  function findPrevious(item) {
    var currNode = this.head;
    // 如果没到尾部，并且下一个元素不是目标元素，就继续查找
    while (currNode.next != null && currNode.next.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }


  /**
   * 在链表中的移除一个元素
   * @param item 
   */
  function remove(item) {
    // 首先找到前一个元素
    var prevNode = this.findPrevious(item);
    // 将前一个与后一个连起来，忽略目标，即可删除互相之间的引用关系
    if (prevNode.next != null) {
      prevNode.next = prevNode.next.next;
    }
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
})();