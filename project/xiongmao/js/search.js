window.onload = function() {
		/* 创建综合,最新,销量的vue实例,根据isActive,改变选项的状态 */
		var tab = new Vue({
			el: '#tabIndex',
			data: {
				isActive: '1',
			}
		});
		/* 创建搜索数据请求的vue实例 */
		var app = new Vue({
			el: '#content',
			data: {
				shop: '',
				search: '',
				page: '',
				url: 'https://bird.ioliu.cn/v1?url=http://api.tkjidi.com/getGoodsLink?appkey=4589f9d3593a7c3eaa18f76aa86b3aac&type=so&keyword='
			}
		});
		/* 获取链接中的search内容 */
		var URL = window.location.href;
		var searchData = URL.split("="); //截取 url中的“=”,获得“=”后面的参数  
		app.search = decodeURI(searchData[1]);

		/* 分页功能 */
		new Page({
			id: 'pagination',
			pageTotal: 30, //必填,总页数
			pageAmount: 50, //每页多少条
			dataTotal: 150, //总共多少条数据
			curPage: 1, //初始页码,不填默认为1
			pageSize: 5, //分页个数,不填默认为5
			showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
			showSkipInputFlag: true, //是否支持跳转,不填默认不显示
			getPage: function(page) {
				$('#loading').show(); /* 开启加载动画 */
				app.page = page; /* 给page赋值 */
				getShop(app.url + app.search + "&page_size=50&page=" + app.page);
				$('html,body').scrollTop(0);
				//获取当前页数
				//console.log(page);
			}
		});
		getShop(app.url + app.search + "&page_size=50&page=1");
		/* 向服务器发送请求 */
		function getShop(url) {
			$.ajax({

				url: url,
				type: "get",
				dataType: "json",
				success: function(data) {
					app.shop = data.data;
					$('#loading').hide(); /* 关闭加载动画 */
					//console.log(app.shop);
					//console.log(app.shop);
				},
				error: function(chucuo) {

				}
			});
		}
		/* 根据“综合”、“销量”等选项的不同，分别向服务器发送不同的请求 */
		$('#tabIndex .tag-fixed').click(function(e) {
			//console.log(this.id)
			if (this.id == 1) {
				getShop(app.url + app.search + "&page_size=50&page=1");
				tab.isActive = '1';
			} else if (this.id == 2) {
				getShop(app.url + app.search + "&page_size=50&page=1&sort=real_price&sort_type=asc");
				tab.isActive = '2';
			} else if (this.id == 3) {
				tab.isActive = '3';
				getShop(app.url + app.search + "&page_size=50&page=1&sort=sales&sort_type=desc");
			} else {
				getShop(app.url + app.search + "&page_size=50&page=1&sort=price&sort_type=asc");
				tab.isActive = '4';
			}

		});
	} 
