/**
 *  后序遍历采用左右根
 */

// 一个二叉树对象
var tree = {
    value: "-",
    left: {
        value: '+',
        left: {
            value: 'a',
        },
        right: {
            value: '*',
            left: {
                value: 'b',
            },
            right: {
                value: 'c',
            }
        }
    },
    right: {
        value: '/',
        left: {
            value: 'd',
        },
        right: {
            value: 'e',
        }
    }
};

// 递归操作
var postListRec = [];
var postOrderRec = function (node) {
    if (node) {
        postOrderRec(node.left);
        postOrderRec(node.right);
        postListRec.push(node.value);
    }
};

// 非递归操作
// 先把根结点和左树推入栈，然后取出左树，再推入右树，取出，最后取根结点
var postListUnrec = [];
var postOrderUnrecursive = function (node) {
    var stack = [node];
    var temp = null;
    while (stack.length) {
        temp = stack[stack.length - 1];
        // 如果左节点存在，并且上次处理的不是它的左或右节点
        if (temp.left && node !== temp.left && node !== temp.right) {
            stack.push(temp.left);
        }
        // 如果右节点存在，并且上次处理的不是右节点
        else if (temp.right && node !== temp.right) {
            stack.push(temp.right);
        } 
        // 具体的节点处理
        else {
            postListUnrec.push(stack.pop().value);
            // 用node记录已经执行过的节点，防止回到父节点的时候再次跳入push操作
            node = temp;
        }
    }
}