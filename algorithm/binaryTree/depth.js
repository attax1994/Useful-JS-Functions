var data = [
    {
        key: 'one',
        value: '1',
        children: [
            {
                key: 'one-one',
                value: '1-1',
                children: [
                    {
                        key: 'one-one-one',
                        value: '1-1-1'
                    },
                    {
                        key: 'one-one-two',
                        value: '1-1-2'
                    }
                ]
            },
            {
                key: 'one-two',
                value: '1-2',
                children: [
                    {
                        key: 'one-two-one',
                        value: '1-2-1'
                    }
                ]
            },
        ]
    },
    {
        key: 'two',
        value: '2'
    },
    {
        key: 'three',
        value: '3',
        children: [
            {
                key: 'three-one',
                value: '3-1'
            },
            {
                key: 'three-two',
                value: '3-2',
                children: [
                    {
                        key: 'three-two-one',
                        value: '3-2-1',
                    },
                    {
                        key: 'three-two-two',
                        value: '3-2-2'
                    }
                ]
            }
        ]
    },
];

function findPathDFS(source, goal) {
    // 因为会改变原数据，因此做深拷贝处理
    var dataSource = JSON.parse(JSON.stringify(source));
    var res = [];
    return (function dfs(data) {
        res.push(data);
        // 深度搜索一条数据，存取在数组 res 中
        if (data.children) return dfs(data.children[0]);
        // 匹配成功
        if (res[res.length - 1].value === goal) {
            return res.map(r => r.key);
        }
        // 匹配失败则删掉当前比对的节点
        res.pop();
        // 没有匹配到任何值则 return，如果源数据有值则再次深度搜索
        if (!res.length) return !!dataSource.length ? dfs(dataSource.shift()) : res;
        // 取得最后一个节点，待做再次匹配
        var lastNode = res[res.length - 1]
        // 删除已经匹配失败的节点（即为上面 res.pop() 的内容）
        lastNode.children.shift();
        // 没有 children 时
        if (!lastNode.children.length) {
            // 删除空 children，且此时需要深度搜索的为 res 的最后一个值
            delete lastNode.children;
            return dfs(res.pop());
        }
        return dfs(lastNode.children[0]);
    })(dataSource.shift());
}