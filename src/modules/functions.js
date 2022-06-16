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
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function cleanStorage () {
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


function editTaskViaForm (task) {
    let inputTitle = document.querySelector("#name")
    let inputDescription = document.querySelector("#description")
    let inputDueDate = document.querySelector("#due--date")
    let inputPriority = document.querySelector("#priority")
    let inputProject = document.querySelector("#project")

    task.setTitle(inputTitle.value)
    task.setDescription(inputDescription.value)

    function checkDate () {
        if (inputDueDate.value === '') {
            task.setDueDate(new Date())
        } else {
            task.setDueDate(inputDueDate.value)
        }
    }
    checkDate()
    task.setPriority(inputPriority.value)
    task.setProject(inputProject.value)

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

//pulls books from local storage when page is refreshed
function restore (){
    if(!localStorage.myLibrary) {
        console.log('caca')
    }else {
        let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myLibrary = objects;
        console.log('ca MARCHE')
    }
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
    restore,
    myLibrary,
    myProjects,
    currentProject,
    currentDateFilter,
    currentProjectStatus,
    currentDateStatus
}