/*
$(function() {
    var align = function() {
        console.log('ALIGN');
        var max = 0;
        $('.responsive-height').each(function() {
            var w = $(this).css('width');
            var h = $(this).css('height');
            console.log(h);
            h = parseInt(h);
            if(max<h) max = h;
        });

        $('.responsive-height').each(function() {
            $(this).css('height', max+'px');
        });
    };

    $(window).resize(function(e) {
        align();
    });

    align();
});
*/
