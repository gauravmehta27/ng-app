$(function () {

    // Dropdown fix
    $('.dropdown > a[tabindex]').on('keydown', function (event) {
        // 13: Return

        if (event.keyCode == 13) {
            $(this).dropdown('toggle');
        }
    });

    $('.dropdown-menu').on('click', function (event) {
        if (this === event.target) {
            event.stopPropagation();
        }
    });

    $('[data-submenu]').submenupicker();

});