# `angularjs-demo-clientlist`
### A small demo of AngularJS features and architecture

This is a very simple AngularJS application with two views, associated controllers, and a custom directive.

If you have any questions or comments, feel free to leave them here or email me via gmail at jasewell.

## Style Considerations
(h/t @john_papa's <a href="https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md">AngularJS Style Guide</a>)

* Module declarations are wrapped in IIFEs (immediately invoked function expressions) to avoid creating globals.
* Controllers are assigned to a capture variable (vm) and bound to the scope with a descriptive name.
* The sort-col directive uses an isolated scope that only includes what it needs from the invoking scope.
* Anonymous callback functions are avoided in favor of named function declarations which get pulled up from the ends of their blocks.
* The controllers are a little too fat. Some of their logic, especially the identical data loading calls, should be in one or more services.

## About the sortCol directive

The sortCol directive lets you sort by multiple columns. Clicking on a column header will cycle it through three sort states: ascending, descending, and not sorted.
When you click a column that wasn't already part of the sort, it will become the lowest-priority sorter.
I modeled this after the way sorting works in my favorite database client, and it's powerful, but it's probably too confusing for a general-audience application.
It might be possible to make it user-friendly by providing some kind of feedback about the sort priority, and maybe limiting the number of sorters that can be active at once.
