(function (module) {
'use strict';
var Plugin = {},
codeRegex = /(?:<pre>.*?<\/pre>|<code>.*?<\/code>)/g,
colorRegex = /%\((#(?:[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?)|(?:rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(?:[a-zа-я]){3,})\)\[(.+?)\]/g;

Plugin.parse = function (data, callback) {
	// console.log('colors-plugin', data);
	if (data && 'string' === typeof data) {
		// filter:parse.raw
		// console.log('filter:parse.raw');
		data = parser(data);
	} else if (data.postData && data.postData.content && data.postData.content.match(colorRegex)) {
		// filter:parse.post
		// console.log('filter:parse.post');
		data.postData.content = parser(data.postData.content);
	} else if (data.userData && data.userData.signature && data.userData.signature.match(colorRegex)) {
		// filter:parse.signature
		// console.log('filter:parse.signature');
		data.userData.signature = parser(data.userData.signature);
	}
	callback(null, data);
};

function parser (data) {
	var codeTags = [];

	function chooseColor ($1) {
		if ('лидер' === $1) return '#cf0000';
		if ('офицер' === $1) return '#cf6800';
		if ('рекрутер' === $1) return '#008000';
		if ('рыцарь' === $1) return '#0090ff';
		if ('соратник' === $1) return '#3ba8a8';
		return $1;
	}

	data = data.replace(codeRegex, function (match) {
		codeTags.push(match);
		return '___CODE___';
	});

	data = data.replace(colorRegex, function (match, $1, $2) {
		$1 = chooseColor($1);
		return '<span style="color: ' + $1 + ';">' + $2 + '</span>';
	});

	data = data.replace(/___CODE___/g, function (match) {
		return codeTags.shift();
	});

	return data;
}

module.exports = Plugin;

})(module);