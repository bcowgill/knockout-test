// knockout.js extensions
/*globals ko */

(function(window)
{
    "use strict";

// useful tool to invert the value of a function
ko.utils.makeInverse = function (fn) {
   return function () { return !fn(); };
};

// ko.utils.arrayFilter() will also match items with _destroy
// properties, indicating they have been destroyed by self.observableArray.destroy(arrayItem).
// so we add a couple other utilities to isolate alive and destroyed items

// Useful for automatic ignore of items that have been 'destroyed'
// by setting _destroy = true within them
ko.utils.arrayFilterAlive = function (a, fn) {
    fn = fn || function () { return true; };
    return ko.utils.arrayFilter(a, function (item) {
       return !item._destroy && fn(item);
    });
};

// Just loop through items that have been 'destroyed' but not submitted/removed from server yet.
ko.utils.arrayFilterDestroyed = function (a, fn) {
    return ko.utils.arrayFilter(a, function (item) {
       fn = fn || function () { return true; };
       return item._destroy && fn(item);
    });
};

// knockout.js custom bindings for data-bind
//

if (!window.jQuery) {
    console.warn("jQuery missing, knockout.js binding handler extensions"
        + " fallback to plain visible/hidden instead of animation.");
    // data-bind= show -- alias for visible when jQuery missing
    ko.bindingHandlers.show = ko.bindingHandlers.visible;

    // data-bind= hidden -- the opposite of visible
    ko.bindingHandlers.hidden = {
        init: function(element, valueAccessor) {
            return ko.bindingHandlers.visible.init(element, ko.utils.makeInverse(valueAccessor));
        },
        update: function(element, valueAccessor) {
            return ko.bindingHandlers.visible.update(element, ko.utils.makeInverse(valueAccessor));
        }
    };
}
else {
    var $ = window.jQuery;
    // using jQuery to fade in/out an element
    // custom binding for data-bind="hidden: expression"
    // fades out when condition is true
    ko.bindingHandlers.hidden = {
        init: function(element, valueAccessor) {
            // Start visible/invisible according to initial value
            var shouldHide = valueAccessor();
            $(element).toggle(!shouldHide);
        },
        update: function(element, valueAccessor) {
            // On update, fade in/out
            var shouldHide = valueAccessor();
            return shouldHide ? $(element).fadeOut() : $(element).fadeIn();
        }
    };

    // custom binding for data-bind="show: expression"
    // fades in when condition is true
    ko.bindingHandlers.show = {
        init: function(element, valueAccessor) {
            // Start visible/invisible according to initial value
            var shouldDisplay = valueAccessor();
            $(element).toggle(shouldDisplay);
        },
        update: function(element, valueAccessor) {
            // On update, fade in/out
            var shouldDisplay = valueAccessor();
            return shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
        }
    };
}

})(this);
