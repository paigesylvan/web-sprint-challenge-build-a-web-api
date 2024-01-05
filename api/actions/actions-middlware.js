const Actions = require("./actions-model");

const checkActionId = async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "Action not found",
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkNewAction = (req, res, next) => {
  const { notes, description, project_id } = req.body;
  if (!notes || !description || project_id === undefined) {
    res.status(400).json({
      message: "notes, description and project_id are required",
    });
  } else {
    next();
  }
};

module.exports = { checkActionId, checkNewAction };