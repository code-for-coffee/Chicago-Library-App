var app = app || {};
app.models = app.models || {};
app.templates = app.templates || {};
app.views = app.views || {};
app.services = app.services || {};
app.workspace = app.workspace || {};

app.models.BaseModel = Backbone.Model.extend({
    initialize: function(hook) {
        if (typeof hook == "function") {
            hook();
        }
    },
});

app.models.BooksModel = app.models.BaseModel.extend({
    defaults: {
        title: undefined,
        author: undefined,
        isCheckedOut: false
    }
});

app.models.BaseCollection = Backbone.Firebase.Collection.extend({
    initialize: function(hook) {
        if (typeof hook == "function") {
            hook();
        }
    },
    url: 'https://dazzling-heat-4419.firebaseio.com/books',
    model: app.models.BooksModel
});


app.models.UsersModel = app.models.BaseModel.extend();
app.models.BooksCollection = app.models.BaseCollection.extend();
app.models.UsersCollection = app.models.BaseCollection.extend();

