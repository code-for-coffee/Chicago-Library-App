var app = app || {};
app.models = app.models || {};
app.templates = Handlebars.templates || {};
app.views = app.views || {};
app.services = app.services || {};
app.workspace = app.workspace || {};

app.models.BaseModel = Backbone.Model.extend({
    initialize: function(hook) {
        if (typeof hook == "function") {
            hook();
        }
    }
});

app.models.BooksModel = app.models.BaseModel.extend({
    defaults: {
        title: undefined,
        author: undefined,
        isCheckedOut: false,
        borrowerUid: null,
        borrowerName: null,
        borrowerUsername: null,
        borrowerEmail: null,
        borrowerDate: null,
        date: null
    },
    url: 'https://dazzling-heat-4419.firebaseio.com/books'

});

app.models.UserModel = app.models.BaseModel.extend({
    defaults: {
        id: null,
        uid: null,
        name: null,
        username: null,
        email: null,
        lastActive: new Date()
    }
});

app.models.BaseCollection = Backbone.Firebase.Collection.extend({
    initialize: function(hook) {
        if (typeof hook == "function") {
            hook();
        }
    },
    model: undefined
});

app.models.UsersModel = app.models.BaseModel.extend();
app.models.BooksCollection = app.models.BaseCollection.extend({
    model: app.models.BooksModel,
    url: 'https://dazzling-heat-4419.firebaseio.com/books'
});
app.models.UsersActivityCollection = app.models.BaseCollection.extend({
    model: app.models.UserModel,
    url: 'https://dazzling-heat-4419.firebaseio.com/userActivityLog'
});

