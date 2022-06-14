import { addTaskToLibrary, addTaskViaForm, myLibrary } from "./functions";
import { createForm, deleteForm } from "./form";

const sport = addTaskToLibrary('Sport', 'Aller au sport', '23/08/1993', 'High', '', 'false')
const coiffeur = addTaskToLibrary('Coiffeur', 'Prendre rdv', '', 'High', '', 'false')

function displayTasks() {
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

    //For each task :
    myLibrary.forEach((task) => {

        let taskDiv = document.createElement('div')
        taskDiv.classList.add('task--div')

        function checkStatusDiv () {
            if (task.status === 'false'){
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

        let taskOutputStatus = document.createElement('label')
        taskOutputStatus.classList.add('switch')

        function checkStatusText () {
            if (task.status === 'false'){
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

        function checkStatus () {
            if (task.status === 'false'){
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

    })

}

function eventListeners() {
    const mainContent = document.querySelector('.main--content')

    // Add task button
    const addTaskBtn = document.querySelector('.main--button')
    addTaskBtn.addEventListener('click', createForm)


    // Triggered when adding new task
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('submit--button')) {
            addTaskViaForm()
            deleteForm()
            displayTasks()
        }
    })

    // Triggered when cancelling the new task
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('cancel--button')) {
            deleteForm()
            displayTasks()
        }
    })


    // Triggered when switching task status
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('checkbox')) {
            myLibrary[e.target.id].toggleStatus()
            displayTasks()
        }
    })

     // Triggered when clicking delete button on task
     mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete--button')) {
            myLibrary.splice(myLibrary[e.target.id],1)
            displayTasks()
            console.log(myLibrary)
        }
    })

}

export {
    displayTasks,
    eventListeners
}