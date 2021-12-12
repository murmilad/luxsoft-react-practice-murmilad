const Datastore = require('nedb')
const SUCCESS = "success" // response in case of successful operation

const db = {};
db.selections = new Datastore({filename: './datasources/selections.db', autoload: true});

module.exports = {
  addSelection: (selection) => new Promise((resolve, reject) =>{
    db.selections.insert(selection, function (err, newDocs) {
      if (err) {
        reject(err)
      } else {
        resolve(newDocs)
      }
  })
}),

  getSelections: (query)  => new Promise((resolve, reject) =>{
    db.selections.find(query, function (err, docs) {
      if (err) {
        reject(err)
      } else {
        console.log('selections ' + JSON.stringify(docs))    
        resolve(docs)
      }
    })
  }),

  getSelection: (id)  => new Promise((resolve, reject) =>{
    db.selections.find({_id: id}, function (err, docs) {
      if (err) {
        reject(err)
      } else {
        resolve(docs[0])
      }
    })
  }),

  editSelection: (id, selection)  => new Promise((resolve, reject) =>{
    db.selections.update({_id: id}, selection, function (err, numReplaced) {
      if (err) {
        reject(err)
      } else {
        resolve(selection)
      }
    })
  }),

  addBooksToSelection: (id, books)  => new Promise((resolve, reject) =>{
    db.selections.find({_id: id}, (err, docs) => {
        if (docs.length>1) {
            console.log("Too much selections with id "+id)
            reject( "Too much selections with id "+id)
        } else if (docs.length == 1) {
          db.selections.update({_id: id},
            { $addToSet: {books: books[0]} }, function (err) {
            if (err) {
              reject(err)
            } else {
              resolve(docs[0])
            }
          })
        } else {
          console.log("Not found selections with id "+id)
          reject( "Not found selections with id "+id)
        }
      })
    }),

  deleteBookFromSelection: (selectionId, bookId)  => new Promise((resolve, reject) =>{
    console.log('delege book from selection selectionId=' + selectionId + ' bookId=' + bookId)    
    db.selections.find({_id: selectionId}, (err, docs) => {
      if (docs.length>1) {
          console.log("Too much selections with id "+selectionId)
          reject( "Too much selections with id "+selectionId)
      } else if (docs.length == 1) {
        db.selections.update({_id: selectionId},
          { $pull: {books: {_id: bookId}} }, err => {
              if (err) {
                reject(err)
              } else {
                resolve(docs[0])
              }
        })
      } else {
        console.log("Not found selections with id "+selectionId)
        reject( "Not found selections with id "+selectionId)
      }
    })
}),

  deleteSelection: (id)  => new Promise((resolve, reject) =>{
    db.selections.remove({_id: id}, {}, err => {
        if (err) {
          reject(err)
        } else {
          resolve(SUCCESS)
        }
    })
  }),

}