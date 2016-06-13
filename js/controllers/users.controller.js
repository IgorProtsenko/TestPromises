var usersController = {
    init: function() {
        hidePages();
        document.getElementById('user1').value = "";
        document.getElementById('user2').value = "";
        if(!usersController.usersData) {
            var getUsersService = new APIService('GET', baseApiUrl + 'users');
            getUsersService.then(function (data) {
                usersController.usersData = {rows: JSON.parse(data)};
                usersController.renderUsersTable(usersController.usersData);
                showPage('users');
            });
        } else {
            usersController.renderUsersTable(usersController.usersData);
            showPage('users');
        }
    },

    renderUsersTable: function(data) {
        var usersBody = document.getElementById('users-body');
        var usersBodyTemplate = _.unescape(' <% _.each(rows, function(row) { %>' +
            '<tr class="row">' +
            '<td><%= row.name %></td>' +
            '<td><%= row.phone %></td>' +
            '<td><%= row.website %></td>' +
            '<td><%= row.company.name %></td>' +
            '</tr>' +
            '<% }); %>');
        var compiledElementTemplate = _.template(usersBodyTemplate);
        usersBody.innerHTML = compiledElementTemplate(data);
    },

    compareUsers: function() {
        var id1 = document.getElementById('user1');
        var id2 = document.getElementById('user2');
        [id1, id2].forEach(function (id) {
           if (id.value <= 0) {
               id.value = 1;
           } else if (id.value > 10) {
               id.value = 10;
           }
           else if (isNaN(id.value)) {
               id.value = 1;
           }
        });
        Promise.all(
            [new APIService('GET', baseApiUrl + 'users/' + id1.value),
            new APIService('GET', baseApiUrl + 'users/' + id2.value)])
            .then(function(users) {
            var parsedResponses = [];
            users.forEach(function(user) {
                parsedResponses.push(JSON.parse(user));
            });
            usersController.renderUsersTable({rows: parsedResponses});
        })
    }
};