// Task constructor : 
const Projects = (name, tasks) => {

    return {
      name : name,
      tasks : [tasks],
  
      // functions of project:
      setName (newName) {
          this.name = newName
      },
  
      getName () {
          return this.name
      },
  
      setTasks (tasks) {
          this.tasks = tasks
      },
  
      getTasks () {
          return this.tasks
      },
     }
  }
  
  export {Projects}
  
  