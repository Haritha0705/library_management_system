const authenticate = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) return next();
    res.send("<h4>User is not authenticated on the server 👎🏽</h4>");
};

export { authenticate };
