import v1AuthRouter from './v1/auth.router';
import v1UsersRouter from './v1/users.router';

const v1ApiRouters = (app) => {
    app.use('/api/v1/auth', v1AuthRouter);

    app.use('/api/v1/users', v1UsersRouter);
}

module.exports = {
    v1ApiRouters: v1ApiRouters
};