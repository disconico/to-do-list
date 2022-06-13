
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

    navItems.forEach(item => {
        let menu = document.createElement('button');
        menu.innerText = item.name;
        sideBar.appendChild(menu)
    })
    main.appendChild(sideBar)

    return sideBar
}

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