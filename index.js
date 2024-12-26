// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    let isDarkMode = true; // Starting with dark mode by default

    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            body.style.background = '#f5f5f5';
            document.querySelector('.main-content').style.background = 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)';
            themeToggle.querySelector('i').className = 'fas fa-moon';
        } else {
            body.style.background = '#ffffff';
            document.querySelector('.main-content').style.background = 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)';
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
    });

    // Notification system
    const notificationBtn = document.querySelector('.notification-btn');
    const notifications = [
        { title: 'New team message', message: 'Sarah posted in Project X discussion' },
        { title: 'Deadline reminder', message: 'Website redesign due in 2 days' },
        { title: 'Task completed', message: 'Homepage mockup has been approved' }
    ];

    notificationBtn.addEventListener('click', function() {
        showNotifications(notifications);
    });

    function showNotifications(notifications) {
        // Create notification popup
        const popup = document.createElement('div');
        popup.className = 'notification-popup';
        popup.style.cssText = `
            position: absolute;
            top: 60px;
            right: 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            width: 300px;
            z-index: 1000;
            padding: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;

        // Add notifications to popup
        notifications.forEach(notif => {
            const notifItem = document.createElement('div');
            notifItem.style.cssText = `
                padding: 10px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                cursor: pointer;
            `;
            notifItem.innerHTML = `
                <h4 style="margin: 0 0 5px; color: white;">${notif.title}</h4>
                <p style="margin: 0; color: rgba(255, 255, 255, 0.7); font-size: 0.9em;">${notif.message}</p>
            `;
            popup.appendChild(notifItem);
        });

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.cssText = `
            width: 100%;
            padding: 8px;
            margin-top: 10px;
            background: #00ff95;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            color: #1a1a2e;
            font-weight: 600;
            transition: all 0.3s ease;
        `;
        closeBtn.onmouseover = () => {
            closeBtn.style.background = '#00e085';
            closeBtn.style.transform = 'translateY(-2px)';
        };
        closeBtn.onmouseout = () => {
            closeBtn.style.background = '#00ff95';
            closeBtn.style.transform = 'translateY(0)';
        };
        closeBtn.onclick = () => popup.remove();
        popup.appendChild(closeBtn);

        // Add popup to document
        document.body.appendChild(popup);

        // Close popup when clicking outside
        document.addEventListener('click', function closePopup(e) {
            if (!popup.contains(e.target) && !notificationBtn.contains(e.target)) {
                popup.remove();
                document.removeEventListener('click', closePopup);
            }
        });
    }

    // Quick action buttons functionality
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleQuickAction(action);
        });
    });

    function handleQuickAction(action) {
        switch(action) {
            case 'Discussions':
                alert('Opening discussions panel...');
                break;
            case 'Add Team Member':
                showTeamMemberForm();
                break;
            case 'Export Report':
                showExportOptions();
                break;
        }
    }

    function showTeamMemberForm() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 999;
        `;

        const formHTML = `
            <div class="team-member-form" style="
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
                width: 90%;
                max-width: 500px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: white;">
                
                <h3 style="margin-bottom: 25px; font-size: 1.8rem; color: #00ff95;">Add Team Member</h3>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; color: rgba(255, 255, 255, 0.9);">Name</label>
                    <input type="text" placeholder="Enter full name" style="
                        width: 100%;
                        padding: 12px;
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 8px;
                        color: white;
                        font-size: 1rem;
                        outline: none;
                        transition: all 0.3s ease;
                    ">
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; color: rgba(255, 255, 255, 0.9);">Email</label>
                    <input type="email" placeholder="Enter email address" style="
                        width: 100%;
                        padding: 12px;
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 8px;
                        color: white;
                        font-size: 1rem;
                        outline: none;
                        transition: all 0.3s ease;
                    ">
                </div>

                <div style="margin-bottom: 30px;">
                    <label style="display: block; margin-bottom: 8px; color: rgba(255, 255, 255, 0.9);">Role</label>
                    <select style="
                        width: 100%;
                        padding: 12px;
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 8px;
                        color: white;
                        font-size: 1rem;
                        outline: none;
                        transition: all 0.3s ease;
                        cursor: pointer;
                    ">
                        <option value="" style="background: #1a1a2e;">Select Role</option>
                        <option value="developer" style="background: #1a1a2e;">Developer</option>
                        <option value="designer" style="background: #1a1a2e;">Designer</option>
                        <option value="manager" style="background: #1a1a2e;">Manager</option>
                        <option value="analyst" style="background: #1a1a2e;">Analyst</option>
                    </select>
                </div>

                <div style="display: flex; gap: 15px; justify-content: flex-end;">
                    <button class="cancel-btn" style="
                        padding: 12px 24px;
                        background: rgba(255, 255, 255, 0.1);
                        border: none;
                        border-radius: 8px;
                        color: white;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                    ">Cancel</button>
                    <button class="add-btn" style="
                        padding: 12px 24px;
                        background: #00ff95;
                        border: none;
                        border-radius: 8px;
                        color: #1a1a2e;
                        cursor: pointer;
                        font-size: 1rem;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    ">Add Member</button>
                </div>
            </div>
        `;

        overlay.innerHTML = formHTML;
        document.body.appendChild(overlay);

        // Add hover effects
        const form = overlay.querySelector('.team-member-form');
        const inputs = form.querySelectorAll('input, select');
        const addBtn = form.querySelector('.add-btn');
        const cancelBtn = form.querySelector('.cancel-btn');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.background = 'rgba(255, 255, 255, 0.15)';
                input.style.borderColor = '#00ff95';
            });
            input.addEventListener('blur', () => {
                input.style.background = 'rgba(255, 255, 255, 0.1)';
                input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            });
        });

        addBtn.addEventListener('mouseover', () => {
            addBtn.style.background = '#00e085';
            addBtn.style.transform = 'translateY(-2px)';
        });
        addBtn.addEventListener('mouseout', () => {
            addBtn.style.background = '#00ff95';
            addBtn.style.transform = 'translateY(0)';
        });

        cancelBtn.addEventListener('mouseover', () => {
            cancelBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            cancelBtn.style.transform = 'translateY(-2px)';
        });
        cancelBtn.addEventListener('mouseout', () => {
            cancelBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            cancelBtn.style.transform = 'translateY(0)';
        });

        // Add close functionality
        const closeForm = () => overlay.remove();
        cancelBtn.addEventListener('click', closeForm);
        addBtn.addEventListener('click', () => {
            // Add your form submission logic here
            closeForm();
        });
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeForm();
        });
    }

    function showExportOptions() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 999;
        `;

        const modalHTML = `
            <div class="export-modal" style="
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
                width: 90%;
                max-width: 500px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: white;">
                
                <h3 style="margin-bottom: 25px; font-size: 1.8rem; color: #00ff95;">Export Report</h3>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 15px; color: rgba(255, 255, 255, 0.9);">Select Report Type</label>
                    <div style="display: grid; gap: 10px;">
                        <button class="export-option" data-type="task" style="
                            padding: 15px;
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 8px;
                            color: white;
                            text-align: left;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">
                            <i class="fas fa-tasks" style="margin-right: 10px;"></i>
                            Task Report
                        </button>
                        <button class="export-option" data-type="team" style="
                            padding: 15px;
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 8px;
                            color: white;
                            text-align: left;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">
                            <i class="fas fa-users" style="margin-right: 10px;"></i>
                            Team Performance Report
                        </button>
                        <button class="export-option" data-type="timeline" style="
                            padding: 15px;
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 8px;
                            color: white;
                            text-align: left;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">
                            <i class="fas fa-chart-line" style="margin-right: 10px;"></i>
                            Timeline Analysis
                        </button>
                    </div>
                </div>

                <div style="display: flex; gap: 15px; justify-content: flex-end; margin-top: 20px;">
                    <button class="cancel-btn" style="
                        padding: 12px 24px;
                        background: rgba(255, 255, 255, 0.1);
                        border: none;
                        border-radius: 8px;
                        color: white;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                    ">Cancel</button>
                </div>
            </div>
        `;

        overlay.innerHTML = modalHTML;
        document.body.appendChild(overlay);

        // Add hover effects
        const exportOptions = overlay.querySelectorAll('.export-option');
        const cancelBtn = overlay.querySelector('.cancel-btn');

        exportOptions.forEach(button => {
            button.addEventListener('mouseover', () => {
                button.style.background = 'rgba(255, 255, 255, 0.2)';
                button.style.transform = 'translateX(5px)';
            });
            button.addEventListener('mouseout', () => {
                button.style.background = 'rgba(255, 255, 255, 0.1)';
                button.style.transform = 'translateX(0)';
            });
            button.addEventListener('click', () => {
                generateReport(button.dataset.type);
                overlay.remove();
            });
        });

        cancelBtn.addEventListener('mouseover', () => {
            cancelBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            cancelBtn.style.transform = 'translateY(-2px)';
        });
        cancelBtn.addEventListener('mouseout', () => {
            cancelBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            cancelBtn.style.transform = 'translateY(0)';
        });
        cancelBtn.addEventListener('click', () => overlay.remove());

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    function generateReport(type) {
        let data = [];
        const timestamp = new Date().toISOString().slice(0, 10);
        let filename = '';

        switch(type) {
            case 'task':
                filename = `taskflow_task_report_${timestamp}.csv`;
                data = [
                    ['Task ID', 'Task Name', 'Assignee', 'Status', 'Priority', 'Due Date', 'Completion Rate'],
                    ['TSK001', 'Website Redesign', 'John Doe', 'In Progress', 'High', '2024-01-15', '75%'],
                    ['TSK002', 'Mobile App Testing', 'Jane Smith', 'Completed', 'Medium', '2024-01-10', '100%'],
                    ['TSK003', 'Database Optimization', 'Mike Johnson', 'Pending', 'High', '2024-01-20', '30%'],
                    ['TSK004', 'User Documentation', 'Sarah Wilson', 'In Review', 'Low', '2024-01-25', '90%']
                ];
                break;
            case 'team':
                filename = `taskflow_team_report_${timestamp}.csv`;
                data = [
                    ['Team Member', 'Role', 'Tasks Completed', 'Average Completion Time', 'Efficiency Score'],
                    ['John Doe', 'Developer', '15', '2.5 days', '92%'],
                    ['Jane Smith', 'Designer', '12', '1.8 days', '88%'],
                    ['Mike Johnson', 'QA Engineer', '18', '1.2 days', '95%'],
                    ['Sarah Wilson', 'Content Writer', '10', '2.1 days', '87%']
                ];
                break;
            case 'timeline':
                filename = `taskflow_timeline_report_${timestamp}.csv`;
                data = [
                    ['Date', 'Tasks Created', 'Tasks Completed', 'Active Hours', 'Productivity Score'],
                    ['2024-01-01', '8', '6', '7.5', '85%'],
                    ['2024-01-02', '5', '7', '8.0', '92%'],
                    ['2024-01-03', '10', '8', '6.5', '78%'],
                    ['2024-01-04', '6', '9', '7.8', '88%']
                ];
                break;
        }

        // Convert data to CSV
        const csvContent = data.map(row => row.join(',')).join('\n');
        
        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        // Create download link
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        // Add to document, trigger download, and cleanup
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success message
        showExportSuccess(type);
    }

    function showExportSuccess(type) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #00ff95;
            color: #1a1a2e;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ${type.charAt(0).toUpperCase() + type.slice(1)} report exported successfully!
        `;
    
        document.body.appendChild(successDiv);
    
        // Add animation keyframes for both slideIn and slideOut
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    
        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease forwards';
            successDiv.addEventListener('animationend', () => {
                document.body.removeChild(successDiv);
                document.head.removeChild(style);
            });
        }, 3000);
    }

    // Initialize time-based greetings
    updateGreeting();
});

function updateGreeting() {
    const welcomeTitle = document.querySelector('.welcome-title');
    const hour = new Date().getHours();
    const name = 'Ajay';
    let greeting;

    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 17) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';

    welcomeTitle.textContent = `${greeting}, ${name}! 👋`;
}