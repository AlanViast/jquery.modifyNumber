/**
 * @author alan
 * @param  {[type]} $ jQuery
 * @return {[type]}   [description]
 */
(function($){
    'use strict';

    var defaultOption = {
        defaultValue: 10,
        btnClass: ".btn-number",
        inputClass: "input",
        max: Number.MAX_SAFE_INTEGER,
        min: Number.MIN_SAFE_INTEGER,
        step: 1
    };

    $.fn.modifyNumber = function(tempOption){
        var option            = $.extend(true, defaultOption, tempOption),
              oldValue        = option.defaultValue,
              defaultMax    = option.max,
              defaultMin     = option.min,
              $this              = $(this);

        $this.find(option.btnClass).click(function(event) {
            var $this = $(this);
            var eventStr = 'mn.' + $this.data("mn-type");
            $(this).trigger(eventStr);
        });

        $this.find(option.inputClass).change(function(event) {
            event.preventDefault();
            $(this).trigger('mn.change');
        });

        $this.on('mn.minus', function(event){
            event.preventDefault();
            var $inputNumber = $(this).find('input');
            var value = parseInt($inputNumber.val());
            if (!isNaN(value)) {
                $inputNumber.val(value - option.step);
            }
            $(this).trigger('mn.change');
        });

        $this.on('mn.plus', function(event){
            event.preventDefault();
            var $inputNumber = $(this).find('input');
            var value = parseInt($inputNumber.val()) + option.step;
            if (!isNaN(value)) {
                $inputNumber.val(value + option.step);
            }
            $(this).trigger('mn.change');
        });

        $this.on('mn.change', function(event){
            event.preventDefault();
            var $inputNumber = $(this).find(option.inputClass);
            var value = parseInt($inputNumber.val());

            var max = parseInt($inputNumber.data('mn-max')) || defaultMax;
            var min  = parseInt($inputNumber.data('mn-min')) || defaultMin;

            if(isNaN(value) || (max < value || min > value)){
                $inputNumber.val(oldValue);
            } else {
                $inputNumber.val(value);
                oldValue = value;
            }
            $(this).trigger('mn.valueChange');
        });

    };
})(jQuery);