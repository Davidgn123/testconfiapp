import Menor from "../models/menor.model.js";
import Ruta from "../models/task.model.js ";



export const getMenores = async (req, res) => {
    try {
        const userId = req.user.id;
        const menores = await Menor.find({ tutor: userId });
        res.json(menores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const createMenor = async (req, res) => {
    try {
        const { nombres, apellidos, tipoIdentificacion, numeroIdentificacion, edad, telefono, correo } = req.body;
        const userId = req.user.id;
        const userName = req.user.nombres;

        const newMenor = new Menor({
            nombres,
            apellidos,
            tipoIdentificacion,
            numeroIdentificacion,
            edad,
            telefono,
            correo,
            tutor: userId,
            tutorNombre: userName
        });

        const savedMenor = await newMenor.save();
        res.status(201).json(savedMenor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getMenor = async (req, res) => {

    const menor = await Menor.findById(req.params.id)
    if (!menor) return res.status(404).json ({ message: 'Menor no encontrado'})
    res.json(menor)

};


export const updateMenor = async (req, res) => { 

    const menor = await Menor.findByIdAndDelete(req.params.id)
    if (!menor) return res.status(404).json ({ message: 'Menor no encontrado'})
    res.json(menor)

 };


export const deleteMenor = async (req, res) => {

    const menor = await Menor.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })
    if (!menor) return res.status(404).json ({ message: 'Menor no encontrado'})
    res.json(menor)

};


export const loginMenor = async (req, res) => {
    try {
      const { codigoMenor, idMenor } = req.body;
  
      // Buscar la ruta con el código proporcionado
      const ruta = await Ruta.findOne({ codigoMenor });
      if (!ruta) {
        return res.status(401).json({ message: "Código incorrecto o no tienes permiso para acceder a esta cuenta" });
      }
  
      // Buscar al menor asociado al tutor que creó la ruta
      const menor = await Menor.findById(idMenor);
      if (!menor) {
        return res.status(401).json({ message: "No se encontró al menor asociado con esta ruta" });
      }
  
      // Verificar si el tutor asociado a la ruta es el mismo que el tutor asociado al menor
      if (ruta.tutor.toString() !== menor.tutor.toString()) {
        return res.status(401).json({ message: "No tienes permiso para acceder a esta cuenta" });
      }
  
      // Si todo está correcto, enviar mensaje de inicio de sesión exitoso junto con los datos del menor y la ruta
      res.json({ message: "Inicio de sesión exitoso", menor, ruta });
    } catch (error) {
      // Si el ID del menor no es válido, devolver un mensaje de error 401
      if (error.name === "CastError") {
        return res.status(401).json({ message: "ID de menor no válido" });
      }
      
      console.error("Error en el controlador de inicio de sesión:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };