import { Tasks } from "./tasksFactory";

let myLibrary = [];

function addTaskToLibrary(title, description, dueDate, priority, notes) {
    let newTask = Tasks(title, description, dueDate, priority, notes);
    myLibrary.push(newTask)
}


export {addTaskToLibrary}