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
            $(base.parent).append(this.$el);
        }
        return this.$el;
    },
    checkout: function() {
        alert("clicky")
    },
    events: {
        'click': 'checkout'
    }
});
app.views.BooksListView = app.views.BaseView.extend({
    tagName: "table",
    id: "library-books",
    className: "table table-hover table-condensed",
    initialize: function() {
        var base = this.baseClass();
        if (this.collection) {
            base.listenTo(base.collection, "sync", base.render);
            base.listenTo(base.collection, "sync", base.checkForBook);
        }
        this.render();
    },
    checkForBook: function() {
        var checkIfUserHasBook = new app.services.doesUserHaveBookFixture();
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
        var binder = new app.views.bookCheckoutBinder();
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
app.views.ReturnBookPrompt = Backbone.Model.extend({
    initialize: function() {
        var shower = new app.services.shower($('#app-library-list'));
    },
    events: {
        'click': 'return'
    },
    render: function(data) {
        var template = app.templates['return-book'](data);
        $('#app-return-book').html(template);
        $('#app-return-book').slideDown();
        $('#app-library-list').hide();
        var binder = new app.views.returnBookEventBinder();
        return this;
    }
});
app.views.returnBookEventBinder = function() {
    if (!app.workspace.session.returnBookEventBound) {
        app.workspace.session.returnBookEventBound = true;
        $(document).on('click', '#app-return-book', function() {
            if (!app.workspace.sessionReturn) {
                app.workspace.sessionReturn = true;
                var bookId = $(this).data('id');
                var newDate = new Date().toString();
                var bookModel = app.workspace.libraryBooksCollection.where({id: bookId});
                bookModel[0].set("isCheckedOut", false);
                bookModel[0].set("borrowerUsername", "");
                bookModel[0].set("borrowerUid", "");
                bookModel[0].set("borrowerName", "");
                bookModel[0].set("borrowerEmail", "");
                bookModel[0].set("borrowerDate", newDate);
                alert("Thanks! Your book has been returned.");
                $('.dropoff-book').hide();
            }
        });

    }
};
app.views.bookCheckoutBinder = function() {
    if (!app.workspace.session.checkOutBookEventBound) {
        app.workspace.session.checkOutBookEventBound = true;
        var buttons = [];
        $(document).on('click', '.book-checkout', function() {
            if (!app.workspace.session.over) {
                app.workspace.session.over = true;

                var bookId = $(this).data('id');
                var bookModel = app.workspace.libraryBooksCollection.where({id: bookId});
                var newDate = new Date().toString();
                bookModel[0].set("isCheckedOut", true);
                bookModel[0].set("borrowerUsername", app.workspace.github.username);
                bookModel[0].set("borrowerUid", app.workspace.github.uid);
                bookModel[0].set("borrowerName", app.workspace.github.displayName);
                bookModel[0].set("borrowerEmail", app.workspace.github.email);
                bookModel[0].set("borrowerDate", newDate);

                alert("Thanks for checking out this book! Please remember to return this book within 3 days! Thanks!");
                window.location = "https://google.com";
            }
        });
    }
};