(function () {

    $(document).ready(function () {

        /**
         * Smooth scroll to anchors
         */
        var scrollable = $('a[data-scroll]');

        if (scrollable.length > 0) {
            scrollable.on('click', function (e) {
                e.preventDefault();

                var destination = $(this).attr('data-scroll');

                $('html, body').animate({
                    scrollTop: $(destination).offset().top
                });
            });
        }

        /**
         * Fetch repository data from github
         */
        $.ajax({
            url: 'https://api.github.com/users/mathiasnovas/repos',
            success: function (data) {
                $.each(data, function () {

                    var language = (this.language?this.language:'Unknown');

                    var html = $('<article>', {
                        'class': 'item columns large-3 small-12',
                        'html': '<a href="' + this.svn_url + '" target="_blank"><h1 class="title">' + this.name +
                            '</h1><div class="description"><p>' + this.description + '<p>' +
                            '<div class="date"><p>Created ' + moment(this.created_at, 'YYYYMMDD').fromNow() +
                            ' & last updated ' +
                            moment(this.updated_at, 'YYYYMMDD').fromNow() + '</p></div>' +
                            '<span class="language '+ language.toLowerCase() +'">' + language + '</span>' +
                            '</div></a>'
                    });

                    $('.repos').append(html);
                });
            }
        });

        /**
         * Change logo background color based on scroll location.
         */
        $(window).on('scroll', function () {
            var current = $(document).scrollTop(),
                offset = $('.work').offset().top,
                logo = $('.logo');

            if (current > offset - (logo.position().top + logo.height() / 2)) {
                logo.addClass('dark');
            } else {
                logo.removeClass('dark');
            }
        });

        /**
         * Display ometer
         */
        var ometer = $('[data-ometer]');

        $.each(ometer, function () {
            var elem = $(this),
                level = elem.attr('data-ometer');

            console.log('rgba(0,255,' + (level * 2) + ',.7)');

            elem.append('<i>');

            elem.find('i').css({
                'width': level + '%',
                'background': 'rgba(0,255,' + (level * 2) + ',.7)'
            });
        });

    });

}) ();
