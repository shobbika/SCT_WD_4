// Global variables - ALL FUNCTIONS NOW GLOBAL
let tasks = [];
let occasions = [];

const taskList = document.getElementById('taskList');
const occasionList = document.getElementById('occasionList');

// Load data on start
function initApp() {
    const savedTasks = localStorage.getItem('tasks');
    const savedOccasions = localStorage.getItem('occasions');
    
    if (savedTasks) tasks = JSON.parse(savedTasks);
    if (savedOccasions) occasions = JSON.parse(savedOccasions);
    
    renderTasks();
    renderOccasions();
}

// Tab switching - GLOBAL FUNCTION
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// TASKS - All functions global
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('taskName').value;
    const datetime = document.getElementById('taskDateTime').value;
    const type = document.getElementById('taskType').value;
    
    tasks.push({
        id: Date.now(),
        name: name,
        datetime: datetime,
        type: type,
        completed: false
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    this.reset();
});

function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <span>${task.name} ⏰ ${new Date(task.datetime).toLocaleString()} 
                   ${task.type === 'daily' ? '🔁 Daily' : 'Once'}</span>
            <button onclick="deleteTask(${task.id})">❌ Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// OCCASIONS - All functions global
document.getElementById('occasionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('occasionName').value;
    const date = document.getElementById('occasionDate').value;
    
    occasions.push({
        id: Date.now(),
        name: name,
        date: date
    });
    
    localStorage.setItem('occasions', JSON.stringify(occasions));
    renderOccasions();
    this.reset();
});

function renderOccasions() {
    occasionList.innerHTML = '';
    
    occasions.forEach(occasion => {
        const li = document.createElement('li');
        li.className = 'occasion';
        li.innerHTML = `
            <span>🎉 ${occasion.name} — ${new Date(occasion.date).toLocaleDateString()}</span>
            <button onclick="deleteOccasion(${occasion.id})">❌ Delete</button>
        `;
        occasionList.appendChild(li);
    });
}

function deleteOccasion(id) {
    occasions = occasions.filter(occasion => occasion.id !== id);
    localStorage.setItem('occasions', JSON.stringify(occasions));
    renderOccasions();
}

// Start the app when page loads
window.addEventListener('load', initApp);
