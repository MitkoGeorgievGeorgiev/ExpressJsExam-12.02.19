module.exports = {
    isAuthed: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    },
    hasRole: (role) => (req, res, next) => {
        if (req.isAuthenticated() &&
            req.user.roles.indexOf(role) > -1) {
            next();
        } else {
            res.redirect('/login');
        }
<<<<<<< HEAD
    },isAnonymous: (req, res, next) => {
=======
    },
	isAnonymous: (req, res, next) => {
>>>>>>> 83f322e76846d876d027c9aeb8528d0a7f06b301
        if (!req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    }
}