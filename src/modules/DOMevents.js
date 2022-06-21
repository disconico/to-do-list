import {
  isToday, isSameWeek,
} from 'date-fns';
import {
  addTaskViaForm,
  editTaskViaForm,
  addNewProject,
  setCurrentProject,
  setCurrentProjectStatusFalse,
  setCurrentProjectStatusTrue,
  setCurrentDateStatusFalse,
  setCurrentDateStatusTrue,
  setCurrentDateFilter,
  storeTasks,
  storeProjects,
  myLibrary,
  myProjects,
  currentProject,
  currentDateFilter,
  currentProjectStatus,
  currentDateStatus,
}
  from './functions';

import { createForm, deleteForm } from './form';
import { createProjectInput, deleteProjectInput } from './newProjectInput';
// eslint-disable-next-line import/no-cycle
import { createEditForm, deleteEditForm } from './formEdit';

function displayTasks(method, project, date) {
  const taskLibrary = document.querySelector('.task--library');

  // display library :
  taskLibrary.innerHTML = '';

  const tasksToDo = document.createElement('div');
  tasksToDo.classList.add('tasks--to--do');
  taskLibrary.appendChild(tasksToDo);

  const taskToDoTitle = document.createElement('h5');
  taskToDoTitle.innerText = 'Tasks to do :';
  tasksToDo.appendChild(taskToDoTitle);

  const taskContainerToDo = document.createElement('div');
  taskContainerToDo.classList.add('task--container');
  tasksToDo.appendChild(taskContainerToDo);

  const tasksDone = document.createElement('div');
  tasksDone.classList.add('tasks--done');
  taskLibrary.appendChild(tasksDone);

  const taskDoneTitle = document.createElement('h5');
  taskDoneTitle.innerText = 'Tasks done :';
  tasksDone.appendChild(taskDoneTitle);

  const taskContainerDone = document.createElement('div');
  taskContainerDone.classList.add('task--container');
  tasksDone.appendChild(taskContainerDone);

  myLibrary.forEach((task) => {
    if (task.dueDate !== '') {
      task.setDueDate(task.dueDate);
    } else {
      task.setDueDate(new Date());
    }
  });

  const myMethodToDisplay = method;
  const myProjectToDisplay = project;
  const myDateToDisplay = date;
  let myLibraryFiltered = [];

  function checkMethod() {
    if (myMethodToDisplay === '') {
      myLibraryFiltered = myLibrary;
    } if (myMethodToDisplay === 'project') {
      myLibraryFiltered = myLibrary.filter((task) => task.project === myProjectToDisplay);
    } if (myMethodToDisplay === 'date') {
      if (myDateToDisplay === 'today') {
        myLibraryFiltered = myLibrary.filter((task) => (isToday(task.dueDate)));
      } if (myDateToDisplay === 'thisWeek') {
        myLibraryFiltered = myLibrary.filter((task) => (isSameWeek(task.dueDate, new Date())));
      }
    }
  }

  checkMethod();

  // For each task :
  myLibraryFiltered.forEach((task) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task--div');

    function checkStatusDiv() {
      if (task.status === 'false') {
        taskContainerToDo.appendChild(taskDiv);
      } else if (task.status === 'true') {
        taskContainerDone.appendChild(taskDiv);
      }
    }

    checkStatusDiv();

    taskDiv.setAttribute('id', myLibrary.indexOf(task));

    const taskOutputName = document.createElement('div');
    taskOutputName.classList.add('output--name');
    taskOutputName.innerText = task.title;
    taskDiv.appendChild(taskOutputName);

    const taskOutputDescription = document.createElement('div');
    taskOutputDescription.classList.add('output--description');
    taskOutputDescription.innerText = task.description;
    taskDiv.appendChild(taskOutputDescription);

    const taskOutputDueDate = document.createElement('div');
    taskOutputDueDate.classList.add('output--due--date');
    if (task.dueDate !== '') {
      const dateToDisplay = myLibrary[myLibrary.indexOf(task)].getDateFormatted();
      taskOutputDueDate.innerText = dateToDisplay;
    } else {
      const dateToDisplay = myLibrary[myLibrary.indexOf(task)].getDateFormatted();
      taskOutputDueDate.innerText = dateToDisplay;
    }
    taskDiv.appendChild(taskOutputDueDate);

    const taskOutputProject = document.createElement('div');
    taskOutputProject.classList.add('output--project');
    taskOutputProject.innerText = task.project;
    taskDiv.appendChild(taskOutputProject);

    const taskOutputPriority = document.createElement('div');
    taskOutputPriority.classList.add('output--priority');
    taskOutputPriority.classList.add(task.priority);
    taskOutputPriority.innerText = task.priority;
    taskDiv.appendChild(taskOutputPriority);

    const taskOutputStatusDiv = document.createElement('div');
    taskOutputStatusDiv.classList.add('output--status');
    taskDiv.appendChild(taskOutputStatusDiv);

    const taskOutputStatus = document.createElement('label');
    taskOutputStatus.classList.add('switch');

    function checkStatusText() {
      if (task.status === 'false') {
        taskOutputStatus.innerText = 'Mark as done :  ';
      } else if (task.status === 'true') {
        taskOutputStatus.innerText = 'Mark as to do :  ';
      }
    }

    checkStatusText();

    taskOutputStatusDiv.appendChild(taskOutputStatus);

    const taskStatusBtn = document.createElement('input');
    taskStatusBtn.type = 'checkbox';
    taskStatusBtn.classList.add('checkbox');
    taskStatusBtn.setAttribute('id', myLibrary.indexOf(task));
    taskOutputStatus.appendChild(taskStatusBtn);

    function checkStatus() {
      if (task.status === 'false') {
        taskStatusBtn.checked = false;
      } else if (task.status === 'true') {
        taskStatusBtn.checked = true;
      }
    }
    checkStatus();

    const taskSlider = document.createElement('span');
    taskSlider.classList.add('slider');
    taskSlider.classList.add('round');
    taskOutputStatus.appendChild(taskSlider);

    const actionBtn = document.createElement('div');
    actionBtn.classList.add('action--buttons');
    taskDiv.appendChild(actionBtn);

    const deleteBtnDiv = document.createElement('div');
    deleteBtnDiv.classList.add('output--delete');
    actionBtn.appendChild(deleteBtnDiv);

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.classList.add('delete--button');
    deleteBtn.setAttribute('id', myLibrary.indexOf(task));
    deleteBtnDiv.appendChild(deleteBtn);

    const editBtnDiv = document.createElement('div');
    editBtnDiv.classList.add('output--edit');
    actionBtn.appendChild(editBtnDiv);

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.classList.add('edit--button');
    editBtn.setAttribute('id', myLibrary.indexOf(task));
    editBtnDiv.appendChild(editBtn);
  });
}

