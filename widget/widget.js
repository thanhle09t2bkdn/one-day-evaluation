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
            href: "http://192.168.0.106/one-day-evaluation/widget/style.css" 
        });
        css_link.appendTo('head');
            var data = '<div align="center"> '+
                    '<br><br><br><br>'+
                    '<a href="#" id="evaluation-open" class="evaluation-button">Click show popup</a>'+
                    '</div> '+
                    '<div id="evaluation-cover" >' +
                    '<div id="evaluation-screen"> '+
                    '<a href="#" id="evaluation-close">&times;</a> '+
                    '<ul>'+
                    '<li><a href="http://192.168.0.106:8080/">Viral Leo</a></li>'+
                    '<li><a href="http://192.168.0.106:8080/">Chanda Stout</a></li>'+
                    '<li><a href="http://192.168.0.106:8080/">Leila Short</a></li>'+
                    '</ul>'+
                    '</div> '+
                    '</div>';
            
         $('#evaluation-widget-container').html(data);
            $('#evaluation-open').click(function (event) {
                event.preventDefault();                
                $('#evaluation-screen').show();
                $('#evaluation-cover').show();
                $('#evaluation-cover').css('z-index',2);
            });
            $('#evaluation-close').click(function (event) {
                event.preventDefault();
                $('#evaluation-screen').hide();
                $('#evaluation-screen').css('z-index',10);
                $('#evaluation-cover').hide();
                $('#evaluation-cover').css('z-index',5);
            });
         
    });
}

})(); // We call our anonymous function immediately
