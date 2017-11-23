import constants from './constants';
import Notifications from 'react-notification-system-redux';

export const getClockDisplay = (format) => {
    var currDate = new Date();
    var hours = currDate.getHours();
    var minutes = currDate.getMinutes();

    var am = true;
    if (format === 12) {
        if (hours > 12) {
            am = false;
            hours -= 12;
        } else if (hours === 12) {
            am = false;
        } else if (hours === 0) {
            hours = 12;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }

        var meridiem = "PM";
        if (am) {
            meridiem = "AM";
        }

        return hours + ':' + ("0" + minutes).slice(-2);
    } else {
        return ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2);
    }

}

export const formatBytes = (bytes, decimals) => {
    if (bytes === 0) return '0 Bytes';
    var k = 1000,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const shortenFileName = (n, len) => {
    var ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
    var filename = n.replace('.' + ext, '');
    if (filename.length <= len) {
        return n;
    }
    filename = filename.substr(0, len) + (n.length > len ? '[...]' : '');
    return filename + '.' + ext;
}

export const getProperSize = (orientation) => {
    let pageWidth = document.documentElement.clientWidth;
    let allowWidth = pageWidth * constants.ratio;//The perfect width the canvas should accommodate
    let baseSize = constants.canvasSize;
    let properSize = {
        ...baseSize
    };
    let convertRatio = allowWidth / baseSize.width;//The should-be ratio to convert from baseSize to allowSize
    properSize.width *= convertRatio;
    properSize.height *= convertRatio;
    if (orientation === constants.orientations.port) {
        properSize = {
            width: properSize.height,
            height: properSize.width
        }
    }

    return properSize;
}

export const getBaseSize = (orientation) => {
    let baseSize = constants.canvasSize;
    if (orientation === constants.orientations.port) {
        return {
            width: baseSize.height,
            height: baseSize.width
        }
    }

    return { ...baseSize };
}

export const getRatio = () => {
    let pageWidth = document.documentElement.clientWidth;
    let allowWidth = pageWidth * constants.ratio;//The perfect width the canvas should accommodate
    return allowWidth / constants.canvasSize.width;//The should-be ratio to convert from baseSize to allowSize
}
/**
 * @param string title the title of the notification
 * @param string message the message body
 * @param level Level of the notification. Available: success, error, warning and info
 * @param action the action 
 * @return object
 */
export const showMessage = (title, message, level = 'info', action = {}) => {
    const notificationOpts = {
        // uid: 'once-please', // you can specify your own uid if required
        title: title,
        message: message,
        position: 'tr',
        autoDismiss: 3
    };
    if (action.label !== undefined) {
        notificationOpts.action = action;
    }
    return Notifications.show(notificationOpts, level);
}

export const confirmAlert = (message) => {
    /* eslint-disable */
    return confirm(message);
    /* eslint-enable */
}