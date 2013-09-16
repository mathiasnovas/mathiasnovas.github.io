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
                var repos = $('.repos');

                if (!repos.children().length > 0) {
                    repos.html('');
                }

                $.each(data, function () {
                    if (this.fork || !this.description) return;

                    var language = (this.language?this.language:'Unknown'),
                        html = $('<article>', {
                        'class': 'item columns large-3 small-12',
                        'html': '<a href="' + this.svn_url + '" target="_blank"><h1 class="title">' + this.name +
                            '</h1><div class="description"><p>' + this.description + '<p>' +
                            '<div class="date"><p>Created ' + moment(this.created_at, 'YYYYMMDD').fromNow() +
                            ' & last updated ' +
                            moment(this.updated_at, 'YYYYMMDD').fromNow() + '</p></div>' +
                            '<span class="language '+ language.toLowerCase() +'">' + language + '</span>' +
                            '</div></a>'
                    });

                    repos.append(html);
                });
            }
        });

        /**
         * Scroll events
         */
        var doc = $(document),
            offset = $('.work').offset().top,
            logo = $('.logo'),
            info = $('.information'),
            current = '';

        $(window).on('scroll', function () {
            current = doc.scrollTop();

            // Change logo background color based on scroll location.
            if (current > offset - (logo.position().top + logo.height() / 2)) {
                logo.addClass('dark');
            } else {
                logo.removeClass('dark');
            }

            // Scroll backround image
            info.css('background-position', '0 ' + doc.scrollTop() / 10 + '%');
        });

        /**
         * Display ometer
         */
        var ometer = $('[data-ometer]');

        $.each(ometer, function () {
            var elem = $(this),
                level = elem.attr('data-ometer');

            elem.append('<i>');

            elem.find('i').css({
                'background': 'rgba(0,255,' + (level * 2) + ',.7)'
            }).animate({
                'width': level + '%'
            }, 'fast');
        });

    });

}) ();
