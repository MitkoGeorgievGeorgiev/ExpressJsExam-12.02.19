const Team= require('../models/Team')
const User =require('../models/User')
module.exports={
    createGet:(req,res)=>{
    res.render('team/createTeam')
    },
    createTeam:async (req,res)=>{
        const reqObj= req.body
        console.log(reqObj);
        try {
             const team= await Team.create({
                name:reqObj.teamName,
                projects:[],
                members:[]
            })
            res.redirect('/')
        } catch (error) {
            console.log(error);
            
        }
   
    },

    viewAdminTeams:async (req,res)=>{
        try {
           const teams=await Team.find({})
           const users= await User.find({})
        res.render('team/viewAdminTeams',{teams,users})
        } catch (error) {
            console.log(error);
            
        }
        

        
    },
    viewAdminTeamsPost:async(req,res)=>{
        const team = req.body.team
        const user= req.body.user
        console.log(team,user);
        
        try {
        const currentTeam= await Team.findById(team)
        console.log(currentTeam);
        
        currentTeam.members.push(user)
        currentTeam.save()
        const currentUser = await User.findById(user).where('team').ne('user')
            console.log(currentUser);
            
        currentUser.teams.push(team)
        currentUser.save()
            res.redirect('/team/viewAdminTeams')
            
        } catch (error) {
            console.log(error);
            
        }
    },
    teamOfUser:async(req,res)=>{
       const teams=await Team.find({}).populate('members').populate('projects')
        

            
            res.render('users/teams',{teams})

            
       
    }
}