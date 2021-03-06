// $(".rating").on("click", () => {
//
//     // Rate.prototype.getValue = function()
//     // {
//     //     return this.value;
//     // }
//     let rate = document.querySelectorAll('input');
//     const recipeId = $("#recipeId").val();
//     const userId = $("#userId").val();
//
//     for (let i = 0; i < rate.length; i++){
//         rate[i].addEventListener('click',function (){
//             i = this.value;
//         })
//     }
//
//     $.ajax({
//         url: "/recipes/addComment",
//         method: "POST",
//         contentType: "application/json",
//         data: JSON.stringify({
//             userId, recipeId, rate
//         }),
//         success: results => {
//             console.log(results);
//             // renderEdit(results)
//         },
//         error: err => {
//             renderErrorMsg("Błąd");
//             console.log("BAD");
//         }
//     })
// })

const options = {
    max_value: 5,
    step_size: 1,
    initial_value: $("#userRate").val(),
    selected_symbol_type: 'utf8_star', // Must be a key from symbols
    hover: '\u2B22',
    cursor: 'default',
    readonly: $("#userId").val() === "",
    change_once: false, // Determines if the rating can only be set once
    ajax_method: 'POST',
    url: 'http://localhost:3000/recipes/addRate',
    additional_data: {
        userId: $("#userId").val(),
        recipeId: $("#recipeId").val()
    }, // Additional data to send to the server
    update_input_field_name: $("#star-value"),
    // after: window.location.reload()
}

$(".rating").rate(options);
// $(".rating").rate("getValue");
$(".rating").rate("setValue");
$(".rating").on("change", function(ev, data){
    console.log(data.from, data.to);
});

$(".rating").on("updateSuccess", function(ev, data){
    window.location.reload();
})
