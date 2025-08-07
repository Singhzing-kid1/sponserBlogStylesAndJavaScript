$(document).ready(function () {
    var modalCookieName = 'aboutMeModalShown';
    var cookieDays = 3; // How many days to wait before showing again
    var otherPageUrl = 'https://singhzing-kiddev.blogspot.com/p/about.html'; // Edit this!

    // Cookie helpers
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    // Only trigger if user hasn't seen this recently
    if (!getCookie(modalCookieName)) {
        // Load JUST the #content from the other page
        $.get(otherPageUrl, function(data) {
            var tempDiv = $('<div>').html(data); // Wrap in virtual DOM
            var otherContent = tempDiv.find('.content-wrapper').first().html() || "Couldn't load content.";
            $('#jbox-modal-content').html(otherContent);

            new jBox('Modal', {
                content: $('#jbox-modal'),
                onClose: function () { setCookie(modalCookieName, '1', cookieDays); },
                // Optional: you can set width, theme, etc.
            }).open();
        });
    }
});
