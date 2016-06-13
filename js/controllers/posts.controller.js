var postsController = {
    init: function() {
        hidePages();
        if(!postsController.postsData) {
            var getPostsService = new APIService('GET', baseApiUrl + 'posts');
            var self = this;
            getPostsService.then(function (data) {
                postsController.postsData = {rows: JSON.parse(data)};
                postsController.renderPostsTable(postsController.postsData);
                showPage('posts');
            });
        } else {
            postsController.renderPostsTable(postsController.postsData);
            showPage('posts');
        }
    },
    renderPostsTable: function(data) {
        var postsBody = document.getElementById('posts-body');
        var postsBodyTemplate = _.unescape(' <% _.each(rows, function(row) { %>' +
            '<tr class="row">' +
            '<td><%= row.title %></td>' +
            '<td><%= row.body %></td>' +
            '</tr>' +
            '<% }); %>');
        var compiledElementTemplate = _.template(postsBodyTemplate);
        postsBody.innerHTML = compiledElementTemplate(data);
    }
};
