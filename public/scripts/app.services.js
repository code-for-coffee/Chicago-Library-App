var app = app || {};
app.models = app.models || {};
app.templates = Handlebars.templates || {};
app.views = app.views || {};
app.services = app.services || {};
app.workspace = app.workspace || {};

app.services.settings = {
    firebase: "https://dazzling-heat-4419.firebaseio.com", // replace with your own
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
            app.workspace.currentUserModel = new app.models.UserModel({
                uid: app.workspace.github.uid,
                id: app.workspace.github.github.id,
                name: app.workspace.github.github.displayName,
                username: app.workspace.github.github.username,
                email: app.workspace.github.github.email,
                lastActive: (new Date()).toString()
            });
            app.workspace.userActivityList.create(app.workspace.currentUserModel);

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

    if (template && data) {
        return template(data);
    }

};
app.services.hider = function(jQuerySelector) {
    if (jQuerySelector) $(jQuerySelector).slideUp();
    return this;
};
app.services.shower = function(jQuerySelector) {
    if (jQuerySelector){
        $(jQuerySelector).slideDown();
    }

    return this;
};


app.services.displayError = function() {
    var shower = new app.services.shower($("#app-state-error"));
};
app.services.hideError = function() {
    var hider = new app.services.hider($("#app-state-error"));
};
