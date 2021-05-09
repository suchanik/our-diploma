$("#show-recipes-by-category-btn").on("click", () => {
    const selectedCategory = $("#category-select option:selected").map(function () {
        return this.value;
    }).get();

    $.ajax({
        url: "recipes/all_recipes_by_category",
        method: "POST",
        data: JSON.stringify({
            categoryIDs: selectedCategory
        }),
        contentType: "application/json",
        success: results => {
            categorySelectedRecipes(results)
            console.log(results)
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

const categorySelectedRecipes = recipes => {
    const $list = $("#rendered_CRecipes-list");
    $list.html("")

    recipes.forEach(recipe => {
        $list.append(`<li> <a href=/recipes/${recipe.id} >${recipe.name}</a> </li>`)
    })
}

$(document).ready(() => {
    $(".category-select").selectpicker();
})
