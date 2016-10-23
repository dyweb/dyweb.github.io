$(document).ready(function () {

  /* =======================
   * .selection
   * ======================= */

  var slc = [];
  (function () {

    $('.selection').each(init);
    $('a[href^="#"]').each(initSmoothScroll);
    $('.circle-fade').removeClass('circle-fade');

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
      'Open-Class Community 组',
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
