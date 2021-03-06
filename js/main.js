// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
// save bookmark
function saveBookmark(e){
// get form values
var sitename = document.getElementById('sitename').value;
console.log(sitename);
var siteurl = document.getElementById('siteurl').value;

if(!validateForm(sitename, siteurl)){
  return false;
}

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
 // re-fetchbookmarks
 fetchbookmarks();

  // prevent form from submitting
  e.preventDefault();
}

// deleteBookmark
function deleteBookmark(url) {
  // get bookmarks from kocal localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // loop through bookmarksResults
  for(var i = 0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // remove from array
      bookmarks.splice(i,1);
    }
  }
  // reset back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // re-fetchbookmarks
  fetchbookmarks();
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

  bookmarksResults.innerHTML += '<div class = "well">'+
                                  '<h3>'+name+
                                  ' <a class = "btn btn-default" target ="_blank" href = "'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}

// validate format
function validateForm(sitename, siteurl){
  if(!sitename || !siteurl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteurl.match(regex)){
    alert('Please Use a Valid URL');
    return false;
  }
  return true;
}
