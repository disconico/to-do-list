import {
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
    myLibrary,
    myProjects,
    currentProject,
    currentDateFilter,
    currentProjectStatus,
    currentDateStatus
}
    from "./functions";

import { createForm, deleteForm } from "./form";
import { createProjectInput, deleteProjectInput } from "./newProjectInput";
import { createEditForm, deleteEditForm } from "./formEdit";
import { format, formatDistance, formatDistanceToNow, formatRelative, isToday, subDays, toDate, parseISO, parse, isSameWeek } from 'date-fns'
import previousMonday from "date-fns/esm/fp/previousMonday/index.js";

const sport = addTaskToLibrary('Sport', 'Aller au sport', new Date(), 'High', 'Favorites', 'false')
const coiffeur = addTaskToLibrary('Coiffeur', 'Prendre rdv', '2022-07-22', 'High', 'Default project', 'false')

function displayTasks(method, project, date) {
    const taskLibrary = document.querySelector('.task--library')

    // display library :
    taskLibrary.innerHTML = ''

    const tasksToDo = document.createElement('div')
    tasksToDo.classList.add('tasks--to--do')
    taskLibrary.appendChild(tasksToDo)

    const taskToDoTitle = document.createElement('h5')
    taskToDoTitle.innerText = 'Tasks to do :'
    tasksToDo.appendChild(taskToDoTitle)

    const tasksDone = document.createElement('div')
    tasksDone.classList.add('tasks--done')
    taskLibrary.appendChild(tasksDone)

    const taskDoneTitle = document.createElement('h5')
    taskDoneTitle.innerText = 'Tasks done :'
    tasksDone.appendChild(taskDoneTitle)

    myLibrary.forEach((task) => {
        if (task.dueDate != '') {
            task.setDueDate(task.dueDate)
        } else {
            task.setDueDate(new Date())
        }
    })

    let myMethodToDisplay = method
    let myProjectToDisplay = project
    let myDateToDisplay = date
    let myLibraryFiltered = []



    function checkMethod() {
        if (myMethodToDisplay === '') {
            return myLibraryFiltered = myLibrary

        } else if (myMethodToDisplay === 'project') {
            return myLibraryFiltered = myLibrary.filter((task) => task.project === myProjectToDisplay
            )
        } else if (myMethodToDisplay === 'date') {
            if (myDateToDisplay === 'today') {
                return myLibraryFiltered = myLibrary.filter((task) => (isToday(task.dueDate)))
            } else if (myDateToDisplay === 'thisWeek') {
                return myLibraryFiltered = myLibrary.filter((task) => (isSameWeek(task.dueDate, new Date())))
            }
        }
    }

    checkMethod()

    //For each task :
    myLibraryFiltered.forEach((task) => {

        let taskDiv = document.createElement('div')
        taskDiv.classList.add('task--div')

        function checkStatusDiv() {
            if (task.status === 'false') {
                tasksToDo.appendChild(taskDiv)
            } else if (task.status === 'true') {
                tasksDone.appendChild(taskDiv)
            }
        }

        checkStatusDiv()

        taskDiv.setAttribute('id', myLibrary.indexOf(task))

        let taskOutputName = document.createElement('p')
        taskOutputName.innerText = task.title
        taskDiv.appendChild(taskOutputName)

        let taskOutputDescription = document.createElement('p')
        taskOutputDescription.innerText = task.description
        taskDiv.appendChild(taskOutputDescription)

        let taskOutputDueDate = document.createElement('p')
        if (task.dueDate != '') {
            let dateToDisplay = myLibrary[myLibrary.indexOf(task)].getDateFormatted()
            taskOutputDueDate.innerText = dateToDisplay
        } else {
            let dateToDisplay = myLibrary[myLibrary.indexOf(task)].getDateFormatted()
            taskOutputDueDate.innerText = dateToDisplay
        }
        taskDiv.appendChild(taskOutputDueDate)

        let taskOutputPriority = document.createElement('p')
        taskOutputPriority.innerText = task.priority
        taskDiv.appendChild(taskOutputPriority)

        let taskOutputProject = document.createElement('p')
        taskOutputProject.innerText = task.project
        taskDiv.appendChild(taskOutputProject)

        let taskOutputStatus = document.createElement('label')
        taskOutputStatus.classList.add('switch')

        function checkStatusText() {
            if (task.status === 'false') {
                taskOutputStatus.innerText = 'To Do !'
            } else if (task.status === 'true') {
                taskOutputStatus.innerText = 'Done !'
            }
        }

        checkStatusText()

        taskDiv.appendChild(taskOutputStatus)

        let taskStatusBtn = document.createElement('input')
        taskStatusBtn.type = 'checkbox'
        taskStatusBtn.classList.add('checkbox')
        taskStatusBtn.setAttribute('id', myLibrary.indexOf(task))
        taskOutputStatus.appendChild(taskStatusBtn)

        function checkStatus() {
            if (task.status === 'false') {
                return
            } else if (task.status === 'true') {
                taskStatusBtn.checked = true
            }
        }
        checkStatus()

        let deleteBtn = document.createElement('button')
        deleteBtn.type = 'button'
        deleteBtn.classList.add('delete--button')
        deleteBtn.setAttribute('id', myLibrary.indexOf(task))
        deleteBtn.innerText = 'Delete task'
        taskDiv.appendChild(deleteBtn)

        let editBtn = document.createElement('button')
        editBtn.type = 'button'
        editBtn.classList.add('edit--button')
        editBtn.setAttribute('id', myLibrary.indexOf(task))
        editBtn.innerText = 'Edit task'
        taskDiv.appendChild(editBtn)

    })

}


