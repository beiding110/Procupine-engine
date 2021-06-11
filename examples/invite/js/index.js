function init(type) {
	var scenesObj = {
		'cover': ['main', 'main', 'main', 'main', 'main', 'main'],
		// 'scene-gray': ['posz', 'negz', 'bg', 'bg', 'posx', 'negx'],
		// 'scene-orange': ['posz', 'negz', 'posy', 'negy', 'posx', 'negx'],
		// 'scene-yellow': ['posx', 'negx', 'posy', 'posy', 'posz', 'negz'],
		// 'scene-cool': ['posz', 'negz', 'posy', 'posy', 'posx', 'negx'],
	};

	function getTheme(name) {
		return scenesObj[name].map(function(face) {
			return './images/' + name + '/' + face + '.jpg'
		});
	};

	function getAllThemeImg() {
		var resArr = [];

		Object.keys(scenesObj).forEach(function(key) {
			resArr.push.apply(resArr, getTheme(key));
		});

		return resArr;
	};
	new PreLoadImg(getAllThemeImg());

	var controlModel = type || 'orientation';
	var por = new Pro({
		scene: {
			type: 'css',
			chartlet: getTheme('cover')
		},
		mode: controlModel,
		handler: function(obj) {
			// console.log(obj)
		}
	});

	new AudioController({
		src: 'audio/bgm.mp3',
		auto: true
	});

	new BtnNav({
		actionList: [
			function() {
				por.$scene.chartletCSS3D(getTheme('cover'));
			},
			// function() {
			// 	por.$scene.chartletCSS3D(getTheme('scene-orange'));
			// },
			// function() {
			// 	por.$scene.chartletCSS3D(getTheme('scene-gray'));
			// },
			// function() {
			// 	por.$scene.chartletCSS3D(getTheme('scene-yellow'));
			// },
			// function() {
			// 	por.$scene.chartletCSS3D(getTheme('scene-cool'));
			// }
		]
	});

	new BtnShift({
		icon: controlModel === 'orientation' ? [
			'../assets/icon/org.png',
			'../assets/icon/drag.png'
		] : [
			'../assets/icon/drag.png',
			'../assets/icon/org.png'
		],
		click: function() {
			var switchObj = {
				'drag': {
					type: 'orientation',
					msg: '已切换至传感器控制'
				},
				'orientation': {
					type: 'drag',
					msg: '已切换至拖拽手势控制'
				}
			};

			var other = switchObj[controlModel];
			por.switchModel(other.type, function() {
				controlModel = other.type;
				showMsg(other.msg);
			}, function() {
				// alert('切换失败');
			});
		}
	});

	new BtnView({
		click: function(state) {
			var info = document.querySelector('#info');

			if(state) {
				info.classList.remove('hide');
				setTimeout(function() {
					info.style.opacity = 1;
				}, 0);
			} else {
				info.style.opacity = 0;
				setTimeout(function() {
					info.classList.add('hide');
				}, 300);
			};
		}
	});

	document.querySelector('#btn-open_img').addEventListener('click', function() {
		window.open('https://map.baidu.com/search/%E5%A5%BD%E8%BF%90%E6%9D%A5%E5%A9%9A%E7%A4%BC%E4%B8%BB%E9%A2%98%E9%85%92%E5%BA%97/@12744583.125,4564102,19z?querytype=s&da_src=shareurl&wd=%E5%A5%BD%E8%BF%90%E6%9D%A5%E5%A9%9A%E7%A4%BC%E4%B8%BB%E9%A2%98%E9%85%92%E5%BA%97&c=150&src=0&pn=0&sug=0&l=19&b=(12744128.021879021,4563897.5;12745088.021879021,4564366)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&device_ratio=1')
	})

	function openImg(url) {
		window.open(url);
	};
}