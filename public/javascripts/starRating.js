$(".rating").on("click", () => {

    // Rate.prototype.getValue = function()
    // {
    //     return this.value;
    // }
    let rate = document.querySelectorAll('input');
    const recipeId = $("#recipeId").val();
    const userId = $("#userId").val();

    for (let i = 0; i < rate.length; i++){
        rate[i].addEventListener('click',function (){
            i = this.value;
        })
    }

    $.ajax({
        url: "/recipes/addComment",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            userId, recipeId, rate
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
