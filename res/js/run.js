// JavaScript Document


(function($) {
	// 预加载
	function loadSource(hash,callback) {
		var totalLen = imgHash.length,
			doneLen = 0,
			per = 0;
		for (var i = 0; i < imgHash.length; i++) {
			(function() {
				var img = new Image();
				img.src = imgHash[i];
				img.onload = function() {
					doneLen++;
					per = parseInt(doneLen / totalLen * 100);
					$('.loading .per').html(per + '%');
					if (doneLen >= totalLen) callback();
				};
				img.onerror = function() {
					doneLen++;
					per = parseInt(doneLen / totalLen * 100);
					$('.loading .per').html(per + '%');
					if (doneLen >= totalLen) callback();
				}
			})();
		}

	}
	loadSource(imgHash,run);
})(jQuery);


function run(){
	//loading
	$('.loading').animate({
		opacity: 0
	}, 1000, function() {
		$(this).remove();
	});

	$('.swiper-container1').show();
	var Video = document.getElementById('video');
	var Video2 = document.getElementById('video2');
	var swiper = new Swiper('.swiper-container1', {
		paginationClickable: true,
		direction: 'vertical',
		noSwipingClass : 'stop-swiping',
		slideActiveClass: 'active'
	});


	var swiper2 = new Swiper('.swiper-container2', {
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		paginationClickable: true,
		slideActiveClass: 'active-s',
		onTouchEnd: function(Swiper){
			TR=Swiper.translate;
			if(TR<-$(window).width()*11){
				Swiper.setWrapperTranslate(TR);

				swiper.slideTo(5,false);
				document.getElementById('music2').pause();
				Video2.play();
			};

			if(TR<-$(window).width()*9){
				$('.swiper-container2 .swiper-button-next').show();
				$('.slide-last.next').hide();
			};
			if(TR<-$(window).width()*10){
				$('.swiper-container2 .swiper-button-next').hide();
				$('.slide-last.next').show();
			};
		}
	});

	$('.opening_slide .hand').click(function () {
		$(this).hide();
		$('.opening_slide').addClass('loading-animation');
		Video.play();
		Video.pause();
		Video2.play();
		Video2.pause();
		setTimeout(function () {
			/*document.getElementById('music').pause();*/
			/*swiper.slideTo(1,false);*/
			$('.video-box').show();
			document.getElementById('music').pause();
			Video.play();
		},3000)
	 });

	$('#video').css({
		width: $(window).width(),
		height: $(window).height()
	});
	Video.onended = function() {
		swiper.slideTo(1, false);
		document.getElementById('music1').play();
		document.addEventListener("WeixinJSBridgeReady", function () {
			document.getElementById('music1').play();
		}, false);
	};
	$('.accept').click(function () {
		document.getElementById('music1').pause();
		document.getElementById('music2').play();
		document.addEventListener("WeixinJSBridgeReady", function () {
			document.getElementById('music2').play();
		}, false);
		swiper.slideTo(2,false);
		setTimeout(function(){
			swiper.slideTo(3,false);
		},6500);
	});
	$('.swiper-slide-six .hand-s').click(function () {
		swiper.slideTo(4,false);
	});
	$('.next').click(function () {
		swiper.slideTo(5,false);
		document.getElementById('music2').pause();
		Video2.play();
	});
	$('.swiper-container2 .content-box').css('height',$(window).height()-$('.swiper-slide-three .slide-bg .bg-box .slide-bg-float2').height())
	var heightScroll = $('.swiper-container2 .content').height();
	$('.swiper-container2 .content img').css('height',heightScroll);
}

