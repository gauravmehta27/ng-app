/*Alert Bar js Start*/
/*Alert Bar js End*/


/*Toast  js Start*/

$(window).load(function () {
    var str = "";

    $('#notificationPopover ul').empty();
    var notifCount = 0;
    $('.acn-toast-text').each(function () {
        str = "";
        str = $(this)[0].outerHTML;
        str = str.replace('<div class="acn-toast-text">', "");
        str = str.replace("</div>", "");

        $("#notificationPopover ul").append("<li><a>" + str + "</a></li>");
        notifCount = notifCount + 1;
        
    });  

    var data = $('#isfeedbackAvailable').val();
    if (data == 'true') {
        if (notifCount > 0) {
            notifCount = notifCount - 1;
        }
        $("#notificationPopover ul li:contains('Feedback')").remove();
    }
    $("#badgeid").text(notifCount);
    if (notifCount > 0) {

        $('[rel="popover"]').popover('show');
    }
    else {
        $("#notificationPopover ul").append("<li style='color:white;font-family:Graphik Web'>No Updates Available Currently</li>");
        $('[rel="popover"]').popover('show');
    }
    $("a.acn-toast-link:contains('Feedback')").addClass('fdback'); 
    var url = $('.fdback').attr('href');
    url = url.replace(url, "");
    url = "javascript:open_fbbackform();";
    $('.fdback').attr("href", url);

});

function open_fbbackform() {
    
    angular.element(document.getElementsByClassName('fdback')).scope().openFeedback();
   
};
/*Toast js End*/




/*Modal js Start*/
/*Modal js End*/