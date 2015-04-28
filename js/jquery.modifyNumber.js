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
        step: 1
    };

    $.fn.modifyNumber = function(tempOption){
        var option      = $.extend(true, defaultOption, tempOption),
              oldValue  = option.defaultValue,
              $this         = $(this);

        $this.find(option.btnClass).click(function(event) {
            var $this = $(this);
            var eventStr = 'mn.' + $this.data("type");
            $(this).trigger(eventStr);
        });

        $this.find(option.inputClass).change(function(event) {
            event.preventDefault();
            $(this).trigger('mn.change');
        });

        $this.on('mn.change', function(event){
            event.preventDefault();
            var $inputNumber = $(this).find(option.inputClass);
            var value = parseInt($inputNumber.val());
            if(isNaN(value)){
                $inputNumber.val(oldValue);
            } else {
                $inputNumber.val(value);
            }
        });

        $this.on('mn.minus', function(event){
            event.preventDefault();
            var $inputNumber = $(this).find('input');
            var value = parseInt($inputNumber.val());
            $inputNumber.val(value - option.step);
        });

        $this.on('mn.plus', function(event){
            event.preventDefault();
            var $inputNumber = $(this).find('input');
            var value = parseInt($inputNumber.val()) + option.step;
            if (isNaN(value)) {
                value = oldValue++;
            } else {
                oldValue = value;
            }
            $inputNumber.val(value);
        });

    };
})(jQuery);