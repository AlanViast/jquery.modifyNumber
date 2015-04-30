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
              defaultValue  = option.defaultValue,
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
            console.dir(event);
            $(this).trigger('mn.change');
        });

        $this.find(option.inputClass).focus(function(event) {
            event.preventDefault();
            $(this).data('oldValue', $(this).val());
        });

         $this.find(option.inputClass).keydown(function(event) {
                if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 || ( event.keyCode == 65 && event.ctrlKey === true ) ||  ( event.keyCode >= 35 && event.keyCode <= 39 )) {
                        return;
                }
                if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
                   event.preventDefault();
                }
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
            var value = parseInt($inputNumber.val());
            if (!isNaN(value)) {
                $inputNumber.val(value + option.step);
            }
            $(this).trigger('mn.change');
        });

        $this.on('mn.change', function(event){
            event.preventDefault();
            var $inputNumber = $(this).find(option.inputClass),
                   value = parseInt($inputNumber.val()),
                   max = parseInt($inputNumber.data('mn-max')) || defaultMax,
                   min  = parseInt($inputNumber.data('mn-min')) || defaultMin,
                   oldValue = $inputNumber.data('oldValue') || defaultValue;

            if(isNaN(value) || (max < value || min > value)){
                $inputNumber.val(oldValue);
            } else {
                $inputNumber.val(value);
                $inputNumber.data('oldValue', value);
            }
            $(this).trigger('mn.valueChange');
        });

    };
})(jQuery);