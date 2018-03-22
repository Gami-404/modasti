$('#header .top .rightArea .search .icon').click(function(){
	$(this).parent('.search').toggleClass('formOpened');
});


$('#header .top .rightArea .search .icon, #header .top .rightArea .search form, .dropdownTitle').click(function(e){
	e.stopPropagation();
});


$('#header .bottom #nav .icon').click(function(){
	$('.mobileMenu').fadeToggle();
});


$(document).click(function(){
	$('#header .search').removeClass('formOpened');
	$('.dropdownContent').css('display', 'none');
});