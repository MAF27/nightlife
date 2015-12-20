module.exports = {
	getElement: function (el, arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].id === el)
					return(i);
			}
		}
};
