// Task constructor : 
const Tasks = (title, description, dueDate, priority,project, notes) => {

  return {
    title : title,
    description : description,
    dueDate : dueDate,
    priority : priority,
    project : project,
    notes : notes,

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

    getNotes () {
        return this.notes
    },

    setNotes (newNotes) {
        this.notes = newNotes
    },
   }
}

export {Tasks}

