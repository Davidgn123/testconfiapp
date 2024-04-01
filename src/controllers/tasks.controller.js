
import Task from "../models/task.model.js";
import { v4 as uuidv4 } from 'uuid'; 



export const getTasks = async (req, res) =>{
  
    try {
        // Obtén el ID del tutor autenticado desde req.user.id
        const tutorId = req.user.id;
    
        // Busca solo las tareas creadas por el tutor actual
        const tasks = await Task.find({ tutor: tutorId });
    
        res.json(tasks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    
    //const tasks = await Task.find()
    //res.json(tasks)
};

export const createTask = async (req, res) =>{
    //const {fechaRuta, puntoSalida, geosalida, puntoLlegada,  geollegada, tiempoEstimado, estado, medioTransporte} = req.body;
    const { menorImage, menorName, estimadoRuta, inicioRuta, destinoRuta, numeroRuta, horaRuta} = req.body;
   
    console.log(req.user)
    try {

        const newTask = new Task({
        codigoMenor: uuidv4(),
        tutor: req.user.id,  // Asignamos el ID del usuario actual como el tutor de la ruta    
        menorImage,
        menorName,
        estimadoRuta,
        inicioRuta,
        destinoRuta,
        numeroRuta,
        horaRuta,
        user: req.user.id,
        // fechaRuta,
        // puntoSalida,
        // puntoLlegada,
        // geosalida,
        // geollegada,
        // tiempoEstimado,
        // estado,
        // medioTransporte,
        //user:req.user.id
        
        
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
} catch(error){
    console.error(error);
    res.status(500).json({ message: "Error al crear la tarea", error});
}

    
};

export const getTask = async (req, res) =>{

   const task = await Task.findById(req.params.id)
   if(!task) return res.status(404).json({message: 'Task not found'})
   res.json(task) 
};

export const deleteTask = async (req, res) =>{
  
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: 'Task not found'})
    res.json(task) 

};

export const updateTask = async (req, res) =>{

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!task) return res.status(404).json({message: 'Task not found'})
    res.json(task) 

};
