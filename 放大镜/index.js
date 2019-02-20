$(function() {
    let small = $('.small')
    let big = $('.big')
    let mask = $('.mask')
    let img = $('.big img')

    small.mouseover(function() {
        mask.css({
            display: 'block'
        })
        big.css({
            display: 'inline-block'
        })
    })
    small.mouseleave(function() {
        mask.css({
            display: 'none'
        })
        big.css({
            display: 'none'
        })
    })
    small.mousemove(function(e) {
        let x = e.clientX - mask.width() / 2
        let y = e.clientY - mask.height() / 2
        
        x = x - 50
        y = y - 50

        x = x < 0 ? 0 : x
        y = y < 0 ? 0 : y
        
        x = x > small.width() - mask.width() ? small.width() - mask.width() : x
        y = y > small.height() - mask.height() ? small.height() - mask.width() : y        

        mask.css({
            left: x + 'px',
            top: y + 'px'
        })
        // 遮挡层的移动距离 / 大图的移动距离 = 遮挡层的最大移动距离 / 大图的最大移动距离
        // 大图的移动距离(?) = 遮挡层的移动距离(x / y) * 大图的最大移动距离(maxX/Y) / 遮挡层的最大移动距离(maxX/Y)
        // 大图的横向最大移动距离
        let maxX = img.width() - big.width()
        // 遮罩层最大移动距离
        let maskX = small.width() - mask.width()
        // 比例
        let scale = maxX / maskX
        // 距离
        let bigMoveX = x * scale
        let bigMoveY = y * scale        

        img.css({
            marginLeft: -bigMoveX + 'px',
            marginTop: -bigMoveY + 'px'
        })
    })
})