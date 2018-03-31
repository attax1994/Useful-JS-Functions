/**
 *  中序遍历采用左根右的形式
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

// 递归形式
var inListRec = [];
var inOrderRec = function (node) {
    if (node) {
        inOrderRec(node.left);
        inListRec.push(node.value);
        inOrderRec(node, right);
    }
}

// 非递归形式
// 将当前结点压入栈，然后将左子树当做当前结点，如果当前结点为空，将双亲结点取出来，将值保存进数组，然后将右子树当做当前结点，进行循环
var inListUnrec = [];
var inOrdreUnrecursive = function (node) {
    if (node) {
        var stack = [];
        while (stack.length || node) {
            if (node) {
                // 从最左侧的子节点开始，如果有左节点，就先推入左节点
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                inListRec.push(node.value);
                node = node.right;
            }
        }
    }
}