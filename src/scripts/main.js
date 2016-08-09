//bind $ to jquery in this scope
(function($) {
    //initiate variables
    var $navbar_toggle,
        $navbar_container,
        $navbar,
        $nav_link,
        $toggle_text,
        $window,
        $fileInput,
        fileName,
        numFiles,
        logoPos,
        wheelPos;
    
    function toggleNavbar(e) {
        e.preventDefault();

        $navbar_container.slideToggle('fast');
        (($toggle_text.text() == 'Open menu') ? $toggle_text.text('Sluit menu') : $toggle_text.text('Open menu'));
    }

    function handleScroll() {
        if($window.scrollTop() > 0) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }

        if($window.width() >= 960) {
            if($('.scrollwheel')[0].getBoundingClientRect().top > -250) {
                wheelPos = $('.scrollwheel')[0].getBoundingClientRect().top + ($('.scrollwheel')[0].getBoundingClientRect().height / 2);

                if(wheelPos <= logoPos) {
                    $('.intro__image').css('top', wheelPos);
                } else {
                    $('.intro__image').css('top', '46.5%');
                }
                // console.log(wheelPos);
                // console.log(logoPos);
            }
        }
    }

    function handleNavClick(e) {
	    e.preventDefault();

	    if($window.width() < 768) {
            $navbar_container.slideUp('fast');
	        $toggle_text.text('Open menu');
        }

	    var target = this.hash;
        scrollToHash(target, 60);
    }

    function scrollToHash(theID) {
		$('html, body').animate({
	        scrollTop: $(theID).offset().top - 51
	    }, 850);

	    return false;
	}

    // function handleFileInput() {
    //     numFiles = $(this)[0].files.length;
    //     fileName = $(this).val().split('\\').pop();

    //     if(numFiles > 1) {
    //         $('.labelText').html(numFiles + ' bestanden geselecteerd')
    //     } else {
    //         $('.labelText').html(fileName);        
    //     }
    // }

    function handleFormSubmit(e) {
        e.preventDefault();

        if(validateInput($form)) {
            sendEmail($form);
        }
    }

    function sendEmail(form) {
        var formData = form.serialize();
        console.log(formData);
		
		$.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: {
				formData: formData
			},
            dataType: 'json',
			cache: false,
            error: function (xhr, status, thrown) {
                //connection error
				// console.log('server error with ajax');
                $('.error').show();
				$('.error').html('Er ging iets mis. Probeer later opnieuw!');
            },
            success: function (data) {
                if (data.result !== 'success') {
                    //something went wrong
					// console.log('call didnt work');
                    $('.error').show();
					$('.error').html(data.message);
                } else {
                    //call worked
					// console.log('call worked');
                    $('.success').show();
					$('.success').html(data.message);
					
					//clear inputs
					form.find('input[type="text"], input[type="tel"], input[type="email"], textarea').val('');
                }
            }
        });
    }

    function validateInput(form) {
        emailRegex = /([a-z0-9\.\-_]+@[a-z\.]+\.[a-z]+)/i;
        alphaRegex = /(^[A-Z][a-z]*(?:[ \-'][A-Z]?[a-z]*)*$)/i;
		integerRegex = /^\d+$/;

        emailInput = form.find('input#email');
        nameInput = form.find('input#name');
		phoneInput = form.find('input#tel');
		messageInput = form.find('textarea#message');
        subjectInput = form.find('input#subject');
        addressInput = form.find('input#address');

        form.find('input[type="text"], input[type="email"], input[type="tel"], textarea').css('border', '1px solid #4f62ac');
        $('.form--msg').hide();
		$('.form--msg').html('');
        
        if(!alphaRegex.test(nameInput.val()) || !emailRegex.test(emailInput.val()) || !integerRegex.test(phoneInput.val()) || !messageInput.val() || !subjectInput.val() || !addressInput.val()) {
            $('.error').show();	

			if(!alphaRegex.test(nameInput.val())) {
				nameInput.css('border', '1px solid #e74c3c');
				nameInput.focus();
				$('.error').html('Geen geldige naam');
				
				return false;
			} else if(!emailRegex.test(emailInput.val())) {
				emailInput.css('border', '1px solid #e74c3c');
				emailInput.focus();
				$('.error').html('Geen geldig emailadres');
				
				return false;
			} else if(!integerRegex.test(phoneInput.val())) {
				phoneInput.css('border', '1px solid #e74c3c');
				phoneInput.focus();
				$('.error').html('Telefoonnummer mag alleen cijfers bevatten');
				
				return false;
			} else if(addressInput.val().length < 5) {
				addressInput.css('border', '1px solid #e74c3c');
				addressInput.focus();
				$('.error').html('Adres moet minstens 5 karakters bevatten');
				
				return false;
			} else if(subjectInput.val().length < 3) {
				subjectInput.css('border', '1px solid #e74c3c');
				subjectInput.focus();
				$('.error').html('Onderwerp moet minstens 3 karakters bevatten');
				
				return false;
			} else {
				messageInput.css('border', '1px solid #e74c3c');
				messageInput.focus();
				$('.error').html('Bericht is verplicht');
				
				return false;
			}
		} else {
			return true;
		}
    }

    //event bindings
    function bindings() {
        $navbar_toggle.on('click', toggleNavbar);
        $window.on('scroll', handleScroll);
        $nav_link.on('click', handleNavClick);
        // $fileInput.on('change', handleFileInput);
        $form.on('submit', handleFormSubmit);
    }

    $(document).ready(function() {
        //assign variables when DOM is ready
        $navbar_toggle = $('.navbar__toggle');
        $navbar_container = $('.navbar__container');
        $navbar = $('#navbar');
        $nav_link = $('.nav__link');
        $toggle_text = $('.toggle__text');
        $window = $(window);
        // $fileInput = $('.fileInput');
        $form = $('form#contactform');

        logoPos = $('.intro__image')[0].getBoundingClientRect().top + ($('.intro__image')[0].getBoundingClientRect().height / 2);

        //execute bindings 
        bindings();
    });
})(jQuery);

