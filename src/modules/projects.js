// Task constructor :
const Projects = (name, tasks) => ({
  name,
  tasks: [tasks],

  // functions of project:
  setName(newName) {
    this.name = newName;
  },

  getName() {
    return this.name;
  },

  setTasks(newTasks) {
    this.tasks = newTasks;
  },

  getTasks() {
    return this.tasks;
  },
});

export default Projects;
