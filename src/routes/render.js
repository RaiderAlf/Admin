//DEPENDENCIES
const { Router } = require('express');
const router = Router();

router.get("/", (req, res) => {
    res.render('index', {titulo: '<h1>Inicio con HBS</h1>'})
  });
  
  router.get("/equipo", (req, res) => {
      res.render('equipo', {
          equipo: [
              {
                  id: 1,
                  nombre: 'Juanito',
                  habilidad: ['Javascript', 'Node.js']
              },
              {
                  id: 2,
                  nombre: 'Pedrito',
                  habilidad: ['Php', 'Laravel']
              }
          ]
      })
  });
  
  router.get('/service', (req, res) => {
      res.render('service', {
          servicio: {
              estado: false,
              nombre: 'Servicio de programación'
          }
      })
  })
  
  router.use((req, res, next) => {
      res.status(404).render("404", {
          titulo: "404",
          descripcion: "Página no encontrada"
      })
  })

module.exports = router;