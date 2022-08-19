//--Mandatory Field Validation
    const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
    }

//--time validation
    const isValidTime = function(time){
        let timeRegex = /^\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/
        return timeRegex.test(time);
    }

module.exports = { isValid, isValidTime };