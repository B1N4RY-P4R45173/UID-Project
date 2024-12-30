// JavaScript to handle form interactions on the Settings Page

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const twoFactorToggle = document.querySelector("#account-settings .toggle-switch input");
  const emailNotificationsToggle = document.querySelector("#notification-settings .toggle-switch:nth-child(1) input");
  const desktopAlertsToggle = document.querySelector("#notification-settings .toggle-switch:nth-child(2) input");
  const smsNotificationsToggle = document.querySelector("#notification-settings .toggle-switch:nth-child(3) input");
  const accountVisibilitySelect = document.querySelector("#privacy-settings select");
  const deleteAccountLink = document.querySelector(".delete-link");
  const saveButton = document.querySelector(".btn-primary");
  const cancelButton = document.querySelector(".btn-secondary");

  // Handle Save Changes
  saveButton.addEventListener("click", () => {
    const settingsData = {
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      twoFactorEnabled: twoFactorToggle.checked,
      notifications: {
        email: emailNotificationsToggle.checked,
        desktop: desktopAlertsToggle.checked,
        sms: smsNotificationsToggle.checked,
      },
      visibility: accountVisibilitySelect.value,
    };

    console.log("Saving Settings:", settingsData);

    // Simulate saving settings (Replace with actual API call if needed)
    alert("Settings saved successfully!");
  });

  // Handle Cancel Button
  cancelButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to discard changes?")) {
      window.location.reload();
    }
  });

  // Handle Delete Account Link
  deleteAccountLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (confirm("This action will permanently delete your account and all associated data. Proceed?")) {
      console.log("Account deleted");
      alert("Your account has been deleted.");
    }
  });

  // Debug: Log toggles and dropdown changes
  twoFactorToggle.addEventListener("change", () => console.log("Two-Factor Authentication:", twoFactorToggle.checked));
  emailNotificationsToggle.addEventListener("change", () => console.log("Email Notifications:", emailNotificationsToggle.checked));
  desktopAlertsToggle.addEventListener("change", () => console.log("Desktop Alerts:", desktopAlertsToggle.checked));
  smsNotificationsToggle.addEventListener("change", () => console.log("SMS Notifications:", smsNotificationsToggle.checked));
  accountVisibilitySelect.addEventListener("change", () => console.log("Account Visibility:", accountVisibilitySelect.value));
});
