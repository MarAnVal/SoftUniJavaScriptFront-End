function solve(drivingSpeed, area) {
    let speedLimit = getSpeedLimitBasedOnAra(area);

    let speedOverLimit = drivingSpeed - speedLimit;

    if (speedOverLimit <= 0) {
        return console.log(`Driving ${drivingSpeed} km/h in a ${speedLimit} zone`)
    }

    let status;

    if (speedOverLimit > 40) {
        status = 'reckless driving';
    } else if (speedOverLimit > 20) {
        status = 'excessive speeding';
    } else {
        status = 'speeding'
    }

    console.log(`The speed is ${speedOverLimit} km/h faster than the allowed speed of ${speedLimit} - ${status}`);

    function getSpeedLimitBasedOnAra(area) {
        switch (area) {
            case 'motorway':
                return 130;
            case 'interstate':
                return 90;
            case 'city':
                return 50;
            case 'residential':
                return 20;
        }
    }
}