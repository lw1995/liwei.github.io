$(window).ready(function() {

	$('.public-content-top .centent a').attr('href', 'proIntroduce.html');

	$('.public-content-center .list-item a').attr('href', 'proIntroduce.html');

	$('.p-content-c-c .list-item a').attr('href', 'proIntroduce.html');





	$('.toolbar-app').mouseover(function() {
		$('.toolbar-layer').show().animate({
			height: '100px'
		}, 300);
	}).mouseout(function() {
		$('.toolbar-layer').hide().animate({
			height: '0px'
		}, 300);
	});
	var fixSearch = function() {
		var fix = $('.fix-search');
		var left = $('.fixed-left');
		var li = $('#fixed-left li');
		var i = 48;
		var le = 0;
		$(window).scroll(function() {
			var top = $('html,body').scrollTop();
			console.log(top)
			if (top > 626) {
				var time = setInterval(function() {

					if (i > 0) {
						i -= 16;
						fix.css('top', -i);
					} else {
						clearInterval(time);
					}
					//console.log(i);
				}, 100);


			} else {
				var time2 = setInterval(function() {

					if (i < 48) {
						i += 16;
						fix.css('top', -i);
					} else {
						clearInterval(time2);
					}
					//console.log(i);
				}, 100);
			};

			if (top > 946) {
				var time3 = setInterval(function() {
					if (le < 66) {
						le += 33;
						left.width(le);
					} else {
						clearInterval(time3);
					}
					//console.log(le);
				}, 200);
				left.show();
			} else {
				var time4 = setInterval(function() {
					if (le > 0) {
						le -= 33;
						left.width(le);
					} else {
						clearInterval(time4);
					}
					//console.log(le);
				}, 200);
				left.hide();
			};

			if (top > 946 && top < 1680) {
				li.removeClass();
				li.eq(0).addClass('addcss');
			} else if (top > 1680 && top < 2080) {
				li.removeClass();
				li.eq(1).addClass('addcss');
			} else if (top > 2080 && top < 2800) {
				li.removeClass();
				li.eq(2).addClass('addcss');
			} else if (top > 2800 && top < 3650) {
				li.removeClass();
				li.eq(3).addClass('addcss');
			} else if (top > 3650) {
				li.removeClass();
				li.eq(4).addClass('addcss');
			}


		});

	}
	var backTop = function() {
		$('#back-top').click(function() {
			$(window).scrollTop(0);
		});
	}
	fixSearch();
	backTop();

});
