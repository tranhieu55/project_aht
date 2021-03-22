$(document).foundation()
$(document).ready(function () {
    $('#example1 .content-list').hide();
    $('#contentBtn').click(function() {
        $('#example1 .content-list').toggle();
    });
    $('.close-button').click(function() {
        $(this).parent().toggle();
    })
    $('#muteBtn').click(function() {
        $(this).find('img').toggle();
    })

    $('#HoverBoard').click(function() {
        $('.tool-popup').toggle();
    })
});
