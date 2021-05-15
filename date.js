
module.exports.getDate = function () {
    const today = new Date();
    params = { weekday: 'long', day: 'numeric', month: 'long' };
    return today.toLocaleDateString('en-us', params);
};

// It's okey to exclude module. and just to use exports  aswell
exports.getDay = function () {
    const today = new Date();
    params = { weekday: 'long' };
    return today.toLocaleDateString('en-us', params);
};