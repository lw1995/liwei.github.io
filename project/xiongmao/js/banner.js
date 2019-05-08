$(window).ready(function(){
	
var index = 0,
	time = null,
	idx = 0,
	banner = $(".public-banner .banner-slide"),
	dots = $("#dots span"),
	prev = $("#prev"),
	next = $("#next"),
	menu = $("#menu .menu-item"),
	sm = $("#sub-menu"),
	submenu = $("#sub-menu .inner-box"),
	pan = $('.public-banner');

/* 轮播图 */
function AutoBanner() {
	background();
	banner.css('display', 'none');
	dots.attr('class', '');

	banner.eq(index).css('display', 'block');

	dots.eq(index).attr('class', 'active');

}

function startAutoPlay() {
	time = setInterval(function() {
		index++;
		if (index >= banner.length) {
			index = 0;
		}
		AutoBanner();
	}, 3000);
}

function background() {
	
	if (index == 0) {
		pan.css('background', '#E8E8E8');
	} else if (index == 1) {
		pan.css('background', '#E8E8E8');
	} else {
		pan.css('background', '#F671A6');
	}
}

function main() {

	for (var d = 0; d < dots.length; d++) {
		dots[d].id = d;
	}
	dots.click(function() {
		index = this.id;
		AutoBanner();
	})
	next.click(function() {
		index++;
		if (index >= banner.length)
			index = 0;

		AutoBanner();

	})

	prev.click(function() {
		index--;
		if (index < 0)
			index = banner.length - 1;

		AutoBanner();
	})

	for (var m = 0; m < menu.length; m++) {
		menu.eq(m).attr("data-index", m);
	}
	menu.mouseover(function() {
		idx = this.getAttribute("data-index");
		menu.eq(idx).css('background', 'rgba(0,0,0,0.1)');
		sm.css('display', 'block');
		submenu.eq(idx).css('display', 'block');
	})

	menu.mouseout(function() {
		menu.eq(idx).css('background', 'none');
		submenu.eq(idx).css('display', 'none');
		sm.css('display', 'none');

	})

	sm.mouseover(function() {
		menu.eq(idx).css('background', 'rgba(0,0,0,0.1)');
		submenu.eq(idx).css('display', 'block');
		sm.css('display', 'block');

	})

	sm.mouseout(function() {
		menu.eq(idx).css('background', 'none');
		submenu.eq(idx).css('display', 'none');
		sm.css('display', 'none');

	})

	var main = $("#main");
	main.mouseover(function() {
		clearInterval(time);
		$('.prev').show();
		$('.next').show();
	})
	main.mouseout(function() {
		startAutoPlay();
		$('.prev').hide();
		$('.next').hide();
	})
	main.mouseout();
}

main();
background();
});