    $.ajax({
        url: "recipes/all_recipes_by_ingredients",
        method: "POST",
        contentType: "application/json",
        success: results => {
            ingredientsList(results)
            console.log(results)
        },
        error: err => {
            renderErrorMsg("Wystąpił błąd w wyszukiwaniu");
        }
    })

const renderErrorMsg = msg => {
    $("recipes-error-alert")
        .innerHTML(msg)
        .prop("hidden", false);
}

const ingredientsList = ingredients => {
    const $list = $("#ingredients-list");
    $list.html("")

    ingredients.forEach(ingredient => {
        $list.append(`<li> ${ingredient.ingredient} </li>`)
    })
}
