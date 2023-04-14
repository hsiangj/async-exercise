const baseURL = 'https://deckofcardsapi.com/api/deck'

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// async function part1(){
//   let res = await axios.get(`${baseURL}/new/draw`)
//   const {value, suit} = res.data.cards[0]
//   console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
// }
// part1();

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. Once you have both cards, console.log the values and suits of both cards.


// async function part2(){
//   let res = await axios.get(`${baseURL}/new/draw`);
//   let firstCard = res.data.cards[0];
//   const deckID = res.data.deck_id;
//   let res2 = await axios.get(`${baseURL}/${deckID}/draw/?count=1`)
//   let secondCard = res2.data.cards[0];
//   [firstCard, secondCard].forEach(card => 
//   console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`))
// }
// part2();


  // 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let deckId;
let button = document.querySelector('button')
let cardArea = document.getElementById('card-area')



async function part3(){
  let res = await axios.get(`${baseURL}/new/shuffle`)
  deckId = res.data.deck_id;

  button.addEventListener('click', async function(){
    let res = await axios.get(`${baseURL}/${deckId}/draw`)
    cardArea.innerHTML = "";
    let img = document.createElement('img');
    img.src = res.data.cards[0].image;
    cardArea.append(img);
    
    if (res.data.remaining === 0){
      button.remove();
    }
  })
}
part3();