function displayProjects() {
    const projectLibrary = document.querySelector('.project--list')

    // display library :
    projectLibrary.innerHTML = ''


    const projectListTitle = document.createElement('p')
    projectListTitle.innerText = 'Projects'
    projectListTitle.classList.add('project--list--title')
    projectLibrary.appendChild(projectListTitle)

    //For each project :
    myProjects.forEach((project) => {

        let projectDiv = document.createElement('div')
        projectDiv.classList.add('project--div')
        projectLibrary.appendChild(projectDiv)

        let projectBtn = document.createElement('button')
        projectBtn.classList.add('project--list-btn')
        projectBtn.id = project.name
        projectBtn.innerText = project.name

        let projectRemoveBtn = document.createElement('button')
        projectRemoveBtn.classList.add('project--remove--btn')
        projectRemoveBtn.id = myProjects.indexOf(project)

        projectDiv.appendChild(projectBtn)
        projectDiv.appendChild(projectRemoveBtn)

    })

    const newProjectBtn = document.createElement('button')
    newProjectBtn.type = 'button'
    newProjectBtn.classList.add('new--project--button')
    newProjectBtn.innerText = 'Add new project'
    projectLibrary.appendChild(newProjectBtn)

}

function checkcurrentProjectStatusAndDisplayTasks() {
    if (currentProjectStatus === false && currentDateStatus === false) {
        displayTasks('')
    } else if (currentProjectStatus === true) {
        displayTasks('project', currentProject, '')
    } else if (currentDateStatus === true) {
        displayTasks('date', '', currentDateFilter)
    }
}

let editTarget = {}
function setEditTarget(newEditTarget) {
    return editTarget = newEditTarget
}

let myProjectToDelete = ''
function setProjectToDelete(target) {
    return myProjectToDelete = target
}

function deleteTasksFromProject(projectDeleted) {
    myLibrary.slice().reverse().forEach((task) => {
        if (task.project === projectDeleted) {
            myLibrary.splice([myLibrary.indexOf(task)], 1)
        }
    })

}

function eventListeners() {
    const mainContent = document.querySelector('.main--content')
    const sideBar = document.querySelector('.sideBar')

    // Add task button
    const addTaskBtn = document.querySelector('.main--button')
    addTaskBtn.addEventListener('click', createForm)


    // Adding new task
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('submit--button')) {
            addTaskViaForm()
            deleteForm()
            checkcurrentProjectStatusAndDisplayTasks()
        }
    })

    // Cancelling new task
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('cancel--button')) {
            deleteForm()
            checkcurrentProjectStatusAndDisplayTasks()
        }
    })


    // Switching task status
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('checkbox')) {
            myLibrary[e.target.id].toggleStatus()
            checkcurrentProjectStatusAndDisplayTasks()
        }
    })

    // Delete task
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete--button')) {
            myLibrary.splice(e.target.id, 1)
            checkcurrentProjectStatusAndDisplayTasks()
        }
    })

    // Edit button on task
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit--button')) {
            setEditTarget(myLibrary[e.target.id])
            createEditForm(myLibrary[e.target.id])
        }
    })

    // Triggered when validating task edit
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('submit--edit--button')) {
            editTaskViaForm(editTarget)
            deleteEditForm()
            checkcurrentProjectStatusAndDisplayTasks()
        }
    })

    // Triggered when cancelling task edit
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('cancel--edit--button')) {
            deleteEditForm()
            checkcurrentProjectStatusAndDisplayTasks()
        }
    })



    // Add new project button
    sideBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('new--project--button')) {
            createProjectInput()
        }
    })


    // Triggered when adding new project
    sideBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('project--validate--btn')) {
            addNewProject()
            deleteProjectInput()
            displayProjects()
            setcurrentDateStatusFalse()
            setcurrentProjectStatusTrue()
            checkcurrentProjectStatusAndDisplayTasks()
        }
    })

    //Clicking existing project 
    sideBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('project--list-btn')) {
            setcurrentDateStatusFalse()
            setcurrentProjectStatusTrue()
            setCurrentProject(e.target.id)
            displayTasks('project', currentProject)
        }
    })


    // Triggered when clicking delete button project
    sideBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('project--remove--btn')) {
            setProjectToDelete(myProjects[e.target.id].name)
            console.log(myProjectToDelete)
            myProjects.splice(e.target.id, 1)
            deleteTasksFromProject(myProjectToDelete)
            checkcurrentProjectStatusAndDisplayTasks()
            displayProjects()
        }
    })

    //Inbox button
    sideBar.addEventListener('click', (e) => {
        if (e.target.id === 'inbox') {
            setcurrentProjectStatusFalse()
            setcurrentDateStatusFalse()
            displayTasks('')
        }
    })

    //Today button
    sideBar.addEventListener('click', (e) => {
        if (e.target.id === 'today') {
            setcurrentDateStatusTrue()
            setcurrentProjectStatusFalse()
            setCurrentDateFilter(e.target.id)
            displayTasks('date', '', currentDateFilter)
        }
    })

    //This week button
    sideBar.addEventListener('click', (e) => {
        if (e.target.id === 'this--week') {
            setcurrentDateStatusTrue()
            setcurrentProjectStatusFalse()
            setCurrentDateFilter('thisWeek')
            displayTasks('date', '', currentDateFilter)
        }
    })

}

export {
    displayTasks,
    displayProjects,
    eventListeners,
    editTarget
}