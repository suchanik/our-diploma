$("#add-description-btn").on("click", () => {

    const recipeId = $("#recipeId").val();
    const userId = $("#userId").val();
    const description = $("#description").val();

    $.ajax({
        url: "/recipes/addComment",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            userId, recipeId, description
        }),
        success: results => {
            console.log(results);
            // renderEdit(results)
        },
        error: err => {
            renderErrorMsg("Błąd");
            console.log("BAD");
        }
    })
})