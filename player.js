//<-------------------------------------------歌词部分-------------------------------------------------->
var get = function(url, data, callback) {
        var xhr = new XMLHttpRequest()
            //判断自身属性是否存在
        var param = '?'
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                param += key + '=' + data[key] + '&'
            }
        }
        // 我们最终想要的格式http://localhost:3000/song/url?id=33894312
        param = param.slice(0, param.length - 1)
            // console.log(url + param)
        xhr.open('GET', url + param, true)
        xhr.send()
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) { //callback回调函数存在的话 就把结果传给他
                if (callback) {
                    callback(JSON.parse(xhr.response))
                }

            }
        }
    }
    // 歌词格式：[00:10.254]他只是经过 你的 世界 
    // 需要将它解析为[{time:10.254s,content:'他只是经过 你的 世界'},{}]
    //1.把字符串(歌词)通过split()方法->数组
    //2.数组的每一项为一句歌词,把每一项变成对象格式
    //3.time转化为数字格式 
    //获取歌词
var getDetail = function(id, callback) {
    get('http://localhost:3000/song/detail', { ids: id }, function(e) {



        if (callback) {
            callback(e) //回调函数里有获取到的lrc

        }
    })
}

var getLrc = function(id, callback) {
    get('http://localhost:3000/lyric', { id: id }, function(e) {


        lrcString = e.lrc.lyric
        if (callback) {
            callback(lrcString) //回调函数里有获取到的lrc

        }
    })
}

//歌词解析函数(时间要进行处理)
var parseTime = function(time) {
    //01:55.73  ->    分钟(转秒)01*60  : 秒55.73 -> 秒60+ 秒55.73->秒 115.73-> 毫秒1157300  
    var minutes = parseInt(time.split(':')[0])
    var second = parseFloat(time.split(':')[1])
    var sumSecond = ((minutes * 60 + second) * 1000)
    return sumSecond
}
var LrcParse = function(lrcString) {
    var lrcArr = [] //在这里面存储我们要的歌词
    var lrcArrObj = []
    lrcArr = lrcString.split('\n') //转化为数组 
    lrcArr.forEach(function(e) {
        var line = e.split(']') //split切割成数组
            // 因为要把time转数字格式 所以在这里就处理了
        var time = parseTime(line[0].slice(1, line[0].length))
        var content = line[1]
            //因为是用\n分割的 所以最后一项不加入到数组中

        //跳过最后一项
        if (content != undefined && !isNaN(time)) {
            lrcArrObj.push({ time: time, content: content }) //提取时间 歌词
        }


    })
    console.log(lrcArrObj.length)
    return lrcArrObj
        // 切割的第二种方法,但是有可能时间有变化
        // var time = lrcArr[i].slice(0, 11)
        // var content = lrcArr[i].slice(11, lrcArr[i].length)
        // lrcArr[i] = { time: time, content: content }


}

var id = $('#audio').attr('songid')
var audio = document.getElementById('audio')
var playerBody = $('.player-body')

getLrc(id, (lrcString) => {
    //把lrcstring传给parse方法
    console.log(lrcString)
    lrcArrObj = LrcParse(lrcString)
    fillLrc(lrcArrObj)
})
getDetail(id, (res) => {
        console.log(res)
    })
    //歌词填充 ,每次切歌都要调用一下他
var nowLrcObJArr = []
var lrcul = $('#lrcul')
var fillLrc = function(lrcObj) {
        var html = ''
        var tpl = `
    <li class="lrc-item">
    {$content}
    </li>
    `
        for (var i = 0; i < lrcArrObj.length; i++) {
            html += tpl.replace('{$content}', lrcArrObj[i].content)
        }
        lrcul.html(html)
        nowLrcObJArr = lrcObj

    }
    //歌词滚动
var index = 0
var marginTop = 210
    // 对比歌词
audio.addEventListener('timeupdate', function() {
    compareLrc()
})
var compareLrc = function() {
    // 获取所有歌词,对比时间确定哪个歌词正在播放
    var lrcItem = $('.lrc-item')
        // 对比时间确定那句歌词在播放 
        // 播放的歌词总是递增的,现在的播放的那句歌词时间-当前时间
        // 才可以 ,反过来的话,之前的项-当前播放时间为负数 也小于了

    if ((nowLrcObJArr[index].time - audio.currentTime * 1000) < 300) {
        lrcItem[index].style.color = '#31c27c'
            // 歌词滚动展示的时候 每次都让ul的margin-top -一个li的高度 
            // 这样就有像上滚动的效果
        marginTop -= 50
        lrcul.css('marginTop', marginTop)
        if (index - 1 > -1) {
            lrcItem[index - 1].style.color = ''
                // 
        }
        index++
        console.log(index)
    }
    // 对比下一句歌词


}




//<-------------------------------------------自定义播放器部分-------------------------------------------------->
var playButton = $('.play-button')
var pauseButton = $('.stop-button')
    //播放按钮 :点击时 暂停按钮出现 自身隐藏 开始播放
