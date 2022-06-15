import { myLibrary, myProjects } from './functions'
import { editTarget } from './DOMevents'
import { format, formatDistance, formatRelative, subDays, isToday, toDate } from 'date-fns'

function createEditForm() {
    const mainContent = document.querySelector('.main--content')
    const taskForm = document.createElement('form')
    taskForm.classList.add('edit--task--form')
    taskForm.innerText = 'Edit task :'
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
        input.value = editTarget.title
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
        input.value = editTarget.description
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
        input.value = toDate(editTarget.dueDate)
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

        let projectPriorityInputs = myPriorityInputs
        console.log(projectPriorityInputs)
        projectPriorityInputs.forEach((priority) => {
            const projectInput = document.createElement('option')
            projectInput.value = priority.priority
            projectInput.innerText = priority.priority

            function setSelectedIndex() {
                for (var i = 0; i < projectPriorityInputs.length; i++) {
                    if (editTarget.priority === projectInput.innerText) {
                        projectInput.selected = true;
                        return
                    }
                }
            }
            setSelectedIndex()
            input.appendChild(projectInput)
        })




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

            function setSelectedIndex() {
                for (var i = 0; i < projectInputs.length; i++) {
                    if (editTarget.project === projectSelection.innerText) {
                        projectSelection.selected = true;
                        return
                    }
                }
            }

            setSelectedIndex()


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
        input.innerText = 'Edit task'

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
    new SubmitInput('submit--edit--button'),
    new CancelInput('cancel--button'),
]

const PriorityInputs = (priority) => {
    return {
        priority: priority
    }
}

let myPriorityInputs = [PriorityInputs('Low'), PriorityInputs('Medium'), PriorityInputs('High')]

function deleteEditForm() {
    const mainContent = document.querySelector('.main--content')
    const formToDelete = document.querySelector('.edit--task--form')
    mainContent.removeChild(formToDelete)
}


export { createEditForm, deleteEditForm }