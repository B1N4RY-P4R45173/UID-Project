document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const taskForm = document.querySelector('.task-form');
    const taskInput = document.getElementById('task');
    const descriptionInput = document.getElementById('description');  // Added description input
    const prioritySelect = document.getElementById('priority');
    const deadlineInput = document.getElementById('deadline');
    const addTaskButton = document.getElementById('add-task');
    const upcomingTasksContainer = document.querySelector('.upcoming-task');

    // Initialize tasks array from localStorage or empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to create task HTML element
    function createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        
        // Calculate days until deadline
        const daysUntil = Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24));
        const dueText = daysUntil > 0 ? `due in ${daysUntil} day${daysUntil === 1 ? '' : 's'}` : 'overdue';
        
        // Set priority color
        const priorityColors = {
            'top': '#ff4444',
            'middle': '#ffbb33',
            'low': '#00C851'
        };
        
        taskDiv.innerHTML = `
            <div class="task-icon" style="background: ${priorityColors[task.priority]}">
                <i class="fas fa-bell"></i>
            </div>
            <div class="task-details">
                <h4>${task.title}</h4>
                <p>${task.description || 'No description provided'}</p>
            </div>
            <span class="task-time">${dueText}</span>
            <button class="delete-task" style="margin-left: 10px; background: none; border: none; color: #ff4444; cursor: pointer;">
                <i class="fas fa-trash"></i>
            </button>
        `;

        // Add delete functionality
        const deleteButton = taskDiv.querySelector('.delete-task');
        deleteButton.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        return taskDiv;
    }

    // Function to render all tasks
    function renderTasks() {
        // Clear existing tasks except the heading
        const heading = upcomingTasksContainer.querySelector('h3');
        upcomingTasksContainer.innerHTML = '';
        upcomingTasksContainer.appendChild(heading);

        // Sort tasks by deadline and priority
        const sortedTasks = tasks.sort((a, b) => {
            const dateComparison = new Date(a.deadline) - new Date(b.deadline);
            if (dateComparison === 0) {
                const priorityOrder = { top: 0, middle: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return dateComparison;
        });

        // Render each task
        sortedTasks.forEach(task => {
            upcomingTasksContainer.appendChild(createTaskElement(task));
        });
    }

    // Add task event listener
    addTaskButton.addEventListener('click', () => {
        const title = taskInput.value.trim();
        const description = descriptionInput.value.trim();  // Get description value
        
        if (!title) {
            alert('Please enter a task title');
            return;
        }

        if (!deadlineInput.value) {
            alert('Please select a deadline');
            return;
        }

        const newTask = {
            id: Date.now(),
            title: title,
            description: description,  // Add description to task object
            priority: prioritySelect.value,
            deadline: deadlineInput.value,
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();

        // Reset form
        taskInput.value = '';
        descriptionInput.value = '';  // Clear description input
        prioritySelect.value = 'top';
        deadlineInput.value = '';
    });

    // Add keyboard shortcut for task submission
    taskForm.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addTaskButton.click();
        }
    });

    // Initialize tasks display
    renderTasks();

    // Add task hover effects
    document.addEventListener('mouseover', (e) => {
        const task = e.target.closest('.task');
        if (task) {
            task.style.transform = 'translateX(5px)';
            task.style.background = 'rgba(255, 255, 255, 0.12)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        const task = e.target.closest('.task');
        if (task) {
            task.style.transform = '';
            task.style.background = 'rgba(255, 255, 255, 0.08)';
        }
    });
});