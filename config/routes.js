const controllers = require('../controllers');

const auth=require('./auth')
module.exports = app => {
    app.get('/',auth.isAnonymous, controllers.home.index);
    app.get('/users/register',auth.isAnonymous, controllers.user.registerGet);
    app.post('/users/register',auth.isAnonymous, controllers.user.registerPost);
    app.post('/logout',auth.isAuthed, controllers.user.logout);
    app.get('/users/login',auth.isAnonymous, controllers.user.loginGet);
    app.post('/users/login',auth.isAnonymous, controllers.user.loginPost);
    app.get('/users/profile',controllers.user.profile)


    app.get('/team/create',auth.hasRole('Admin'), controllers.team.createGet)
    app.post('/team/create',auth.hasRole('Admin'), controllers.team.createTeam)
    app.get('/team/viewAdminTeams',auth.hasRole('Admin'), controllers.team.viewAdminTeams)
    app.post('/team/viewAdminTeams',auth.hasRole('Admin'), controllers.team.viewAdminTeamsPost)
    app.get('/team/userTeams',auth.isAuthed,controllers.team.teamOfUser)


    app.get('/project/create',auth.hasRole('Admin'), controllers.project.createGet)
    app.post('/project/create',auth.hasRole('Admin'), controllers.project.createPost)
    app.get('/project/viewAdminProjects',auth.hasRole('Admin'), controllers.project.viewAdminProjects)
    app.post('/project/viewAdminProjects',auth.hasRole('Admin'), controllers.project.viewAdminProjectsPost)
    app.get('/project/userProjects',auth.isAuthed,controllers.project.userProjects)

    

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};