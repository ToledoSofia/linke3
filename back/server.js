    const express = require('express');
    const bodyParser = require('body-parser');
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');
    const fs = require('fs');
    const https = require('https'); 
    const http = require('http');
    const path = require('path');
    const cors = require('cors'); 

    const { Musico, Grupos, Instrumento, MusicoInstrumento } = require('./models');
    const Publicacion = require('./models/publicacion');
    const sequelize = require('./config/database');

    const GruposMusicos = require('./models/gruposMusicos');
    const Rol = require('./models/rol');
    const { Sequelize, DataTypes } = require('sequelize');
    let instrumentos = [];

    const app = express();
    
    // const keyPath = path.join(__dirname, './server.key'); 
    // const certPath = path.join(__dirname, './server.cert'); 
    // const options = {
    //     key: fs.readFileSync(keyPath),
    //     cert: fs.readFileSync(certPath)
    // };

    // https.createServer(options, app).listen(3001, () => {
    //     console.log('Servidor HTTPS corriendo en https://localhost:3001');
    // });

    
    // http.createServer((req, res) => {
    //     res.writeHead(301, { "Location": "https://" + req.headers['host'].replace(/:\d+$/, ':3001') + req.url });
    //     res.end();
    // }).listen(8080, () => {
    //     console.log('Servidor HTTP redirigiendo a HTTPS en http://localhost:8080');
    // });

    app.use(cors());

    
    app.use(bodyParser.json());

 
    const crypto = require('crypto');
    const SECRET_KEY = crypto.randomBytes(64).toString('hex');


    sequelize.authenticate()
        .then(() => console.log('Conectado a la base de datos.'))
        .catch(err => console.error('Error al conectar a la base de datos:', err));

    sequelize.sync()
        .then(() => console.log('Modelo de usuario sincronizado con la base de datos.'));



    app.post('/register', async (req, res) => {
        const { nombre, apellido, usuario, contrasena, ubicacion } = req.body;
    
        try {
            const existingUser = await Musico.findOne({ where: { usuario } });
    
            if (existingUser) {
                return res.status(400).json({ error: 'El usuario ya existe.' });
            }
    
            const hashedPassword = bcrypt.hashSync(contrasena, 8);
    
            const newMusico = await Musico.create({
                nombre,
                apellido,
                usuario,
                contrasena: hashedPassword,
                ubicacion,
            });
    
            const token = jwt.sign({ id: newMusico.idMusico }, SECRET_KEY, {
                expiresIn: 86400, // 24 horas
            });
    
            res.status(201).send({ auth: true, token });
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).send('Hubo un problema al registrar el usuario.');
        }
    });
 
    app.get('/api/instrumentos', async (req, res) => {
        try {
            const instrumentos = await Instrumento.findAll({
                attributes: ['idInstrumento', 'nombre']
            });
    
            res.status(200).json(instrumentos); 
        } catch (error) {
            console.error('Error al obtener los instrumentos:', error);
            res.status(500).json({ error: 'Hubo un problema al obtener los instrumentos.' });
        }
    });
    app.get('/musico/:id/instrumentos2', async (req, res) => {
        const musicoId = req.params.id;
    
        try {
            const musico = await Musico.findOne({
                where: { idMusico: musicoId },
                include: {
                    model: Instrumento,
                    through: { attributes: [] },
                    attributes: ['idInstrumento', 'nombre', 'tipo_instrumento'], // Agrega más atributos si es necesario
                }
            });
    
            if (!musico) {
                return res.status(404).json({ message: 'Músico no encontrado.' });
            }
    
            // Devuelves los instrumentos completos, no solo los nombres
            res.status(200).json({ instrumentos: musico.Instrumentos });
        } catch (error) {
            console.error('Error al obtener los instrumentos del músico:', error);
            res.status(500).json({ error: 'Hubo un problema al obtener los instrumentos del músico.' });
        }
    });
    
    app.delete('/musico/:idMusico/instrumentos/:idInstrumento', async (req, res) => {
        const { idMusico, idInstrumento } = req.params;  // Extraer los parámetros del ID del músico e instrumento
    
        try {
            // Buscar la relación entre el músico y el instrumento en la tabla de asociación
            const relacion = await MusicoInstrumento.findOne({
                where: {
                    Musico_idMusico: idMusico,
                    Instrumento_idInstrumento: idInstrumento
                }
            });
    
            if (!relacion) {
                return res.status(404).json({ message: 'Relación no encontrada.' });
            }
    
            // Eliminar la relación
            await relacion.destroy();
    
            res.status(200).json({ message: 'Relación eliminada correctamente.' });
        } catch (error) {
            console.error('Error al eliminar la relación:', error);
            res.status(500).json({ error: 'Hubo un problema al eliminar la relación.' });
        }
    });
    
    
    app.get('/musico/:id/instrumentos', async (req, res) => {
        const musicoId = req.params.id;
        instrumentos = [];
        try {
            const musico = await Musico.findOne({
                where: { idMusico: musicoId },
                include: {
                    model: Instrumento,
                    through: { attributes: [] },
                    attributes: ['nombre'],
                }
            });
            
            if (!musico) {
                return res.status(404).json({ message: 'Músico no encontrado.' });
            }
    
            instrumentos = musico.Instrumentos.map(inst => inst.nombre);
            
            res.status(200).json({ instrumentos });
        } catch (error) {
            console.error('Error al obtener los instrumentos del músico:', error);
            res.status(500).json({ error: 'Hubo un problema al obtener los instrumentos del músico.' });
        }
    });
    
    app.get('/musico/:id/grupos', async (req, res) => {
        const musicoId = req.params.id;
    
        try {
            const musico = await Musico.findOne({
                where: { idMusico: musicoId },
                include: [{
                    model: Grupos,
                    attributes: ['idGrupos', 'nombre', 'descripcion', 'ubicacion'],
                    through: { attributes: ['activo'] }, // Incluir el campo 'activo'
                }],
            });
    
            if (!musico) {
                return res.status(404).json({ message: 'Músico no encontrado.' });
            }
    
            res.status(200).json(musico.Grupos);
        } catch (error) {
            console.error('Error al obtener los grupos del músico:', error);
            res.status(500).json({ error: 'Hubo un problema al obtener los grupos del músico.' });
        }
    });
    
    app.post('/instrumentos', async (req, res) => {
        const { nombre } = req.body;
      
        if (!nombre) {
          return res.status(400).json({ error: 'El nombre del instrumento es obligatorio' });
        }
      
        try {
          const instrumento = await Instrumento.create({ nombre });
          res.json(instrumento);
        } catch (error) {
          res.status(500).json({ error: 'Error al agregar el instrumento' });
        }
      });

