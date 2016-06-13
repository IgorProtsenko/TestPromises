function APIService(method, url) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.send();
    var deferred = new Deferred();
    request.onreadystatechange = function () {
        if (request.readyState != 4) return;
        if (request.status === 200) {
            deferred.resolve(request.responseText);
        } else {
            deferred.reject(request.status + ': ' + request.statusText)
        }
    };
    return deferred.promise;
}