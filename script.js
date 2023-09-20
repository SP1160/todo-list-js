const localStorage = window.localStorage;
const taskList = document.querySelector('#taskList');
const taskInput = document.querySelector('#taskInput');
const addTaskButton = document.querySelector('#addTaskButton');
const highlightEvenButton = document.querySelector('#highlightEvenButton');
const highlightOddButton = document.querySelector('#highlightOddButton');
const deleteLastButton = document.querySelector('#deleteLastButton');
const deleteFirstButton = document.querySelector('#deleteFirstButton');

const addTask = () => {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Введите задачу!');
        return;
    }

    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = taskText;

    const taskBtns = document.createElement('div');
    taskBtns.classList.add('task-btns');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', completeTask);

    taskBtns.appendChild(deleteButton);
    taskBtns.appendChild(completeButton);

    li.appendChild(p);
    li.appendChild(taskBtns);
    taskList.appendChild(li);

    taskInput.value = '';
    saveTasks();
};

const highlightEven = () => {
    const tasks = Array.from(taskList.querySelectorAll('li'));

    tasks.forEach((task, index) => {
        if (index % 2 === 1) {
            task.classList.toggle('highlight');
        }
    });
};

const highlightOdd = () => {
    const tasks = Array.from(taskList.querySelectorAll('li'));

    tasks.forEach((task, index) => {
        if (index % 2 === 0) {
            task.classList.toggle('highlight');
        }
    });
};

const deleteLast = () => {
    const tasks = Array.from(taskList.querySelectorAll('li'));

    if (tasks.length > 0) {
        const lastTask = tasks[tasks.length - 1];
        taskList.removeChild(lastTask);
        saveTasks();
    }
};

const deleteFirst = () => {
    const tasks = Array.from(taskList.querySelectorAll('li'));

    if (tasks.length > 0) {
        const firstTask = tasks[0];
        taskList.removeChild(firstTask);
        saveTasks();
    }
};

const completeTask = function () {
    const task = this.parentElement.parentElement;

    if (task.classList.contains('complete')) {
        taskList.insertBefore(task, taskList.firstChild);
    } else {
        taskList.appendChild(task);
    }

    task.classList.toggle('complete');
    saveTasks();
};

const deleteTask = function () {
    const task = this.parentElement.parentElement;
    taskList.removeChild(task);
    saveTasks();
};

const saveTasks = () => {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(
        (task) => task.childNodes[0].textContent,
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        storedTasks.forEach((taskText) => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.textContent = taskText;

            const taskBtns = document.createElement('div');
            taskBtns.classList.add('task-btns');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', deleteTask);

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', completeTask);

            taskBtns.appendChild(deleteButton);
            taskBtns.appendChild(completeButton);

            li.appendChild(p);
            li.appendChild(taskBtns);
            taskList.appendChild(li);
        });
    }
};

taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

addTaskButton.addEventListener('click', addTask);
highlightEvenButton.addEventListener('click', highlightEven);
highlightOddButton.addEventListener('click', highlightOdd);
deleteLastButton.addEventListener('click', deleteLast);
deleteFirstButton.addEventListener('click', deleteFirst);

loadTasks();
