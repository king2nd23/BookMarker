// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
// save bookmark
function saveBookmark(e){
// get form values
var sitename = document.getElementById('sitename').value;
console.log(sitename);
var siteurl = document.getElementById('siteurl').value;

var bookmark = {
  name: sitename,
  url: siteurl
}
console.log(bookmark);

console.log(siteurl);

// test for bookmarks
 if(localStorage.getItem('bookmarks') === null){
// init array
    var bookmarks = [];
    // add to array
    bookmarks.push(bookmark);
    // set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
 }  else{
   // get bookmark from local storage
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   // add bookmark to array
   bookmarks.push(bookmark);
   // reset back to local storage
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
 }


  // prevent form from submitting
  e.preventDefault();
}

// fetch bookmarks

function fetchbookmarks(){
  // get bookmark from local storage !!!local storage only stores strings
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // get output //
  var bookmarkResults = document.getElementById('bookmarksResults');

  // build output
  bookmarksResults.innerHTML = '';
  for( var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += name;
  }
}
