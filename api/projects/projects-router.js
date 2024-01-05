const express = require("express");
const { checkProjectId, checkNewProject } = require("./projects-middleware");
const Projects = require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", checkProjectId, (req, res, next) => {
  res.json(req.project);
});

router.post("/", checkNewProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put("/:id", checkProjectId, checkNewProject, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch(next);
});

router.delete("/:id", checkProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Project deleted" });
    })
    .catch(next);
});

router.get("/:id/actions", checkProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: "Something bad happened in the projects router",
    errMessage: err.message,
    stack: err.stack,
  });
});

module.exports = router;