function displayProjects() {
  const projectLibrary = document.querySelector('.project--list');

  // display library :
  projectLibrary.innerHTML = '';

  const projectListTitle = document.createElement('p');
  projectListTitle.innerText = 'Projects';
  projectListTitle.classList.add('project--list--title');
  projectLibrary.appendChild(projectListTitle);

  // For each project :
  myProjects.forEach((project) => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project--div');
    projectLibrary.appendChild(projectDiv);

    const projectBtn = document.createElement('button');
    projectBtn.classList.add('project--list-btn');
    projectBtn.id = project.name;
    projectBtn.innerText = project.name;

    const projectRemoveBtn = document.createElement('button');
    projectRemoveBtn.classList.add('project--remove--btn');
    projectRemoveBtn.id = myProjects.indexOf(project);

    projectDiv.appendChild(projectBtn);
    projectDiv.appendChild(projectRemoveBtn);
  });

  const newProjectBtn = document.createElement('button');
  newProjectBtn.type = 'button';
  newProjectBtn.classList.add('new--project--button');
  newProjectBtn.innerText = 'Add new project';
  projectLibrary.appendChild(newProjectBtn);
}

function checkCurrentProjectStatusAndDisplayTasks() {
  if (currentProjectStatus === false && currentDateStatus === false) {
    displayTasks('');
  } else if (currentProjectStatus === true) {
    displayTasks('project', currentProject, '');
  } else if (currentDateStatus === true) {
    displayTasks('date', '', currentDateFilter);
  }
}

// eslint-disable-next-line import/no-mutable-exports
let editTarget = {};
function setEditTarget(newEditTarget) {
  editTarget = newEditTarget;
}

