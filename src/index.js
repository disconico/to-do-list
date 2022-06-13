import './style.css';


const content = document.createElement('div')
content.classList.add('content')
content.setAttribute('id','content')

const body = document.querySelector('body')
body.appendChild(content)

import { launchApp } from './modules/launchApp';
launchApp()

import { onClick } from './modules/DOMevents';
onClick()

import { displayTasks } from './modules/DOMevents';
displayTasks()



