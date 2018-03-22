/**
 *  广度优先遍历，先平行，后向下
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

var levelList = [];
var levelOrderTraversal = function (node) {
    if (!node) {
        throw new Error('Empty Tree')
    }

    var que = [node];
    while (que.length) {
        node = que.shift();
        levelList.push(node.value);
        if (node.left) que.push(node.left);
        if (node.right) que.push(node.right);
    }
}