let myProjectToDelete = '';
function setProjectToDelete(target) {
  myProjectToDelete = target;
}

function deleteTasksFromProject(projectDeleted) {
  myLibrary.slice().reverse().forEach((task) => {
    if (task.project === projectDeleted) {
      myLibrary.splice([myLibrary.indexOf(task)], 1);
    }
  });
  storeTasks();
}

function eventListeners() {
  const mainContent = document.querySelector('.main--content');
  const sideBar = document.querySelector('.sideBar');

  // Add task button
  const addTaskBtn = document.querySelector('.main--button');
  addTaskBtn.addEventListener('click', createForm);

  // Adding new task
  mainContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('submit--button')) {
      addTaskViaForm();
      deleteForm();
      checkCurrentProjectStatusAndDisplayTasks();
    }
  });

  // Cancelling new task
  mainContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('cancel--button')) {
      deleteForm();
      checkCurrentProjectStatusAndDisplayTasks();
    }
  });

  // Switching task status
  mainContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkbox')) {
      myLibrary[e.target.id].toggleStatus();
      checkCurrentProjectStatusAndDisplayTasks();
      storeTasks();
    }
  });

  // Delete task
  mainContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete--button')) {
      myLibrary.splice(e.target.id, 1);
      checkCurrentProjectStatusAndDisplayTasks();
      storeTasks();
    }
  });

  // Edit button on task
  mainContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit--button')) {
      setEditTarget(myLibrary[e.target.id]);
      createEditForm(myLibrary[e.target.id]);
    }
  });

  // Triggered when validating task edit
  mainContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('submit--edit--button')) {
      editTaskViaForm(editTarget);
      deleteEditForm();
      checkCurrentProjectStatusAndDisplayTasks();
    }
  });

  // Triggered when cancelling task edit
  mainContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('cancel--edit--button')) {
      deleteEditForm();
      checkCurrentProjectStatusAndDisplayTasks();
    }
  });

  // Add new project button
  sideBar.addEventListener('click', (e) => {
    if (e.target.classList.contains('new--project--button')) {
      createProjectInput();
    }
  });

  // Triggered when adding new project via button
  sideBar.addEventListener('click', (e) => {
    if (e.target.classList.contains('project--validate--btn')) {
      addNewProject();
      deleteProjectInput();
      displayProjects();
      setCurrentDateStatusFalse();
      setCurrentProjectStatusTrue();
      checkCurrentProjectStatusAndDisplayTasks();
    }
  });

  // Canceling input
  sideBar.addEventListener('click', (e) => {
    if (e.target.classList.contains('project--cancel--btn')) {
      deleteProjectInput();
    }
  });

  // Clicking existing project
  sideBar.addEventListener('click', (e) => {
    if (e.target.classList.contains('project--list-btn')) {
      setCurrentDateStatusFalse();
      setCurrentProjectStatusTrue();
      setCurrentProject(e.target.id);
      displayTasks('project', currentProject);
    }
  });

  // Triggered when clicking delete button project
  sideBar.addEventListener('click', (e) => {
    if (e.target.classList.contains('project--remove--btn')) {
      setProjectToDelete(myProjects[e.target.id].name);
      myProjects.splice(e.target.id, 1);
      deleteTasksFromProject(myProjectToDelete);
      checkCurrentProjectStatusAndDisplayTasks();
      displayProjects();
      storeProjects();
    }
  });

  // Inbox button
  sideBar.addEventListener('click', (e) => {
    if (e.target.id === 'inbox') {
      setCurrentProjectStatusFalse();
      setCurrentDateStatusFalse();
      displayTasks('');
    }
  });

  // Today button
  sideBar.addEventListener('click', (e) => {
    if (e.target.id === 'today') {
      setCurrentDateStatusTrue();
      setCurrentProjectStatusFalse();
      setCurrentDateFilter(e.target.id);
      displayTasks('date', '', currentDateFilter);
    }
  });

  // This week button
  sideBar.addEventListener('click', (e) => {
    if (e.target.id === 'this--week') {
      setCurrentDateStatusTrue();
      setCurrentProjectStatusFalse();
      setCurrentDateFilter('thisWeek');
      displayTasks('date', '', currentDateFilter);
    }
  });
}

export {
  displayTasks,
  displayProjects,
  eventListeners,
  editTarget,
};
