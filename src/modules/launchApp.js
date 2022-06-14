import {myProjects} from './functions'

function createHeader() {
    const header = document.createElement('header')
    header.classList.add('header')

    const headerIcon = document.createElement('i')
    header.appendChild(headerIcon)

    const headerTitle = document.createElement('h1')
    headerTitle.innerText = 'My To-Do'
    header.appendChild(headerTitle)


    return header
}

function createMain() {
    const main = document.createElement('main')
    main.classList.add('main')

    return main
}

function createSideBar() {
    const main = document.querySelector('main')
    const sideBar = document.createElement('sideBar')
    sideBar.classList.add('sideBar')

    const itemsByDate = document.createElement('div')
    itemsByDate.classList.add('items--by--date')
    sideBar.appendChild(itemsByDate)

    navItems.forEach(item => {
        let menu = document.createElement('button');
        menu.innerText = item.name;
        itemsByDate.appendChild(menu)
    })
    main.appendChild(sideBar)

    const projectList = document.createElement('div')
    projectList.classList.add('project--list')
    sideBar.appendChild(projectList)

    navProjects.forEach(project => {
        let menu = document.createElement('button');
        menu.innerText = project.name;
        projectList.appendChild(menu)
        console.log(project)
    })

    const newProjectBtn = document.createElement('button')
    newProjectBtn.type = 'button'
    newProjectBtn.classList.add('new--project--button')
    newProjectBtn.innerText = 'Add new project'
    projectList.appendChild(newProjectBtn)

    return sideBar
}

const navProjects = myProjects

const navItems = [
    {
        'name': 'Inbox'
    },
    {
        'name': 'Today'
    },
    {
        'name': 'This week'
    },
]

function createMainContent() {
    const main = document.querySelector('main')
    const mainContent = document.createElement('div')
    mainContent.classList.add('main--content')
    main.appendChild(mainContent)

    createMainButtons()
    createTaskLibrary()

    return mainContent
}

function createMainButtons() {
    const mainContent = document.querySelector('.main--content')
    const mainBtn = document.createElement('button')
    mainBtn.classList.add('main--button')
    mainBtn.innerText = 'Add task'

    mainContent.appendChild(mainBtn)

    return mainBtn
}

function createTaskLibrary() {
    const mainContent = document.querySelector('.main--content')
    const taskLibrary = document.createElement('div')
    taskLibrary.classList.add('task--library')

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

    mainContent.appendChild(taskLibrary)
}


function createFooter() {
    const footer = document.createElement('footer')
    footer.classList.add('footer')

    const footerText = document.createElement('p')
    footerText.setAttribute('id', 'footer-text')
    footer.innerText = '© disconico'

    const footerLink = document.createElement('a')
    footerLink.setAttribute('href', 'https://github.com/disconico')
    footerLink.setAttribute('target', '_blank')

    const footerIcon = document.createElement('img')
    footerIcon.setAttribute('id', 'github-icon')

    footerLink.appendChild(footerIcon)

    footer.appendChild(footerText)
    footer.appendChild(footerLink)

    return footer
}

function launchApp() {
    const content = document.getElementById('content')

    content.appendChild(createHeader())
    content.appendChild(createMain())
    createSideBar()
    createMainContent()
    content.appendChild(createFooter())
}

export { launchApp }