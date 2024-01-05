const Projects = require("./projects-model");

const checkProjectId = async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkNewProject = (req, res, next) => {
  const { name, description, completed } = req.body;
  if (!name || !description || completed === undefined) {
    res.status(400).json({
      message: "Project name and description are required",
    });
  } else {
    next();
  }
};

module.exports = { checkProjectId, checkNewProject };