module.exports = {
	getElement: function(el, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].id === el)
				return (i);
		}
	},
	parseGoings: function(gArr, fCurrentGoing) {
		if (gArr) {
			var s = '';
			for (var i = 0; i < gArr.length; i++) {
				s += gArr[i].user_firstName + ', ';
			}
			if (fCurrentGoing) s += ' and you ';
			s += 'are going';
			return s;
		} else return '';
	}
};
