//console.log($.cookie("token"));
//console.log($.cookie("uid"));
/* 登录 */
var time = null;
if ($.cookie("username") != null) {
	var name = $.cookie("name");
	$('.login').html(name);
	$('.login').attr("href", "javascript:void(0)");

	$('.touxiang_img').mouseover(function() {
		$('#user_panel').show();
	}).mouseout(function() {
		time = setTimeout(function() {
			$('#user_panel').hide();
		}, 2000);
	});
} else {

}


$('#user_panel').mouseenter(function() {
	$('#user_panel').show();
	clearTimeout(time);
}).mouseleave(function() {
	$('#user_panel').hide();
});
$('.user_footer').click(function() {
	$.cookie("name", "", {
		expires: -1
	});
	$.cookie("username", "", {
		expires: -1
	});
	$.cookie("password", "", {
		expires: -1
	});
	setTimeout(function() {
		window.location.href = "login.html";
	}, 2000);
	Swal.fire(
		'退出成功!',
		'正在跳转到登录界面，请稍等!',
		'success'
	)
});
