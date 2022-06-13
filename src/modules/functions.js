import { Tasks } from "./tasksFactory";
import { Projects } from "./projects"

let myProjects = []
let myLibrary = [];

function addNewProject(name, tasks) {
    let newProject = Projects(name, tasks)
    myProjects.push(newProject)
}

function addDefaultProject(name, tasks) {
    let newProject = Projects(name, tasks)
    myProjects.push(newProject)
}

const defaultProject = addDefaultProject('Default project', Tasks('Sport', 'Aller au sport','23/08/1993','High')) 

const defaultProjectTwo = addDefaultProject('Favorites', Tasks('Sport', 'Aller au sport','23/08/1993','High')) 

function addTaskToLibrary(title, description, dueDate, priority, project, notes) {
    let newTask = Tasks(title, description, dueDate, priority, project, notes);
    myLibrary.push(newTask)
}

function addTaskViaForm(title, description, dueDate, priority, project, notes) {

    let inputTitle = document.querySelector("#name")
    let inputDescription = document.querySelector("#description")
    let inputDueDate = document.querySelector("#due--date")
    let inputPriority = document.querySelector("#priority")
    let inputProject = document.querySelector("#project")
    let inputNotes = document.querySelector("#notes")

    let newTask = Tasks(
        inputTitle.value,
        inputDescription.value,
        inputDueDate.value,
        inputPriority.value,
        inputProject.value,
        inputNotes.value
    )

    myLibrary.push(newTask)
    console.log(myLibrary)
}

export {
    addTaskToLibrary,
    addTaskViaForm,
    addNewProject,
    myLibrary,
    myProjects
}