const apiKey = '3Db1fOzaypgSB1XH8RHVVBDhvS3HjefJ';
const loader = document.querySelector('.loader');
const submitBtn = document.getElementById('submit-btn');

const box = document.querySelector('.box');

if (box) {
  loader.style.display = 'none';
  const generateGif = () => {
    loader.style.display = 'block';
    document.querySelector('.wrapper').style.display = 'none';

    const q = document.getElementById('search-box').value;

    let gifCount = 10;

    const finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
    document.querySelector('.wrapper').innerHTML = '';

    fetch(finalURL)
      .then((resp) => resp.json())
      .then((info) => {
        const gifsData = info.data;
        gifsData.forEach((gif) => {
          const container = document.createElement('div');
          container.classList.add('container');
          const iframe = document.createElement('img');

          iframe.setAttribute('src', gif.images.downsized_medium.url);
          iframe.onload = () => {
            gifCount--;
            if (gifCount == 0) {
              loader.style.display = 'none';
              document.querySelector('.wrapper').style.display = 'grid';
            }
          };
          container.append(iframe);

          const copyBtn = document.createElement('button');
          copyBtn.innerText = 'Copy Link';
          copyBtn.onclick = () => {
            const copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
            navigator.clipboard
              .writeText(copyLink)
              .then(() => {
                alert('GIF copied to clipboard');
              })
              .catch(() => {
                alert('GIF copied to clipboard');

                const hiddenInput = document.createElement('input');
                hiddenInput.setAttribute('type', 'text');
                document.body.appendChild(hiddenInput);
                hiddenInput.value = copyLink;

                hiddenInput.select();

                document.execCommand('copy');

                document.body.removeChild(hiddenInput);
              });
          };
          container.append(copyBtn);
          document.querySelector('.wrapper').append(container);
        });
      });
  };
  submitBtn.addEventListener('click', generateGif);
}
