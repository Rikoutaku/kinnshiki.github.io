$(function () {
    // 
    let ycClickFlag = false;
    $('#page-main').fadeOut()
    $('#bg-lh').fadeOut()
    $('#word1').hide()
    $('#word2').hide()
    $('#word3').hide()
    $('#gif').hide()
    $('#xiaoqiu').fadeOut()
    $('#video').hide()
    $('#video2').hide()
    $('#bornbaby').fadeOut()
    $('#hudie').hide()
    $('#page-end').fadeOut()
    $('#page-hx').hide()
    $('#hand').hide()

    setTimeout(()=>{
        $('#word1').show(1000, function(){
            ycClickFlag = true
        })
    }, 2000)

    // 获取进度条元素  
    var progressBar = document.getElementById('progressBar');  

    // 设置初始进度为0%  
    progressBar.style.width = '0%';  

    // 模拟进度更新  
    function updateProgress(percentage) {  
        // 更新进度条的宽度  
        progressBar.style.width = percentage + '%';  
        $("#progressBar").html(percentage + '%');  
    }  

    // 开场动画
    let openTimer = null, progressVal = 0
    openTimer && window.clearInterval(openTimer)
    openTimer = setInterval(function(){
        updateProgress(progressVal);

        if (progressVal >= 100){
            window.clearInterval(openTimer)
            // 进入主屏
            $('#page-open').hide()
            $('#page-main').fadeIn(2000)   
        }
        progressVal += 1
    }, 30)

    // 鼠标移动粒子效果

    // 点击洋葱
    var background_lz = document.getElementById('bg-lz');
    var background_xr = document.getElementById('bg-xr');
    document.addEventListener('mousemove', function (e) {
        var dx = e.movementX * -1; // 取负值实现左右反方向晃动  
        let num_lz = extractNumbers(background_lz.style.transform)[0] / 1.03 || 0
        let num_xr = extractNumbers(background_xr.style.transform)[0] / 1.5 || 0
        // console.log(e, dx , background_lz.style.transform, num_xr)
        background_lz.style.transform = 'translateX(' + ( num_lz  + dx) + 'px)';  
        background_xr.style.transform = 'translateX(' + ( -(num_xr  + dx)) + 'px)';  
    });

    document.addEventListener('click', function (e) {
        if (!ycClickFlag) return;
        // let extent1 = [[430, 184], [1406, 186] , [1360, 946], [524, 924]]
        let extent = [[430, 184],[1360, 946]]

        if (e.clientX > extent[0][0] && e.clientY > extent[0][1] && e.clientX < extent[1][0] && e.clientY < extent[1][1]){
            // console.log('点击洋葱')
            $('#word1').hide()
            $('#word2').show(1000)
            $('#gif').show()
            $('#gif img[name="left"]').css('opacity', 0)
            // 小人消失
            $('#bg-xr').hide(2000)
            ycClickFlag = false;
        }
    })

    $('#gif img[name="left"]').click(()=>{
        $('#gif img[name="left"]').css('opacity', 0)
        $('#gif img[name="right"]').css('opacity', 1)
        $('#gif img[name="video-gif"]').attr('src', './static/3/1.gif')
        $('#word3').hide()
        $('#word2').show(1000)
        $('#xiaoqiu').fadeOut(2000)
    })
    $('#gif img[name="right"]').click(()=>{
        $('#gif img[name="right"]').css('opacity', 0)
        $('#gif img[name="left"]').css('opacity', 1)
        $('#gif img[name="video-gif"]').attr('src', './static/4/2.gif')
        $('#word2').hide()
        $('#word3').show(1000)
        $('#xiaoqiu').fadeIn(2000)
    })

    // 小球点击
    $('#xiaoqiu').click(()=>{
        $('#xiaoqiu').hide(1000)
        $('#gif').hide()
        $('#word3').hide()
        $('#video').show()
        $('#video').attr('src', $('#video').attr('src'))  // 重新播放
        $('#hand').show()
    })

    // document.getElementById("video").onplay = function() {   
    //     this.playbackRate = 0.01; // 改变这个值可以控制播放速度  
    // };

    // 点击裂缝
    $('#hand').click(()=>{
        $('#video2').show()
        $('#video2').attr('src', $('#video2').attr('src'))  // 重新播放
        setTimeout(()=>{
            $('#bornbaby').fadeIn(2000)
            $('#hudie').show(2000)
            $('#bg-lh').fadeIn(2000)
        },1000) // 播放完成
    })
    
    // 点击蝴蝶
    $('#hudie').click(()=>{
        $('#page-end').css('z-index',1)
        $('#page-main').fadeOut(3000)
        $('#page-end').fadeIn(3000, ()=>{
            $('#bg-couple').css('transform', 'translateY(0px) scale(1)')
        })
    })

    $('#xyc').click(()=>{
        $('#page-end').hide()
        $('#page-hx').show(2000)
    })

    $('#back').click(()=>{
        $('#page-hx').hide()
        $('#page-end').fadeIn(2000)
    })

    $('#home').click(()=>{
        window.history.go(0)
    })

    function extractNumbers(str) {  
        let matches = str.match(/\d+/g);  
        return matches ? matches.map(Number) : [];  
      } 
})