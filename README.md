# knockout-test
A test area for playing around with knockout library

http://knockoutjs.com/downloads/index.html
http://bower.io/

npm install
npm install -g bower
bower init
bower install knockout --save

bower list   # list local packages and any updates needed

bower list --paths --json
{
  "knockout": "bower_components/knockout/dist/knockout.js"
}
note knockout.debug.js also exists for debugging

bower lookup knockout   # look up the url of a package

bower prune    # clean up extraneous packages

bower search knockout   # all knockout related packages

bower update  # update packages


wget http://knockoutjs.com/examples/resources/knockout.simpleGrid.3.0.js

