const Project = require('../models/Project')
const Team= require('../models/Team')

module.exports={
    createGet:(req,res)=>{
        res.render('project/createProject')
    },
    createPost:(req,res)=>{
        const reqObj =req.body

        Project.create({
            name:reqObj.name,
            description:reqObj.description,
            
        }).then((project)=>{
            res.redirect('/project/create')
        }).catch(err=>console.log(err)
        )

    },
    viewAdminProjects:async(req,res)=>{
        try {
            const projects=await Project.find({team:undefined})
            
            
            const teams = await Team.find({})
       
       
        res.render('project/adminProjects',{projects,teams})
        } catch (error) {
            console.log(error);
            
        }
       

        
        
    },
    viewAdminProjectsPost:(req,res)=>{
        const project= req.body.project
        const team= req.body.team
         Project.findById(project)
         .then(proj=>{
             console.log(proj);
             
             proj.team=team
             proj.save()
             Team.findById(team)
             .then(team=>{
                 team.projects.push(project)
                 team.save()
             res.redirect('/project/viewAdminProjects')

             })
            })
            .catch(err=>console.log(err)
            )
        
            
           
            
        
    },
    userProjects:(req,res)=>{
        Project.find({})
        .then(projects=>{
        res.render('users/projects',{projects})

        })

    }

}