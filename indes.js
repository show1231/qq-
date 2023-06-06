var wrapPay = document.getElementsByClassName('opt_item')[2]
var special = document.getElementsByClassName('special')
var wrapIns = document.getElementsByClassName('wrap-ins')[0]
var li_firest = special[0]
var li_second = special[1]
//导航栏下拉框部分
wrapPay.addEventListener('mouseover', function () {
    wrapIns.style.display = 'block'
    // wrapIns.style.backgroundColor='black'


})
wrapIns.addEventListener('mouseover', function () {
    wrapIns.style.display = 'block'

})
wrapIns.addEventListener('mouseout', () => {
    wrapIns.style.display = 'none'
})


//button部分
var preButton = document.getElementsByClassName('left')
var nextButton = document.getElementsByClassName('right')
var modBodyFirstWrap = document.getElementsByClassName('mod_body_wrap')
var flag
for (var i = 0; i < modBodyFirstWrap.length; i++) {
    modBodyFirstWrap[i].addEventListener('mouseover', function () {

        flag = this.getAttribute('num')
        preButton[flag].style.left = 0 + 'px'
        nextButton[flag].style.right = 0 + 'px'
        preButton[flag].style.backgroundColor = 'rgba(0,0,0,0.05)'
        nextButton[flag].style.backgroundColor = 'rgba(0,0,0,0.05)'
        nextButton[flag].style.right = 0 + 'px'
        preButton[flag].style.transition = 'all .5s'
        nextButton[flag].style.transition = 'all .5s'
    })

    modBodyFirstWrap[i].addEventListener('mouseout', () => {

        preButton[flag].style.left = -79 + 'px'
        nextButton[flag].style.right = -79 + 'px'
        preButton[flag].style.transition = 'all .5s'
        nextButton[flag].style.transition = 'all .5s'
    }

    )
}

//first-image

//轮播部分
var middleImageUl = document.getElementsByClassName('middle-image-ul')
var middleImageUlBefore = middleImageUl[0]
var middleImageUlAfter = middleImageUl[1]
var middleImageWrap = document.getElementsByClassName('middle-image-wrap')[0]
var middleImageWrapLeft
var headerPoints = document.getElementsByClassName('header-point-item')
var pointFlag = 0
var i = 0
//第一部分
//圆点样式清空函数
var clear = function () {
    for (var i = 0; i < headerPoints.length; i++) {
        headerPoints[i].style.backgroundColor = 'rgba(0,0,0,0.1)'
    }
}

//具体用哪个圆点判断函数
var panduan = function () {
    length = (middleImageWrap.style.left.length) - 2//得出left偏移量的数字值
    middleImageWrapLeft = Number(middleImageWrap.style.left.slice(0, length))//去除px单位
    console.log(Math.abs(middleImageWrapLeft))//变成正数
    middleImageWrapLeft = Math.abs(middleImageWrapLeft)
    console.log(middleImageWrapLeft)
    flagPoint = (middleImageWrapLeft / 1260) - 1  //算出对应的圆点是哪一个
    console.log(flagPoint)
    headerPoints[flagPoint].style.backgroundColor = 'rgba(0,0,0,0.6)'
}
var goNext = function () {
    middleImageWrap.style.left = -  2520 + 'px'
    clear()
    panduan()
}
var goPre = function () {
    middleImageWrap.style.left = -1260 + 'px'
    clear()
    panduan()
}
preButton[0].addEventListener('click', goPre)
nextButton[0].addEventListener('click', goNext)

// 圆点样式切换
for (var i = 0; i < headerPoints.length; i++) {
    headerPoints[i].addEventListener('click', function () {
        pointFlag = this.getAttribute('num')
        middleImageWrap.style.left = -1260 * (Number(pointFlag) + 1) + 'px'
        this.style.backgroundColor = 'rgba(0,0,0,0.6)'
    })
    headerPoints[i].addEventListener('mouseover', function () {

        this.style.backgroundColor = 'rgba(0,0,0,0.6)'
    })
    headerPoints[i].addEventListener('mouseout', function () {
        clear()
        panduan()
        if (flagPoint == this.getAttribute('num')) {
            this.style.backgroundColor = 'rgba(0,0,0,0.6)'
        } else {

            this.style.backgroundColor = 'rgba(0,0,0,0.1)'
        }
    })
}


//第二部分 圆点切换+轮播
//圆点样式清空
var middleBodySecondWrap = document.getElementsByClassName('middle-body-second-wrap')[0]
var middlePoints = document.getElementsByClassName('middle-point-item')
var clearSecond = function () {
    for (var i = 0; i < headerPoints.length; i++) {
        middlePoints[i].style.backgroundColor = 'rgba(0,0,0,0.1)'
    }
}
var preButton_second = preButton[1]
var nextButton_secnd = nextButton[1]

