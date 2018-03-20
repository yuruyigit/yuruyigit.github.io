var autoLayout = function() {
  var $large_yunzi = $('section.header .large-yunzi');
  //if()
  ($large_yunzi)&&($large_yunzi.height($(window).width()/3*1.1 )); 
};

var s;

$(function() {
  autoLayout();
  $(window).resize(autoLayout);
  s = new Snap('.hardware-desc svg');



  var tp = 100;
  var paths = [{//上盖－A
    start: 375,
    route: 'M680,70 h-40 v-0 h-50'
  }, {//上盖－B
    start: 375,
    route: 'M300,100 h-40 v-0 h100'
  }, {//上盖－B
      start: 375,
      route: 'M680,200 h-40 v-0 h-50'
  }, {//环
    start: 1000,
    route: 'M320,800 h140 v-60 h80'
  }, {//环
      start: 1000,
      route: 'M320,800 h140 v-60 h180'
  }, {//环
      start: 1000,
      route: 'M320,800 h140 v-60 h-80'
  }, {//环
      start: 1000,
      route: 'M320,800 h140 v-60 h-180'
  }, {//环
      start: 1534,
      route: 'M700,1200 h-40 v-0 h-50'
  }, {//环
      start: 1534,
      route: 'M300,1200 h-40 v-0 h50'
  }, {//环
      start: 1534,
      route: 'M300,1400 h-40 v-0 h50'
  }, {//环
      start: 1700,
      route: 'M700,1700 h-40 v-0 h-50'
  }, {//环
      start: 1700,
      route: 'M200,1800 h-40 v-0 h80'
  }, {//环
      start: 1700,
      route: 'M760,1900 h-40 v-0 h-80'
  }];

  
  var models = [];//内容为对像，一个对象内容:结构，初始值，开始出现的位置，结束的位置;

  //数据填充;－－云子各部分结构位置信息
  $('[data-model]').each(function() {
    var $this = $(this);
    
    var animate = $this.data('animate').toString().split('|');
    //console.log(animate)
//    console.log($this);
    $this.css({'top': animate[0]});
    models.push({
      e: $(this),  //结构
      initial: parseInt(animate[0], 10), //初始值
      start: parseInt(animate[1], 10),    //开始出现的位置
      target: parseInt(animate[2], 10)    //结束的位置
    });
  });

  //更新云子各部分结构位置
  function updateModel() {
    var y = $(window).scrollTop() - $('.hardware-models').offset().top + $(window).height();
    models.forEach(function(model) {
      if (model.start < y && model.target > y) {
        model.e.css('top', y - model.start + model.initial);
          $(".show1 img").css({width:'224px',height:'262px',display:'block'});
          $(".show1").css({width:'224px',height:'262px',left:'50%',top:'100px',display:'block'});
          $(".show2 img").css({width:'430px',height:'138px',display:'block'});
          $(".show2").css({width:'430px',height:'138px',left:'40%',top:'600px',display:'block'});
          $(".show3 img").css({width:'232px',height:'187px',display:'block'});
          $(".show3").css({width:'232px',height:'187px',left:'50%',top:'900px',display:'block'});
          $(".show4 img").css({width:'437px',height:'335px',display:'block'});
          $(".show4").css({width:'437px',height:'335px',left:'40%',top:'1200px',display:'block'});
          $(".show5 img").css({width:'371px',height:'402px',display:'block'});
          $(".show5").css({width:'371px',height:'402px',left:'42%',top:'1700px',display:'block'});
      } else if (model.target <= y) {
        if (parseInt(model.e.css('top'), 10) !== model.target - model.start + model.initial) {
          model.e.css({'top': model.target - model.start + model.initial});
            console.log(model.target - model.start + model.initial);
            $(".show5 img").css({width:'371px',height:'402px',display:'block'});
            $(".show5").css({width:'371px',height:'402px',left:'42%',top:'1700px',display:'block'});
        }
      } else {
        if (parseInt(model.e.css('top'), 10) !== model.initial) {
              model.e.css('top', model.initial);
            $(".shows img").css({width:'0px',height:'0px',display:'block'});
            $(".shows").css({width:'0px',height:'0px',top:'1600px',display:'block'});
            $(".show1").css({left:'50%'});
            $(".show2").css({left:'37%'});
            $(".show3").css({left:'50%'});
            $(".show4").css({left:'40%'});
            $(".show5").css({left:'42%'});
//              console.log( model.initial);
          }
      }
    });
  }

  $(window).scroll(function() {
    updateModel();
    (!$('.package'))&&updatePackage();
  });

  updateModel();
  (!$('.package'))&&updatePackage();

  setTimeout(function() {
    updateHardware('down');
  }, 100);

  //盒盖
  function updatePackage() {
        var $package = $('.package');
    var y = $(window).scrollTop() - $package.offset().top + $(window).height();
    var $img = $package.children('img');
    var played = $package.data('played');
    if (y > 600 && !played) {
      $package.data('played', true);
      $img.animate({
        left: 900
      }, 1000);
    } else if (y < 600 && played) {
      $package.data('played', false);
      $img.animate({
        left: 0
      }, 1000);
    }
  }

  var lastScrollTop = 0;

 // var initV = 0;

  $(window).scroll(function(e) {
    var scrollType = 'down';
    var st = $(this).scrollTop();
    if (st < lastScrollTop) {
      scrollType = 'up';
    }
    lastScrollTop = st;
    updateHardware(scrollType);

    return false;
  });

  function updateHardware(scrollType) {
    // y svg元素在窗口中的位置
    // y<0: 元素没有出现在窗口中；
    // y>=0&&y<元素的高 : 元素出现在窗口中
    var y = $(window).scrollTop() - $('.hardware-desc svg').offset().top + $(window).height();

    paths.forEach(function(def) {
      if (scrollType === 'down') {
        if (def.start < y && !def.played) {//? 为什么是在小于的时候开始绘制
          
          startAnimate(def);
        }
      } else {
        if (def.start > y && def.ended) {
          stopAnimate(def);
        }
      }
    });

    $('[data-path]').each(function() {
      var $this = $(this);
      var start = paths[$this.data('path')].start;
      if (scrollType === 'down') {
        if (start < y && !$this.data('show')) {
          $this.data('show', true);
          $this.fadeIn();
        }
      } else {
        if (start > y && $this.data('show')) {
          $this.data('show', false);
          $this.fadeOut();
        }
      }
    });
  }
});

