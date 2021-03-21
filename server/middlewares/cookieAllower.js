// module.exports = function () {
//     return (req, res, next) => {
//         res.header('Access-Control-Allow-Credentials', true);
//         res.header('Access-Control-Allow-Origin', req.headers.origin);
//         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
//         res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//         res.header('SameSite', 'None');
//         res.header('Secure', true);
//         next();
//     }
// }