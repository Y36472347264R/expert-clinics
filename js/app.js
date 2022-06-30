
/*----------------------------------------*/
window.addEventListener('resize', function (event) {
	getViwport();
	showMiniPopup();
});
/*----------------------------------------*/
function getViwport() {
	let container = document.querySelector('.expert__container');
	if (document.documentElement.clientHeight > 530) {
		container.classList.remove('_no-viewport');
	} else {
		container.classList.add('_no-viewport');
	};
}
getViwport();
/*----------------------------------------*/
function showMiniPopup() {
	if (document.documentElement.clientWidth > 991) {
		window.addEventListener("load", function () {
			let miniPopup = document.querySelector('.expert__popup');
			let miniPopupIcon = document.querySelector('.pupup-expert__icon');
			setTimeout(function () {
				if (!miniPopup.classList.contains('_active')) {
					miniPopup.classList.add('_active');
				};
				miniPopupIcon.addEventListener("click", function (e) {
					miniPopup.classList.remove('_active');
				});
			}, 3000);
		});
	};
};
showMiniPopup();
/*----------------------------------------*/

window.onload = function () {
	// анимация шапки
	window.addEventListener('scroll', scroll_scroll);
	function scroll_scroll() {
		let src_value = currentScroll = pageYOffset;
		let header = document.querySelector('header.header');
		if (header !== null) {
			if (src_value > 70) {
				header.classList.add('_scroll');
			} else {
				header.classList.remove('_scroll');
			}
		}
	}
}
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
if (document.querySelector('.content-slider__slider_specialists')) {
	new Swiper('.content-slider__slider_specialists', {
		slidesPerView: 3,
		slidesPerGroup: 1,
		initialSlide: 0,
		spaceBetween: 20,

		simulateTouch: true,
		touthRadio: 1,
		touthAngle: 45,
		grabCursor: true,
		speed: 700,

		observer: true,
		observeParents: true,
		autoHeight: false,
		// speed: 600,

		keyboard: {
			//включить выкльучит
			//возможность управления
			enabled: true,
			//включить выкльучит
			//стрелками
			//только когда слайдер
			//в пределах вьюпорта
			onlyInViewport: true,
			//включить выкльучит
			//управление клавишами
			//pageUP, pageDown
			pageUpDown: true,
		},

		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			479: {
				slidesPerView: 1.6,
			},
			600: {
				slidesPerView: 2,
			},
			767.98: {
				slidesPerView: 1.6,
			},
			850.98: {
				slidesPerView: 2,
			},
			991.98: {
				slidesPerView: 1.9,
			},
			1360.98: {
				slidesPerView: 2.6,
			},
			1580.98: {
				slidesPerView: 3,
			},
		},

		pagination: {
			el: '.content-slider__pagination_specialists',
			type: 'progressbar',
		},

		navigation: {
			nextEl: '.control-slider__button-next_specialists',
			prevEl: '.control-slider__button-prev_specialists',
		},

	});
}

if (document.querySelector('.slider-quintessence')) {
	new Swiper('.slider-quintessence', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		initialSlide: 2,
		spaceBetween: 177,

		simulateTouch: true,
		touthRadio: 1,
		touthAngle: 45,
		grabCursor: true,

		observer: true,
		observeParents: true,
		autoHeight: false,
		speed: 700,
		// loop: true,

		keyboard: {
			//включить выкльучит
			//возможность управления
			enabled: true,
			//включить выкльучит
			//стрелками
			//только когда слайдер
			//в пределах вьюпорта
			onlyInViewport: true,
			//включить выкльучит
			//управление клавишами
			//pageUP, pageDown
			pageUpDown: true,
		},

		breakpoints: {
			320: {
				spaceBetween: 20,
			},
			991.98: {
				spaceBetween: 100,
			},
			1530: {
				spaceBetween: 177,
			},
		},


		navigation: {
			nextEl: '.control-slider__button-next_quintessence',
			prevEl: '.control-slider__button-prev_quintessence',
		},

	});
}

if (document.querySelector('.reviews-approach__slider')) {
	new Swiper('.reviews-approach__slider', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		initialSlide: 0,
		spaceBetween: 177,

		simulateTouch: true,
		touthRadio: 1,
		touthAngle: 45,
		grabCursor: true,

		observer: true,
		observeParents: true,
		autoHeight: false,
		speed: 800,
		loop: true,

		keyboard: {
			//включить выкльучит
			//возможность управления
			enabled: true,
			//включить выкльучит
			//стрелками
			//только когда слайдер
			//в пределах вьюпорта
			onlyInViewport: true,
			//включить выкльучит
			//управление клавишами
			//pageUP, pageDown
			pageUpDown: true,
		},

		pagination: {
			el: '.reviews-approach__pagination',
			clickable: true,
		},

		autoplay: {
			delay: 3000,
			stopOnLastSlide: false,
			disableOnInteraction: true,
		}

	});
}

if (document.querySelector('.content-slider__slider_documentation')) {
	new Swiper('.content-slider__slider_documentation', {
		slidesPerView: 3,
		slidesPerGroup: 1,
		initialSlide: 0,
		spaceBetween: 20,

		simulateTouch: true,
		touthRadio: 1,
		touthAngle: 45,
		grabCursor: true,
		speed: 700,

		observer: true,
		observeParents: true,
		autoHeight: false,
		// speed: 600,

		keyboard: {
			//включить выкльучит
			//возможность управления
			enabled: true,
			//включить выкльучит
			//стрелками
			//только когда слайдер
			//в пределах вьюпорта
			onlyInViewport: true,
			//включить выкльучит
			//управление клавишами
			//pageUP, pageDown
			pageUpDown: true,
		},

		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			479: {
				slidesPerView: 1.6,
			},
			600: {
				slidesPerView: 2,
			},
			767.98: {
				slidesPerView: 1.6,
			},
			850.98: {
				slidesPerView: 2,
			},
			991.98: {
				slidesPerView: 1.9,
			},
			1360.98: {
				slidesPerView: 2.6,
			},
			1580.98: {
				slidesPerView: 3,
			},
		},

		pagination: {
			el: '.content-slider__pagination_documentation',
			type: 'progressbar',
		},

		navigation: {
			nextEl: '.control-slider__button-next_documentation',
			prevEl: '.control-slider__button-prev_documentation',
		},

	});
}


var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

//======================

//testWebp
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

//======================

//_ibg
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

//======================

// wrapper_loaded
window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

let unlock = true;

//=====================

//Menu
let iconMenu = document.querySelector(".icon-header");
if (iconMenu != null) {
	let delay = 200;
	let menuBody = document.querySelector(".header__menu");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};

//=====================

//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

//=====================

//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}

//=====================

//polyfills
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();