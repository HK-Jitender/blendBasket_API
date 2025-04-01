const express = require('express');
const authRoute = require('./authRoute');
const roleRoute = require('./roleRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    }, {
        path: '/role',
        route: roleRoute,
    },

];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
