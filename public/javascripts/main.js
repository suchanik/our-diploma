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
            console.log(results);
            renderSelectedRecipes(results)
        },
        error: err => {
            renderErrorMsg("Wystąpił błąd w wyszukiwaniu");
        }
    })
})

const renderErrorMsg = msg => {
    $("#recipes-error-alert")
        .innerHTML(msg)
        .prop("hidden", false);
}

const renderSelectedRecipes = recipes => {
    const $list = $("#rendered_recipes-list");
    $list.html("")

    recipes.forEach(recipe => {
        $list.append(`<div class="col-sm-4" >
                        <a href=/recipes/${recipe.id} >
                            <img src="${recipe.picture_path}"
                             class="img-box">
                        </a>
                        <a href=/recipes/${recipe.id} >
                            <figcaption>${recipe.name}</figcaption>
                        </a> 
                    </div>
                   `)
    })

}

$(document).ready(() => {
    $(".ingredients-select").selectpicker({
        locale: {
            statusNoResults: 'Brak wyników, spróbuj wpisać inaczej'
        }
    });
})

