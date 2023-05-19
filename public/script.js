const submitButton = document.querySelector('#submit-movies');
const searchBox = document.querySelector('#search-box');
const wrapper = document.querySelector('.wrapper');
const movieBox = document.querySelector('.moviebox');

if (movieBox) {
  submitButton.addEventListener('click', async () => {
    const data = await fetch(`https://search.imdbot.workers.dev/?q=${searchBox.value}`);
    const movieInfo = await data.json();
    while (wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild);
    }
    console.log(movieInfo.description);
    movieInfo.description.forEach((el) => {
      const newDiv = document.createElement('div');

      wrapper.append(newDiv);
      newDiv.classList.add('movie-div');
      newDiv.id = el['#IMDB_ID'];
      newDiv.innerHTML = `<h3>${el['#TITLE']} ${el['#YEAR']}</h3>
    <img width="200" height="320" src="${el['#IMG_POSTER']}">
    <button type="button" id="add">Add to favourites</button>
    `;
    });
  });
}

if (wrapper) {
  wrapper.addEventListener('click', async (event) => {
    if (event.target.id === 'add') {
      const id = { id: event.target.parentNode.id };
      const response = await fetch('/movies/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      console.log(result);
    }
    if (event.target.id === 'remove') {
      const movieID = { movieID: event.target.parentNode.parentNode.parentNode.id };
      const response = await fetch('/movies/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieID }),
      });
      const result = await response.json();
      wrapper.removeChild(event.target.parentNode.parentNode.parentNode)
    }
  });
}



