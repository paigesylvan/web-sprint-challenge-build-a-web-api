// Write your "actions" router here!
const express = require("express");
const { checkActionId, checkNewAction } = require("./actions-middlware");
const Actions = require("./actions-model")

const router = express.Router();

router.get("/", (req,res,next) => {
    Actions.get()
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch(next)
});

router.get("/:id", checkActionId, (req, res, next) => {
    Actions.get(req.params.id)
    .then((action) => {
        if (!action) {
            res.status(404).json({
                message: "Action not found",
            });
        } else {
            res.json(action);
        }
    })
    .catch(next);
})

router.put("/:id", checkActionId, checkNewAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then((updatedAction) => {
            res.status(200).json(updatedAction);
        })
        .catch(next);
})

router.delete("/:id", checkActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Action deleted"});
        })
        .catch(next);
})

module.exports = router