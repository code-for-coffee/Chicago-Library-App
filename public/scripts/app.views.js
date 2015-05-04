var app = app || {};
app.models = app.models || {};
app.templates = Handlebars.templates || {};
app.views = app.views || {};
app.services = app.services || {};
app.workspace = app.workspace || {};

app.views.BaseView = Backbone.View.extend({
    initialize: function() {
        var base = this.baseClass();
        if (this.model) {
            base.listenTo(base.model, "change", base.render);
            base.listenTo(base.model, "sync", base.render);
        }
    },
    baseClass: function() {
        return this;
    },
    template: undefined,
    render: function() {
        var base = this.baseClass();
        if (base.template && base.model) {
            this.$el.html(app.services.render(base.template, base.model));
        }
        return this;
    }
});

app.views.BooksView = app.views.BaseView.extend({
    template: app.templates['book-table-row']
});
app.views.BooksListView = app.views.BaseView.extend({
    initialize: function() {
        var base = this.baseClass();
        if (this.collection) {
            base.listenTo(base.collection, "change", base.render);
            base.listenTo(base.collection, "sync", base.render);
        }
    },
    template: app.templates['table'],
    render: function() {
        var base = this.baseClass();
        var models = base.collection.models;
        var booksView = app.views.BooksView;
        base.$el.html(base.template());
        for (var inc = 0; inc < models.length; inc++) {
            if (models[inc].hasOwnProperty(attributes)) {
                var newBookView = booksView(models[inc].attributes);
                newBookView.delegateEvents();
                base.$el.append(newBookView);
            }
        }
        return this;
    }
});
app.views.UsersView = app.views.BaseView.extend({

});