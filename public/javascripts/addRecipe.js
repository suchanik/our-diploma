// $("#add-recipe-btn").on("click", () => {
//     const selectedIngredients = $("#ingredients-select option:selected").map(function () {
//         return this.value;
//     }).get();
//     const selectedCategory = $("#category-select option:selected").map(function () {
//         return this.value;
//     }).get();
//     const addImage = $("#image-adding").map(function (){
//         return this.value;
//     }).get()
//
//     $.ajax({
//         url: "recipes/addrecipe",
//         method: "POST",
//         data: JSON.stringify({
//             ingrediendsIDs: selectedIngredients,
//             categoryIDs: selectedCategory,
//
//         }),
//         contentType: "application/json",
//         success: results => {
//             console.log(results);
//             // renderSelectedRecipes(results)
//         },
//         error: err => {
//             renderErrorMsg("Wystąpił błąd w wyszukiwaniu");
//         }
//     })
// })

const renderErrorMsg = msg => {
    $("#recipes-error-alert")
        .innerHTML(msg)
        .prop("hidden", false);
}


$(document).ready(() => {
    $(".ingredients-select").selectpicker({
        locale: {
            statusNoResults: 'Brak wyników, spróbuj wpisać inaczej'
        }
    });
    $(".category-select").selectpicker();
})

$(document).ready(() => {
    $(".category-select").selectpicker();
})
