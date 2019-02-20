
let li = document.querySelectorAll('li')

for (let i = 0; i < li.length; i ++) {
    li[i].style.backgroundImage = 'url(images/'+ (i + 1) +'.jpg)'
    // 进入
    li[i].onmouseenter = mouseenterHandle
    // 离开
    li[i].onmouseout = mouseoutHandle
}
function mouseenterHandle() {
    for (let j = 0; j < li.length; j ++) {
        animate(li[j], {
            'width': 100
        })
    }
    animate(this, {
        'width': 800
    })
}
function mouseoutHandle() {
    for (let j = 0; j < li.length; j ++) {
        animate(li[j], {
            'width': 240
        })
    }
}

function animate(ele, json, callback) {
    // 清除定时器
    clearInterval(ele.timeId)
    // 设置定时器
    ele.timeId = setInterval(() => {
        // 默认，假设，全部到达目标
        let flag = false
        for ( var attr in json ) {
            if ( attr === 'opacity' ) {
                // 获取元素当前的透明度
                var current = getStyle(ele, attr) * 100
                // 目标
                var target = json[attr] * 100
                var step = (target - current) / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(step)
                // 移动后的值
                current += step
                ele.style[attr] = current / 100
            } else if ( attr === 'zIndex' ) {
                ele.style[attr] = json[attr]
            } else {
                // 获取元素的当前位置
                var current = parseInt(getStyle(ele, attr))
                // 获取目标值
                var target = json[attr]
                // 移动的步数(像素)
                var step = (target - current) / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(step)
                current += step
                ele.style[attr] = current + 'px'
            }
            if ( current !== target )
                flag = false
            // 测试代码
            console.log('target:' + target + ', current:' + current + ', step:' + step)
        }
        // 判断
        if ( flag ) {
            // 清理定时器
            clearInterval(ele.timeId)
            if ( callback ) {
                callback()
            }
        }
        
    }, 20);
}
// 获取元素的属性
function getStyle(ele, attr) {
        return window.getComputedStyle ? window.getComputedStyle(ele, null)[attr] : ele.currentStyle[attr]
}