var panduan_second = function () {
    lengthSecond = (middleBodySecondWrap.style.left.length) - 2
    console.log(lengthSecond)
    middleBodySecondWrapLeft = Number(middleBodySecondWrap.style.left.slice(0, lengthSecond))
    console.log(Math.abs(middleBodySecondWrapLeft))
    middleBodySecondWrapLeft = Math.abs(middleBodySecondWrapLeft)
    console.log(middleBodySecondWrapLeft)
    flagMiddlePoint = (middleBodySecondWrapLeft / 1260) - 1
    console.log(flagMiddlePoint)
    middlePoints[flagMiddlePoint].style.backgroundColor = 'rgba(0,0,0,0.6)'
}
var goNext_second = function () {
    middleBodySecondWrap.style.left = -  2520 + 'px'
    clearSecond()
    panduan_second()
}
var goPre_second = function () {
    middleBodySecondWrap.style.left = -1260 + 'px'
    clearSecond()
    panduan_second()
}
preButton_second.addEventListener('click', goPre_second)
nextButton_secnd.addEventListener('click', goNext_second)

for (var i = 0; i < middlePoints.length; i++) {
    middlePoints[i].addEventListener('click', function () {
        pointFlagSecond = this.getAttribute('num')
        middleBodySecondWrap.style.left = -1260 * (Number(pointFlagSecond) + 1) + 'px'
        this.style.backgroundColor = 'rgba(0,0,0,0.6)'
    })
    middlePoints[i].addEventListener('mouseover', function () {

        this.style.backgroundColor = 'rgba(0,0,0,0.6)'
    })
    middlePoints[i].addEventListener('mouseout', function () {
        clearSecond()
        panduan_second()
        if (flagMiddlePoint == this.getAttribute('num')) {
            this.style.backgroundColor = 'rgba(0,0,0,0.6)'
        } else {

            this.style.backgroundColor = 'rgba(0,0,0,0.1)'
        }
    })
}


// 第三部分 圆点初始化获取元素
var headerPointItem = document.getElementsByClassName('mod_body_third_header-point-item')
var modBodyThirdImage = document.getElementsByClassName('mod_body_third_image')[0]
var clearThird = function () {
    for (var i = 0; i < headerPointItem.length; i++) {
        headerPointItem[i].style.backgroundColor = 'rgba(0,0,0,0.1)'
    }
}
var panduan_Third = function () {
    lengthThird = (modBodyThirdImage.style.left.length) - 2
    console.log(lengthThird)
    modBodyThirdImageLeft = Number(modBodyThirdImage.style.left.slice(0, lengthThird))
    console.log(Math.abs(modBodyThirdImageLeft))
    modBodyThirdImageLeft = Math.abs(modBodyThirdImageLeft)
    console.log(modBodyThirdImageLeft)
    flagThirdPoint = (modBodyThirdImageLeft / 1260) - 1
    console.log(flagThirdPoint)
    headerPointItem[flagThirdPoint].style.backgroundColor = 'rgba(0,0,0,0.6)'
}
var index_third = 1
var goNext_third = function () {


    if (modBodyThirdImage.style.left == '-3780px') {
        index_third = 3
    }
    else {
        index_third++
    }
    modBodyThirdImage.style.left = - 1260 * (index_third) + 'px'
    clearThird()
    panduan_Third()
}
var goPre_third = function () {
    console.log(index_third)
    if (modBodyThirdImage.style.left == '-1260px') {
        index_third = 1
    }
    else {
        index_third--
    }
    modBodyThirdImage.style.left = -1260 * index_third + 'px'
    clearThird()
    panduan_Third()
}
preButton[2].addEventListener('click', goPre_third)
nextButton[2].addEventListener('click', goNext_third)

for (var i = 0; i < headerPointItem.length; i++) {
    headerPointItem[i].addEventListener('click', function () {
        pointFlagThird = this.getAttribute('num')
        modBodyThirdImage.style.left = -1260 * (Number(pointFlagThird) + 1) + 'px'
        this.style.backgroundColor = 'rgba(0,0,0,0.6)'
    })
    headerPointItem[i].addEventListener('mouseover', function () {

        this.style.backgroundColor = 'rgba(0,0,0,0.6)'
    })
    headerPointItem[i].addEventListener('mouseout', function () {
        clearThird()
        panduan_Third()
        if (flagThirdPoint == this.getAttribute('num')) {
            this.style.backgroundColor = 'rgba(0,0,0,0.6)'
        } else {

            this.style.backgroundColor = 'rgba(0,0,0,0.1)'
        }
    })
}




