import v1AuthRouter from './v1/auth.router';

const v1ApiRouters = (app) => {
    app.use('/api/v1/auth', v1AuthRouter);
}

module.exports = {
    v1ApiRouters: v1ApiRouters
};