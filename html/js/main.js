// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);

function scrollPopUp() {
	if ($('.boxScroll').length) {
		$('.boxScroll').niceScroll({
			horizrailenabled: false,
			autohidemode: false,
			cursorwidth: "10px",
			cursorcolor: "#e3e4e5",
		});
	}
}

function inputHolder() {
	$('.filter-price input').focus(function (e) {
		$(this).parent().parent().addClass('hide-mask');
	}).focusout(function (e) {
		if ($(this).val() == "") {
			$(this).parent().parent().removeClass('hide-mask');
		}
	});
}

function includeHTML() {
	var z, i, elmnt, file, xhttp;
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) { elmnt.innerHTML = this.responseText; }
					if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
					elmnt.removeAttribute("w3-include-html");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}

// Events Common
function fsEvent() {

	// Open menu
	$('.nav-but').on('click', function () {
		$('body').addClass('open-menu');
	});

	// Close menu
	$('.close-menu').on('click', function () {
		$('body').removeClass('open-menu');
	});

	// Open select
	$(document).on('click', '.fs-select-header', function (e) {
		var box = $(this).parent();
		box.parent().removeClass('fs-show-error');
		if (box.hasClass('fs-open-select')) {
			box.removeClass('fs-open-select');
		} else {
			$('.fs-select').removeClass('fs-open-select');
			box.addClass('fs-open-select');
		}
	});

	// Chose selected item
	$(document).on('click', '.fs-select-box li', function (e) {
		var that = $(this);
		var box = $(this).parent().parent().parent();
		var target = $(this).attr('data-target');
		if (target == '0') {
			box.removeClass('not-default');
		} else {
			box.addClass('not-default');
		}
		if (!that.hasClass('selected')) {
			box.find('li').removeClass('selected');
			that.addClass('selected');
			box.removeClass('fs-open-select');
			box.find('.fs-select-header span').html(that.text());
		}
	});


	//Close any Tooltip when click out
	$(document).on('click touchstart', function (event) {
		//Close select
		if ($(".fs-select").has(event.target).length == 0 && !$(".fs-select").is(event.target)) {
			$(".fs-select").removeClass("fs-open-select");
		}
	});


	// Go top
	$('.go-top').on('click', function () {
		$("html, body").stop().animate({ scrollTop: 0 }, 500);
	});

	inputHolder();
}


// Create Slider
function fsSlider() {
	
	if ($('.banner-box').length) {
		// var loop = true;
		// if ($('.fs-banner .item-slide').length < 2) {
		// 	$('.fs-banner').addClass('hide-controls');
		// 	loop = false;
		// }
		new Swiper('.banner-slider', {
			effect: 'slide',
			loop: true,
			speed: 800,
			watchOverflow: true,
			slidesPerView: 1,
			slidesPerGroup: 1,
			// autoplay: {
			// 	delay: 3000,
			// 	disableOnInteraction: false,
			// },
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			// navigation: {
			// 	nextEl: '.fs-banner .swiper-button-next',
			// 	prevEl: '.fs-banner .swiper-button-prev',
			// },
			pagination: {
				el: '.banner-box .swiper-pagination',
				clickable: true,
			},
			a11y: {
				enabled: false
			}
		});
	}
	
	if ($('.slider-inr').length) {
		// var loop = true;
		// if ($('.fs-banner .item-slide').length < 2) {
		// 	$('.fs-banner').addClass('hide-controls');
		// 	loop = false;
		// }
		new Swiper('.slider-box', {
			effect: 'slide',
			loop: true,
			speed: 800,
			watchOverflow: true,
			slidesPerView: 1,
			slidesPerGroup: 1,
			// autoplay: {
			// 	delay: 3000,
			// 	disableOnInteraction: false,
			// },
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			// navigation: {
			// 	nextEl: '.fs-banner .swiper-button-next',
			// 	prevEl: '.fs-banner .swiper-button-prev',
			// },
			pagination: {
				el: '.slider-prd .swiper-pagination',
				clickable: true,
			},
			a11y: {
				enabled: false
			}
		});
	}

}

// Variables for Scroll
var isCroll = false,
	scrollPos = 0,
	threshold = 100;

// LazyLoad
function ImgLazyLoad() {

	lazyImages = window.innerWidth > 1100 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy');
	lazyBgs = window.innerWidth > 1100 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy');

	// Lazy images
	[].slice.call(lazyImages).forEach(function (elm) {
		if (Math.abs(elm.getBoundingClientRect().top) <= window.innerHeight + threshold) {
			elm.setAttribute('src', elm.getAttribute('data-src'));
			elm.classList.remove('fs-lazy');
		}
	});

	// Lazy background
	[].slice.call(lazyBgs).forEach(function (elm) {
		if (Math.abs(elm.getBoundingClientRect().top) <= window.innerHeight + threshold) {
			elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
			elm.classList.remove('fs-lazy');
		}
	});

}

function ImgLazyAll() {

	lazyAllImages = window.innerWidth > 1100 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy');
	lazyAllBgs = window.innerWidth > 1100 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy');

	// Lazy images
	[].slice.call(lazyAllImages).forEach(function (elm) {
		elm.setAttribute('src', elm.getAttribute('data-src'));
		elm.classList.remove('fs-lazy');
	});
	// Lazy background
	[].slice.call(lazyAllBgs).forEach(function (elm) {
		elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
		elm.classList.remove('fs-lazy');
	});
}

var loading = true;
var videoLoading = true;
function starPage() {

	ImgLazyLoad();

	setTimeout(function () {
		scrollPopUp();
	}, 100);

	if (loading) {
		loading = false;

		$('.fs-loading').fadeOut(550, function () {
			var page = $('body').attr('data-page');
			$('.fs-navigation li[data-nav=' + page + ']').addClass('active');

			fsSlider();

			fsEvent();

			isCroll = true;
		});

		// setTimeout(function () {
		// 	ImgLazyLoad();
		// }, 560);

	}

}

// Func Scroll
var scrollPos = 0;

function onScroll() {

	scrollPos = $(window).scrollTop();
	setTimeout(function () {
		if (isCroll) {
			ImgLazyLoad();
		}
	}, 0);  // Process for Input Delay

}

// Func Resize
function Resize() {

	// Need detect not mobile when resize because in mobile scrolling call resize
	if (!isMobile) {
		if (isCroll) {
			ImgLazyLoad();
		}
	}

}

// Func Rotate
function Rotate() {

	if (isCroll) {
		ImgLazyLoad();
	}

}

// Set Scroll for Page
$(window).on('scroll', onScroll);

// Page Rezize
$(window).on('resize', Resize);

// Page Rotate
$(window).on('orientationchange', Rotate);

//  Page load
$(window).on('load', function () {

	if (loading) {
		starPage();
	}

});

// Page Ready
(function () {
	includeHTML();

	ImgLazyLoad(); // must be call here fisrt
	setTimeout(function () {
		if (loading) {
			starPage();
		}
	}, 3000);

})();