playButton.on('click', function() {
        pauseButton.show()
        playButton.hide()
        audio.play()
    })
    //暂停按钮:点击时  播放按钮出现 自身隐藏 暂停播放
pauseButton.on('click', function() {
    pauseButton.hide()
    playButton.show()
    audio.pause()
})


// 时长部分处理
var currentTimeShow = $('.currentTime')
var sumTimeShow = $('.sumTime')
var duration = audio.duration //页面最初不知道音频是什么状态 所以为NaN



// 秒->分

var secondToMin = function(second) {
        //获取分钟
        var min = parseInt(second / 60)
        min = min > 9 ? min : '0' + min
        var s = parseInt(second % 60)
        s = s > 9 ? s : '0' + s
        var mins = min + ':' + s

        return mins
    }
    //进度条时间展示部分
audio.addEventListener('timeupdate', function() {
    currentTimeShow.html(secondToMin(audio.currentTime))
    sumTimeShow.html(secondToMin(audio.duration))
    percent(audio.duration, audio.currentTime)
})




//<-------------------------------------------音量控制-------------------------------------------------->
var volumeLoad = $('.volume_load')
var volumePoint = $('.volume_point')
var volumeControl = $('.volume_control')
var volumeProgress = $('.volume-progress')
    //jq实现元素拖拽
var offsetX = 0
var offsetY = 0
var position
var canMove = false
    //思路是 想要移动的按钮 开启可移动状态，然后在你想要移动的范围内挂监听move的时间
    //在父类移动范围里计算激动的位置 最后关闭移动状态
volumePoint.mousedown(function(e) {
    offsetX = $(this).position().left //jQ中用position获取相对于父类的偏移量，原生是offsetLeft

    canMove = true
})
var percentVolume
$(volumeControl).mousemove(function(e) {
    if (canMove) {
        var initLeft = $(this).offset().left //初始的位置
        position = e.clientX - initLeft
            // console.log(e.clientX - initLeft) //相对于页面的位置
        if ((position) < 75 && (position) > 0) {
            volumePoint.css({
                left: position - 2 //相对于页面的位置-初始位置 为left移动距离
            })
            percentVolume = position / 80
            volumeProgress.width(percentVolume * 80)
                // console.log(position / 80)
            if (percentVolume <= 0.125) {
                console.log(1)
                audio.volume = 0
            }
            if (percentVolume >= 0.925) { audio.volume = 1 } else { audio.volume = percentVolume }
        }
    }
})
$(document).mouseup(function() {
        canMove = false
            // $(document).off("mousemove");
    })
    // console.log(audio.volume)

//点击静音、恢复
var volumeIcon = $('.volume_icon')
var canChange = true
volumeIcon.on('click', function() {
        console.log(percentVolume)
        if (canChange) {
            audio.volume = 0
            canChange = false
        } else {
            audio.volume = percentVolume
            canChange = true
        }

    })
    //点击调整音量
volumeLoad.on('click', function(e) {
        console.log(percentVolume)
        var pos = $(this).position().left

        console.log(pos)
        volumeProgress.width(percentVolume * 80)
            // audio.volume = percentVolume
        volumePoint.css({
            left: position - 2 //相对于页面的位置-初始位置 为left移动距离
        })
    })
    // audio.play()









//<-------------------------------------------进度控制-------------------------------------------------->
//百分比展示
var percentProgress = $('.percent')
var pointProgress = $('.progress_point')
var progressControl = $('.progress-control')
var percent = function(sum, current) {
    var percentWidth = current / sum
    percentProgress.width(percentWidth * 510)
    pointProgress.css('left', percentWidth * 510)
}
pointProgress.mousedown(function(e) {
    var offsetX = $(this).position().left //jQ中用position获取相对于父类的偏移量，原生是offsetLeft
    console.log(offsetX)
    canMove = true
})
progressControl.mousemove(function(e) {
    if (canMove) {
        var initLeft = $(this).offset().left //初始的位置
        var position = e.clientX - initLeft
        console.log(e.clientX - initLeft) //相对于页面的位置

        pointProgress.css({
            left: position - 2 //相对于页面的位置-初始位置 为left移动距离
        })
        var percent = position / 511
        percentProgress.width(percent * 511)
        audio.currentTime = audio.duration * percent

    }
})
$(document).mouseup(function() {
    canMove = false

})

//<-------------------------------------------背景图片设置-------------------------------------------------->
// 设置图片背景层虚化时：将图片置于一个wrap  文字置于一个wrap 为图片设置filter(blur:;)属性
var playBc = $('.player-bc')
getDetail(id, (res) => {
    var imgUrl = res.songs[0].al.picUrl
    console.log(imgUrl)
    playBc.css('background', 'url(' + imgUrl + ')')
})

var init = function() {
        audio.play()
    }
    // init()