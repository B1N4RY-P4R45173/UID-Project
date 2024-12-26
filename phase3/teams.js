// JavaScript for managing teams

const teamMembers = [];

// Function to render team members as cards
function renderTeamMembers() {
    const teamContainer = document.querySelector('#team-list');
    teamContainer.innerHTML = ''; // Clear existing content

    teamMembers.forEach((member, index) => {
        const memberCard = document.createElement('div');
        memberCard.className = 'col-md-4';
        memberCard.innerHTML = `
            <div class="member-card">
                <h5>${member.name}</h5>
                <p>${member.role}</p>
                <button class="btn btn-warning" onclick="togglePermission(${index})">
                    ${member.permission ? 'Revoke Permission' : 'Grant Permission'}
                </button>
                <button class="btn btn-danger" onclick="removeMember(${index})">Remove</button>
            </div>
        `;
        teamContainer.appendChild(memberCard);
    });
}

// Function to add a new team member
function addMember() {
    const nameInput = document.querySelector('#member-name');
    const roleInput = document.querySelector('#member-role');
    const name = nameInput.value.trim();
    const role = roleInput.value.trim();

    if (name && role) {
        teamMembers.push({ name, role, permission: false });
        nameInput.value = '';
        roleInput.value = '';
        renderTeamMembers();
    } else {
        alert('Please enter a valid name and role!');
    }
}

// Function to toggle permissions
function togglePermission(index) {
    teamMembers[index].permission = !teamMembers[index].permission;
    renderTeamMembers();
}

// Function to remove a member
function removeMember(index) {
    if (confirm('Are you sure you want to remove this member?')) {
        teamMembers.splice(index, 1);
        renderTeamMembers();
    }
}

// Event listener for adding a member
document.querySelector('#add-member-btn').addEventListener('click', addMember);

// Initial rendering
renderTeamMembers();
