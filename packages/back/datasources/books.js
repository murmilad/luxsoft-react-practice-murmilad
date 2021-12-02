const Datastore = require('nedb')
const SUCCESS = "success" // response in case of successful operation

const db = {};
db.books = new Datastore({filename: './datasources/books.db', autoload: true});


module.exports = {
  addBook: (book) => new Promise((resolve, reject) =>{
    db.books.find({title: book.title, author: book.author}, function (err, docs) {
      if (docs.length > 0) {
          if (err) {
            reject(err)
          } else {
            reject( "BookInSelection with the same title and author already exists")
          }
      } else {
          db.books.insert({title: book.title, author: book.author}, function (err, newDocs) {
              if (err) {
                reject(err)
              } else {
                resolve(newDocs)
              }
          })
      }
    })
  }),

  getBooks: (query)  => new Promise((resolve, reject) =>{
    console.log('get books ' + JSON.stringify(query))    
    db.books.find(query, function (err, docs) {
      if (err) {
        console.log('err ' + err)    
        reject(err)
      } else {
        resolve(docs)
      }
    })
  }),

  getBook: (id)  => new Promise((resolve, reject) =>{
    db.books.find({_id: id}, function (err, docs) {
      if (err) {
        reject(err)
      } else {
        resolve(docs[0])
      }
    })
  }),

  editBook: (id, book)  => new Promise((resolve, reject) =>{
    db.books.update({_id: id}, book, function (err, numReplaced) {
      if (err) {
        reject(err)
      } else {
        resolve(book)
      }
    })
  }),

  deleteBook: (id)  => new Promise((resolve, reject) =>{
    console.log('delete book ' + JSON.stringify(id))    
    db.books.find({_id: id}, (err, docs) => {
      if (docs.length>0) {
        db.books.remove({_id: id}, {}, err => {
          if (err) {
            reject(err)
          } else {
            resolve(SUCCESS)
          }
        })
      } else {
        console.log("Can't be removed: book is used in selection "+docs[0].title)
        reject("Can't be removed: book is used in selection "+docs[0].title)
      }
    })
  }),

}