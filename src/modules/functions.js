import { Tasks } from "./tasksCreation";
import { Projects } from "./projects";
import { format, formatDistance, formatRelative, subDays, isToday } from 'date-fns'

let myProjects = []
let myLibrary = [];
let currentProject = ''
let currentDateFilter = ''
let currentProjectStatus = false
let currentDateStatus = false

function addNewProject(name, tasks) {
    let inputName = document.querySelector('#project--id')
    let newProject = Projects(
        inputName.value, 
        tasks)
        myProjects.push(newProject)
    currentProject = newProject.name
}

function addDefaultProject(name, tasks) {
    let newProject = Projects(name, tasks)
    myProjects.push(newProject)
}

const defaultProject = addDefaultProject('Default project', Tasks('Sport', 'Aller au sport','23/08/1993','High','false')) 

const defaultProjectTwo = addDefaultProject('Favorites', Tasks('Sport', 'Aller au sport','23/08/1993','High','false')) 

function addTaskToLibrary(title, description, dueDate, priority, project, status) {
    let newTask = Tasks(title, description, dueDate, priority, project, status);
    myLibrary.push(newTask)
}

function addTaskViaForm(title, description, dueDate, priority, project, status) {

    let inputTitle = document.querySelector("#name")
    let inputDescription = document.querySelector("#description")
    let inputDueDate = document.querySelector("#due--date")
    let inputPriority = document.querySelector("#priority")
    let inputProject = document.querySelector("#project")

    let newTask = Tasks(
        inputTitle.value,
        inputDescription.value,
        inputDueDate.value,
        inputPriority.value,
        inputProject.value,
    )

    myLibrary.push(newTask)
}

function filterTasksByProject (projectName) {
    const tasksFiltered = myLibrary.filter((task) => task.project === projectName
    )
    console.log(tasksFiltered)
}

function setCurrentProject (project) {
    return currentProject = project
}

function setcurrentProjectStatusTrue () {
    return currentProjectStatus = true
}

function setcurrentProjectStatusFalse () {
    return currentProjectStatus = false
}

function setCurrentDateFilter (dateFilter) {
    return currentDateFilter = dateFilter
}

function setcurrentDateStatusTrue () {
    return currentDateStatus = true
}

function setcurrentDateStatusFalse () {
    return currentDateStatus = false
}

export {
    addTaskToLibrary,
    addTaskViaForm,
    addNewProject,
    filterTasksByProject,
    setCurrentProject,
    setcurrentProjectStatusFalse,
    setcurrentProjectStatusTrue,
    setcurrentDateStatusFalse,
    setcurrentDateStatusTrue,
    setCurrentDateFilter,
    myLibrary,
    myProjects,
    currentProject,
    currentDateFilter,
    currentProjectStatus,
    currentDateStatus
}