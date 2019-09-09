// 1. Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.

const topics = [
  'pets',
  'cooking',
  'flying',
  'poetry',
  'photography',
  'landscapes',
  'chocolate'
]

//     2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

function renderButtons() {
  // empty div
  $('.buttons').empty()

  for (i = 0; i < topics.length; i++) {
    // store for use with all buttons
    const button = $('<button>')

    // button class="topic"
    button.addClass('topic')

    // add an attribute
    button.attr('data-name', topics[i])

    // add the text for the buttons
    button.text(topics[i])

    // now, display the buttons
    $('.buttons').append(button)
  }
}
// Then make a function call that takes each topic in the array and remakes the buttons on the page.
renderButtons()

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// This function handles events where a topic button is clicked

$('#add-topic').on('click', function(event) {
  event.preventDefault()
  // This line grabs the input from the textbox
  let topic = $('#topic-input')
    .val()
    .trim()

  // Adding topic from the textbox to our array
  topics.push(topic)
  
  // console.log(topics)

  // Calling renderButtons which handles the processing of our topics array
  renderButtons()
})

// Adding a click event listener to all elements with a class of "topic"
$(document).on('click', '.topic', displayGifs)


function displayGifs() {
  let topic = $(this).attr('data-name')

  let queryURL =
    'https://api.giphy.com/v1/gifs/search?api_key=ZNjA9SArO1AeOZ3D1GTrMaHdxEEK3XPU&q=' +
    topic +
    '&limit=10&offset=0&rating=G&lang=en'

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    // $("#images").text(response.data.images)
    let results = response.data

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {
      // filter out not g ratings
      if (results[i].rating !== 'r' && results[i].rating !== 'pg-13') {
        console.log(response.data) // image url
        // Creating a div to hold the still images
        let gifDiv = $("<div class='gif-still'>")

        // // Retrieving the URL for the image
        // let imgURL = results[i].images.fixed_height_still.url
        let gifImage = $("<img>")
        // // Creating an element to hold the image
        // let gifImage = $('<img>').attr('src', imgURL)
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr('class', 'gif')
        gifImage.attr('data-state', 'still')
        gifImage.attr('data-animate', results[i].images.fixed_height.url)
        gifImage.attr('data-still', results[i].images.fixed_height_still.url)

        // Appending the image
        gifDiv.prepend(gifImage)

        // Storing the rating data
        let rating = results[i].rating

        // Creating an element to display the rating
        let p = $('<p>').text('Rating: ' + rating)

        // Displaying the rating
        gifDiv.append(p)

        // Putting the newest gif  above the previous gifs
        $('#images').prepend(gifDiv)
      }
    }
  })
}

// to animate or not to animate
$(document).on("click", ".gif", function ()  {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  let state = $(this).attr('data-state')
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === 'still') {
    $(this).attr('src', $(this).attr('data-animate'))
    $(this).attr('data-state', 'animate')
  } else {
    $(this).attr('src', $(this).attr('data-still'))
    $(this).attr('data-state', 'still')
  }
})


