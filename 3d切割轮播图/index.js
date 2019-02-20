$(function() {
    // 点击切换
    // 定义一个索引
    let index = 0
    // 节流阀
    let flag = true
    // 左边的 上一张
    $('.left').click(function() {
        if ( !flag ) return 
        flag = false
        index --
        console.log(index)
        let angle = - index * 90
        $('li')
            .css({
                transform: 'rotateX(' + angle + 'deg)'
            })
            .each(function(i) {
                $(this).css('transition-delay', i * 0.25 + 's')
            })
            
    })
    // 右边的 下一张
    $('.right').click(function() {
        if ( !flag ) return 
        flag = false
        index ++
        console.log(index)
        let angle = - index * 90
        $('li')
            .css({
                transform: 'rotateX(' + angle + 'deg)'
            })
            .each(function(i) {
                $(this).css('transition-delay', i * 0.25 + 's')
            })
    })
    // 优化
    $('li:last').on('transitionend', function() {
        flag = true
    })
})