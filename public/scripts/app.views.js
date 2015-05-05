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
    }
});

app.views.BooksView = app.views.BaseView.extend({
    tagName: "tr",
    template: app.templates['book-table-row'],
    render: function() {
        var base = this.baseClass();
        if (base.template && base.model) {
            if (base.model.attributes.hasOwnProperty('borrowerUid')) {
                var checkedOut = base.model.attributes.isCheckedOut;
                if (checkedOut == false) {
                    base.template = app.templates['book-table-row-available'];
                }
            }
            var renderedHTML = app.services.render(base.template, base.model.attributes);
            this.$el.html(renderedHTML);
            $(base.parent).append(renderedHTML);
        }
        return this.$el.html();
    }
});
app.views.BooksListView = app.views.BaseView.extend({
    tagName: "table",
    id: "library-books",
    className: "table table-hover table-condensed",
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
        base.$el.html(app.templates['book-table-head']());
        for (var inc = 0; inc < models.length; inc++) {
            var bookView = new app.views.BooksView({ model: models[inc] });
            $(base.$el).append(bookView.$el);
        }
        var shower = new app.services.shower($('#app-library-list'));
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