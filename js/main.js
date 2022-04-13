//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

let cache

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${choice}&origin=*&format=json`

  fetch(url)
      .then(res => res.json())
      .then(data => {

        console.log(data)
        cache = data
        let list = []
        for ([key, value] of Object.entries(data.query.search)) {
          list.push({title: value.title, url: `https://en.wikipedia.org/?curid=${value.pageid}`, snippet: value.snippet})
        }
        let outHTML = ''
        list.forEach(item => {
          outHTML += `<li><a href="${item.url}">${item.title}</a><p>${item.snippet + '...'}<p></li>`
        })

        document.querySelector('h3').innerText = 'Results'
        document.querySelector('ul').innerHTML = outHTML
        console.log(list)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}