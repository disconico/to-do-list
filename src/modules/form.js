import {myProjects} from './functions'

function createForm() {
    const mainContent = document.querySelector('.main--content')
    const taskForm = document.createElement('form')
    taskForm.classList.add('new--task--form')
    taskForm.innerText = 'Add new task :'
    mainContent.appendChild(taskForm)

    formInputs.forEach(input => {
        const newInput = document.createElement('div')
        taskForm.appendChild(newInput)
        newInput.classList.add(input.description)

        newInput.appendChild(input.setLabel())
        newInput.appendChild(input.setInput())
    })
}

class TextInput {
    constructor(description) {
        this.description = description
    }

    setLabel() {
        let label = document.createElement('label')
        label.setAttribute('for', this.description)
        label.innerText = `Name :`
        return label
    }

    setInput() {
        let input = document.createElement('input')
        input.type = 'text'
        input.name = this.description
        input.id = this.description
        input.required = true
        return input
    }
} 

class DescriptionInput {
    constructor(description) {
        this.description = description
    }

    setLabel() {
        let label = document.createElement('label')
        label.setAttribute('for', this.description)
        label.innerText = `Description :`
        return label
    }

    setInput() {
        let input = document.createElement('input')
        input.type = 'text'
        input.name = this.description
        input.id = this.description
        input.required = true
        return input
    }
} 

class DueDateInput {
    constructor(description) {
        this.description = description
    }

    setLabel() {
        let label = document.createElement('label')
        label.setAttribute('for', this.description)
        label.innerText = `Due date :`
        return label
    }

    setInput() {
        let input = document.createElement('input')
        input.type = 'date'
        input.name = this.description
        input.id = this.description
        input.required = false
        return input
    }
} 


class PriorityInput {
    constructor(description) {
        this.description = description
    }

    setLabel() {
        let label = document.createElement('label')
        label.setAttribute('for', this.description)
        label.innerText = `Priority :`
        return label
    }

    setInput() {
        let input = document.createElement('select')
        input.name = this.description
        input.id = this.description
        input.required = true

        const inputOne = document.createElement('option')
        inputOne.value = "Low"
        inputOne.innerText = 'Low'
        input.appendChild(inputOne)

        const inputTwo = document.createElement('option')
        inputTwo.value = "Medium"
        inputTwo.innerText = 'Medium'
        input.appendChild(inputTwo)

        const inputThree = document.createElement('option')
        inputThree.value = "High"
        inputThree.innerText = 'High'
        input.appendChild(inputThree)

        return input
    }
} 

class ProjectInput {
    constructor(description) {
        this.description = description
    }

    setLabel() {
        let label = document.createElement('label')
        label.setAttribute('for', this.description)
        label.innerText = `Project :`
        return label
    }

    setInput() {
        let input = document.createElement('select')
        input.name = this.description
        input.id = this.description
        input.required = true

        let projectInputs = myProjects
        projectInputs.forEach(project => {
            const projectSelection = document.createElement('option')
            projectSelection.value = project.name
            projectSelection.innerText = project.name
            input.appendChild(projectSelection)
        })


        return input
    }
} 


class NotesInput {
    constructor(description) {
        this.description = description
    }

    setLabel() {
        let label = document.createElement('label')
        label.setAttribute('for', this.description)
        label.innerText = `Notes :`
        return label
    }

    setInput() {
        let input = document.createElement('textarea')
        input.name = this.description
        input.id = this.description
        input.required = false
        return input
    }
} 

class SubmitInput {
    constructor(description) {
        this.description = description
    }

    setLabel() {
        let label = document.createElement('label')
        label.setAttribute('for', this.description)
        return label
    }

    setInput() {
        let input = document.createElement('button')
        input.classList.add(this.description)
        input.setAttribute('id', this.description)
        input.setAttribute('type', 'button')
        input.innerText = 'Add task'

        return input
    }

} 

class CancelInput {
    constructor(description) {
        this.description = description
    }

    setLabel() {
        let label = document.createElement('label')
        label.setAttribute('for', this.description)
        return label
    }

    setInput() {
        let input = document.createElement('button')
        input.classList.add(this.description)
        input.setAttribute('id', this.description)
        input.setAttribute('type', 'button')
        input.innerText = 'Cancel'

        return input
    }

} 

const formInputs = [
    new TextInput('name'),
    new DescriptionInput('description'),
    new DueDateInput('due--date'),
    new PriorityInput('priority'),
    new ProjectInput('project'),
    new SubmitInput('submit--button'),
    new CancelInput('cancel--button'),
]

function deleteForm () {
    const mainContent = document.querySelector('.main--content')
    const formToDelete = document.querySelector('.new--task--form')
    mainContent.removeChild(formToDelete)
}


export {createForm, deleteForm}