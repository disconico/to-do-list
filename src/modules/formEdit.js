/* eslint-disable max-classes-per-file */
import {
  toDate,
} from 'date-fns';
import { myProjects } from './functions';
// eslint-disable-next-line import/no-cycle
import { editTarget } from './DOMevents';

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
    input.required = true;
    input.maxLength = 16;
    input.value = editTarget.title;
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
    input.value = editTarget.description;
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
    input.value = toDate(editTarget.dueDate);
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

      function setSelectedIndex() {
        for (let i = 0; i < projectPriorityInputs.length; i += 1) {
          if (editTarget.priority === projectInput.innerText) {
            projectInput.selected = true;
            return;
          }
        }
      }
      setSelectedIndex();
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

      function setSelectedIndex() {
        for (let i = 0; i < projectInputs.length; i += 1) {
          if (editTarget.project === projectSelection.innerText) {
            projectSelection.selected = true;
            return;
          }
        }
      }
      setSelectedIndex();

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
    input.innerText = 'Edit task';

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
    input.innerText = 'Cancel';

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
  new SubmitInput('submit--edit--button'),
  new CancelInput('cancel--edit--button'),
];

function createEditForm() {
  const mainContent = document.querySelector('.main--content');
  const taskForm = document.createElement('form');
  taskForm.classList.add('edit--task--form');
  mainContent.appendChild(taskForm);

  const formTitle = document.createElement('div');
  formTitle.classList.add('form--title');
  formTitle.innerText = 'Edit Task';
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

function deleteEditForm() {
  const mainContent = document.querySelector('.main--content');
  const formToDelete = document.querySelector('.edit--task--form');
  mainContent.removeChild(formToDelete);
}

export { createEditForm, deleteEditForm };
