const { createConnection } = require('mysql2')

const db = createConnection('mysql://root:rootroot@localhost/restaurant_db')

// db.query('SELECT * FROM entrees WHERE price > ?', [9], (err, entrees) => {
//   if (err) { console.log(err) }
//   console.log(entrees)
// })

// let name = 'Nachos'

// db.query('SELECT * FROM entrees WHERE ?', [{ name }], (err, entrees) => {
//   if (err) { console.log(err) }
//   console.log(entrees)
// })

// let entree = {
//   name: 'Birria Tacos',
//   description: 'tacos with melted cheese and meat with a dipping sauce',
//   price: 9
// }

// db.query('INSERT INTO entrees SET ?', entree, err => {
//   if (err) { console.log(err) }
//   console.log('Entree added!')
// })