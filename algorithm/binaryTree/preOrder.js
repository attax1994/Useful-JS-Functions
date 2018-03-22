/**
 *  先序遍历采用根左右的形式
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
var preListRec = [];
var preOrderRec = function (node) {
    if (node) {
        preListRec.push(node.value); // 将该节点放入结果中
        preOrderRec(node.left); // 先遍历左节点
        preOrderRec(node.right); // 后遍历右节点
    }
}

// 非递归操作
var preListUnrec = [];
var preOrderUnrecursive = function (node) {
    if (node) {
        var stack = [node];
        while (stack.length) {
            node = stack.pop();
            preListUnrec.push(node.value);
            // 先推入右节点，后推入左节点。读取时候从后往前读
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
    }
}