import { addTaskToLibrary, addTaskViaForm, myLibrary } from "./functions";
import { createForm, deleteForm } from "./form";
import { Tasks } from "./tasksFactory";

function onClick() {
    const addTaskBtn = document.querySelector('.main--button')
    addTaskBtn.addEventListener('click', createForm)
}

const sport = addTaskToLibrary('Sport', 'Aller au sport','23/08/1993','High')
const coiffeur = addTaskToLibrary('Coiffeur', 'Prendre rdv','','High')

function displayTasks() {
    const taskLibrary = document.querySelector('.task--library')
    taskLibrary.innerHTML = ''
    myLibrary.forEach((task) => {

        console.table(task)

        let taskDiv = document.createElement('div')
        taskDiv.classList.add('task--div')
        taskLibrary.appendChild(taskDiv)
        taskDiv.setAttribute('id', myLibrary.indexOf(task))

        let taskOutputName = document.createElement('p')
        taskOutputName.innerText = task.title
        taskDiv.appendChild(taskOutputName)

        let taskOutputDescription = document.createElement('p')
        taskOutputDescription.innerText = task.description
        taskDiv.appendChild(taskOutputDescription)

        let taskOutputDueDate = document.createElement('p')
        if (task.dueDate != undefined) {
            taskOutputDueDate.innerText = task.dueDate
        } else {
            taskOutputDueDate.innerText = ""
        }
        taskDiv.appendChild(taskOutputDueDate)

        let taskOutputPriority = document.createElement('p')
        taskOutputPriority.innerText = task.priority
        taskDiv.appendChild(taskOutputPriority)

        let taskOutputProject = document.createElement('p')
        taskOutputProject.innerText = task.project
        taskDiv.appendChild(taskOutputProject)

        let taskOutputNotes = document.createElement('p')
        if (task.notes != undefined) {
            taskOutputNotes.innerText = task.notes
        } else {
            taskOutputNotes.innerText = ""
        }
        taskDiv.appendChild(taskOutputNotes)
    })
}

function processNewTask() {
    const mainContent = document.querySelector('.main--content')
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('submit--button')) {
            addTaskViaForm()
            deleteForm()
            displayTasks()
        }
    })
}

export {
    onClick,
    displayTasks,
    processNewTask,
}