/* 获取链接中的数据(商品ID) */
var URL = window.location.href;
var idData = URL.split("="); //截取 url中的“=”,获得“=”后面的参数  
var id = decodeURI(idData[1]);
//console.log(id);
getDetails(id);
/* 创建vue实例 */
var app = new Vue({
	el: '#description',
	data: {
		details: {
			Pic: 'img/nv/big_img.gif',
			Title: '曼莎图超仙女神港风白领衬衫2019春季新款长袖宽松优雅雪纺衫上衣',
			Price: '17977.80',
		}
	}
});
/* 向服务器发送请求，根据商品id获取商品详情 */
function getDetails(id) {
	$.ajax({
		url: "https://bird.ioliu.cn/v1?url=http://api.dataoke.com/index.php?r=port/index&appkey=5cc1ccc6e1&v=2&id=" +
			id,
		type: "get",
		dataType: "json",
		success: function(data) {
			app.details = data.result;
			//console.log(data.result);
			if (data.result == null) {
				Swal.fire('不好意思，找不到该商品的详情！');
			}
		},
		error: function(chucuo) {

		}
	})
}
/* 放大镜功能 */
var fdj = document.getElementById("big"); // 获得最大的盒子
var small = fdj.children[0]; // 获得small 小图片 350盒子
var big = fdj.children[1]; // 获得 大图片 800 盒子
var mask = small.children[1]; // 小的黄色盒子
var bigImage = big.children[0]; // 大盒子里面的图片
small.onmouseover = function() { // 鼠标经过显示出他们
	mask.style.display = "block";
	big.style.display = "block";
}
small.onmouseout = function() {
	mask.style.display = "none";
	big.style.display = "none";
}
//  鼠标在small 内移动
var x = 0;
var y = 0;
small.onmousemove = function(event) {
	var event = event || window.event;
	x = event.clientX - this.offsetParent.offsetLeft - mask.offsetWidth / 2; // 再某个盒子内的坐标
	//alert(this.offsetLeft);
	y = event.clientY - this.offsetParent.offsetTop - mask.offsetHeight / 2;
	if (x < 0) {
		x = 0;
	} else if (x > small.offsetWidth - mask.offsetWidth) {
		x = small.offsetWidth - mask.offsetWidth;
	}
	if (y < 0) {
		y = 0;
	} else if (y > small.offsetHeight - mask.offsetHeight) {
		y = small.offsetHeight - mask.offsetHeight;
	}
	mask.style.left = x + "px";
	mask.style.top = y + "px";
	/*计算  ：  夫子 一顿吃 2个馒头    娇子  一顿 4个馒头
	问  夫子今天吃了 3个馒头  娇子应该吃几个？  */
	/*计算出他们的倍数   4 / 2    2倍
	 3 * 2  == 6个  */
	/* 大图盒子 /  小图盒子  倍数
	 我们 再小图移动的距离 *  倍数  ==  大图的位置*/
	bigImage.style.left = -x * big.offsetWidth / small.offsetWidth + "px";
	bigImage.style.top = -y * big.offsetHeight / small.offsetHeight + "px";

}
