var wrapPay = document.getElementsByClassName('opt_item')[2]
var special = document.getElementsByClassName('special')
var wrapIns = document.getElementsByClassName('wrap-ins')[0]
var li_firest = special[0]
var li_second = special[1]
    //导航栏下拉框部分
wrapPay.addEventListener('mouseover', function() {
    wrapIns.style.display = 'block'
        // wrapIns.style.backgroundColor='black'


})
wrapIns.addEventListener('mouseover', function() {
    wrapIns.style.display = 'block'

})
wrapIns.addEventListener('mouseout', () => {
        wrapIns.style.display = 'none'
    })
    // 封装get方法
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
    //封装搜索方法
var search = function(keywords, callback) {
        get('http://localhost:3000/search', { keywords: keywords }, function(res) {

            if (callback) {
                callback(res.result.songs)
                    // callback(res)

            }
        })

    }
    //封装获取音乐播放地址的方法
var getUrl = function(id, callback) {
        get('http://localhost:3000/song/url', { id: id }, function(res) {
            if (callback) {
                callback(res.data[0])
            }

        })
    }
    //封装获取id的方法
var getId = function(keywords, callback) {
        get('http://localhost:3000', { keywords: keywords }, function(res) {
            var id = res.result.songs.id
            console.log(id)
        })
    }
    //封装获取歌手专辑信息的方法
var getAlbums = function(id, callback) {

    get('http://localhost:3000/artist/album', { id: id }, function(res) {
        if (callback) {
            callback(res)
            console.log(res)
        }
    })
}

//封装获取热搜列表的方法渲染搜索框 
var searchHotUl = document.getElementsByClassName('search-hot')[0]
var getHot = function(callback) {
    get('http://localhost:3000/search/hot', '', function(res) {
            if (callback) {
                callback(res)
                tmp = ''
                var hotSong = res.result.hots
                tmp += `
        <ul class="search-hot">
        <li class="search-hot-item"><a href=""><span>1</span>${hotSong[0].first}</a></li>
        <li class="search-hot-item"><a href=""><span>2</span>${hotSong[1].first}</a></li>
        <li class="search-hot-item"><a href=""><span>3</span>${hotSong[2].first}</a></li>
        <li class="search-hot-item"><a href=""><span>4</span>${hotSong[3].first}</a></li>
        <li class="search-hot-item"><a href=""><span>5</span>${hotSong[4].first}</a></li>
    </ul>                   `
                searchHotUl.innerHTML = tmp

            }
        })
        // var hotSong=res.result.hots
        // console.log(hotSong)

}
getHot(function(res) {
        console.log(res)
    })
    //封装搜索出第一首歌并播放
    // search('他只是经过',function(res)
    // {

//     var id=res.result.songs[0].id
//     getUrl(id,function(res)
//     {
//         console.log(res.data)
//         var url=res.data[0].url
//         console.log(url)
//         var audio=document.getElementById('audio')
//         audio.src=url

//     })
// })
var searchNav = document.getElementsByClassName('search_nav')[0]
    // var searchKey=searchNav.Value
    // console.log(searchKey)

//渲染页面展示搜索结果+封装出搜索推荐  将id传入到属性中去 并获取，以便接下来的播放
http: //localhost:3000/search/search/suggest?keywords=
    var songList = document.getElementsByClassName('song_list')[0]
var submitButton = document.getElementsByClassName('search')
var submitButton_1 = submitButton[0]
var submitButton_2 = submitButton[1]

//渲染搜索结果页面
var renderSearch = function(key) {
    search(key, function(final) {
        var html = ''
        var count = 0
            //将id和名字放于query内 在服务器端获取
            //而let由于是块作用域，所以如果在块作用域内定义的变量，比如说在for循环内，在其外面是不可被访问的，所以for循环推荐用let
        for (let i = 0; i < 12; i++) { //解决问题关键在于let确定id值 不使用let的话 会使数据只有一条 闭包
            console.log(i)
            var id = final[i].id
            console.log(id)
            getUrl(id, function(res) {
                let tpl = `
                    <a class='songsa' href="/getPlayer?id={$id}&url={$url}&name={$name}&artist={$artists}">
                    <li class="song_list_item" data-id="{$id}">
                    <span class="song">{$songname}</span><span class="artist">{$artist}</span>
                    <span class="album">{$album}</span>
                    <span class="time"></span>
                    </li>
                    </a>`
                url = res.url
                console.log(url)
                html += tpl.replace("{$name}", final[i].name)
                    .replace("{$songname}", final[i].name)
                    .replace("{$artists}", final[i].artists[0].name)
                    .replace("{$artist}", final[i].artists[0].name)
                    .replace("{$album}", final[i].album.name)
                    .replace("{$id}", final[i].id)
                    .replace("{$url}", url)
                console.log(html)
                songList.innerHTML = html

            })



        }


        addEverntListner()

    })


}


