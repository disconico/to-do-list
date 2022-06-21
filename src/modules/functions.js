/* eslint-disable import/no-mutable-exports */
import Tasks from './tasksCreation';
import Projects from './projects';

const myProjects = [];
const myLibrary = [];
let currentProject = '';
let currentDateFilter = '';
let currentProjectStatus = false;
let currentDateStatus = false;

// Setting library to be stored in local storage
function storeTasks() {
  const jsonTasks = JSON.stringify(myLibrary);
  localStorage.setItem('myTasks', jsonTasks);
}

function storeProjects() {
  const jsonProjects = JSON.stringify(myProjects);
  localStorage.setItem('myProjects', jsonProjects);
}

// Check storage and restore
// eslint-disable-next-line consistent-return
function restoreTasks() {
  const tasksFromStorage = localStorage.getItem('myTasks');
  let parsedTasks = '';

  function checkLocalStorageTasks() {
    if (tasksFromStorage === null) {
      parsedTasks = JSON.parse(tasksFromStorage);
      return parsedTasks;
    }
    parsedTasks = Array.from(JSON.parse(tasksFromStorage));
    return parsedTasks;
  }
  checkLocalStorageTasks();

  // eslint-disable-next-line no-empty
  if (tasksFromStorage === null || parsedTasks.length === 0) {
  } else {
    parsedTasks.forEach((task) => {
      // eslint-disable-next-line no-use-before-define
      addTaskFromStorage(
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        task.project,
        task.status
      );
    });
    return myLibrary;
  }
}

// eslint-disable-next-line consistent-return
function restoreProjects() {
  const projectsFromStorage = localStorage.getItem('myProjects');
  let parsedProjects = '';

  function checkLocalStorageProjects() {
    if (projectsFromStorage === null) {
      parsedProjects = JSON.parse(projectsFromStorage);
      return parsedProjects;
    }
    parsedProjects = Array.from(
      (parsedProjects = JSON.parse(projectsFromStorage))
    );
    return parsedProjects;
  }

  checkLocalStorageProjects();

  // eslint-disable-next-line no-empty
  if (projectsFromStorage === null || parsedProjects.length === 0) {
  } else {
    parsedProjects.forEach((project) => {
      // eslint-disable-next-line no-use-before-define
      addProjectFromStorage(project.name, project.tasks);
    });
    return myProjects;
  }
}

function addNewProject(name, tasks) {
  const inputName = document.querySelector('#project--id');
  const newProject = Projects(inputName.value, tasks);
  if (inputName.value === '') {
    newProject.setName('New Project');
  }
  myProjects.push(newProject);
  currentProject = newProject.name;
  storeProjects();
}

// function addDefaultProject(name, tasks) {
//   const newProject = Projects(name, tasks);
//   myProjects.push(newProject);
//   storeProjects();
// }

function addProjectFromStorage(name, tasks) {
  const newProject = Projects(name, tasks);
  myProjects.push(newProject);
  storeProjects();
}

function addTaskToLibrary(
  title,
  description,
  dueDate,
  priority,
  project,
  status
) {
  const newTask = Tasks(title, description, dueDate, priority, project, status);
  myLibrary.push(newTask);
  storeTasks();
}

function addTaskFromStorage(
  title,
  description,
  dueDate,
  priority,
  project,
  status
) {
  const newTask = Tasks(title, description, dueDate, priority, project, status);
  myLibrary.push(newTask);
  storeTasks();
}

function addTaskViaForm() {
  const inputTitle = document.querySelector('#name');
  const inputDescription = document.querySelector('#description');
  const inputDueDate = document.querySelector('#due--date');
  const inputPriority = document.querySelector('#priority');
  const inputProject = document.querySelector('#project');

  const newTask = Tasks(
    inputTitle.value,
    inputDescription.value,
    inputDueDate.value,
    inputPriority.value,
    inputProject.value
  );

  myLibrary.push(newTask);
  storeTasks();
}

function editTaskViaForm(task) {
  const inputTitle = document.querySelector('#name');
  const inputDescription = document.querySelector('#description');
  const inputDueDate = document.querySelector('#due--date');
  const inputPriority = document.querySelector('#priority');
  const inputProject = document.querySelector('#project');

  task.setTitle(inputTitle.value);
  task.setDescription(inputDescription.value);

  function checkDate() {
    if (inputDueDate.value === '') {
      task.setDueDate(new Date());
    } else {
      task.setDueDate(inputDueDate.value);
    }
  }
  checkDate();
  task.setPriority(inputPriority.value);
  task.setProject(inputProject.value);
  storeTasks();
}

// function filterTasksByProject(projectName) {
//   const tasksFiltered = myLibrary.filter((task) => task.project === projectName);
// }

function setCurrentProject(project) {
  currentProject = project;
}

function setCurrentProjectStatusTrue() {
  currentProjectStatus = true;
}

function setCurrentProjectStatusFalse() {
  currentProjectStatus = false;
}

function setCurrentDateFilter(dateFilter) {
  currentDateFilter = dateFilter;
}

function setCurrentDateStatusTrue() {
  currentDateStatus = true;
}

function setCurrentDateStatusFalse() {
  currentDateStatus = false;
}

export {
  addTaskToLibrary,
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
  restoreTasks,
  restoreProjects,
  myLibrary,
  myProjects,
  currentProject,
  currentDateFilter,
  currentProjectStatus,
  currentDateStatus,
};
