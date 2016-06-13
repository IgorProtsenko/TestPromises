var baseApiUrl = 'http://jsonplaceholder.typicode.com/';

var view = {
    documentReady: function (fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    },
    init: function () {
        initializeHeader();
        watchUrlChanging();
    }
};

view.documentReady(view.init);

// Polyfill to make the app work in most Firefox versions.
function Deferred() {
    if (typeof(Promise) != 'undefined' && Promise.defer) {
        return Promise.defer();
    } else if (typeof(PromiseUtils) != 'undefined' && PromiseUtils.defer) {
        return PromiseUtils.defer();
    } else {
        this.resolve = null;
        this.reject = null;
        this.promise = new Promise(function (resolve, reject) {
            this.resolve = resolve;
            this.reject = reject;
        }.bind(this));
        Object.freeze(this);
    }
}

function renderTemplate(tmpl, data) {
    var rawTemplate = _.unescape(tmpl);
    var compiledElementTemplate = _.template(rawTemplate);
    return compiledElementTemplate(data);
}

function initializeHeader() {
    var navConf = {
        tabs: [
            {name: 'users', href: '#/users'}, {name: 'comments', href: '#/comments'}, {name: 'posts', href: '#/posts'}
        ]
    };
    var navBar = document.getElementById("nav-group");
    navBar.innerHTML = renderTemplate(navBar.innerHTML, navConf);
    if (!window.location.hash) {
        window.location.hash = navConf.tabs[0].href;
    }
}

function watchUrlChanging() {
    var routesMap = {
        '#/users': usersController.init,
        '#/comments': commentsController.init,
        '#/posts': postsController.init
    };
    return new Router(routesMap);
}

function Router(config) {
    loadPage();
    if ('onhashchange' in window) {
        window.addEventListener('hashchange', loadPage);
    }

    function loadPage() {
        var keys = Object.keys(config);
        var hash = window.location.hash;
        if (keys.indexOf(hash) !== -1) {
            config[hash]();
        } else {
            config[0]();
        }
    }
}

function hidePages() {
    ['users', 'comments', 'posts'].forEach(function (pageId) {
        var element = document.getElementById(pageId);

        if (element.className !== 'hidden') {
            element.className = 'hidden';
        }
    });
}

function showPage(pageId) {
    var element = document.getElementById(pageId);
    if (element.className === 'hidden') {
        element.className = '';
    }
}