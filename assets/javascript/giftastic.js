var animals = ["Bear", "Sheep", "Lion", "Tiger", "Panda", "Sloth", 
				"Baby Elephant", "Pig", "Dog", "Cat", "Hawk", "Eagle", 
				"Racoon", "Red Panda", "Walrus", "Dolphin", "Sugar Glider", 
				"Chinchilla", "Frog", "Chicken", "Duck", "Rabbit"]

function renderButtons() {
    $(".animalButtons").empty();
    for (var i = 0; i < animals.length; i++) {
    var animalbuttons = $("<button>", {id:"aButtons"});
    animalbuttons.addClass("animalclick");
    animalbuttons.attr("data-name", animals[i]);
    animalbuttons.text(animals[i]);
    $(".animalButtons").append(animalbuttons);
    }
  }

function displayAnimalGifs() {

var animal = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+animal+"&g&limit=10&rating=g";
$("#animals").empty();

	$.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
    console.log(response);
    for (i = 0; i < response.data.length; i++) {
    var animalDiv = $("<div class='animalgif'>");

    var gifURL = response.data[i].images.fixed_height_still.url;
    var gif = $("<img>").attr("src", gifURL);
    animalDiv.append(gif);

    var rating = response.data[i].rating;
    var pRating = $("<p>").text("Rating: " + rating);
    animalDiv.append(pRating);

    $("#animals").append(animalDiv);
	}
  });
 }

$("#addAnimal").on("click", function(event) {
  	event.preventDefault();
    var animal = $("#animal-input").val();
    animals.push(animal);
    $("#animal-form")[0].reset();
    renderButtons();
    });
	

$(document).on("click", ".animalclick", displayAnimalGifs);

//This function alters just one portion of the img src link to swap it between a still gif and an animated one. 
//Brilliant code.
$(document).on("click", "img", function () {
    var src = $(this).attr("src");
      if($(this).hasClass("animated")){
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass("animated");
      } else {
        $(this).addClass("animated");
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
});

renderButtons();