// 第四部分
var middlePointForthItem=document.getElementsByClassName('middle-point-forth-item')
var middleBodyForthWrap=document.getElementsByClassName('middle-body-forth')[0]
var clearForth = function () {
    for (var i = 0; i < middlePointForthItem.length; i++) {
        middlePointForthItem[i].style.backgroundColor = 'rgba(0,0,0,0.1)'
    }
}
var panduan_Forth = function () {
    lengthForth = (middleBodyForthWrap.style.left.length) - 2
    console.log(lengthForth)
    var middleBodyForthWrapLeft = Number(middleBodyForthWrap.style.left.slice(0, lengthForth))
    console.log(Math.abs(middleBodyForthWrapLeft))
    middleBodyForthWrapLeft = Math.abs(middleBodyForthWrapLeft)
    console.log(middleBodyForthWrapLeft)
     flagForthPoint = (middleBodyForthWrapLeft / 1260) - 1
    console.log(flagForthPoint)
    middlePointForthItem[flagForthPoint].style.backgroundColor = 'rgba(0,0,0,0.6)'
}
var index_Forth = 1
var goNext_forth= function () {


    if (middleBodyForthWrap.style.left == '-2520px') {
        index_Forth = 2
    }
    else {
        index_Forth++
    }
    middleBodyForthWrap.style.left = - 1260 * (index_Forth) + 'px'
    clearForth()
    panduan_Forth()
}
var goPre_forth = function () {
    console.log(index_Forth)
    if (middleBodyForthWrap.style.left == '-1260px') {
        index_Forth = 1
    }
    else {
        index_Forth--
    }
    middleBodyForthWrap.style.left = -1260 * index_Forth + 'px'
    clearForth()
    panduan_Forth()
}
preButton[3].addEventListener('click', goPre_forth)
nextButton[3].addEventListener('click', goNext_forth)

for (var i = 0; i < middlePointForthItem.length; i++) {
    middlePointForthItem[i].addEventListener('click', function () {
        pointFlagForth= this.getAttribute('num')
        middleBodyForthWrap.style.left = -1260 * (Number(pointFlagForth) + 1) + 'px'
        this.style.backgroundColor = 'rgba(0,0,0,0.6)'
    })
    middlePointForthItem[i].addEventListener('mouseover', function () {

        this.style.backgroundColor = 'rgba(0,0,0,0.6)'
    })
    middlePointForthItem[i].addEventListener('mouseout', function () {
        clearForth()
        panduan_Forth()
        if (flagForthPoint  == this.getAttribute('num')) {
            this.style.backgroundColor = 'rgba(0,0,0,0.6)'
        } else {

            this.style.backgroundColor = 'rgba(0,0,0,0.1)'
        }
    })
}
//第五部分
var imgWrap=document.getElementsByClassName('imgwrap')
var imgContent=document.getElementsByClassName('img-content')
var rows=document.getElementsByClassName('row')
var bofangButton=document.getElementsByClassName('bofangbutton')

for(var i=0;i<5;i++)
{
    imgWrap[i].addEventListener('mouseover',function()
    {
        imgWrapNum=this.getAttribute('num')
        rows[imgWrapNum].style.display='none'
        bofangButton[imgWrapNum].style.transform = 'scale(' + 1.1 + ')'
        bofangButton[imgWrapNum].style.transition = 'all 0.6s'
        imgContent[imgWrapNum].style.transform='scale(' + 1.1 + ')'
        imgContent[imgWrapNum].style.transition = 'all 0.6s'
    })
    imgWrap[i].addEventListener('mouseout', function () {
        bofangButton[imgWrapNum].style.transform = 'scale(' + 0 + ')'
        bofangButton[imgWrapNum].style.transition = 'all 0.6s'
        rows[imgWrapNum].style.display='block'
        imgContent[imgWrapNum].style.transform='scale(' + 1.0 + ')'
        imgContent[imgWrapNum].style.transition = 'all 0.6s'
    })
}
for(var i=0;i<bofangButton.length;i++)
{
    bofangButton[i].addEventListener('mouseover',function()
    {
        this.style.cursor='pointer'
    })
}

