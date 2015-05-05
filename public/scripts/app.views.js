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
        base.render();
    },
    baseClass: function() {
        return this;
    },
    template: undefined,
    render: function() {
        var base = this.baseClass();
        if (base.template && base.model) {
            var renderedHTML = app.services.render(base.template, base.model.attributes);
            this.$el.html(renderedHTML);
            $(base.parent).append(renderedHTML);
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
        this.render();
    },
    template: app.templates['table'],
    render: function() {
        var base = this.baseClass();
        var models = base.collection.models;
        var booksView = app.views.BooksView;
        base.$el.html(base.template());
        console.log(base.$el.html());
        for (var inc = 0; inc < models.length; inc) {
            var selectedModel = models[inc].attributes;
            var newBookView = new booksView(selectedModel);
            console.log(selectedModel);
            console.log(newBookView.$el.html());
            newBookView.render();
            newBookView.delegateEvents();
            base.$el.append(newBookView.$el);
            inc++;
        }
        $('#app-library-list').html(base.$el);
        return this;
    }
});
app.views.UserView = app.views.BaseView.extend({
    template: app.templates['user'],
    render: function() {
        var base = this.baseClass();
        if (base.template && base.model) {
            var renderedHTML = app.services.render(base.template, base.model.attributes);
            this.$el.html(renderedHTML);
            $("#app-user-info").html(this.$el);
        }
        return this;
    }
});