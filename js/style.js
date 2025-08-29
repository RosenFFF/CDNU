$(document).ready(function()
{

	$(function ($, window, document, undefined)
	{

	    Slider = function (container, options)
	    {
	        "use strict"; 

	        if (!container) return;

	        var options = options || {},
	            currentIndex = 0,
	            cls = options.activeControllerCls,
	            delay = options.delay,
	            isAuto = options.auto,
	            controller = options.controller,
	            event = options.event,
	            interval,
	            slidesWrapper = container.children().first(),
	            slides = slidesWrapper.children(),
	            length = slides.length,
	            childWidth = container.width(),
	            totalWidth = childWidth * slides.length;

	        function init()
	        {
	            var controlItem = controller.children();

	            mode();

	            event == 'hover' ? controlItem.mouseover(function ()
	            {
	                stop();
	                var index = $(this).index();

	                play(index, options.mode);
	            }).mouseout(function ()
	            {
	                isAuto && autoPlay();
	            }) : controlItem.click(function ()
	            {
	                stop();
	                var index = $(this).index();

	                play(index, options.mode);
	                isAuto && autoPlay();
	            });

	            isAuto && autoPlay();
	        }

	       
	        function mode()
	        {
	            var wrapper = container.children().first();

	            options.mode == 'slide' ? wrapper.width(totalWidth) : wrapper.children().css(
	            {
	                'position': 'absolute',
	                'left': 0,
	                'top': 0
	            })
	                .first().siblings().hide();
	        }

	       
	        function autoPlay()
	        {
	            interval = setInterval(function ()
	            {
	                triggerPlay(currentIndex);
	            }, options.time);
	        }

	      
	        function triggerPlay(cIndex)
	        {
	            var index;

	            (cIndex == length - 1) ? index = 0 : index = cIndex + 1;
	            play(index, options.mode);
	        }

	       
	        function play(index, mode)
	        {
	            slidesWrapper.stop(true, true);
	            slides.stop(true, true);

	            mode == 'slide' ? (function ()
	            {
	                if (index > currentIndex)
	                {
	                    slidesWrapper.animate(
	                    {
	                        left: '-=' + Math.abs(index - currentIndex) * childWidth + 'px'
	                    }, delay);
	                } else if (index < currentIndex)
	                {
	                    slidesWrapper.animate(
	                    {
	                        left: '+=' + Math.abs(index - currentIndex) * childWidth + 'px'
	                    }, delay);
	                }
	                else
	                {
	                    return;
	                }
	            })() : (function ()
	            {
	                if (slidesWrapper.children(':visible').index() == index) return;
	                slidesWrapper.children().fadeOut(delay).eq(index).fadeIn(delay);
	            })();

	            try
	            {
	                controller.children('.' + cls).removeClass(cls);
	                controller.children().eq(index).addClass(cls);
	            }
	            catch(e)
	            { }

	            currentIndex = index;

	            options.exchangeEnd && typeof options.exchangeEnd == 'function' && options.exchangeEnd.call(this, currentIndex);
	        }

	      
	        function stop()
	        {
	            clearInterval(interval);
	        }

	      
	        function prev()
	        {
	            stop();

	            currentIndex == 0 ? triggerPlay(length - 2) : triggerPlay(currentIndex - 2);

	            isAuto && autoPlay();
	        }

	      
	        function next()
	        {
	            stop();

	            currentIndex == length - 1 ? triggerPlay(-1) : triggerPlay(currentIndex);

	            isAuto && autoPlay();
	        }

	    
	        init();

	        return {
	            prev: function ()
	            {
	                prev();
	            },
	            next: function ()
	            {
	                next();
	            }
	        }
	    };

	}(jQuery, window, document));

	$(function()
	{
		var bannerSlider = new Slider($('#banner_tabs'), {
			time: 5000,
			delay: 400,
			event: 'hover',
			auto: true,
			mode: 'fade',
			controller: $('#bannerCtrl'),
			activeControllerCls: 'active'
		});
		$('#banner_tabs .flex-prev').click(function()
		{
			bannerSlider.prev()
		});
		$('#banner_tabs .flex-next').click(function()
		{
			bannerSlider.next()
		});
	});





	(function(factory)
	{
	    if (typeof define === 'function' && define.amd)
	    {
	     
	        define(['jquery'], factory);
	    }
	    else if (typeof module === 'object' && module.exports)
	    {
	        factory(require('jquery'));
	    }
	    else
	    {
	       
	        factory(jQuery);
	    }
	}(function($)
	{

	
	    var debugMode = false; 

	   
	    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
	    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini && !debugMode;
	    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini && !debugMode;
	    var valHooks = $.valHooks;
	    var propHooks = $.propHooks;
	    var hooks;
	    var placeholder;
	    var settings = {};

	    if (isInputSupported && isTextareaSupported)
	    {

	        placeholder = $.fn.placeholder = function()
	        {
	            return this;
	        };

	        placeholder.input = true;
	        placeholder.textarea = true;

	    }
	    else
	    {

	        placeholder = $.fn.placeholder = function(options)
	        {

	            var defaults = {customClass: 'placeholder'};
	            settings = $.extend({}, defaults, options);

	            return this.filter((isInputSupported ? 'textarea' : ':input') + '[' + (debugMode ? 'placeholder-x' : 'placeholder') + ']')
	                .not('.'+settings.customClass)
	                .not(':radio, :checkbox, [type=hidden]')
	                .bind({
	                    'focus.placeholder': clearPlaceholder,
	                    'blur.placeholder': setPlaceholder
	                })
	                .data('placeholder-enabled', true)
	                .trigger('blur.placeholder');
	        };

	        placeholder.input = isInputSupported;
	        placeholder.textarea = isTextareaSupported;

	        hooks = {
	            'get': function(element)
	            {

	                var $element = $(element);
	                var $passwordInput = $element.data('placeholder-password');

	                if ($passwordInput)
	                {
	                    return $passwordInput[0].value;
	                }

	                return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
	            },
	            'set': function(element, value)
	            {

	                var $element = $(element);
	                var $replacement;
	                var $passwordInput;

	                if (value !== '') {

	                    $replacement = $element.data('placeholder-textinput');
	                    $passwordInput = $element.data('placeholder-password');

	                    if ($replacement)
	                    {
	                        clearPlaceholder.call($replacement[0], true, value) || (element.value = value);
	                        $replacement[0].value = value;

	                    }
	                    else if ($passwordInput)
	                    {
	                        clearPlaceholder.call(element, true, value) || ($passwordInput[0].value = value);
	                        element.value = value;
	                    }
	                }

	                if (!$element.data('placeholder-enabled'))
	                {
	                    element.value = value;
	                    return $element;
	                }

	                if (value === '')
	                {
	                    element.value = value;
	                   
	                    if (element != safeActiveElement())
	                    {
	                      
	                        setPlaceholder.call(element);
	                    }

	                }
	                else
	                {
	                    if ($element.hasClass(settings.customClass))
	                    {
	                        clearPlaceholder.call(element);
	                    }

	                    element.value = value;
	                }
	              
	                return $element;
	            }
	        };

	        if (!isInputSupported)
	        {
	            valHooks.input = hooks;
	            propHooks.value = hooks;
	        }

	        if (!isTextareaSupported)
	        {
	            valHooks.textarea = hooks;
	            propHooks.value = hooks;
	        }

	        $(function()
	        {
	         
	            $(document).delegate('form', 'submit.placeholder', function()
	            {
	              
	                var $inputs = $('.'+settings.customClass, this).each(function()
	                {
	                    clearPlaceholder.call(this, true, '');
	                });

	                setTimeout(function() {
	                    $inputs.each(setPlaceholder);
	                }, 10);
	            });
	        });

	       
	        $(window).bind('beforeunload.placeholder', function()
	        {

	            var clearPlaceholders = true;

	            try {
	               
	                if (document.activeElement.toString() === 'javascript:void(0)')
	                {
	                    clearPlaceholders = false;
	                }
	            } catch (exception) { }

	            if (clearPlaceholders)
	            {
	                $('.'+settings.customClass).each(function()
	                {
	                    this.value = '';
	                });
	            }
	        });
	    }

	    function args(elem)
	    {
	       
	        var newAttrs = {};
	        var rinlinejQuery = /^jQuery\d+$/;

	        $.each(elem.attributes, function(i, attr)
	        {
	            if (attr.specified && !rinlinejQuery.test(attr.name))
	            {
	                newAttrs[attr.name] = attr.value;
	            }
	        });

	        return newAttrs;
	    }

	    function clearPlaceholder(event, value)
	    {
	        var input = this;
	        var $input = $(this);
	        if (input.value === $input.attr((debugMode ? 'placeholder-x' : 'placeholder')) && $input.hasClass(settings.customClass))
	        {
	            input.value = '';
	            $input.removeClass(settings.customClass);

	            if ($input.data('placeholder-password'))
	            {

	                $input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id')); 
	                // If `clearPlaceholder` was called from `$.valHooks.input.set`
	                if (event === true)
	                {
	                    $input[0].value = value;

	                    return value;
	                }

	                $input.focus();

	            }
	            else
	            {
	                input == safeActiveElement() && input.select();
	            }
	        }
	    }

	    function setPlaceholder(event)
	    {
	        var $replacement;
	        var input = this;
	        var $input = $(this);
	        var id = input.id;

	        // If the placeholder is activated, triggering blur event (`$input.trigger('blur')`) should do nothing.
	        if (event && event.type === 'blur' && $input.hasClass(settings.customClass))
	        {
	            return;
	        }

	        if (input.value === '')
	        {
	            if (input.type === 'password')
	            {
	                if (!$input.data('placeholder-textinput'))
	                {
	                    
	                    try
	                    {
	                        $replacement = $input.clone().prop({ 'type': 'text' });
	                    }
	                    catch(e)
	                    {
	                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
	                    }

	                    $replacement
	                        .removeAttr('name')
	                        .data(
	                        {
	                            'placeholder-enabled': true,
	                            'placeholder-password': $input,
	                            'placeholder-id': id
	                        })
	                        .bind('focus.placeholder', clearPlaceholder);

	                    $input
	                        .data(
	                        {
	                            'placeholder-textinput': $replacement,
	                            'placeholder-id': id
	                        })
	                        .before($replacement);
	                }

	                input.value = '';
	                $input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', $input.data('placeholder-id')).show();

	            }
	            else
	            {
	                var $passwordInput = $input.data('placeholder-password');

	                if ($passwordInput)
	                {
	                    $passwordInput[0].value = '';
	                    $input.attr('id', $input.data('placeholder-id')).show().nextAll('input[type="password"]:last').hide().removeAttr('id');
	                }
	            }

	            $input.addClass(settings.customClass);
	            $input[0].value = $input.attr((debugMode ? 'placeholder-x' : 'placeholder'));

	        }
	        else
	        {
	            $input.removeClass(settings.customClass);
	        }
	    }

	    function safeActiveElement()
	    {
	        // Avoid IE9 `document.activeElement` of death
	        try
	        {
	            return document.activeElement;
	        } catch (exception) {}
	    }
	}));

	$(function(){ $('input, textarea').placeholder(); });




	$(function()
	{
		function tabs(tabTit,on,tabCon,tabMon)
		{
			$(tabTit).children().click(function()
			{
				$(this).addClass(on).siblings().removeClass(on);
				var index = $(tabTit).children().index(this);
				$(tabCon).children().eq(index).show().siblings().hide();
				var index = $(tabTit).children().index(this);
				$(tabMon).children().eq(index).show().siblings().hide();
			});
		};
		tabs(".tab-hd","active",".tab-bd",".tab-md");
	});

	$(function()
	{
		$(".tab-hd>li").click(function()
		{
			$(this).hasClass('active');
			$(this).find('p').removeClass('hlzb').addClass('tited');
			$(this).siblings().find("p").removeClass('tited').addClass('hlzb');
			console.log($(this).index());
			if($(this).index() == 0)
			{
				$(".xjt").css("left","80px");
				$("#Mov").css("display","block");
				$(".Tmover").css("display","none");
			}
			else
			{
				$(".xjt").css("left","193px");
				$("#Mov").css("display","none")
				$(".Tmover").css("display","block")
			}
		});

	})
});
