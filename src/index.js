import './index.less';
import 'whatwg-fetch';

const constants = require('./constants.js');

fetch(constants[window.__pageGuid__].url).then((response) => {
    console.log(response);
}).catch((e) => {
    console.log(e);
})