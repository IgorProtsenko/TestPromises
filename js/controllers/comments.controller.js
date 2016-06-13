var commentsController = {
    init: function() {
        hidePages();
        if(!commentsController.commentsData) {
            var getCommentsService = new APIService('GET', baseApiUrl + 'comments');
            getCommentsService.then(function (data) {
                commentsController.commentsData = {rows: JSON.parse(data)};
                commentsController.renderCommentsTable(commentsController.commentsData);
                showPage('comments');
            });  
        } else {
            commentsController.renderCommentsTable(commentsController.commentsData);
            showPage('comments'); 
        }
    },
    renderCommentsTable: function(data) {
        var commentsBody = document.getElementById('comments-body');
        var commentsBodyTemplate = _.unescape(' <% _.each(rows, function(row) { %>' +
            '<tr class="row">' +
            '<td><%= row.name %></td>' +
            '<td><%= row.email %></td>' +
            '<td><%= row.body %></td>' +
            '</tr>' +
            '<% }); %>');
        var compiledElementTemplate = _.template(commentsBodyTemplate);
        commentsBody.innerHTML = compiledElementTemplate(data);
    }
};