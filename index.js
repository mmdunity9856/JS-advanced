// 必要な関数をモジュールからインポートする
import { $axios } from './axiosHelper.js';
import { createErrorElement, createElements } from './createElement.js';

window.addEventListener('DOMContentLoaded', () => {
  const characterElement = document.querySelector('.list');

  // ここに処理を書いていく
$axios('https://pokeapi.co/api/v2/pokemon/?limit=151')
  .then(response => {
    response.data.results.forEach(({ url }) => 
      $axios(url)
    .then(response => {
              console.log(response)
      const imgPath = response.data.sprites.other['official-artwork'].front_default;
      $axios(response.data.species.url)
      .then(response => {
        const characterName = response.data.names[0].name;
        const imgElement = `<li><div class="character"><img src="${imgPath}" width="475" height="475" alt="" class="character__img"></div>`;
        const nameElement = `<p class="character__name">${characterName}</p>`;
        const fragment = createElements(imgElement + nameElement);
        characterElement.appendChild(fragment);
        characterElement.classList.add('list');
        console.log(response);
      });
    }));
  })
  .catch(error => {
        console.log(error)
        characterElement.after(createErrorElement(error));
        });;
});