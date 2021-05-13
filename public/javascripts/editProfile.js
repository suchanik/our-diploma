$("#save-profile-btn").on("click", () => {

    const userId = $("#userId").val();
    const password = $("#password").val();

    $.ajax({
        url: "/users/editProfile",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            password, userId
        }),
        success: results => {
            console.log(results);
            // renderEdit(results)
        },
        error: err => {
            renderErrorMsg("Błąd");
        },
        complete: () => hideUserForm(),
    })
})

function hideUserForm() {
    $("#user-data-view").prop("hidden", false);
    $("#user-data-form").prop("hidden", true);
}
function showUserForm() {
    $("#user-data-view").prop("hidden", true);
    $("#user-data-form").prop("hidden", false);
}

$("#edit-user-btn").on("click", () => {
    showUserForm();
})

$("#cancel-profile-btn").on("click", () => {
    hideUserForm();
})