//第六部分
var middlePointSixthItem=document.getElementsByClassName('middle-point-item-sixth')
var middleBodySixthWrap=document.getElementsByClassName('middle-body-sixth-wrap')[0]
var clearSixth = function () {
    for (var i = 0; i < middlePointSixthItem.length; i++) {
        middlePointSixthItem[i].style.backgroundColor = 'rgba(0,0,0,0.1)'
    }
}
var panduan_Sixth = function () {
    lengthSixth= (middleBodySixthWrap.style.left.length) - 2
    console.log(lengthSixth)
    var middleBodySixthWrapLeft = Number(middleBodySixthWrap.style.left.slice(0, lengthSixth))
    console.log(Math.abs(middleBodySixthWrapLeft))
    middleBodySixthWrapLeft = Math.abs(middleBodySixthWrapLeft)
    console.log(middleBodySixthWrapLeft)
     flagSixthPoint = (middleBodySixthWrapLeft / 1260) - 1
    console.log(flagSixthPoint)
    middlePointSixthItem[flagSixthPoint].style.backgroundColor = 'rgba(0,0,0,0.6)'
}
var index_Sixth = 1
var goNext_Sixth= function () {


    if (middleBodySixthWrap.style.left == '-2520px') {
        index_Sixth = 2
    }
    else {
        index_Sixth++
    }
    middleBodySixthWrap.style.left = - 1260 * (index_Sixth) + 'px'
    clearSixth()
    panduan_Sixth()
}
var goPre_Sixth = function () {
    console.log(index_Forth)
    if (middleBodySixthWrap.style.left == '-1260px') {
        index_Sixth = 1
    }
    else {
        index_Sixth--
    }
    middleBodySixthWrap.style.left = -1260 * index_Forth + 'px'
    clearSixth()
    panduan_Sixth()
}
preButton[4].addEventListener('click', goPre_Sixth)
nextButton[4].addEventListener('click', goNext_Sixth)

for (var i = 0; i < middlePointSixthItem.length; i++) {
    middlePointSixthItem[i].addEventListener('click', function () {
        pointFlagSixth= this.getAttribute('num')
        middleBodySixthWrap.style.left = -1260 * (Number(pointFlagSixth) + 1) + 'px'
        this.style.backgroundColor = 'rgba(0,0,0,0.6)'
    })
    middlePointSixthItem[i].addEventListener('mouseover', function () {

        this.style.backgroundColor = 'rgba(0,0,0,0.6)'
    })
    middlePointSixthItem[i].addEventListener('mouseout', function () {
        clearSixth()
        panduan_Sixth()
        if (flagSixthPoint  == this.getAttribute('num')) {
            this.style.backgroundColor = 'rgba(0,0,0,0.6)'
        } else {

            this.style.backgroundColor = 'rgba(0,0,0,0.1)'
        }
    })
}

//图片收缩部分
var imageMask = document.getElementsByClassName('img-mask')
var imgs = document.getElementsByClassName('first-img')
var iconitems = document.getElementsByClassName('iconitem')
var flagFirst = 0
for (var i = 0; i < imageMask.length; i++) {
    imageMask[i].addEventListener('mouseover', function () {

        flagFirst = this.getAttribute('num')
        imgs[flagFirst].style.transform = 'scale(' + 1.1 + ')'
        imgs[flagFirst].style.transition = 'all 0.6s'
        //图标部分
        iconitems[flagFirst].style.transform = 'scale(' + 0.8 + ')'
        iconitems[flagFirst].style.transition = 'all 0.6s'

        // imgs[0].style.backgroundColor = 'red'
    })
    imageMask[i].addEventListener('mouseout', function () {
        // console.log(this.getAttribute('num'))
        imgs[flagFirst].style.transform = 'scale(' + 1.0 + ')'
        iconitems[flagFirst].style.transform = 'scale(' + 0 + ')'
        iconitems[flagFirst].style.transition = 'all 0.6s'

    })
}

//footer部分
var iconFont=document.getElementsByClassName('ico')
var jsFooterDown=document.getElementsByClassName('js_footer_down')

for(var i=0;i<jsFooterDown.length;i++)
{
    
    jsFooterDown[i].addEventListener('mouseover',function()
    {
        var footerFlag=this.getAttribute('num')
        console.log(footerFlag)
        this.style.color='#31c27c'
        // iconFont[footerFlag].style.color='#999'
    })
    jsFooterDown[i].addEventListener('mouseout',function()
    {
        this.style.color='#999'
    })
}
var jsOtherLink=document.getElementsByClassName('js_other_link')
for (var i=0;i<11;i++)
{
    jsOtherLink[i].addEventListener('mouseover',function()
    {
        var footerFlag=this.getAttribute('num')
        console.log(footerFlag)
        this.style.color='#31c27c'
        // iconFont[footerFlag].style.color='#999'
    })
    jsOtherLink[i].addEventListener('mouseout',function()
    {
        this.style.color='#999'
    })
}
//初始化
var init = function () {

    middlePoints[0].style.backgroundColor = 'rgba(0,0,0,0.6)'
    headerPoints[0].style.backgroundColor = 'rgba(0,0,0,0.6)'
    headerPointItem[0].style.backgroundColor = 'rgba(0,0,0,0.6)'
    middlePointForthItem[0].style.backgroundColor = 'rgba(0,0,0,0.6)'
    middlePointSixthItem[0].style.backgroundColor = 'rgba(0,0,0,0.6)'
}
init()