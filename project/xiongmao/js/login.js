/* 创建vue实例,保存用户名和密码 */
var app = new Vue({
	el: '#login',
	data: {
		username: '',
		password: '',

	},
	watch: {
		username: function(newname, oldname) {
			//console.log('newname is:' + newname);
			//console.log('oldname is:' + oldname);
		},
		password: function(newpw, oldpw) {
			//console.log('newpw is:' + newpw);
			//console.log('oldpw is:' + oldpw);
		}
	}
});
/* 检查cookie是否有保存账号和密码 */
if ($.cookie("username") != null) {
	app.username = $.cookie("username");
	app.password = $.cookie("password");
} else {

}
/* 登录按钮 */
$('.login-btn').click(function() {
	getLogin(); /* 调用登录方法 */
});
/* 登录方法 */
function getLogin() {
	if (app.username.length > 6 && app.password.length > 6) {
		$.ajax({
			url: 'https://bird.ioliu.cn/v1?url=http://apicloud.mob.com/user/login?key=1e5ecc9c01d20&username=' + app.username +
				'&password=' + app.password,
			type: 'get',
			dataType: "json",
			success: function(data) {
				//console.log(data);
				var t = data.result.token; /* 请求成功，保存token */
				var u = data.result.uid; /* 请求成功，保存uid */
				getName(u);
				/* 请求成功，保存cookie */
				$.cookie("username", app.username, {
					expires: 1
				});
				$.cookie("password", app.password, {
					expires: 1
				});
				$.cookie("uid", u, {
					expires: 1
				});
				$.cookie("token", t, {
					expires: 1
				});
				//console.log("uid:" + u);
				//console.log("token:" + t);
			},
			error: function(chucuo) {
				//console.log(chucuo.status.msg);
				//console.log(chucuo.msg);
				//alert('账号或者密码错误');
				Swal.fire({
					type: 'error',
					title: '登陆失败。。。',
					text: '请认真检查您所输入的账号和密码!',
					footer: '<a href>忘记密码?</a>'
				});
			}
		})
	} else {
		//alert('账号或者密码不规范，请重新输入。');
		Swal.fire({
			type: 'error',
			title: '登陆失败。。。',
			text: '请认真检查您所输入的账号和密码!',
			footer: '<a href>忘记密码?</a>'
		});
	}
}

/* 获取用户名*/
function getName(u) {
	//console.log(u);
	$.ajax({
		url: 'https://bird.ioliu.cn/v1?url=http://apicloud.mob.com/user/profile/query?key=1e5ecc9c01d20&uid=' + u +
			'&item=name',
		type: 'get',
		dataType: "json",
		success: function(data) {
			var n = data.result;
			//console.log(n);
			/* 请求成功，解密服务器返回的数据 */
			var words = CryptoJS.enc.Base64.parse(n);
			var name = words.toString(CryptoJS.enc.Utf8);
			//alert(name);
			/* 保存用户名 */
			$.cookie("name", name, {
				expires: 1
			});

			/* 两秒后跳转到主页 */
			setTimeout(function() {
				window.location.href = "index.html";
			}, 2000);

			/* 跳转加载动画*/
			let timerInterval
			Swal.fire({
				title: '登录成功!',
				html: '页面跳转中，请稍等 <strong></strong>.',
				timer: 2000,
				onBeforeOpen: () => {
					Swal.showLoading()
					timerInterval = setInterval(() => {
						Swal.getContent().querySelector('strong')
							.textContent = Swal.getTimerLeft()
					}, 100)
				},
				onClose: () => {
					clearInterval(timerInterval)
				}
			}).then((result) => {
				if (
					// Read more about handling dismissals
					result.dismiss === Swal.DismissReason.timer
				) {
					console.log('I was closed by the timer')
				}
			});
		},
		error: function(chucuo) {

		}
	})
}
/* 监听键盘回车键，实现按回车就登录功能 */
$(document).keyup(function(event) {
	if (event.keyCode == 13) {
		//console.log(1)
		getLogin();
	}
});
