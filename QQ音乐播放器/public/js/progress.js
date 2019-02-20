;(function(window) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot)
    }
    Progress.prototype = {
        constructor: Progress,
        isMove: false,
        init: function($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar
            this.$progressLine = $progressLine
            this.$progressDot = $progressDot
        },
        progressClick: function(callback) {
            let $this = this
            // 获取背景距离窗口默认的位置
            let normalLeft = this.$progressBar.offset().left
            let eventLeft
            // 监听背景的点击
            this.$progressBar.click(function(e) {
                // 获取点击的位置距离窗口的位置
                eventLeft = e.pageX
                // 设置前景的宽度
                $this.$progressLine.css('width', eventLeft - normalLeft)
                $this.$progressDot.css('left', eventLeft - normalLeft)
                // 进度条比例
                let value = (eventLeft - normalLeft) / $(this).width()
                callback(value)
            })
        },
        progressMove: function(callback) {
            let $this = this
            let normalLeft = this.$progressBar.offset().left
            let barWidth = this.$progressBar.width()
            let eventLeft
            // 监听按下
            this.$progressBar.mousedown(function() {
                $this.isMove = true
                // 监听移动
                $(document).mousemove(function(e) {
                    eventLeft = e.pageX
                    // 判断范围
                    let offset = eventLeft - normalLeft
                    if ( offset >= 0 && offset <= barWidth ) {
                        $this.$progressLine.css('width', offset + 'px')
                        $this.$progressDot.css('left', offset + 'px')
                    }
                })
            })
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