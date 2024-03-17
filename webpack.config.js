module.exports = {
    // other webpack configurations...

    resolve: {
        fallback: { 'path': require.resolve('path-browserify') },
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
     }
};
