;(function(window) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Player.prototype.init($progressBar, $progressLine, $progressDot)
    }
    Progress.prototype = {
        constructor: Lyric,
        isMove: false,
        init: function($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar
            this.$progressLine = $progressLine
            this.$progressDot = $progressDot
        },
        // 点击
        progressClick: function(callback) {
            let $this = this
            // 获取默认位置
            let normalLeft = this.$progressBar.offset().left
            // 点击的位置
            let eventLeft
            // 监听背景的点击
            this.$progressBar.click(function(e) {
                // 点击时距离窗口的位置
                eventLeft = e.pageX
                // 设置前景
                $this.$progressLine.css('width', eventLeft - normalLeft + 'px')
                $this.$progressDot.css('left', eventLeft - normalLeft + 'px')
                // 进度条比例
                let value = (eventLeft - normalLeft) / $(this).width()
                callback(value)
            })
        },
        // 移动
        progressMove: function(callback) {
            let $this = this
            let normalLeft = this.$progressBar.offset().left
            let barWidth = this.$progressBar.width()
            let eventLeft
            // 点击
            this.$progressBar.mousedown(function() {
                $this.isMove = true
                // 移动
                $(document).mousemove(function(e) {
                    eventLeft = e.pageX
                    // 判断范围
                    let offset = eventLeft - normalLeft
                    if ( offset < 0 || offset > barWidth ) return true
                    $this.$progressLine.css('width', offset + 'px')
                    $this.$progressDot.css('left', offset + 'px')
                })
            })
            // 松开
            $(document).mouseup(function() {
                $(document).off('mousemove')
                $this.isMove = false
                // 进度条比例
                let value = (eventLeft - normalLeft) / $this.$progressBar.width()
                callback(value)
            })
        },
        setProgress: function(value) {
            if ( this.isMove ) return 
            if ( value < 0 || value > 100 ) return 
            this.$progressLine.css({
                width: value + '%'
            })
            this.$progressDot.css({
                left: value + '%'
            })
        }
    }
    Progress.prototype.init.prototype = Progress.prototype
    window.Progress = Progress
})(window)