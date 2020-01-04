# grunt-knockout-templates

Plugin allows to replace html templates which load dynamically to a static version.
Developed for [Knockout](https://knockoutjs.com/index.html) MVVM data binging. 

During development it is better to have templates in separate files to avoid code duplication and allow to support your code easily.

From production perspective it is better to have all html templates in one file to avoid many requests to server and allow to render page instantly.

To use separate templates you should add the next Knockout binding: 

```js
ko.bindingHandlers['dev-template'] = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = valueAccessor();
        $(element).load(value.url, function() {
            ko.applyBindingsToDescendants(value.data || {}, element);
        });
        return {controlsDescendantBindings: true};
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    }
};
```

In this binging each template will be loaded separately and data will be applied. 
Html page should contains the next line:

```html
<div data-bind="dev-template: {url: '/templates/product.html', data: product}"></div>
```

So, during development you will have clear code without duplicates, but code will be not optimized for a production.
After running grunt task the html line below will be replaced to the source of the template surrounded with Knockout binding: 

```html
<div data-bind="with: product">
    <div data-bind="text: name"></div>
</div>
```

## Getting Started
This plugin requires Grunt `~1.0.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-knockout-templates --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-knockout-templates');
```

## The "knockout_templates" task

### Overview
In your project's Gruntfile, add a section named `knockout_templates` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  knockout_templates: {    
    your_target: {
      src: ['pages/**.html']
    },
  },
});
```
where `src` is a lit of the pages which contains templates definitions.

## Release History
0.1.0 - initial version