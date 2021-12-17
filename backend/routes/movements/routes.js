const router = require("express").Router();
const movementTypes = require("../../constants/movementTypes.js");
const { Movement } = require("../../db.js");

router.get("/", (req, res) => {
    Movement.findAll(
            {
                limit: 10 ,
                order: [
                    ['id', 'DESC'],
                ],
            }
        ).then(movements => {
        res.send(JSON.stringify({ movements }));
    });
});

router.get("/get/:id", (req, res) => {
    const id = req.params.id;
    Movement.findOne(
            {
                where: { id: id }
            }
        ).then(movement => {
        res.send(JSON.stringify({ movement }));
    });
});

router.get("/all", (req, res) => {
    Movement.findAll(
            {
                order: [
                    ['id', 'DESC'],
                ],
            }
        ).then(movements => {
        res.send(JSON.stringify({ movements }));
    });
});

router.get("/balance", (req, res) => {
    Movement.findAll().then(movements => {
        let balance = 0;
        movements.map(movement => {
            balance = (movement.type === movementTypes.CREDIT) ? balance += movement.amount : balance -= movement.amount;
        });
        
        res.send(JSON.stringify({ balance }));
    });
});

// Me dió un error con el CORS al querer utilizar un tipo de ruta DELETE, seguí adelante con el POST para no complicarla.
router.post("/delete", (req, res) => {
    const id = req.body.id;

    Movement.destroy({ where: { id }}).then(result => {
        const message = result ? "Movimiento eliminado." : "El movimiento no existe.";
        res.send(JSON.stringify({ result, message }));
    }).catch(error => {
        const message = "Ocurrió un error al eliminar el movimiento.";
        res.send(JSON.stringify({ error, message }));
    });
});

router.post("/add", (req, res) => {
    const { concept, amount, type } = req.body;

    if(concept === "" ||  amount === "" || type === ""){
        res.send(JSON.stringify({ message: "No se admiten campos vacíos" }));
    }else{
        Movement.create({ concept, amount, type }).then(result => {
            const message = result ? "Movimiento creado con éxito." : "Ocurrió un error al crear el movimiento.";
            res.send(JSON.stringify({ result, message }));
        }).catch(error => {
            const message = "Ocurrió un error al crear el movimiento.";
            res.send(JSON.stringify({ error, message }));
        });
    }
});

router.post("/edit", (req, res) => {
    const { concept, amount, id } = req.body;
    if(concept === "" ||  amount === "" || id === ""){
        res.send(JSON.stringify({ message: "No se admiten campos vacíos" }));
    }else{
        Movement.update(
            { concept: concept, amount: amount },
            { where: {id: id} }
        ).then(result => {
            const message = result ? "Movimiento modificado con éxito." : "Ocurrió un error al modificar el movimiento.";
            res.send(JSON.stringify({ result, message }));
        }).catch(error => {
            const message = "Ocurrió un error al modificar el movimiento.";
            res.send(JSON.stringify({ error, message }));
        });
    }
});

module.exports = router;