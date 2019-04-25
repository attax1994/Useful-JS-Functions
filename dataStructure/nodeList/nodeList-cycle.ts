;(function(){
  // 循环链表
  // 节点
  function _Node(element) {     //双向链表结点
    this.element = element;
    this.next = null;
    this.prev = null;
  }

  function CList() {                 
    this.head = new _Node("head");
    // 注意最后一个要指向第一个即可
    this.head.next = this.head;
  }

  function display() {
    var current = this.head;
    while(current.next != null && current.next.element != "head") {
        console.log(current.next.element);
        current = current.next;
    }
  }
})();
