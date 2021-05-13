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
                            <img src="https://mediaconvert.kukbuk.pl/ksTNHdwFDa7biY17BBiWpov4JEeRSOx4uNtbqEs6RrM/fill/1418/1682/fp:0.5:0.5/1/aHR0cHM6Ly9tZWRp/YS5rdWtidWsucGwv/bWVkaWEvaW1hZ2Vz/LzIwMTkvMDMtMTgv/ZmV0dHVjaW5lMV90/aW5pZmllZF90aW5p/ZmllZC5qcGc.jpg"
                                 class="img-fluid">
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

