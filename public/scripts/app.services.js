var app = app || {};
app.models = app.models || {};
app.templates = Handlebars.templates || {};
app.views = app.views || {};
app.services = app.services || {};
app.workspace = app.workspace || {};

app.services.settings = {
    firebase: "https://dazzling-heat-4419.firebaseio.com" // replace with your own
};

app.services.fb = new Firebase(app.services.settings.firebase);

app.services.githubSessionProvider = function() {
    app.services.fb.authWithOAuthPopup("github", function(error, authData) {
        if (error) {
            var errorWarning = new app.services.displayError();
            app.workspace.github = authData;
            //console.log("Login Failed!", error);
        } else {
            app.workspace.userActivityList = new app.models.UsersActivityCollection();
            //console.log("Authenticated successfully with payload:", authData);
            app.workspace.github = authData;
            var authHider = new app.services.hider($('#app-auth-form'));
            var userInfoShower = new app.services.shower($('#app-user-info'));
            var libraryShower = new app.services.shower($('#app-library'));

            app.services.startupFixture(app.workspace.github);
            return true;
        }
    });
};
/**
 * app.services.render
 * @param template
 * @param data
 * @returns compiled Handlebars template
 */
app.services.render = function(template, data) {

    //console.log(template);
    //console.log(data);
    if (template && data) {
        return template(data);
    }

};
/**
 * UI Helpers
 */
app.services.hider = function(jQuerySelector) {
    if (jQuerySelector) $(jQuerySelector).slideUp();
    return this;
};
app.services.shower = function(jQuerySelector) {
    if (jQuerySelector) $(jQuerySelector).slideDown();
    return this;
};
app.services.displayError = function() {
    var shower = new app.services.shower($("#app-state-error"));
    return this;
};
app.services.hideError = function() {
    var hider = new app.services.hider($("#app-state-error"));
    return this;
};
/**
 * App Fixtures
 */
app.services.startupFixture = function(sessionObj) {

    // create our user
    app.workspace.currentUserModel = new app.models.UserModel({
        uid: sessionObj.uid,
        id: sessionObj.github.id,
        name: sessionObj.github.displayName,
        username: sessionObj.github.username,
        email: sessionObj.github.email,
        lastActive: (new Date()).toString()
    });
    // create our user activity list
    app.workspace.userActivityList.create(app.workspace.currentUserModel);
    // generate view
    app.workspace.currentUserView = new app.views.UserView({
        model: app.workspace.currentUserModel
    });
    // get list of books
    app.workspace.libraryBooksCollection = new app.models.BooksCollection();
    app.workspace.libraryBooksCollection.fetch();

    // render book list
    app.workspace.libraryBooksView = new app.views.BooksListView({
        collection: app.workspace.libraryBooksCollection
    });

    app.workspace.session.returnBookEventBound = false;
    app.workspace.session.checkOutBookEventBound = false;

    return this;

};
app.services.doesUserHaveBookFixture = function() {
    if (app.workspace.libraryBooksCollection.models.length < 1) return false;
    // loop through books to see if user has checked one out or not
    var activeUsername = app.workspace.currentUserModel.attributes.username;
    var userHasBook = false;
    var activeBookTitle;
    for (var book in app.workspace.libraryBooksCollection.models) {
        var selectedBook = app.workspace.libraryBooksCollection.models[book];
        if (selectedBook.attributes.hasOwnProperty('borrowerUsername')) {
            if (selectedBook.attributes.borrowerUsername == activeUsername) {
                userHasBook = true;
                activeBookTitle = selectedBook.attributes.title;
                break;
            }
        }
    }
    console.log(activeBookTitle + ", " + activeUsername + ", " + userHasBook);

    if (userHasBook) {
        app.workspace.returnBookPrompt = new app.views.ReturnBookPrompt();
        app.workspace.returnBookPrompt.render({ title: activeBookTitle });
    }

    return this;
};
/**
 * First Visit Notification
 */
app.services.checkForInstructionsCookie = function() {
    //nyi
};