// songListItem.on('click', function() {
//     getPlayer()
// })
var getPlayer = function() {
        $.ajax({
            type: 'get',
            url: '/getPlayer',
            data: {},
            success: function(res) {
                console.log(res)
            }
        })
    }
    // 点击对应项跳转 
var addEverntListner = function() {
    var songListItem = $('.song_list_item')

    songListItem.on('click', function() {
            getPlayer()


        })
        // songListItem.css('background-color', 'blue')
    var songsa = $('.songsa')
        // songsa.css('background-color', 'blue')

}

// }
// getSongsPlayerUrl()

submitButton_2.addEventListener('click', function() {
    var searchKey = searchNav.value
    console.log(typeof searchKey)
    renderSearch(searchKey)
})



var searchSuggest = function(keywords, callback) {
    var searchKey = searchNav.Value
    get('http://localhost:3000/search/suggest', { keywords: keywords }, function(res) {

        if (callback) {
            callback(res)
            console.log(res)
        }
    })

}
var defaultSong = function(callback) {
    get('http://localhost:3000/search/default', '', function(res) {
        if (callback) {
            callback(res)
        }
    })

}



var searchSongs = function(keywords, callback) {
    get('http://localhost:3000/search', { keywords: keywords }, function(res) {

        if (callback)

            callback(res.result.songs)

    })

}
var searchArtist = function(keywords, callback) {
    get('http://localhost:3000/search', { keywords: keywords, type: 100 }, function(res) {

        if (callback) {
            // callback(res.result.songs)
            callback(res.result.artists)

        }
    })

}
var searchAlbum = function(keywords, callback) {
    get('http://localhost:3000/search', { keywords: keywords, type: 10 }, function(res) {

        if (callback) {
            // callback(res.result.songs)
            callback(res.result.albums)

        }
    })

}
var searchMv = function(keywords, callback) {
    get('http://localhost:3000/search', { keywords: keywords, type: 1006 }, function(res) {

        if (callback) {
            // callback(res.result.songs)
            callback(res.result.songs)

        }
    })

}
var searchNav_1 = $('.seaech_nav')
var songsList = $('.songs-list').eq(0)
var artistsList = $('.artists-list').eq(0)
var albumsList = $('.albums-list').eq(0)
var mvList = $('.mvs-list').eq(0)
var searchShow = $('.search_show')
var searchResult_1 = $('.search_result')
searchNav_1.on('input', function() {
    searchShow.css('display', 'none')
    searchResult_1.slideDown()
        // searchShow.slideUp()
    inputSearchList()
})
searchNav_1.on('blur', function() {
    searchShow.slideUp()
    searchResult_1.slideUp()
})
var inputSearchList = function() {
    var params = {}
    var search_1Keys = searchNav_1.val()
    searchArtist(search_1Keys, function(res) {
        var html = ''
        var tpl = '<li class="artist-item"><a href="">${artistName}</a></li>'
        for (var i = 0; i < 2; i++) {
            html += tpl.replace('${artistName}', res[i].name)
        }
        artistsList.html(html)
    })
    searchSongs(search_1Keys, function(res) {
        var html = ''
        var tpl = '<li class="song-item"><a href="">${song}</a></li>'
        for (var i = 0; i < 4; i++) {
            html += tpl.replace('${song}', res[i].name)

        }
        songsList.html(html)
    })
    searchMv(search_1Keys, function(res) {
        var html = ''
        var tpl = '<li class="mv-item"><a href="">${mv}</a></li>'
        for (var i = 0; i < 2; i++) {
            html += tpl.replace('${mv}', res[i].name)

        }
        mvList.html(html)
    })
    searchAlbum(search_1Keys, function(res) {
        var html = ''
        var tpl = '<li class="album-item"><a href="">${album}</a></li>'
        for (var i = 0; i < 2; i++) {
            html += tpl.replace('${album}', res[i].name)

        }
        albumsList.html(html)
    })
}
searchNav_1.on('click', function() {
    // searchShow.css('display','none')
    searchShow.slideDown()
    console.log(1)
})