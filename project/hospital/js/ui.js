// 搜索
var uiSearch = function() {

	$('.ui-search-selected').click(function() {
		$('.ui-search-select-list').show();
	});
	$('.ui-search-select-list a').click(function() {
		$('.ui-search-selected').text($(this).text());
		$('.ui-search-select-list').hide();
		return false;
	});
}


//  选项卡切换
var UiTab = function(tab, content, Class) {
	tab.click(function() {
		var index = $(this).index();
		tab.removeClass(Class);
		$(this).addClass(Class);
		content.hide();
		content.eq(index).show();
	});

}

//回到顶部
var backTop = function() {
	var el = $('<a hrrf="#" class="ui-backTop"></a>');
	$('body').append(el);
	var windowHeight = $(window).height();
	$(window).scroll(function() {
		var top = $('html,body').scrollTop();
		//console.log(top);
		//console.log(windowHeight);
		if (top > windowHeight / 2) {
			el.show();
		} else {
			el.hide();
		}
	});
	el.click(function() {
		$(window).scrollTop(0);
	});
}

var antobanner = function() {
	//console.log(index)
	if (index >= items.length) {
		index = 0;
		wrap.css('left', index);
	}
	wrap.css('left', -(index * items.eq(0).width()));
	tips.removeClass('item_focus');
	tips.eq(index).addClass('item_focus');

}
var astartAutoPlay = function() {
	time = setInterval(function() {
		index++;
		antobanner();
	}, 5000);

}

// 幻灯片切换
var uiSlider = function() {

	var btn_prev = $('.ui-slider-arrow .left');
	var btn_next = $('.ui-slider-arrow .right');

	astartAutoPlay();
	items.mouseover(function() {
		clearInterval(time);
	}).mouseout(function() {
		astartAutoPlay();
	});
	tips.click(function() {
		index = $(this).index();
		antobanner();
	});

	btn_prev.click(function() {
		index--;
		if (index < 0) {
			index = items.length - 1;
		}
		antobanner();

	});
	btn_next.click(function() {

		index++;
		if (index >= items.length) {
			index = 0;
		}
		antobanner();
	});

}
/*

根据已有的DOM结构

.ui-slider              <----- 最外层框架 
	.ui-slider-wrap     <----- 内容框架
		.item           <----- 每个内容
	.ui-slider-arrow    <----- 控制箭头
		.item.left
		.item.right
	.ui-slider-process   <----- 和内容一一对应
		.item


*/


//	1.基本事件


// 4. 链式调用


//	5.任务 BUG 排除（定时器BUG	）


//	从远程获得数据（一般在后台处理）


//	初始化获取所有城区

//	根据城区获得下面的等级（不同城区相同等级的 id 不一样）

//	根据等级获取医院

//	根据名称获取科室（科室都是依附在医院下面的）





//	每个select更新，就清理后面所有 select 为初始化状态
//	并且根据当前 select 的值，获得下一个 select 的数据，并且更新

var index = 0;
var time = null;
var wrap = $('.ui-slider-wrap');
var items = $('.ui-slider-wrap .item');
var tips = $('.ui-slider-process .item');
var l = (items.length - 1) * items.eq(0).width();
$(function() {

	backTop();
	uiSearch();
	UiTab($('#tab-caption a'), $('#content-block .content-item'), 'item_focus');
	UiTab($('.block-caption a'), $('.content-item .block-wrap'), 'block-capiton-item_focus');
	uiSlider();
});
