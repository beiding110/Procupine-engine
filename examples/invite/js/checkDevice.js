(function(owner) {
	var u = navigator.userAgent;

	owner.ios = function() {
		return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	};

	owner.android = function() {
		return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	};
	
}(window.checkDevice = window.checkDevice || {}))