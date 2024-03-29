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

	$(document).on('click', '.close-but-tnc', function () {
		$('.popup-overlay-tnc').fadeOut(300);
		playAudioBackground();
	})

	$(document).on('click', '.close-modal', function () {
		$('.modal').removeClass('active');
		$('body').removeClass('fs-no-scroll');
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


	$(document).on('click', '.js-show-form-info', function () {
		$('.close-but').trigger('click');
		$('.fs-banner .box-form').addClass('is-form');
	})


	// Go top
	$('.go-top').on('click', function () {
		$("html, body").stop().animate({ scrollTop: 0 }, 500);
	});

	$(document).on('click', '.js-enter-bill', function () {
		if ($('.lucky__tree').hasClass('no_event')) {
			$('.lucky__tree').removeClass('no_event');
		}
	});

	$('.nav li').on('click', function () {
		var target = $(this).attr('data-nav');
		var offetTop = $(target).offset().top - 180;
		$('html, body').animate({ scrollTop: offetTop }, 800);
		if (window.innerWidth < 1100) {
			if ($('body').hasClass('open-menu')) {
				$('body').removeClass('open-menu');
				$('body').removeClass('fs-no-scroll');
			}
		}
	});

	$(document).on('click', '.overlay', function () {
		$('body').removeClass('open-menu');
		$('body').removeClass('fs-no-scroll');
	});

	inputHolder();
	// scrollResult();
	// scrollTnc();
	actionClickToShake();

	$(document).on('click touch', '.code__win', function () {
		var codeCopy = document.getElementById('code__win');
		copyCode(codeCopy);
		$('.code__win').addClass('active');
		setTimeout(function () {
			$('.code__win').removeClass('active');
		}, 700)
	});

}

function copyCode(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).text()).select();
	document.execCommand("copy");
	$temp.remove();
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

function actionClickToShake() {
	$(document).on('click', '.tree__pic, .but__shake--tree', function () {
		// countClick--;
		// if (countClick > 0) {
		// 	$('.tree__pic_img').shake();
		// 	console.log(countClick);
		// } else {
		// 	$('.modal').addClass('active');
		// 	$('.tree__pic_img').addClass('no-action-tree');
		// 	$('.but__shake--tree').addClass('no-action');
		// 	$('.tree__pic').addClass('no-action');
		// 	$('.popup-overlay').fadeOut();
		// 	countClick = 2;
		// }
		$('.tree__pic_img').shake();
		$('.tree__pic_img').addClass('none-active');
		$('.but__shake--tree').addClass('none-active');
		$('.tree__pic ').addClass('none-active');
		setTimeout(function () {
			playAudioGold();
			$('.modal').addClass('active');
			$('.tree__pic_img').addClass('no-action-tree');
			$('.but__shake--tree').addClass('no-action');
			$('.tree__pic').addClass('no-action');
			$('.popup-overlay').fadeOut();
			$('.tree__pic_img').removeClass('none-active');
			$('.but__shake--tree').removeClass('none-active');
			$('.tree__pic ').removeClass('none-active');
		}, 500)
	});
}

// Create Slider
function fsSlider() {

	if ($('.banner-box').length) {
		var loop = false;
		if ($('.fs-banner .swiper-slide').length < 2) {
			$('.fs-banner').addClass('hide-controls');
			loop = false;
		}
		new Swiper('.banner-slider', {
			effect: 'fade',
			loop: loop,
			speed: 800,
			watchOverflow: true,
			slidesPerView: 1,
			slidesPerGroup: 1,
			autoplay: {
				delay: 3000,
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

}

function setNumberUser(number) {
	for (var i = 0; i < number.length; i++) {
		var elemetNumber = number.charAt(i);
		var elementListNumbers = `<li><span>${elemetNumber}</span></li>`;
		$('.number__player').append(elementListNumbers);
	}
}

function playAudioBackground() {
	var audio = document.getElementById("mp3__background");
	audio.play();
	audio.loop = true;
	audio.volume = 0.3;
}

function playAudioGold() {
	var audioGold = document.getElementById("mp3__gold");
	audioGold.play();
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

	// Nhập số user
	setNumberUser('0954');
})();