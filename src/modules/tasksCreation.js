// Task constructor : 
const Tasks = (title, description, dueDate, priority,project, status = 'false') => {

  return {
    title : title,
    description : description,
    dueDate : dueDate,
    priority : priority,
    project : project,
    status : status,

    // functions of task :
    setTitle (newTitle) {
        this.title = newTitle
    },

    getTitle () {
        return this.title
    },

    getDescription () {
        return this.description
    },

    setDescription (newDesc) {
        this.description = newDesc
    },

    getDueDate () {
        return this.dueDate
    },

    setDueDate (newDate) {
        this.dueDate = newDate
    },

    getPriority () {
        return this.priority
    },

    setPriority (newPriority) {
        this.priority = newPriority
    },

    getStatus () {
        return this.status
    },

    toggleStatus () {
        if (this.status === 'false') {
            this.status = 'true'
        } else if (this.status === 'true'){
            this.status = 'false'
        }
    },
   }
}

export {Tasks}

