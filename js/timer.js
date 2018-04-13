$(function () {
    function timer(settings) {
        var config = {
            endDate: '2018-03-24 00:00',
            timeZone: 'PRC',
            hours: $('#hours'),
            minutes: $('#minutes'),
            seconds: $('#seconds'),
            newSubMessage: 'and should be back online in a few minutes...'
        };

        function prependZero(number) {
            return number < 10 ? '0' + number : number;
        }

        $.extend(true, config, settings || {});
        var currentTime = moment();
        var endDate = moment.tz(config.endDate, config.timeZone);
        var diffTime = currentTime.valueOf() - endDate.valueOf();
        var duration = moment.duration(diffTime, 'milliseconds');
        var days = duration.days();
        var year = duration.years();
        var interval = 1000;
        var subMessage = $('.sub-message');
        var clock = $('.clock');
        if (diffTime < 0) {
            endEvent(subMessage, config.newSubMessage, clock);
            return;
        }
        if (year > 0) {
            $('#years').text(prependZero(days));
            $('.years').css('display', 'inline-block');
            $('.clock .column').css('width', '19%');
        }
        if (days > 0) {
            $('#days').text(prependZero(days));
            $('.days').css('display', 'inline-block');
        }
        var intervalID = setInterval(function () {
            duration = moment.duration(duration + interval, 'milliseconds');
            var hours = duration.hours(),
                minutes = duration.minutes(),
                seconds = duration.seconds();
            days = duration.days();
            year = duration.years();
            if (hours <= 0 && minutes <= 0 && seconds <= 0 && days <= 0&&year<=0) {
                clearInterval(intervalID);
                endEvent(subMessage, config.newSubMessage, clock);
                window.location.reload();
            }
            if (days === 0) {
                $('.days').hide();
            }
            if (year === 0) {
                $('.years').hide();
            }
            $('#years').text(prependZero(year));
            $('#days').text(prependZero(days));
            config.hours.text(prependZero(hours));
            config.minutes.text(prependZero(minutes));
            config.seconds.text(prependZero(seconds));
        }, interval);
    }

    function endEvent($el, newText, hideEl) {
        $el.text(newText);
        hideEl.hide();
    }

    timer();
});
