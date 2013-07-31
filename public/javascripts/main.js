(function(){
	var doll = document.getElementById("doll"),
		getDoll = document.getElementById("getDoll"),
		gensym;

	//缓存图片地址
	sessionStorage.setItem("", doll.src);

	window.addEventListener("popstate", onpopstateHandler, false);
	getDoll.addEventListener("click", getDollOnclickHandler, false);

	function onpopstateHandler(e){
		var itemName = location.pathname.slice(1);
		item = sessionStorage.getItem(itemName);
		if(item){
			doll.src = item;
		}
	};

	function getDollOnclickHandler(){
		var xhr,
			dollUrl = gensym(),
			item;

		history.pushState(null, null, dollUrl);

		//检查缓存
		item = sessionStorage.getItem(dollUrl);
		if(item){
			doll.src = item;
		}
		//没有缓存
		else{
			xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if (xhr.readyState === 4 && xhr.status === 200){
					doll.src = xhr.responseText;
					sessionStorage.setItem(dollUrl, xhr.responseText);
				}
			}
			xhr.open("GET", dollUrl, true);
			xhr.setRequestHeader("pjax", "true");
			xhr.send();
		}
	}

	//循环生成连接
	gensym = (function (){
		var prefix = "file",
			seq = 0;
		return function (){
			var result = prefix + seq;
			seq = ( seq + 1 ) % 11;
			return result;
		}
	})();

})();