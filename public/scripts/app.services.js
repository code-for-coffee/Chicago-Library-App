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
            app.workspace.github = authData;
            //console.log("Login Failed!", error);
        } else {
            app.workspace.github = authData;
            //console.log("Authenticated successfully with payload:", authData);
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
    if (jQuerySelector) $(jQuerySelector.slideUp())
    return this;
};
app.services.shower = function(jQuerySelector) {
    if (jQuerySelector) $(jQuerySelector.slideDown())
    return this;
};
