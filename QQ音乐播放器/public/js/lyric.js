(function(window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path)
    }
    Lyric.prototype = {
        constructor: Lyric,
        times: [],
        lyrics: [],
        index: -1,
        init: function(path) {
            this.path = path
        },
        loadLyric: function(callback) {
            let $this = this
            $.ajax({
                url: $this.path,
                dataType: 'text',
                success: function(data) {
                    $this.parseLyric(data)
                    callback()
                },
                error: function(err) {
                    console.log('error', err)
                }
            })
        },
        parseLyric: function(data) {
            let $this = this
            // 清空上一首歌曲的歌词
            $this.times = []
            $this.lyrics = []
            let array = data.split('\n')
            // 使用正则匹配歌词
            let timeReg = /\[(\d*:\d*\.\d*)\]/
            // 遍历取出每一条歌词
            $.each(array, function(index, item) {
                // 处理歌词
                let lrc = item.split(']')[1]
                $this.lyrics.push(lrc)

                let res = timeReg.exec(item)
                if ( res === null ) return true
                let timeStr = res[1]
                let res2 = timeStr.split(':')
                let min = parseInt(res2[0]) * 60
                let sec = parseFloat(res2[1])
                let time = + Number(min + sec).toFixed(2)
                $this.times.push(time)
            })
        },
        currentIndex: function(currentTime) {
            if ( currentTime >= this.times[0] ) {
                this.index ++
                this.times.shift()  // 删除数组最前面的元素
            }
            return this.index
        }
    }
    Lyric.prototype.init.prototype = Lyric.prototype
    window.Lyric = Lyric
})(window)