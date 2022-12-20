const express = require('express');
const app = express();
const config = require('./config');
const RabbitMQ = require('./lib/rabbitmq');
const amql = new RabbitMQ(config);

app.use('/', (req, res) => {

    const queue = { name: 'CREATE_WORKSPACE' };
    const data = 'U2FsdGVkX1/J3Zt0gMvvO6PTre3a5aQZjgYFi3eles75D75lMe3ShwzDoQOQFNBipTg0dU6F4ZRIeVX+8nKifX19a2JsNs3r3WrBAobX8aV5mrgsf4IMTY619+UqXlO6LRdM0trQzPNzQ3j+7IePDIsJsSwuWkjumcjmmtjrRPY2sOy2kMIcbsi3fnzUdp9dG2yWB93UJaQlw209DtWx4SP2eRKNlq1QmmtZizDzhKgg5s8Ml9PlUe1SfUd52lfSJOVve907tgP9Cf5vMWIuJsDi3avO927BCfZl5E97unsgpjKQmFfVixW7/jovx28/X6fhUM/NNmDGoXS0nkBKwbyyBQ9J55XDRx3D60V1q+cv81ZmzTuYYUMOlu87XmkuZTq58ORWby827cSe8PMNp8BuX4mQFM/ngGht77dCbIQFmSfYgZNb3oEwHqsbhLkudAWHfBwE91bNuBqVc7C6vHMnSjUG7FE9X4PDYQy4QjYpBaRth7QRje5m9SaCrpB3ujZZeLw++YO4lNXCoPX93w==U2FsdGVkX1/wDFEu8g/QPMYblnlmbk2+MH7HXYLBz9jSQxFNlJefWIECn6BzaQZDI0ySIgMMmrNltRgsMOC5g/3cytUkOe9fqKQ1uyyvc5obWqGrrBYM9KX8PzW2nJyPxykIkHESt0x0wbRRK81XPAKeZNCJxn0sv7lBLwJtS+MtxikjLGKN3MKkSxPJ3USocOcXAMCkTgZERnldggUCF2dEY3I5qXWaJzB5G49FltF8JWanQrGHC3ARRFTazK+/AV6gsIN4iwINnFhwniaQHnqXw8SJhzrkriI8LY7h/fzV4LBcm1lnVGZ2jO1HYTWETgwBUWH0D8tJRbgYcz5V050UhF28Va+v0jh18IYroazG38e0LguO2FloWdIYskpT+ZnGUkDhHLOx5ju/h2ROYIVsSu0p8vtS/aGiJqHLO2/UkC3y2vxm7orkHMoPwqNIspF44mnTULB6961N0tjlxJkJDA1EMXrtRAZ9DoQHSqGiX3Xg80iEposw8W9aQhPze9HI9W9Y9cysBsjaXB3U5Q==';
    amql.publish({ queue: queue }, data);

    res.json('OK');
});

app.listen(9000, () => {
    console.log(`http://localhost:9000`);
})