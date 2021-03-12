const { createConnection } = require('mysql2')
const { prompt } = require('inquirer')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/restaurant_db')

const createEntree = () => {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the entree name?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Describe the entree:'
    },
    {
      type: 'number',
      name: 'price',
      message: 'What is the price of the entree?'
    }
  ])
    .then(entree => {
      db.query('INSERT INTO entrees SET ?', entree, err => {
        if (err) { console.log(err) }
        console.log('Entree Created!')
        mainMenu()
      })
    })
    .catch(err => console.log(err))
}

const createDrink = () => {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the drink name?'
    },
    {
      type: 'list',
      name: 'size',
      message: 'What size is the drink?',
      choices: ['Small', 'Medium', 'Large']
    },
    {
      type: 'number',
      name: 'price',
      message: 'What is the price of the drink?'
    }
  ])
    .then(drink => {
      db.query('INSERT INTO drinks SET ?', drink, err => {
        if (err) { console.log(err) }
        console.log('Drink Created!')
        mainMenu()
      })
    })
    .catch(err => console.log(err))
}

const viewEntrees = () => {
  db.query('SELECT * FROM entrees', (err, entrees) => {
    if (err) { console.log(err) }
    console.table(entrees)
    mainMenu()
  })
}

const viewDrinks = () => {
  db.query('SELECT * FROM drinks', (err, drinks) => {
    if (err) { console.log(err) }
    console.table(drinks)
    mainMenu()
  })
}

const mainMenu = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['Create an Entree', 'Create a Drink', 'View All Entrees', 'View All Drinks']
  })
    .then(({ action }) => {
      switch (action) {
        case 'Create an Entree':
          createEntree()
          break
        case 'Create a Drink':
          createDrink()
          break
        case 'View All Entrees':
          viewEntrees()
          break
        case 'View All Drinks':
          viewDrinks()
          break
      }
    })
    .catch(err => console.log(err))
}

mainMenu()

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