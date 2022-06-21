/* eslint-disable max-classes-per-file */
import { myProjects } from './functions';

class TextInput {
  constructor(description) {
    this.description = description;
  }

  setLabel() {
    const label = document.createElement('label');
    label.setAttribute('for', this.description);
    label.innerText = 'Name :';
    return label;
  }

  setInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = this.description;
    input.id = this.description;
    input.maxLength = 16;
    input.required = true;
    return input;
  }
}

class DescriptionInput {
  constructor(description) {
    this.description = description;
  }

  setLabel() {
    const label = document.createElement('label');
    label.setAttribute('for', this.description);
    label.innerText = 'Description :';
    return label;
  }

  setInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = this.description;
    input.id = this.description;
    input.maxLength = 50;
    input.required = true;
    return input;
  }
}

class DueDateInput {
  constructor(description) {
    this.description = description;
  }

  setLabel() {
    const label = document.createElement('label');
    label.setAttribute('for', this.description);
    label.innerText = 'Due date :';
    return label;
  }

  setInput() {
    const input = document.createElement('input');
    input.type = 'date';
    input.name = this.description;
    input.id = this.description;
    input.required = false;
    return input;
  }
}

const PriorityInputs = (priority) => ({
  priority,
});

const myPriorityInputs = [PriorityInputs('Low'), PriorityInputs('Medium'), PriorityInputs('High')];

class PriorityInput {
  constructor(description) {
    this.description = description;
  }

  setLabel() {
    const label = document.createElement('label');
    label.setAttribute('for', this.description);
    label.innerText = 'Priority :';
    return label;
  }

  setInput() {
    const input = document.createElement('select');
    input.name = this.description;
    input.id = this.description;
    input.required = true;

    const projectPriorityInputs = myPriorityInputs;
    projectPriorityInputs.forEach((priority) => {
      const projectInput = document.createElement('option');
      projectInput.value = priority.priority;
      projectInput.innerText = priority.priority;
      input.appendChild(projectInput);
    });
    return input;
  }
}

class ProjectInput {
  constructor(description) {
    this.description = description;
  }

  setLabel() {
    const label = document.createElement('label');
    label.setAttribute('for', this.description);
    label.innerText = 'Project :';
    return label;
  }

  setInput() {
    const input = document.createElement('select');
    input.name = this.description;
    input.id = this.description;
    input.required = true;

    const noProjectInput = document.createElement('option');
    noProjectInput.value = 'No project';
    noProjectInput.innerText = 'No project';
    input.appendChild(noProjectInput);

    const projectInputs = myProjects;
    projectInputs.forEach((project) => {
      const projectSelection = document.createElement('option');
      projectSelection.value = project.name;
      projectSelection.innerText = project.name;
      input.appendChild(projectSelection);
    });

    return input;
  }
}

// class NotesInput {
//   constructor(description) {
//     this.description = description;
//   }

//   setLabel() {
//     const label = document.createElement('label');
//     label.setAttribute('for', this.description);
//     label.innerText = 'Notes :';
//     return label;
//   }

//   setInput() {
//     const input = document.createElement('textarea');
//     input.name = this.description;
//     input.id = this.description;
//     input.required = false;
//     return input;
//   }
// }

class SubmitInput {
  constructor(description) {
    this.description = description;
  }

  setLabel() {
    const label = document.createElement('label');
    label.setAttribute('for', this.description);
    return label;
  }

  setInput() {
    const input = document.createElement('button');
    input.classList.add(this.description);
    input.setAttribute('id', this.description);
    input.setAttribute('type', 'button');
    input.innerText = '✓';

    return input;
  }
}

class CancelInput {
  constructor(description) {
    this.description = description;
  }

  setLabel() {
    const label = document.createElement('label');
    label.setAttribute('for', this.description);
    return label;
  }

  setInput() {
    const input = document.createElement('button');
    input.classList.add(this.description);
    input.setAttribute('id', this.description);
    input.setAttribute('type', 'button');
    input.innerText = '×';

    return input;
  }
}

const formInputs = [
  new TextInput('name'),
  new DescriptionInput('description'),
  new DueDateInput('due--date'),
  new PriorityInput('priority'),
  new ProjectInput('project'),
];

const btnInputs = [
  new SubmitInput('submit--button'),
  new CancelInput('cancel--button'),
];

function createForm() {
  const mainContent = document.querySelector('.main--content');
  const taskForm = document.createElement('form');
  taskForm.classList.add('new--task--form');
  mainContent.appendChild(taskForm);

  const formTitle = document.createElement('div');
  formTitle.classList.add('form--title');
  formTitle.innerText = 'Add New Task';
  taskForm.appendChild(formTitle);

  formInputs.forEach((input) => {
    const newInput = document.createElement('div');
    taskForm.appendChild(newInput);
    newInput.classList.add(input.description);

    newInput.appendChild(input.setLabel());
    newInput.appendChild(input.setInput());
  });

  const inputBtnDiv = document.createElement('div');
  inputBtnDiv.classList.add('input--btn--div');
  taskForm.appendChild(inputBtnDiv);

  btnInputs.forEach((input) => {
    const newInput = document.createElement('div');
    inputBtnDiv.appendChild(newInput);
    newInput.classList.add(input.description);

    newInput.appendChild(input.setLabel());
    newInput.appendChild(input.setInput());
  });
}

function deleteForm() {
  const mainContent = document.querySelector('.main--content');
  const formToDelete = document.querySelector('.new--task--form');
  mainContent.removeChild(formToDelete);
}

export { createForm, deleteForm };
