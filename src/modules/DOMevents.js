import { addTaskToLibrary, myLibrary } from "./functions";
import { createForm } from "./form";
import { Tasks } from "./tasksFactory";

//Assign all elements

function onClick() {
    const addTaskBtn = document.querySelector('.main--button')
    addTaskBtn.addEventListener('click', createForm)
}

const sport = addTaskToLibrary('Sport', 'Aller au sport')
const coiffeur = addTaskToLibrary('Coiffeur', 'Prendre rdv')

function displayTasks() {
    const taskLibrary = document.querySelector('.task--library')
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
        if (!task.dueDate === undefined) { 
        taskOutputDueDate.innerText = task.dueDate
        } else {
            taskOutputDueDate.innerText = "No due date"
        }
        taskDiv.appendChild(taskOutputDueDate)


    })
}

export { 
    onClick, 
    displayTasks
}