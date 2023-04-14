const numberFacts = document.querySelector('.number-facts')
const favNumberFacts = document.querySelector('.fav-number-facts')

let favNum = 22 
let baseURL = 'http://numbersapi.com'


// 1. Make request to the Numbers API to get a fact about your favorite number
async function part1(){
  let res = await axios.get(`${baseURL}/${favNum}/?json`)
  console.log(res)
}
part1();

// 2. Get data on multiple numbers in a single request 
let favNums = [2,4,6,8]
async function part2(){
  let {data} = await axios.get(`${baseURL}/${favNums}?json`)
  for (let num in data){
    const fact = createFactHTML(data[num]);
    numberFacts.append(fact);
  }
}

function createFactHTML(fact){
  const li = document.createElement('li');
  li.append(fact);
  return li;
}
part2();

// 3. Get 4 facts for favorite number
async function part3(){
  let res = await Promise.all(
    Array.from({length:4}, () => axios.get(`${baseURL}/${favNum}/?json`)))

  // or
  // [
  //   axios.get(`${baseURL}/${favNum}/?json`),
  //   axios.get(`${baseURL}/${favNum}/?json`),
  //   axios.get(`${baseURL}/${favNum}/?json`),
  //   axios.get(`${baseURL}/${favNum}/?json`)
  // ]

  for (let fact of res){
    const text = createFactHTML(fact.data.text);
    favNumberFacts.append(text)
  }
}
part3();