function stopAnimate(def) {
  def.ended = false;
  if (def.circle) {
    def.circle.remove();
    def.circle = null;
    def.routeRemain = def.route.split(' ');
  }
  if (def.routeRemain.length > 1) {
    def.routeRemain.pop();
    def.path.animate({
      path: def.routeRemain.join(' ')
    }, 200, function() {
      stopAnimate(def);
    });
  } else {
    def.path.remove();
    def.path = null;
    def.played = false;
  }
}

//def {start: 375,route: 'M740,70 h-40 v67 h-50'}
function startAnimate(def, remainRoutes) {

  if (!Array.isArray(remainRoutes)) {
    def.played = true;
    var paths = def.route.split(' ');

    remainRoutes = paths.slice(1);
    def.path = s.paper.path(paths[0]).attr({
      stroke: '#110b0a',
      strokeWidth: 1,
      fill: 'none'
    });
  }
  if (remainRoutes.length) {
    var route = remainRoutes.shift();
    def.path.animate({
      path: def.path.attr('path') + ' ' + route
    }, 200, function() {
      startAnimate(def, remainRoutes);
    });
  } else {
    var point = def.path.getPointAtLength(def.path.getTotalLength() - 1);
    def.circle = s.paper.circle(point.x, point.y, 3);
    def.ended = true;
  }
}
//解决爆炸图在chrome下的卡顿
$(window).mousewheel(function(event){
});

