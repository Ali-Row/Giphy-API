// waits for the html to finish loading before running
$(document).ready(function() {

// new buttons will be pushed into this array;
let buttonsArray = ["Nissan", "Honda", "Subaru", "Toyota", "Jaguar", "Ferrari", "Dodge", "Mitsubishi", "Jeep", "Kia", "Saab", "Volvo", "Scion"];

let key = ["uGD1SsU4", "S6UDwxLV", "2sROuBjn", "AjHnzKYs"];
let secretKey = key.join("").split("").reverse().join("");
AOS.init();

//shows the buttons
function showGifButtons() {
    $("#show_buttons").empty();
    for (let i = 0; i < buttonsArray.length; i++) {
    let gifButtons = $('<button class="action btn btn-secondary rounded-pill animated zoomIn">');
    gifButtons.attr("data-name", buttonsArray[i]);
    gifButtons.text(buttonsArray[i]);
    $("#show_buttons").append(gifButtons);
    }
}

// function to add a new gif button
function addNewGifButton() {
    $("#submit_new_gif").on("click", function() {
    let action = $("#button_input").val().trim();
    if (!action) {
        return false;
    }
    buttonsArray.push(action);

    showGifButtons();
    return false;
    });
}

// function to display all of the gifs
function displayGifs() {
    let action = $(this).attr("data-name");
    let queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=" + secretKey + "&limit=45";

    // using AJAX to get back the JSON using the GET method
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    
    //promise
    .then(function(response) {
    $("#view_gifs").empty();

    let results = response.data;
    if (results == "") {
        alert("No gifs were found");
    }
    for (let i = 0; i < results.length; i++) {
        let gifDiv = $(`<div class="col-xs-3 mx-auto p-3" data-aos="fade-up"><div class="gifDiv">`);
        let gifRating = $("<p>").text("Rating: " + results[i].rating);
        
        //appends gif rating & gif image
        gifDiv.append(gifRating);
        let gifImage = $('<img class="image">');
        gifImage.attr("src", results[i].images.fixed_height_small_still.url);
        gifImage.attr(
        "data-still",
        results[i].images.fixed_height_small_still.url
        );
        gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
        gifImage.attr("data-state", "still");
        gifDiv.append(gifImage);

        $("#view_gifs").prepend(gifDiv);
    }
    });
}

showGifButtons();
addNewGifButton();

// changes the state of the gifs from still to animated using the on click function
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function() {
    let state = $(this).attr("data-state");
    if (state == "still") {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
    } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
    }
});
});
    