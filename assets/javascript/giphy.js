// 1. Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.

const topics = [
  'pets',
  'cooking',
  'flying',
  'poetry',
  'photography',
  'landscapes'
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

// function renderNewButtons() {
//   // empty div
//   $('.guest-buttons').empty()

//   for (i = 0; i > topics.length; i++) {
//     // store for use with all buttons
//     const button = $('<button>')

//     // button class="topic"
//     button.addClass('topic')

//     // add an attribute
//     button.attr('data-name', topics[i])

//     // add the text for the buttons
//     button.text(topics[i])

//     // now, display the buttons
//     $('.buttons').append(button)
//   }
// }
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
    console.log(response.data)
    // console.log(response.data[0].images.downsized_still.url) image url
    // Creating a div to hold the still images
    let gifDiv = $("<div class='gif-still'>")

    // Storing the rating data
    let rating = response.data[i].rating

    // Creating an element to display the rating
    let p = $('<p>').text('Rating: ' + rating)

    // Displaying the rating
    gifDiv.append(p)

    // Retrieving the URL for the image
    let imgURL = response.data[0].images.fixed_height_small_still.url

    // Creating an element to hold the image
    let image = $('<img>').attr('src', imgURL)

    // Appending the image
    gifDiv.append(image)

    // Putting the newest gif  above the previous gifs
    $('#images').prepend(gifDiv)
  })
}

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 7. Deploy your assignment to Github Pages.

// 8. **Rejoice**! You just made something really cool.

// Example queryURL for Giphy API

