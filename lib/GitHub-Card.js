/*
 * @author rccoder
 * @email rccoder@foxmail.com
 * @GitHub github.com/rccoder/GitHub-Card.git
 */

 //创建一个闭包
(function($) {

	function getUserInfo(username, callback) {
		$.ajax({
			url: 'https://api.github.com/users/' + username,
			method: 'get',
			dataType: 'jsonp'
		}).done(function(msg) {
			if(msg && msg.meta && msg.meta.status == 200) {
				var userdata = msg.data;
				callback(null, userdata);
			}
			else {
				var userdata = '';
				callback(404);
			}
		})
	};

	function createBox($content, username) {
		if(!username) return;
		$content.html('这里放置DOM');
		getUserInfo(username, function(err, userdata) {
			//加载之后的新DOM
			var newDom;
			if(err) {
				newDom = 'Loading Failed!';
			} else {
				newDom = userdata;
				console.log(newDom);
			}
			//加载新DOM
			$content.html(newDom);
		});
	}

	//定义插件
	$.fn.github_card = function() {
		return $(this).each(function() {
			var $content = $(this);
			//获得date-username的值作为用户名
			var username = $content.data('username');
			//创建box
			createBox($content, username);
		})
	}

	//样式css
	var cssTemplate = '';

	//页面加载
	$(function() {
		//添加css
		$('head').append(cssTemplate);
		setTimeout(function() {
			//调用定义的插件函数
			$('#github-card').github_card();
		})
	})
//闭包结束
})(jQuery);

