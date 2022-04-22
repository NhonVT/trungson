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

// Popup
var isLoading = true;
function popupLoad(url, isOpen) {
	$.ajax({
		url: url, cache: false, success: function (data) {
			$('.popup-overlay').html(data);
			if ($('.popup-overlay').css('display') == 'block') {
				setTimeout(function () {
					isLoading = true;
					if ($('.boxScroll').length) {
						scrollPopUp();
					}
				}, 300);
			} else {
				$('.popup-overlay').fadeIn(500, function () {
					isLoading = true;
					if ($('.boxScroll').length) {
						scrollPopUp();
					}
				});
			}
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
	$(document).on('click', '.nav__but', function () {
		if ($('body').hasClass('open-menu')) {
			$('body').removeClass('open-menu');
			$('body').removeClass('fs-no-scroll');
		} else {
			$('body').addClass('open-menu');
			$('body').addClass('fs-no-scroll');
		}
	});

	// Close menu
	$('.close-menu').on('click', function () {
		$('body').removeClass('open-menu');
	});

	// Open Popup
	$(document).on('click', '.open-popup', function () {
		var url = $(this).attr('data-href');
		if (isLoading) {
			isLoading = false;
			$('body').addClass('fs-no-scroll');
			popupLoad(url);
		}
	});

	// Close PopUp
	$('.popup-overlay').on('click', '.close-but', function () {
		$('.popup-overlay').fadeOut(300, function () {
			if ($('.boxScroll').length) {
				$(".boxScroll").getNiceScroll().remove();
			}
			$('body').removeClass('fs-no-scroll');
		});
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

	$('.nav li').on('click', function () {
		var target = $(this).attr('data-nav');
		var offetTop = $(target).offset().top - 250;
		$('html, body').animate({ scrollTop: offetTop }, 800);
		if (window.innerWidth < 1100) {
			if ($('body').hasClass('open-menu')) {
				$('body').removeClass('open-menu');
				$('body').removeClass('fs-no-scroll');
			}
		}
	});

}


function scrollResult() {
	if (window.innerWidth > 1100) {
		if ($('.table__body').length) {
			$('.table__body').each(function (el) {
				$(this).niceScroll({
					autohidemode: false,
					horizrailenabled: false,
					cursorwidth: "8px",
					cursorcolor: "#D0D2D3",
				});
			});
		}
	} else {
		$('.table__body').getNiceScroll().remove();
	}

}

function scrollTnc() {
	if (window.innerWidth > 1100) {
		if ($('.box-scroll-tnc').length) {
			$('.box-scroll-tnc').each(function (el) {
				$(this).niceScroll({
					autohidemode: false,
					horizrailenabled: false,
					cursorwidth: "8px",
					cursorcolor: "#D0D2D3",
				});
			});
		}
	} else {
		$('.box-scroll-tnc').getNiceScroll().remove();
	}

}

var isPlaying = false;
var countClick = 2;

// Create Slider
function fsSlider() {

	if ($('.banner-box').length) {
		var loop = false;
		if ($('.fs-banner .swiper-slide').length < 2) {
			$('.fs-banner').addClass('hide-controls');
			loop = false;
		}
		new Swiper('.banner-slider', {
			effect: 'slide',
			loop: loop,
			speed: 800,
			watchOverflow: true,
			slidesPerView: 1,
			slidesPerGroup: 1,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
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
		var loop = true;
		if ($('.fs-slider .swiper-slide').length < 2) {
			$('.fs-slider').addClass('hide-controls');
			loop = false;
		}
		new Swiper('.slider-box', {
			effect: 'slide',
			loop: loop,
			speed: 800,
			watchOverflow: true,
			slidesPerView: 1,
			slidesPerGroup: 1,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
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

	if ($('.slider__bag').length) {
		var loop = true;
		if ($('.slider__bag .swiper-slide').length < 4) {
			$('.slider__bag').addClass('hide-controls');
			loop = false;
		}
		new Swiper('.bag-swiper', {
			effect: 'slide',
			loop: loop,
			speed: 800,
			watchOverflow: true,
			slidesPerView: 4,
			slidesPerGroup: 1,
			spaceBetween: 50,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints: {
				1100: {
				  slidesPerView: 3,
				  spaceBetween: 20
				},
			},
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			navigation: {
				nextEl: '.slider__bag-wrap .swiper-button-next',
				prevEl: '.slider__bag-wrap .swiper-button-prev',
			},
			a11y: {
				enabled: false
			}
		});
	}

	if ($('.fs-step').length) {
		new Swiper('.step-slider', {
			effect: 'slide',
			loop: true,
			speed: 800,
			watchOverflow: true,
			slidesPerView: 1,
			slidesPerGroup: 1,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			navigation: {
				nextEl: '.outer__slider .swiper-button-next',
				prevEl: '.outer__slider .swiper-button-prev',
			},
			a11y: {
				enabled: false
			}
		});
	}

	if ($('.box__slider-brands').length) {
		var loop = true;
		if ($('.box__slider-brands .swiper-slide').length < 1) {
			$('.box__slider-brands').addClass('hide-controls');
			loop = false;
		}
		new Swiper('.brands-swiper', {
			effect: 'slide',
			loop: loop,
			speed: 800,
			watchOverflow: true,
			slidesPerView: 5,
			slidesPerGroup: 1,
			spaceBetween: 50,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints: {
				1100: {
				  slidesPerView: 3,
				  spaceBetween: 30
				},
			},
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			pagination: {
				el: '.box__slider-brands .swiper-pagination',
				clickable: true,
			},
			a11y: {
				enabled: false
			}
		});
	}

	if ($('.slider__province-box').length) {
		var loop = true;
		if ($('.slider__province-box .swiper-slide').length < 3) {
			$('.slider__province-box').addClass('hide-controls');
			loop = false;
		}
		new Swiper('.province-swiper', {
			effect: 'slide',
			loop: loop,
			speed: 800,
			watchOverflow: true,
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 20,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints: {
				1100: {
				  slidesPerView: 1,
				  slidesPerGroup: 1,
				  spaceBetween: 10
				},
			},
			on: {
				init: function () {
				}, transitionStart: function () {
				}, transitionEnd: function () {
				}
			},
			pagination: {
				el: '.province__slider .swiper-pagination',
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


	if ($('.item-rank-top').length) {
		$('.item-rank-top .txt-prize').show().arctext({
			radius: 500,
			dir: -1,
		});
	}


	if (loading) {
		loading = false;

		$('.fs-loading').fadeOut(550, function () {
			var page = $('body').attr('data-page');
			$('.fs-navigation li[data-nav=' + page + ']').addClass('active');

			// fsSlider();

			// fsEvent();

			isCroll = true;

			if (window.innerWidth < 1100) {
				$('.boxScroll').getNiceScroll().remove();

				if ($('.table__body').length) {
					$(".table__body").getNiceScroll().remove();
				}
				if ($('.box-scroll-tnc').length) {
					$(".box-scroll-tnc").getNiceScroll().remove();
				}

			} else {
				scrollPopUp();
				scrollResult();
				scrollTnc();
			}
		});



		// setTimeout(function () {
		// 	ImgLazyLoad();
		// }, 560);

	}
	scrollPopUp();
}

// Func Scroll
var scrollPos = 0;

function onScroll() {

	scrollPos = $(window).scrollTop();
	var windowH = window.innerHeight;

	setTimeout(function () {
		if (isCroll) {
			ImgLazyLoad();
		}

		[].slice.call(document.querySelectorAll('.fs-scroll')).forEach(function (elm) {
			var nav = $(elm).attr('data-id');
			if (nav.length) {
				if (Math.abs(elm.getBoundingClientRect().top) <= (windowH - (windowH / 2))) {
					$(elm).addClass('active');
					$('.nav li').removeClass('active');
					$('.nav li[data-id=' + nav + ']').addClass('active');
				} else {
					$(elm).removeClass('active');
				}
			}
		});


	}, 300);  // Process for Input Delay

}

// Func Resize
function Resize() {

	// Need detect not mobile when resize because in mobile scrolling call resize
	if (!isMobile) {
		if (isCroll) {
			setTimeout(function () {
				ImgLazyLoad();
				if ($('.item-rank-top').length) {
					$('.item-rank-top .txt-prize').show().arctext({
						radius: 500,
						dir: -1,
					});
				}
				if (window.innerWidth < 1100) {
					$('.boxScroll').getNiceScroll().remove();
					if ($('.table__body').length) {
						$(".table__body").getNiceScroll().remove();
					}
					if ($('.box-scroll-tnc').length) {
						$(".box-scroll-tnc").getNiceScroll().remove();
					}
				} else {
					scrollPopUp();
					scrollResult();
					scrollTnc();
				}
			}, 100)
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

	onScroll();
	if (loading) {
		starPage();

	}

});

// Page Ready
(function () {
	includeHTML();

	ImgLazyLoad(); // must be call here fisrt
	scrollResult();
	scrollTnc();
	onScroll()
	setTimeout(function () {
		// scrollTnc();
	}, 100)

	if ($('.table__body').length) {
		$(".table__body").getNiceScroll().resize();
	}
	if ($('.box-scroll-tnc').length) {
		$(".box-scroll-tnc").getNiceScroll().resize();
	}

	fsSlider();
	fsEvent();

	setTimeout(function () {
		if (loading) {
			starPage();
		}
	}, 3000);
})();