app.post('/musico/:idMusico/instrumentos', async (req, res) => {
  const { idMusico } = req.params;
  const {idInstrumento} = req.body;


  try {
    // Validar entrada
    if (!idInstrumento) {
      return res.status(400).json({ error: 'idInstrumento es requerido' });
    }

    // Busca el músico
    const musico = await Musico.findByPk(idMusico);
    console.log("MUSICO", musico);
    if (!musico) {
      return res.status(404).json({ error: 'Músico no encontrado' });
    }

    // Agrega el instrumento al músico
    const instrumento = await Instrumento.findByPk(idInstrumento);
    console.log("INST", instrumento);
    if (!instrumento) {
      return res.status(404).json({ error: 'Instrumento no encontrado' });
    }

    await MusicoInstrumento.create({
        Musico_idMusico: idMusico,
        Instrumento_idInstrumento: idInstrumento
      });
  

    // Confirmar asociación
    res.status(201).json({ message: 'Instrumento asociado correctamente' });
  } catch (error) {
    console.error('Error al asociar instrumento:', error.message);
    res.status(500).json({ error: 'Error al asociar instrumento', details: error.message });
  }
});

    

app.get('/check-user-exists', async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'El nombre de usuario es requerido.' });
    }

    try {
        const user = await Musico.findOne({ where: { usuario: username } });

        if (user) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        res.status(500).json({ error: 'Hubo un problema al verificar el usuario.' });
    }
});


    function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (token == null) return res.status(401).send('No token provided.');

        jwt.verify(token, SECRET_KEY, (err, musico) => {
            if (err) return res.status(403).send('Token invalid.');
            console.log("MUSICPOOOOOOOOOOOOOOOOO", musico);
            req.musico = musico;
            next();
        });
    }



    app.get('/musico/:id', async (req, res) => {
        const musicoId = req.params.id;
        
        try {
            const musico = await Musico.findOne({ where: { idMusico: musicoId } });
            
            if (!musico) {
                return res.status(404).send('Musico no encontrado.');
            }
            
            res.status(200).send(musico);
        } catch (error) {
            console.error('Error al obtener los datos del musico:', error);
            res.status(500).send('Hubo un problema al obtener los datos del musico.');
        }
    });

    app.get('/api/musicos', async (req, res) => {
        try {
            const musicos = await Musico.findAll(); 
            res.status(200).json(musicos);
        } catch (error) {
            console.error('Error al obtener los músicos:', error);
            res.status(500).json({ error: 'Hubo un problema al obtener los músicos.' });
        }
    });

    app.post('/login', async (req, res) => {
        const { username, password } = req.body;

        let usuario = username;
        const user = await Musico.findOne({ where: { usuario } });

        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(404).send('Usuario no encontrado.');
        }

        const passwordIsValid = bcrypt.compareSync(password, user.contrasena);

        if (!passwordIsValid) {
            console.log('Contraseña incorrecta');
            return res.status(401).send({ auth: false, token: null });
        }

        const token = jwt.sign({ id: user.idMusico }, SECRET_KEY, { expiresIn: 86400 });

        console.log('Login exitoso');
        res.status(200).send({ auth: true, token });
    });


    app.get('/protected', (req, res) => {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(403).send({ message: 'No token provided' });
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(500).send({ message: 'Failed to authenticate token' });
            }

            res.status(200).send({ message: `Hello ${decoded.usuario}` });
        });
    });
    app.post('/crearGrupoConMusico', authenticateToken, async (req, res) => {
        const { nombreGrupo, descripcion, ubicacion, fechaCreacion, rol, instrumentoId } = req.body;
    
        try {
            const musicoId = req.musico.id;
    
            await sequelize.transaction(async (transaction) => {
                const nuevoGrupo = await Grupos.create({
                    nombre: nombreGrupo,
                    descripcion: descripcion,
                    fecha_creacion: fechaCreacion,
                    ubicacion: ubicacion,
                    contrasena: 'hashed_password'  
                }, { transaction });
    
                const asociacion = await GruposMusicos.create({
                    Grupos_idGrupos: nuevoGrupo.idGrupos,
                    Musico_idMusico: musicoId,
                    activo: 1
                }, { transaction });
    
                const instrumento = await Instrumento.findByPk(instrumentoId, { transaction });
    
                if (!instrumento) {
                    throw new Error(`Instrumento con ID ${instrumentoId} no encontrado`);
                }
    
                await Rol.create({
                    Instrumento_idInstrumento: instrumentoId,
                    grupos_musicos_idAsociacion: asociacion.idAsociacion,
                }, { transaction });
    
            });
    
            res.status(201).send({ message: "Grupo, asociación y rol creados correctamente" });
        } catch (error) {
            console.error("Error al crear grupo y rol:", error);
            res.status(500).send({ error: "Error al crear grupo y asignar rol" });
        }
    });
    
      
    
    

    app.get('/users', async (req, res) => {
        try {
            users = await Musico.findAll();

            const userArray = users.map(musico => musico.toJSON());

            res.status(200).json(userArray);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).send('Hubo un problema al obtener los usuarios.');
        }
    });

    app.get('/api/data', (req, res) => {
    res.json({ message: 'Conectado al back' });
    });



