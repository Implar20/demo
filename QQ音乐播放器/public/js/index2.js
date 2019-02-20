$(function() {
    // 声明变量
    // 获取 audio 节点对象
    let $audio = $('audio')
    // 获取 Player 播放对象
    const Player = Player($audio)
    // 进度条对象
    let $progressBar = $('.music_progress_bar')
    let $progressLine = $('.music_progress_line')
    let $progressDot = $('.music_progress_dot')
    let progress = Progress($progressBar, $progressLine, $progressDot)
    // 歌词对象
    let $voiceBar = $('.music_voice_bar')
    let $voiceLine = $('.music_voice_line')
    let $voiceDot = $('.music_voice_dot')
    let voiceProgress = Progress($voiceBar, $voiceLine, $voiceDot)
    let lyric = lyric(music.link_lrc)

    // 事件初始化
    initEvents()
    // 加载歌曲列表
    getPlayerList()
    // 进度条初始化
    initProgress()

    // 滚动条
    $('.content_list').mCustomScrollbar({
        scrollIntertia: 200
    })
    // 事件初始化
    function initEvents() {
        // 底部播放按钮
        let $musicPlay = $('.music_play')

        // .list_menu 显示隐藏
        $('.content_list').delegate('.list_music', 'mouseenter', function() {
            $(this).find('.list_menu').stop().fadeIn(0)
            $(this).find('.list_time a').stop().fadeIn(0)
            $(this).find('.list_time span').stop().fadeOut(0)
        })
        $('.content_list').delegate('.list_music', 'mouseleave', function() {
            $(this).find('.list_menu').stop().fadeOut(0)
            $(this).find('.list_time a').stop().fadeOut(0)
            $(this).find('.list_time span').stop().fadeIn(0)
        })
        // 给 .list_menu 添加 show 属性
        $('.content_list').delegate('.list_menu_play', 'click', function() {
            $(this).parents('.list_menu').addClass('show')
            $(this).parents('.list_music').siblings().find('.list_menu').removeClass('.show')
        })
        // 复选框点击
        $('.content_List').delegate('.list_check', 'click', function() {
            $(this).toggleClass('list_checked')
        })
        // 清除列表
        $('.content_toolbar_clean').click(function() {
            $('.list_music').find('.list_menu_del').trigger('click')
        })
        // 子菜单播放按钮的监听
        $('.content_list').delegate('.list_menu_play', 'click', function() {
            $(this).toggleClass('list_menu_pause')
            let $item = $(this).parents('.list_music')
            $item.siblings().find('.list_menu_play').removeClass('.list_menu_pause')

            if ( $(this).attr('class').indexOf('list_menu_pause') !== -1 ) {
                $musicPlay.addClass('music_play2')
                $item.find('div').css('color', '#fff')
                $item.siblings().find('div').css('color', 'rgba(255, 255, 255, 0.5)')
            } else {
                $musicPlay.removeClass('music_play2')
                $item.find('div').css('color', 'rgba(255, 255, 255, 0.5)')
            }
            // 序号动画
            $item.find('.list_number').toggleClass('list_number2')
            $item.siblings().find('.list_number').removeClass('list_number2')
            // 播放音乐
            player.playMusic($item.get(0).index, $item.get(0).item)
            // 切换音乐
            initMusicInfo($item.get(0).item)
            // 切换歌词
            initLyricInfo($item.get(0).item)
        })
        // 监听底部控制区播放按钮的点击
        $musicPlay.click(function() {
            $(this).parents('.footer_in').find('.music_play').toggleClass('.music_play2')
            // 判断有无播放过音乐
            if ( player.currentIndex === -1 )
                $('.list_music').eq(0).find('.list_menu_play').trigger('click')
            else
                $('.list_music').eq(player.currentIndex).find('.list_menu_play').trigger('click')
        })
        // 上一首
        $('.music_pre').click(function() {
            $('.list_music').eq(player.preIndex()).find('.list_menu_play').trigger('click')
        })
        // 下一首
        $('.music_pre').click(function() {
            $('.list_music').eq(player.nextIndex()).find('.list_menu_play').trigger('click')
        })
        // 删除音乐
        $('.content_list').delegate('.list_menu_del', 'click', function() {
            let $item = $(this).parents('.list_music')
            // 判断当前删除的是否正在播放
            if ( $item.get(0).index === player.currentIndex )
                $('.music_next').trigger('click')
            // 删除页面中的元素
            $item.remove()
            // 删除后台数据
            player.changeMusic($item.get(0).index)
            // 重新排序
            $('.list_music').each(function(index, item) {
                item.index = index
                // 原来是在模板中 + 1.现在是在这里
                $(item).find('.list_number').text(index + 1)
            })
        })
        // 监听播放的进度
        player.musicTimeUpdate(function(duration, currentTime, timeStr) {
            // 同步时间
            $('.music_progress_time').text(timeStr)
            // 同步进度条 计算播放比例
            let value = currentTime / duration * 100
            progress.setProgress(value)
            // 实现歌词的同步
            let index = lyric.currentIndex(currentTime)
            let $item = $('.song_lyric li').eq(index)
            $item.addClass('cur')
            $item.siblings().removeClass('cur')
            if ( index <= 4 ) return 
            $('.song_lyric').css({
                marginTop: ((-index + 4) * 30) + 'px'
            })
        })
        // 监听声音按钮
        $('.music_voice_icon').click(function() {
            // 图标
            $(this).toggleClass('music_voice_icon2')
            // 声音
            if ( $(this).attr('class').indexOf('music_voice_icon2') !== -1 )
                // no
                player.musicVoiceSeekTo(0)
            else 
                // has
                player.musicVoiceSeekTo(1)
        })
    }
    // 模板函数
    function createMusicItem(index, item) {
        let $item = $('<li class="list_music">' +
                        '<div class="list_check"><i></i></div>' +
                        '<div class="list_number">' + (index + 1) + '</div>' +
                        '<div class="list_name">' + item.name +
                            '<div class="list_menu">' +
                                '<a href="javascript:;" title="播放" class="list_menu_play"></a>' +
                                '<a href="javascript:;" title="添加"></a>' +
                                '<a href="javascript:;" title="下载"></a>' +
                                '<a href="javascript:;" title="分享"></a>' +
                            '</div>' +
                        '</div>' +
                        '<div class="list_singer"><a href="javscript:;">' + item.singer + '</a></div>' +
                        '<div class="list_time">' +
                            '<span>' + item.time + '</span>' +
                            '<a href="javascript:;" title="删除" class="list_menu_del"></a>' +
                        '</div>' +
                    '</li>')
    
        $item.get(0).index = index
        $item.get(0).item = item
    
        return $item
    }
    // 加载歌曲列表
    function getPlayerList() {
        $.ajax({
            url: '/QQ音乐播放器/song/music.json',
            dataType: 'json',
            success: function(data) {
                player.musicList = data
                let $musicList = $('.content_List ul')
                $.each(data, function(index, item) {
                    let $item = createMusicItem(index, item)
                    $musicList.append($item)
                })
                initMusicInfo(data[0])
                initLyricInfo(data[0])
            },
            error: function(err) {
                console.log(err)
            }
        })
    }
    // 初始化进度条
    function initProgress() {
        // 进度条点击
        progress.progressClick(function(value) {
            player.musicSeekTo(value)
        })
        // 进度条移动
        progress.progressMove(function(value) {
            player.musicSeekTo(value)
        })
        // 音量
        voiceProgress.progressClick(function(value) {
            player.musicVoiceSeekTo(value)
        })
        voiceProgress.progressMove(function(value) {
            player.musicVoiceSeekTo(value)
        })
    }
    // 初始化歌曲信息
    function initMusicInfo(music) {
        let $musicImg = $('.song_info_pic img')
        let $musicName = $('.song_info_name a')
        let $musicSinger = $('.song_info_singer a')
        let $musicAblum = $('.song_info_ablum a')
        let $musicProgressName = $('.music_progress_name')
        let $musicProgressTime = $('.music_progress_time')
        let $musicBg = $('.mask_bg')

        // 赋值
        $musicImg.attr('src', music.cover)
        $musicName.text(music.name)
        $musicSinger.text(music.singer)
        $musicAblum.text(music.ablum)
        $musicProgressName.text(music.name + ' - ' + music.singer)
        $musicProgressTime.text('00:00 / ' + music.time)
        $musicBg.css('background', 'url(' + music.cover  + ')')
    }
    // 初始化歌词
    function initLyricInfo(music) {
        lyric = Lyric(music.link_lrc)
        let $lyricContainer = $('.song_lyric')
        // 清空歌词
        $lyricContainer.html('')
        lyric.loadLyric(function() {
            // 创建歌词列表
            $.each(lyric.lyrics, function(index, itme) {
                let $item = $('<li>' + item + '</li>')
                $lyricContainer.append($item)
            })
        })
    }
})