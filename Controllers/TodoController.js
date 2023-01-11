const TodoModel =require('../Models/TodoModel');

// CREATE TODO 
const createTodo =async(req,res)=>{
    let {title,description}=req.body;
    if(!title || !description){
        res.status(400).json({status:"Please fill in the gaps"})
    }
    try {
        const todoitem = await TodoModel.create({
            user:req.user.id,
            title,
            description,
        })
        res.status(400).json(todoitem)
    } catch (error) {
        console.log(error)
    }
};

// GET TODO DATA
const getTodos =async(req,res)=>{
    const todo = await TodoModel.find({user:req.user.id}).sort("-createdAt");
    res.status(200).json(todo)
};

// GET USER TODO BY ID 
const getTodoById =async(req,res)=>{
    try {
    const todo =await TodoModel.findById(req.params.id);
    console.log(todo)
    // if todo doesn't exit
    if(!todo){
      res.status(400);
      throw new Error("todo not found");
    };
    // match product to its user
    if(todo.user.toString() !== req.user.id){
      res.status(401);
      throw new Error("user not authorized");
    };
    res.status(200).json({status:"Single todo data get success",data:todo});
    } catch (error) {
        console.log(error);
    };
};

// UPDATE USER TODO DATA
const updateTodo =async(req,res)=>{
    try {
        let reqBody = req.body;
        let title = reqBody['title'];
        let description = reqBody['description'];
        let id = req.params.id;
        let updatedAt = Date.now();
        let updataed = {
            title:title,
            description:description,
            updatedAt:updatedAt
        };
        TodoModel.updateOne({_id:id},{$set:updataed},{$upset:true},(error,data)=>{
            if(error){
                res.status(401).json({status:"Todo update fail", data: error});
            }else{
                res.status(200).json({status:"Todo update successfully", data: data});
            };
        })
    } catch (error) {
        console.log(error);
    };
};

// DELETE USER TODO DATA
const deleteTodo = async(req,res)=>{
    try {
        let id = req.params.id;
        await TodoModel.remove({_id:id},(error,data)=>{
            if(error){
                res.status(401).json({status:"Todo remove fail", data: error});
            }else{
                res.status(200).json({status:"Todo remove successfully", data: data});
            };
        });
    } catch (error) {
        console.log(error);
    };
};


module.exports ={
    createTodo,
    getTodoById,
    deleteTodo,
    updateTodo,
    getTodos,
}