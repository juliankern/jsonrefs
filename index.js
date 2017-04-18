var _ = require('lodash');
var path = require('path');
var objpath = require('objectpathlist');

module.exports = {
    parse: function(data) {
        var pathlist = objpath.toPathlist(data);

        for(var key in pathlist) {
            var newkey;
            var newpathlist = {};

            if (
                key.includes('_ref') &&
                key.split('.').indexOf('_ref') === key.split('.').length - 1 &&// last position
                !_.isObject(pathlist[key]) && 
                pathlist[key].includes('.json')
            ) {
                newkey = key.split('.');
                newkey.splice(-1);
                newkey = newkey.join('.');

                newpathlist[newkey] = loadJson(pathlist[key]);
                newpathlist[newkey]._oldref = pathlist[key];
                delete pathlist[key];

                _.assign(pathlist, objpath.toPathlist(newpathlist));
            }
        }

        return objpath.toObject(pathlist);
    }
}

function loadJson(file) {
    return require(path.normalize(path.join(__dirname, file)));
}
