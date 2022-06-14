import { myProjects } from "./functions";

function createProjectInput() {
    const projectList = document.querySelector('.project--list')
    const projectInput = document.createElement('input')
    projectInput.type = 'text'
    projectInput.classList.add('project--input')
    projectInput.id = 'project--id'
    projectList.insertBefore(projectInput, projectList.lastChild)

    const projectInputBtn = document.createElement('button')
    projectInputBtn.type = 'button'
    projectInputBtn.classList.add('project--validate--btn')
    projectInputBtn.innerText = 'Validate project'
    projectList.insertBefore(projectInputBtn, projectList.lastChild)
}

function deleteProjectInput () {
    const projectList = document.querySelector('.project--list')
    const projectInput = document.querySelector('.project--input')
    const projectInputBtn = document.querySelector('.project--validate--btn')
   projectList.removeChild(projectInput)
   projectList.removeChild(projectInputBtn)
}

export {
    createProjectInput, 
    deleteProjectInput
}