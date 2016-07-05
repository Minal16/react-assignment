'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

if (process.env.PORT !== 'test') app.use((0, _morgan2.default)('short'));
app.use(_helmet2.default.hidePoweredBy({ setTo: 'JustForFun' }));
app.use((0, _compression2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, '../../public'), {
  dotfiles: 'ignore'
}));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile('index.html', { root: _path2.default.join(__dirname, '../../public/') });
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Production Express server running at localhost: ' + port); // eslint-disable-line
});