const numberFacts = document.querySelector('.number-facts')
const favNumberFacts = document.querySelector('.fav-number-facts')

let favNum = 22 
let baseURL = 'http://numbersapi.com'


// 1. Make request to the Numbers API to get a fact about your favorite number
axios.get(`${baseURL}/${favNum}/?json`)
  .then(res => console.log(res))


// 2. Get data on multiple numbers in a single request 
let favNums = [2,4,6]

axios.get(`${baseURL}/${favNums}?json`)
  .then(res => {
    for (let num in res.data){
      const fact = createFactHTML(res.data[num]);
      numberFacts.append(fact);
    }
  })
  .catch(err => console.log('Error', err))

function createFactHTML(fact){
  const li = document.createElement('li');
  li.append(fact);
  return li;
}

// 3. Get 4 facts for favorite number
Promise.all(Array.from({length:4}, () => {
  return axios.get(`${baseURL}/${favNum}/?json`)
}))
  .then(res => {  
    for (let fact of res){
      const text = createFactHTML(fact.data.text);
      favNumberFacts.append(text)
    }
  })
  .catch(err => {
    favNumberFacts.append('something went wrong', err)
  })