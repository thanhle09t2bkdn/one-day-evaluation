(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else { // Other browsers
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main(); 
}

/******** Our main function ********/
function main() { 
    function deselect(e) {
        jQuery('.pop').slideFadeToggle(function() {
          e.removeClass('selected');
        });    
    }
    

    jQuery(document).ready(function($) { 
        // We can use jQuery 1.4.2 here
        var css_link = $("<link>", { 
            rel: "stylesheet", 
            type: "text/css", 
            href: "http://localhost/one-day-evaluation/widget/style.css" 
        });
        css_link.appendTo('head');
        var data =  '<div id="popup" class="modal-box">'+
                    '<header>'+
                    '<a href="#" class="js-modal-close close">×</a>'+
                    '<h3><a href="http://www.jqueryscript.net/tags.php?/Modal/">Modal</a> Title</h3>'+
                    '</header>'+
                    '<div class="modal-body">'+
                    '<p>Modal Body</p>'+
                    '</div>'+
                    '<footer>'+
                    '<a href="#" class="js-modal-close">Close Button</a>'+
                    '</footer>'+
                    '</div>';
            data += '<a class="js-open-modal" href="#" data-modal-id="popup"> Click me </a>';
        
         $('#evaluation-widget-container').html(data);
         
        var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");

        $('a[data-modal-id]').click(function (e) {
            e.preventDefault();
            $("body").append(appendthis);
            $(".modal-overlay").fadeTo(500, 0.7);
            //$(".js-modalbox").fadeIn(500);
            var modalBox = $(this).attr('data-modal-id');
            $('#' + modalBox).fadeIn($(this).data());
        });


        $(".js-modal-close, .modal-overlay").click(function () {
            $(".modal-box, .modal-overlay").fadeOut(500, function () {
                $(".modal-overlay").remove();
            });
        });

        $(window).resize(function () {
            $(".modal-box").css({
                top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
                left: ($(window).width() - $(".modal-box").outerWidth()) / 2
            });
        });

        $(window).resize();
    });
}

})(); // We call our anonymous function immediately
