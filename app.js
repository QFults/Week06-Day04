const { createConnection } = require('mysql2')
const { prompt } = require('inquirer')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/restaurant_db')

const changeEntree = () => {
  db.query('SELECT * FROM entrees', (err, entrees) => {
    prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Select a Entree to Update the Price Of:',
        choices: entrees.map(entree => ({
          name: `${entree.name} ${entree.price}`,
          value: entree.id
        }))
      },
      {
        type: 'number',
        name: 'price',
        message: 'Set a New Price For the Entree:'
      }
    ])
      .then(({ id, price }) => {
        db.query('UPDATE entrees SET ? WHERE ?', [{ price }, { id }], err => {
          if (err) { console.log(err) }
          console.log('Entree Price Updated!')
          mainMenu()
        })
      })
  })
}

const changeDrink = () => {
  db.query('SELECT * FROM drinks', (err, drinks) => {
    prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Select a Drink to Update the Price Of:',
        choices: drinks.map(drink => ({
          name: `${drink.name} $${drink.price}`,
          value: drink.id
        }))
      },
      {
        type: 'number',
        name: 'price',
        message: 'Set a New Price For the Drink:'
      }
    ])
      .then(({ id, price }) => {
        db.query('UPDATE drinks SET ? WHERE ?', [{ price }, { id }], err => {
          if (err) { console.log(err) }
          console.log('Drink Price Updated!')
          mainMenu()
        })
      })
  })
}

const deleteEntree = () => {
  db.query('SELECT * FROM entrees', (err, entrees) => {
    prompt({
      type: 'list',
      name: 'id',
      message: 'Select a Entree to Delete:',
      choices: entrees.map(entree => ({
        name: `${entree.name} ${entree.price}`,
        value: entree.id
      }))
    })
      .then(res => {
        db.query('DELETE FROM entrees WHERE ?', res, err => {
          if (err) { console.log(err) }
          console.log('Entree Deleted!')
          mainMenu()
        })
      })
  })
}

const deleteDrink = () => {
  db.query('SELECT * FROM drinks', (err, drinks) => {
    prompt({
      type: 'list',
      name: 'id',
      message: 'Select a Drink to Delete:',
      choices: drinks.map(drink => ({
        name: `${drink.name} $${drink.price}`,
        value: drink.id
      }))
    })
      .then(res => {
        db.query('DELETE FROM drinks WHERE ?', res, err => {
          if (err) { console.log(err) }
          console.log('Drink Deleted!')
          mainMenu()
        })
      })
  })
}

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
    choices: [
      'Create an Entree',
      'Create a Drink',
      'Change an Entree Price',
      'Change a Drink Price',
      'View All Entrees',
      'View All Drinks',
      'Delete an Entree',
      'Delete a Drink']
  })
    .then(({ action }) => {
      switch (action) {
        case 'Create an Entree':
          createEntree()
          break
        case 'Create a Drink':
          createDrink()
          break
        case 'Change an Entree Price':
          changeEntree()
          break
        case 'Change a Drink Price':
          changeDrink()
          break
        case 'View All Entrees':
          viewEntrees()
          break
        case 'View All Drinks':
          viewDrinks()
          break
        case 'Delete an Entree':
          deleteEntree()
          break
        case 'Delete a Drink':
          deleteDrink()
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