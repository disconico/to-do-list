import { Tasks } from "./tasksCreation";
import { Projects } from "./projects";
import { format, formatDistance, formatRelative, subDays, isToday } from 'date-fns'

let myProjects = []
let myLibrary = [];
let currentProject = ''
let currentDateFilter = ''
let currentProjectStatus = false
let currentDateStatus = false

//Setting library to be stored in local storage
function storeTasks() {
    let jsonTasks = JSON.stringify(myLibrary)
    localStorage.setItem(`myTasks`, jsonTasks);
}

function storeProjects() {
    let jsonProjects = JSON.stringify(myProjects)
    localStorage.setItem(`myProjects`, jsonProjects)
}

//Check storage and restore
function restoreTasks() {
    let tasksFromStorage = localStorage.getItem('myTasks')
    let parsedTasks = ''

    function checkLocalStorageTasks() {
        if (tasksFromStorage === null) {
            parsedTasks = JSON.parse(tasksFromStorage)
            return parsedTasks
        } else {
            parsedTasks = Array.from(JSON.parse(tasksFromStorage));
            return parsedTasks
        }
    }
    checkLocalStorageTasks()

    if (tasksFromStorage === null || parsedTasks.length === 0) {
        return
    } else {
        parsedTasks.forEach((task) => {
            addTaskFromStorage(task.title, task.description, task.dueDate, task.priority, task.project, task.status)
        })
        return myLibrary
    }
}

function restoreProjects() {
    let projectsFromStorage = localStorage.getItem('myProjects')
    let parsedProjects = ''

    function checkLocalStorageProjects () {
        if (projectsFromStorage === null) {
            parsedProjects = JSON.parse(projectsFromStorage)
            return parsedProjects
        } else {
            parsedProjects = Array.from(parsedProjects = JSON.parse(projectsFromStorage))
            return parsedProjects
        }
    }

    checkLocalStorageProjects()

    if (projectsFromStorage === null || parsedProjects.length === 0) {
        return
    } else {
        parsedProjects.forEach((project) => {
            addProjectFromStorage(project.name, project.tasks)
        })
        return myProjects
    }
}

function cleanStorage() {
    localStorage.clear()
}

function addNewProject(name, tasks) {
    let inputName = document.querySelector('#project--id')
    let newProject = Projects(
        inputName.value,
        tasks)
    if (inputName.value === '') {
        newProject.setName('New Project')
    }
    myProjects.push(newProject)
    currentProject = newProject.name
    storeProjects()
}

function addDefaultProject(name, tasks) {
    let newProject = Projects(name, tasks)
    myProjects.push(newProject)
    storeProjects()
}

function addProjectFromStorage(name, tasks) {
    let newProject = Projects(name, tasks)
    myProjects.push(newProject)
    storeProjects()
}

function addTaskToLibrary(title, description, dueDate, priority, project, status) {
    let newTask = Tasks(title, description, dueDate, priority, project, status);
    myLibrary.push(newTask)
    storeTasks()
}

function addTaskFromStorage(title, description, dueDate, priority, project, status) {
    let newTask = Tasks(title, description, dueDate, priority, project, status);
    myLibrary.push(newTask)
    storeTasks()
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
    storeTasks()
}


function editTaskViaForm(task) {
    let inputTitle = document.querySelector("#name")
    let inputDescription = document.querySelector("#description")
    let inputDueDate = document.querySelector("#due--date")
    let inputPriority = document.querySelector("#priority")
    let inputProject = document.querySelector("#project")

    task.setTitle(inputTitle.value)
    task.setDescription(inputDescription.value)

    function checkDate() {
        if (inputDueDate.value === '') {
            task.setDueDate(new Date())
        } else {
            task.setDueDate(inputDueDate.value)
        }
    }
    checkDate()
    task.setPriority(inputPriority.value)
    task.setProject(inputProject.value)
    storeTasks()
}

function filterTasksByProject(projectName) {
    const tasksFiltered = myLibrary.filter((task) => task.project === projectName
    )
}

function setCurrentProject(project) {
    return currentProject = project
}

function setcurrentProjectStatusTrue() {
    return currentProjectStatus = true
}

function setcurrentProjectStatusFalse() {
    return currentProjectStatus = false
}

function setCurrentDateFilter(dateFilter) {
    return currentDateFilter = dateFilter
}

function setcurrentDateStatusTrue() {
    return currentDateStatus = true
}

function setcurrentDateStatusFalse() {
    return currentDateStatus = false
}

export {
    addTaskToLibrary,
    addTaskViaForm,
    editTaskViaForm,
    addNewProject,
    filterTasksByProject,
    setCurrentProject,
    setcurrentProjectStatusFalse,
    setcurrentProjectStatusTrue,
    setcurrentDateStatusFalse,
    setcurrentDateStatusTrue,
    setCurrentDateFilter,
    storeTasks,
    storeProjects,
    restoreTasks,
    restoreProjects,
    myLibrary,
    myProjects,
    currentProject,
    currentDateFilter,
    currentProjectStatus,
    currentDateStatus
}