app.get('/user/me', authenticateToken, async (req, res) => {
    const musicoId = req.musico.id;
    
    try {
        const musico = await Musico.findOne({ where: { idMusico: musicoId } });
        
        if (!musico) {
            return res.status(404).send('Musico no encontrado.');
        }
        
        res.status(200).send(musico);
    } catch (error) {
        console.error('Error al obtener los datos del musico:', error);
        res.status(500).send('Hubo un problema al obtener los datos del musico.');
    }
});

app.delete('/user/delete', authenticateToken, async (req, res) => {
    const musicoId = req.musico.id;
    
    try {
        const musico = await Musico.findOne({ where: { idMusico: musicoId } });
    
        if (!musico) {
            return res.status(404).json({ message: 'Musico no encontrado.' });
        }
    
        await Musico.destroy({ where: { idMusico: musicoId } });
    
        res.status(200).json({ message: 'Musico eliminado con éxito.' });
    } catch (error) {
        console.error('Error al eliminar el musico:', error);
        res.status(500).json({ message: 'Hubo un problema al eliminar el musico.' });
    }
});


app.put('/user/update', authenticateToken, async (req, res) => {
    const musicoId = req.musico.id;
    const { nombre, apellido, ubicacion, descripcion, foto_perfil, foto_portada } = req.body;

    try {
        const [updated] = await Musico.update(
            { nombre, apellido, ubicacion, descripcion, foto_perfil, foto_portada },
            { where: { idMusico: musicoId } }
        );

        if (updated) {
            const updatedMusico = await Musico.findOne({ where: { idMusico: musicoId } });
            res.status(200).json(updatedMusico); 
        } else {
            res.status(404).json({ error: 'Musico no encontrado.' }); // Devuelve JSON válido
        }
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).json({ error: 'Hubo un problema al actualizar el perfil.' }); // Devuelve JSON válido
    }
});


    
app.get('/publicaciones', async (req, res) => {
    try {
        const publicaciones = await Publicacion.findAll({
            include: [
                {
                    model: Grupos,
                    attributes: ['nombre', 'descripcion', 'ubicacion'],
                },
                {
                    model: Musico,
                    attributes: ['nombre', 'apellido', 'ubicacion'],
                }
            ]
        });
        res.status(200).json(publicaciones);
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).json({ error: 'Hubo un problema al obtener las publicaciones.' });
    }
});


    //arrancar server
     const PORT = process.env.PORT || 3000;
     app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
     });
     // Uso de rutas
// app.use('/api', routes);

// // Sincronización de la base de datos
// sequelize.authenticate()
//     .then(() => console.log('Conectado a la base de datos.'))
//     .catch(err => console.error('Error al conectar a la base de datos:', err));

// sequelize.sync()
//     .then(() => console.log('Modelo de usuario sincronizado con la base de datos.'));

// // Configuración del puerto y arranque del servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });