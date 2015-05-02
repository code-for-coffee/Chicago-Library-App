var app = app || {};
app.models = app.models || {};
app.templates = app.templates || {};
app.views = app.views || {};
app.services = app.services || {};
app.workspace = app.workspace || {};

app.services.fb = new Firebase("https://dazzling-heat-4419.firebaseio.com");

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