var app = app || {};
app.models = app.models || {};
app.templates = Handlebars.templates || {};
app.views = app.views || {};
app.services = app.services || {};
app.workspace = app.workspace || {};

app.views.BaseView = Backbone.View.extend({
    initialize: function(hook) {
        if (hook) {
            hook();
        }
    },
    baseClass: function() {
        return this;
    },
    render: function() {
        var base = this.baseClass();
        if (base.template && base.model) {
            app.services.render(base.template, base.model);
        }
        return this;
    }
});

app.views.BooksView = app.views.BaseView.extend();
app.views.UsersView = app.views.BaseView.extend();