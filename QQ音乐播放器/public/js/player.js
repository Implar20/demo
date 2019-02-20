;(function(window) {
    function Player($audio) {
        return new Player.prototype.init($audio)
    }
    Player.prototype = {
        constructor: Player,
        musicList: [],
        init: function($audio) {
            this.$audio = $audio
            this.audio = $audio.get(0)
        },
        currentIndex: -1,
        playMusic: function(index, music) {
            if ( this.currentIndex === index ) {
                if (this.audio.paused) {
                    this.audio.play()
                } else {
                    this.audio.pause()
                }
            } else {
                this.$audio.attr('src', music.link_url)
                this.audio.play()
                this.currentIndex = index
            }
        },
        preIndex: function() {
            let index = this.currentIndex - 1
            if ( index < 0 ) {
                index = this.musicList.length - 1
            }
            return index
        },
        nextIndex: function() {
            let index = this.currentIndex + 1
            if ( index > this.musicList.length - 1 ) {
                index = 0
            }
            return index
        },
        changeMusic: function(index) {
            // 根据索引删除音乐
            this.musicList.splice(index, 1)
            // 判断当前删除的是否正在播放
            if ( index < this.currentIndex ) {
                this.currentIndex = this.currentIndex - 1
            }
        },
        musicTimeUpdate: function(callback) {
            let $this = this
            this.$audio.on('timeupdate', function() {
                let duration = $this.audio.duration
                let currentTime = $this.audio.currentTime
                let timeStr = $this.formDate(currentTime, duration)
                callback(duration, currentTime, timeStr)
            })
        },
        // 定义一个格式化时间的方法
        formDate: function(currentTime, duration) {
            // 结束时间
            let endMin = parseInt(duration / 60)
            let endSec = parseInt(duration % 60)
            if ( endMin < 10 ) {
                endMin = '0' + endMin
            }
            if ( endSec < 10 ) {
                endSec = '0' + endSec
            }
            // 开始时间
            let startMin = parseInt(currentTime / 60)
            let startSec = parseInt(currentTime % 60)
            if ( startMin < 10 ) {
                startMin = '0' + startMin
            }
            if ( startSec < 10 ) {
                startSec = '0' + startSec
            }
            return startMin + ':' + startSec + ' / ' + endMin + ':' + endSec
        },
        musicSeekTo: function(value) {
            if ( isNaN(value) ) return 
            this.audio.currentTime = this.audio.duration * value
        },
        musicVoiceSeekTo: function(value) {
            if ( isNaN( value ) ) return 
            if ( value >= 0 && value <= 1 ) {
                // 0~1
                this.audio.volume = value
            }
        }
    }
    Player.prototype.init.prototype = Player.prototype
    window.Player = Player
})(window)