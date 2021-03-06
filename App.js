import React, { Component } from 'react';
import ReactDOM from 'react-dom';
let title,poster,length;
class App extends Component {
  constructor(){
    super();
}
search(text) {
  console.log(text);
  var url=`http://imdb.wemakesites.net/api/search?api_key=4447c0bd-2cee-4944-a4c9-5579cc89f8d7&q=${text}`;
  var method="GET"
  var xhttp = new XMLHttpRequest();
  var data;
  let dis,view;
  let list,t,id=[];
  document.getElementById("movie").innerHTML = "";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      xhttp.responseType="jsonp"
      data = JSON.parse(xhttp.responseText);
      console.log("data "+data.data.results.titles.length);
      if(data.status="success"){
        let check=<div></div>
        ReactDOM.render(check,document.getElementById("movie"))
        dis=document.getElementById("movie")
        view=document.createElement('div')
        view.id="view"
        length=data.data.results.titles.length
        for(let i=0;i<length;i++){
          title=data.data.results.titles[i].title;
          poster=data.data.results.titles[i].thumbnail
          console.log("title "+title);
          id[i]=data.data.results.titles[i].id
          list=document.createElement('img');
          list.src=poster;
          list.id=id[i]
          t=document.createElement('h3');
          var d=document.createTextNode(title)
          t.appendChild(d);
          view.appendChild(list)
          view.appendChild(t)
        }
        dis.appendChild(view)
      }
      else{
        let check=<div>
        <h1>Error</h1>
        </div>
        ReactDOM.render(check,document.getElementById("movie"))
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
  document.addEventListener("click", function (eventArgs) {
    var target = eventArgs.target;
    console.log(eventArgs);
    for (var i = 0; i < length; i++) {
      let check=<div></div>
      ReactDOM.render(check,document.getElementById("movie"))
      var elementToLookFor =id[i];
      if (target.id.toLowerCase() == elementToLookFor) {
        var url1=`http://www.omdbapi.com/?i=${id[i]}&plot=short&r=json`
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(xhttp.responseText);
            if(data.Response=="True"){
              let dis=<div>
              <img src={data.Poster}/>
              <h1>{data.Title}</h1>
              <table>
              <tbody>
              <tr>Year:<td>{data.Year}</td></tr>
              <tr>Released:<td>{data.Released}</td></tr>
              <tr>Genre:<td>{data.Genre}</td></tr>
              <tr>Director:<td>{data.Director}</td></tr>
              <tr>Actors:<td>{data.Actors}</td></tr>
              <tr>Plot:<td>{data.Plot}</td></tr>
              <tr>Language:<td>{data.Language}</td></tr>
              </tbody>
              </table>
              <h2></h2>
              </div>
              ReactDOM.render(dis,document.getElementById("movie"))
            }
            else {
              let check=<div>
              <h1>Error</h1>
              </div>
              ReactDOM.render(check,document.getElementById("movie"))
            }
          }
        };
        xhttp.open("GET", url1, true);
        xhttp.send();
      }
    }
  });
}
render() {
  return (
    <div>
    <br/>
    <hr/>
    Movie Name<input type="text" ref="moviename"/>
    <button onClick={() => {this.search(this.refs.moviename.value)}}>
    Search</button>
    <br/>
    <list />
    </div>
  )
  }
}
export default App;
