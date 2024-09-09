function loadPartial(view, target = '#content', payload) {
    $(target).empty();
    $(target).load(`../partials/${view}.html`, function() {
        import(`../js/${view}.js`)
            .then(({ default: module }) => module?.init?.(payload))
            .catch(err => console.log(err))
    });
}

const getHashParam = (name) => {
    const hash = window.location.hash.substring(1); // Remove the # from the hash
    const params = new URLSearchParams(hash.split('?')[1] || '');
    return params.get(name);
};

export { loadPartial, getHashParam }