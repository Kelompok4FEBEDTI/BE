const  memberparkir  = require('../models/memberparkir')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
    const token = req.headers.token

    console.log(token)
    try {
      if (!token) {
        throw { name: 'Not Authenticate' }
      } else {
        const payload = verifyToken(token)
        const user = await memberparkir.findById(payload.memberId)
        if (!user) {
          throw { name: 'Email not valid' }
        } else {
          console.log(user)
          req.userLogin = user
          next()
        }
      }
    } catch (err) {
      next({
        name: err.name
      })
    } 
    
}



async function isOwner(req,res,next){
    const taskId = req.params.id

    try{
        const task = await Task.findByPk(taskId)
        if(!task){
            throw { name: 'Task not found' }
        } else {
            if(task.UserId !== req.userLogin.id){
                throw { name: 'Not Authorized'}
            } else {
                next()
            }
        }
    } catch(err){
        next({
            name: err.name
        })
    }
    

}

module.exports = {
    authentication,
    isOwner
}