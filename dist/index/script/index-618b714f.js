$(document).ready(function () {

  /* =======================
   * .selection
   * ======================= */

  var slc = [];
  (function () {

    $('.selection').each(init);
    $('a[href^="#"]').each(initSmoothScroll);

    function init() {
      var $e = $(this);
      var opt = register($e);
      if (!opt) {
        return;
      }
      $e.html(template(opt));
      if (opt.defaultIndex >= 0 && opt.defaultIndex < opt.count) {
        $($e.find('.item')[opt.defaultIndex]).addClass('active');
      }
    }

    function initSmoothScroll() {
      var href = $(this).attr('href').substr(1);

      $(this).click(function (event) {
        scrollTo($('#' + href)[0]);
        event.preventDefault();
      });
    }

    function register($e) {
      var opt = $.extend({
        count: 3,
        marginWidth: 36,
        defaultIndex: 0,
        on: []
      }, {
        count:    $e.data('count'),
        disabled: $e.hasClass('disabled'),
        arrow:    $e.hasClass('arrow'),
        simple:   $e.hasClass('simple'),
        selector: $e.data('selector'),
        defaultIndex: $e.data('default-index')
      });
      if (opt.selector) {
        opt.$selector = $(opt.selector);
        if (opt.$selector.data('panel-index') !== undefined) {
          /* eslint-disable no-console */
          console.warn('Element "%s" has got a selection binding %d already.', opt.selector, opt.$selector.data('panel-index'));
          /* eslint-enable no-console */
          return false;
        }
        var panelIndex = slc.push(opt) - 1;
        opt.$selector.attr('data-panel-index', panelIndex);
        initGallSize(opt);
      }
      return opt;
    }

    function initGallSize(opt) {
      var w = opt.width = opt.$selector.width();
      var h = opt.height = opt.$selector.height();
      opt.$selector.find('.galls').css({
        'width': (w * opt.count) + 'px',
        'height': h + 'px'
      });
      opt.$selector.find('.gall').css({
        'width': w + 'px',
        'height': h + 'px'
      });
    }

    function template(opt) {

      var marginLeftBegin = (1 - opt.count) * opt.marginWidth * 0.5;

      var items = [];
      var itemTemplateHead = '<div class="item"' + (opt.disabled ? '' : ' fn="select"') + ' data-index="';
      var marginLeft = marginLeftBegin;
      for (var i = 0; i < opt.count; i++) {
        items[i] = itemTemplateHead + i + '" style="margin-left:' + marginLeft + 'px"></div>';
        marginLeft += opt.marginWidth;
      }
      var itemsHTML = items.join('');

      var arrowHTML = '';
      if (opt.arrow) {
        arrowHTML = '<div class="arrow-contain"><div class="arrow-self" style="margin-left:' + marginLeftBegin + 'px"></div></div>';
      }

      return itemsHTML + arrowHTML;
    }

  })();

  function getSelectIndexBySelector(selector) {
    for (var i = 0; i < slc.length; i++) {
      if (slc[i].selector === selector) {
        return i;
      }
    }
    return -1;
  }

  function onSelect(selector, fn) {
    var selectIndex = getSelectIndexBySelector(selector);
    if (selectIndex === -1) {
      return -1;
    }
    return slc[selectIndex].on.push(fn) - 1;
  }

  // Smooth Scroll
  function scrollTo(y) {
    if (y instanceof HTMLElement) {
      y = $(y).offset().top;
    }
    $('html, body').animate({scrollTop: y}, 'slow');
  }

  /* =======================
   * [fn]
   * ======================= */

  var frc = window.frc = {};

  $(document).on('click', '[fn]', function () {
    var $e = $(this);
    var fn = $e.attr('fn');
    if (typeof frc[fn] === 'function') {
      frc[fn].apply(this, [$e]);
    }
  });

  frc.select = function ($e) {

    var selector = $e.parent().data('selector');
    if (!selector) { return; }
    var panelIndex = $(selector).data('panel-index');
    if (typeof panelIndex !== 'number') { return; }

    var opt = slc[panelIndex];
    var index = $e.data('index');
    /* eslint-disable no-console */
    console.log('Click on selection (' + panelIndex + ') "' + selector + '"[' + index + ']', opt);
    /* eslint-enable no-console */

    $(selector + ' > .galls').css({
      'left': '-' + (opt.width * index) + 'px'
    });

    $e.parent().find('.item').removeClass('active');
    $e.addClass('active');

    if (opt.arrow) {
      var marginLeftBegin = (1 - opt.count) * opt.marginWidth * 0.5;
      $e.parent().find('.arrow-self').css({
        'margin-left': (marginLeftBegin + index * opt.marginWidth).toString() + 'px'
      });
    }

    if (opt.on.length) {
      opt.on.forEach(function (fn) {
        fn(index);
      });
    }

  };

  /* =======================
   * Business Logic
   * ======================= */

  onSelect('#J_Intro', function () {});

  onSelect('#J_Teams', function (index) {
    $('#J_TeamName').html([
      'Web 组',
      'Android 组',
      'iOS 组',
      '设计组',
      'MOOC & Open Source  组',
      '呃... and more...'
    ][index]);
  });

  onSelect('#J_Cases', function (index) {
    $('#J_CaseName').html([
      'Web 端',
      'Android App',
      'iOS App'
    ][index]);
  });

  onSelect('#J_CaseWebAlbum', function (index) {
    var images = $('#J_CaseWebSample > img');
    images.removeClass('active');
    images.eq(index).addClass('active');
  });

  onSelect('#J_CaseAndroidAlbum', function (index) {
    var images = $('#J_CaseAndroidSample > img');
    images.removeClass('active');
    images.eq(index).addClass('active');
  });

  onSelect('#J_CaseIOSAlbum', function (index) {
    var images = $('#J_CaseIOSSample > img');
    images.removeClass('active');
    images.eq(index).addClass('active');
  });

});

