
exports.seed = function(knex, Promise) {
  return knex('fbot_restaurants').del()
    .then(() => {
      return knex('fbot_restaurants').insert([
        {id: 1, name: 'Table 17 Catering', type: 'European'},
        {id: 2, name: 'El Arepazo', type: 'Venezuelan'},
        {id: 3, name: 'Korean Spice Catering', type: 'Korean'},
        {id: 4, name: 'Hungry Ninja', type: 'Ramen'},
        {id: 5, name: 'Krystos', type: 'Greek'},
      ]);
    })
    .then(() => {
      return knex('fbot_menus').del()
        .then(() => {
          return knex('fbot_menus').insert([
            {
              id: 1,
              restraunt_id: 1,
              name: 'Citrus Kale Salad',
              ingredients: 'Baby kale, supremes of orange and grapefruit, shaved fennel and citrus vinaigrette',
            },
            {
              id: 2,
              restraunt_id: 1,
              name: 'Slow Roasted Chicken Quinoa Table Plate',
              ingredients: 'Chicken served over Quinoa Tabule with pickled cucumbers, tomatoes, pickled turnips, topped with house-made tahini dressing',
            },
            {
              id: 3,
              restraunt_id: 1,
              name: 'Steak & Mushroom Plate',
              ingredients: 'Sous vide steak, roasted Cremini mushrooms served over barley salad with carrot and celery ribbons, shallot vinaigrette',
            },
            {
              id: 4,
              restraunt_id: 1,
              name: 'Veggie Frittata',
              ingredients: 'Black kale, shallots, potatoes, pecorino & gruyere cheese, parsley & green onion, with a side of arugula & red wine vinaigrette',
            },
            {
              id: 5,
              restraunt_id: 2,
              name: 'Yuca',
              ingredients: 'six cassava fried sticks',
            },
            {
              id: 6,
              restraunt_id: 2,
              name: 'La Sifrina',
              ingredients: 'chicken breast, avocado, diced onions, Montreal cheddar',
            },
            {
              id: 7,
              restraunt_id: 2,
              name: 'Veggie the Works',
              ingredients: 'Black beans, sweet plantains, avocado, tomato, fresco cheese',
            },
            {
              id: 8,
              restraunt_id: 2,
              name: 'La Rumbera',
              ingredients: 'Slow roasted pulled pork shoulder, grilled onion, Montreal cheddar',
            },
            {
              id: 9,
              restraunt_id: 2,
              name: 'La Chorizo',
              ingredients: 'columbian chorizo, avocado, fresco cheese',
            },
            {
              id: 10,
              restraunt_id: 2,
              name: 'La Pabellon',
              ingredients: 'black beans, carne mechada, sweet plantains, fresco cheese',
            },
            {
              id: 11,
              restraunt_id: 2,
              name: 'Garden Salad',
              ingredients: '',
            },
            {
              id: 12,
              restraunt_id: 3,
              name: '',
              ingredients: 'Korean spicy chicken, Korean bbq beef short ribs, gamjatang (pork bone soup) with rice, japchae (Korean stir fried sweet potato noodle with vegetables), ddukbokki seafood (Korean stir fry rice cake with seafood), kimchi fried rice',
            },
            {
              id: 13,
              restraunt_id: 4,
              name: 'Ramen prepared on site',
              ingredients: '',
            },
            {
              id: 14,
              restraunt_id: 5,
              name: 'chicken skewer, lamb skewer, beef skewer, vegetable souvlaki meal (eggplant, zucchini, sweet peppers, Spanish onions with rice, lemon potatoes, tzatziki and a side of Spartan Greek Salad), Greek Salad (lettuce, tomato, cucumber, red onion, olives, feta cheese with Krystos signature dressing), Krystos rice',
              ingredients: '',
            },
          ])
        })
    })
    .then(() => {
      return knex('fbot_lunches').del()
        .then(() => {
          return knex('fbot_lunches').insert([
            {id: 1, restraunt_id: 1, date: new Date('2018-06-11T04:00:00.000Z')},
            {id: 2, restraunt_id: 2, date: new Date('2018-06-12T04:00:00.000Z')},
            {id: 3, restraunt_id: 3, date: new Date('2018-06-13T04:00:00.000Z')},
            {id: 4, restraunt_id: 4, date: new Date('2018-06-14T04:00:00.000Z')},
            {id: 5, restraunt_id: 5, date: new Date('2018-06-15T04:00:00.000Z')},
          ]);
        })
    })
};
