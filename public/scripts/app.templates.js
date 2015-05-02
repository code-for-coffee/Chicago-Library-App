(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['book-table-row-active'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "\n";
},"useData":true});
templates['book-table-row'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<tr>\n    <td>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias3(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>\n        <button data-available=\""
    + alias3(((helper = (helper = helpers.isAvailable || (depth0 != null ? depth0.isAvailable : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"isAvailable","hash":{},"data":data}) : helper)))
    + "\" type=\"button\" class=\"btn btn-success\">Available: "
    + alias3(((helper = (helper = helpers.isAvailable || (depth0 != null ? depth0.isAvailable : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"isAvailable","hash":{},"data":data}) : helper)))
    + "</button>\n    </td>\n</tr>\n\n";
},"useData":true});
templates['table'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "\n<table id=\"library-books\" class=\"table table-hover\">\n</table>\n";
},"useData":true});
})();