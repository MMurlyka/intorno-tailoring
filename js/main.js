$(document).ready(function() {
	/* start slider */
	$(".slider").slick({
		variableWidth: false,
		slidesToShow: 3,

		responsive: [
		{
			breakpoint: 1200,
			settings: {
				variableWidth: false,
				slidesToShow: 3
			}
		},
		{
			breakpoint: 768,
			settings: {
				variableWidth: false,
				slidesToShow: 1
			}
		}
		]
	});
	/* end slider */
	/* start popup */
	
	/* gallery */
	$(".fancy-pr").fancybox({
		helpers: {
			overlay: {
				locked: false // отключаем блокировку overlay
			}
		}
	});

	/* block 2 popup */
	$(".fancy-calc").fancybox({
		'margin': 0,
		'padding': 0,
		helpers: {
			overlay: {
				locked: false // отключаем блокировку overlay
			}
		}
	});
	/* header link */
	$(".open-popup").fancybox({
		margin: 0,
		padding: 0,
		helpers: {
			overlay: {
				locked: false // отключаем блокировку overlay
			}
		}
	});
	$(".open-popup").click(function() {
		$("#popup input[name=btn-title]").val($(this).data("title"));
	});

	//var $calc = $("<a href=#calc class=fancy></a>");
	/* open calculation popup */
	$(".btn-open-calc").click(function() {
		$("#calc input[name=btn-title]").val($(this).data("title"));
		$(".fancy-calc").click();
	});
	/* other button for order call */ 
	$(".btn-open-popup").click(function() {
		$("#popup input[name=btn-title]").val($(this).data("title"));
		$(".open-popup").click();
	});
	/* politic popup */
	$(".fancy-politic").fancybox({type: "iframe"});
	/* other links */
	$(".fancy").fancybox();

	/* end popup*/
	/* start scroll */
	$(".nav a").click(function() {
		var fixed, destination, elementClick = $($(this).attr("href"));

		if($(this).attr("href") == "#") {
			return true;
		}

		if(720 > $(".container").width()) {
			$(".fixed .nav .open").removeClass("open");
		}

		fixed = $(".fixed .nav").height();

		destination = $(elementClick).offset().top - fixed;

		$("html,body").animate( { scrollTop: destination }, 1100 );
		return false;
	})
	/* end scroll*/
	/* start input mask */
	$(".input[name=phone]").mask("+7 (999) 999-99-99");
	/* end input mask */
	/* start ajax form */
	$("form").ajaxForm({
		url: "mail.php",
		beforeSubmit: function(data, $form) {
			var $phone = $form.find(".input[name=phone]");

			printValid($phone);

			if( ! valid($phone)) {
				return false;
			} else {
				$form.trigger("reset");
				$form.find(".input[name=phone]").removeClass("has-success has-warning");

				$.fancybox.open('#success', {
					helpers: {
						overlay: {
							locked: false // отключаем блокировку overlay
						}
					}
				});	
				
				return false;
			}
		},

		success: function(responseText, statusText, xhr, $form) {
			$form.trigger("reset");
			$form.find(".input[name=phone]").removeClass("has-success has-warning");

			$.fancybox.open('#success', {
				helpers: {
					overlay: {
						locked: false // отключаем блокировку overlay
					}
				}
			});			
		}
	});
	/* end ajax form */
});

function printValid($input) {
	if(valid($input)) {
		$input.removeClass("has-warning");
		$input.addClass("has-success");
	} else {
		$input.removeClass("has-success");
		$input.addClass("has-warning");
	}
}


function valid ($input) {
	if($input.val().length > 2) {
		return true;
	}

	return false;
}