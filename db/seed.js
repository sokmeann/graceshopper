// eslint-disable camelcase
'use strict'; // eslint-disable-line semi

const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {firstname: 'Cassio', lastname: 'Antonio', status: 'REGISTERED', email: 'cassio@fsa.com', shippingAddress: '123 Maple Street\nBrooklyn, NY 11218', password: 'password'},
  {firstname: 'Generic', lastname: 'User', status: 'REGISTERED', email: 'user2@example.com', shippingAddress: '456 Elm Street\nBrooklyn, NY 11221',  password: 'password'}, {firstname: 'Mystery', lastname: 'Shopper', status: 'REGISTERED', email: 'user3@example.com', shippingAddress: '50 Sycamore Street\nQueens, NY 11370', password: 'password'}, {firstname: 'Just', lastname: 'Browsing', status: 'REGISTERED', email: 'user4@example.com', shippingAddress: '5 Hanover Square\nNew York, NY 10004', password: 'password'}
], user => db.model('users').create(user))

const seedProducts = () => db.Promise.map([
  {title: 'Concrete Umbrella', category: 'Accessories', brand: 'Mortar\'s', description: 'Need to work on your biceps? Love the smell of petrichor? This is the umbrella for you. 100% hand-poured American concrete.' , currentPrice: 50.00, quantity: 10, imgUrls: ['http://i.imgur.com/e3dTtAT.png']}, {title: 'Downhill Chair', category: 'Furniture', brand: 'Ikeanteven', description: 'A perfect chair for those looking to lean in. All-weather plastic construction for your patio or office.', currentPrice: 21.00, quantity: 5, imgUrls: ['http://i.imgur.com/XUs5YeQ.png']}, {title: 'Convex Chair', category: 'Furniture', brand: 'Ikeanteven', description: 'For those who can\'t or shouldn\'t sit still. Inflation-molded plastic will never cave.', currentPrice: 25.00, quantity: 5, imgUrls: ['http://i.imgur.com/DKAiR8n.png']}, {title: 'Rain Boots', category: 'Footwear', brand: 'Sloshers', description: 'Avoid dry feet with these cutting-edge wellies. 90% natural rubber. One size fits most. Other sizes fit none.', currentPrice: 75.00, quantity: 11, imgUrls: ['http://i.imgur.com/ifbwuYo.png']}, {title: 'Wendell Chair', category: 'Furniture', brand: 'Ikeanteven', description: 'Wendell drew this chair on a napkin one day. Wendell is 6. We\'re all very proud of him.', currentPrice: 19.00, quantity: 5, imgUrls: ['http://i.imgur.com/i5VulDm.png']}, {title: 'Watering Can\'t', category: 'Garden', brand: 'Kleinbottle', description: 'Do your part in saving the planet with this high efficiency watering can. You\'ll be amazed how little water it takes before you give up.', currentPrice: 17.00, quantity: 5, imgUrls: ['http://i.imgur.com/nSs6uzj.png']}, {title: 'Aspirational Teapot', category: 'Kitchenware', brand: 'Kinsfolks', description: 'Your friends will know you\'ve made it when they come over and see this artisanal vessel on your counter. Better hope they want coffee tough.', currentPrice: 95.00, quantity: 5, imgUrls: ['http://i.imgur.com/7quKneL.jpg']}, {title: 'Security Key', category: 'Hardware', brand: 'Madco', description: 'Replace your keys with these and even you won\'t be able to get into your house. Set of 5 blanks. Proprietary cutting machine sold seperately.', currentPrice: 20.00, quantity: 5, imgUrls: ['http://i.imgur.com/82OVVQ2.png']}, {title: 'Club Door', category: 'Hardware', brand: 'Madco', description: 'When it comes to doors, why settle for one? By the time you open all three you\'ll have forgotten what you came in for.', currentPrice: 100.00, quantity: 9, imgUrls: ['http://i.imgur.com/6yo3eIW.png']}, {title: 'Pierce Bowl', category: 'Kitchenware', brand: 'Wolliams & Sinoma', description: 'Keep your kids motivated at breakfasttime by feeding them their cereal in these. Individually hand-punched by the artist.', currentPrice: 18.00, quantity: 11, imgUrls: ['http://i.imgur.com/MAa260X.png']}, {title: 'Lobster Pot', category: 'Kitchenware', brand: 'SomeClad', description: 'You\'ll have red claws of your own after using this big boy. Stainless steel, unless it gets wet.', currentPrice: 49.00, quantity: 11, imgUrls: ['http://i.imgur.com/YIZyo7h.png']}, {title: 'Porthole Goblet', category: 'Kitchenware', brand: 'Wolliams & Sinoma', description: 'Slow your roll and savor your swill with these fine crystal wine glasses. Your dry cleaners will thank you. Set of 3.', currentPrice: 45, quantity: 1, imgUrls: ['http://i.imgur.com/yCfUr64.png']}, {title: 'Infuriating Spoon', category: 'Kitchenware', brand: 'Wolliams & Sinoma', description: 'If you can keep your cool whle eating from one of these you\'re a better person than I. Made in Scandinavia, so you know it\'s good.', currentPrice: 3.00, quantity: 5, imgUrls: ['http://i.imgur.com/LZVyRaj.png']}

], product => db.model('products').create(product))

const seedReviews = () => db.Promise.map([
  {title: 'What a great umbrella', description: 'I bought this umbrella and I loved it', rating: 5, product_id: 1, user_id: 1}, {title: 'Nice Chair', description: 'Looks great in my living room', rating: 4, product_id: 2, user_id: 4}

], review => db.model('reviews').create(review))

const seedOrders = () => db.Promise.map([
  {dateProcessing: null, dateCancelled: null, dateCompleted: null, user_id: 1}, {dateProcessing: null, dateCancelled: null, dateCompleted: null, user_id: 2}, {dateProcessing: null, dateCancelled: null, dateCompleted: null, user_id: 4}

], order => db.model('order').create(order))

const seedOrderProduct = () => db.Promise.map([
  {purchasedPrice: 10.00, quantity: 1, dateCompleted: null, order_id: 1, product_id: 1}, {purchasedPrice: 20.00, quantity: 2, dateCompleted: null, order_id: 1, product_id: 2}, {purchasedPrice: 10.00, quantity: 1, dateCompleted: null, order_id: 2, product_id: 1}, {purchasedPrice: 15.00, quantity: 1, dateCompleted: null, order_id: 2, product_id: 3},  {purchasedPrice: 20.00, quantity: 1, dateCompleted: null, order_id: 3, product_id: 2}, {purchasedPrice: 15.00, quantity: 3, dateCompleted: null, order_id: 3, product_id: 3}

], orderProduct => db.model('orderProduct').create(orderProduct))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(seedProducts)
  .then(seedReviews)
  .then(seedOrders)
  .then(seedOrderProduct)
  .catch(error => console.error(error))
  .finally(() => db.close())
