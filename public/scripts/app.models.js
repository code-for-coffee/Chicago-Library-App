var app = app || {};
app.models = app.models || {};
app.templates = app.templates || {};
app.views = app.views || {};
app.services = app.services || {};
app.workspace = app.workspace || {};

app.models.BaseModel = Backbone.Model.extend({
    initialize: function(hook) {
     if (hook) {
         hook();
     }
    }
});

app.models.BaseCollection = Backbone.Collection.extend({
    initialize: function(hook) {
        if (hook) {
            hook();
        }
    }
});

app.models.BooksModel = app.models.BaseModel.extend();
app.models.UsersModel = app.models.BaseModel.extend();
app.models.BooksCollection = app.models.BaseCollection.extend();
app.models.UsersCollection = app.models.BaseCollection.extend();

