$("#show-recipes-by-ingredients-btn").on("click", () => {
    const selectedIngredients = $("#ingredients-select option:selected").map(function () {
        return this.value;
    }).get();

    $.ajax({
        url: "recipes/all_recipes_by_ingredients",
        method: "POST",
        data: JSON.stringify({
            ingrediendsIDs: selectedIngredients
        }),
        contentType: "application/json",
        success: results => {
            renderSelectedRecipes(results)
        },
        error: err => {
            renderErrorMsg("Wystąpił błąd w wyszukiwaniu");
        }
    })
})

const renderErrorMsg = msg => {
    $("recipes-error-alert")
        .innerHTML(msg)
        .prop("hidden", false);
}

//losowy przepis
const renderSelectedRecipes = recipes => {
    const $list = $("#rendered_recipes-list");
    $list.html("")

    recipes.forEach(recipe => {
        $list.append(`<li> <a href="/randomRecipe" >${recipe.name}</a> </li>`)
    })

}

$(document).ready(() => {
    $(".ingredients-select").selectpicker();
})
