// waits for the html to finish loading before running
$(document).ready(function() {

  // new buttons will be pushed into this array;
  var buttons_array = ["Nissan", "Honda", "Subaru", "Toyota", "Jaguar", "Ferrari", "Dodge", "Mitsubishi", "Jeep", "Kia", "Saab", "Volvo", "Scion"];

  //shows the buttons
  function show_gif_buttons() {
    $("#show_buttons").empty();
    for (var i = 0; i < buttons_array.length; i++) {
      var gif_buttons = $('<button class="action btn btn-primary">');
      gif_buttons.attr("data-name", buttons_array[i]);
      gif_buttons.text(buttons_array[i]);
      $("#show_buttons").append(gif_buttons);
    }
  }

  // function to add a new gif button
  function add_new_gif_button() {
    $("#submit_new_gif").on("click", function() {
      var action = $("#button_input")
        .val()
        .trim();
      if (action == "") {
        return false;
      }
      buttons_array.push(action);

      show_gif_buttons();
      return false;
    });
  }

  // function to display all of the gifs
  function display_gifs() {
    var action = $(this).attr("data-name");
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=sYKznHjAnjBuORs2VLxwDU6S4UsS1DGu&limit=10";

    // using AJAX to get back the JSON using the GET method
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    
    //promise
    .then(function(response) {
      $("#view_gifs").empty();

      var results = response.data;
      if (results == "") {
        alert("No gifs were found");
      }
      for (var i = 0; i < results.length; i++) {
        var gif_div = $('<div class="gif_div">');
        var gif_rating = $("<p>").text("Rating: " + results[i].rating);
        
        //appends gif rating & gif image
        gif_div.append(gif_rating);
        var gif_image = $('<img class="image">');
        gif_image.attr("src", results[i].images.fixed_height_small_still.url);
        gif_image.attr(
          "data-still",
          results[i].images.fixed_height_small_still.url
        );
        gif_image.attr("data-animate", results[i].images.fixed_height_small.url);
        gif_image.attr("data-state", "still");
        gif_div.append(gif_image);

        $("#view_gifs").prepend(gif_div);
      }
    });
  }

  show_gif_buttons();
  add_new_gif_button();

  // changes the state of the gifs from still to animated using the on click function
  $(document).on("click", ".action", display_gifs);
  $(document).on("click", ".image", function() {
    var state = $(this).attr("data-state");
    if (state == "still") {
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    }
  });
});
