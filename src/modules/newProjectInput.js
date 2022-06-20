import { myProjects } from "./functions";

function createProjectInput() {
    const projectList = document.querySelector('.project--list')
    const projectInputDiv = document.createElement('div')
    projectInputDiv.classList.add('project--input--div')
    projectList.insertBefore(projectInputDiv, projectList.lastChild)

    const projectInput = document.createElement('input')
    projectInput.type = 'text'
    projectInput.classList.add('project--input')
    projectInput.id = 'project--id'
    projectInput.placeholder = 'My new project'
    projectInputDiv.appendChild(projectInput)

    const projectInputBtnDiv = document.createElement('div')
    projectInputBtnDiv.classList.add('input--btn--div')
    projectInputDiv.appendChild(projectInputBtnDiv)

    const projectInputBtn = document.createElement('button')
    projectInputBtn.type = 'button'
    projectInputBtn.classList.add('project--validate--btn')
    projectInputBtn.innerText = '✓'
    projectInputBtnDiv.appendChild(projectInputBtn)

    const projectCancelBtn = document.createElement('button')
    projectCancelBtn.type = 'button'
    projectCancelBtn.classList.add('project--cancel--btn')
    projectCancelBtn.innerText = '×'
    projectInputBtnDiv.appendChild(projectCancelBtn)
}

function deleteProjectInput() {
    const projectList = document.querySelector('.project--list')
    const projectInput = document.querySelector('.project--input--div')
    projectList.removeChild(projectInput)
}

export {
    createProjectInput,
    deleteProjectInput
}