// Dongyue Milestones
/* eslint-disable no-console */
console.log('%c东岳成员名人堂', 'font-size:1.5em;font-weight: bold;text-shadow:1px 1px 1px #ccc;');
console.log('\t%c记录每一位为东岳发展做出贡献的人', 'font-style: italic;');

var dy = {
  'laohyx': {
    'image': 'http://hdn.xnimg.cn/photos/hdn421/20130120/1500/h_large_zS0i_88e20000017d111a.jpg',
    'text': '东岳第一届掌门人，东岳创始人和长期顾问。工作过的项目小组有：SJTU选课网插件，爱心屋，军训网。2013年夏交大信安本科毕业，2014年秋入学SJTU信安研究生。目前攻读GRE/TOEFL准备出国看看',
    'email': 'laohyx@163.com'
  },
  'jb': {
    'image': '',
    'text': '东岳第二位掌门，善于进行各类项目洽谈。工作过的项目小组有：。2014年夏交大信安本科毕业。目前准备交大信安攻读研究生',
    'email': 'lijiabin1992@163.com'
  },
  'xctom': {
    'image': '',
    'text': '东岳第二代人，前端/课程组。工作过的小组有：爱心屋，水源皮。2014年夏交大信安本科毕业。目前已被美国芝加哥大学研究生录取',
    'email': 'xuchen1992@hotmail.com'
  },
  'sxjscience': {
    'image': '',
    'text': '东岳第二代人，后端。工作过的小组有：爱心屋。2014年夏交大信安本科毕业。目前已被香港科技大学PHD录取。',
    'email': 'sxjscience@sjtu.edu.cn'
  }
};

dy.list = ['laohyx', 'jb', 'xctom', 'sxjscience'];
dy.help = '使用说明：\n\tdy.help: 输出帮助命令\n\tdy.list: 列出名人堂成员列表\n\tdy.id.text: 将id替换为list中的某人，输出简介\n\tdy.id.email: 输出email\n\tdy.id.image: 输出图片url';

console.log(dy.help);
/* eslint-enable no-console */
