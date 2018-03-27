
WebStorm 2016.3.4

# Using Polymer Elements in Angular CLI Webpack Applications
https://vaadin.com/vaadin-documentation-portlet/elements/angular2-polymer/ng-cli-webpack.html

# Angular 2 Cli - Polymer Integration
https://vaadin.com/docs/-/part/elements/angular2-polymer/ng-cli-webpack.html

# AuthO
https://manage.auth0.com/#/clients/IRPUwl406FAAq6zd4QWEZKUFAH8of29G/quickstart
https://auth0.com/docs/quickstart/spa/angular2/00-intro

# Angular 2 Integration
https://vaadin.com/vaadin-documentation-portlet/elements/angular2-polymer/overview.html

# Angular-Polymer
https://github.com/platosha/angular-polymer

sudo npm uninstall -g angular-cli
sudo npm cache clean
sudo npm install -g angular-cli@1.0.0-beta.21

sudo ng --version
    angular-cli: 1.0.0-beta.21
    node: 6.10.3
    os: darwin x64

bower init

.bowerrc
{
  "directory" : "src/assets/bower_components"
}

# Install the angular2-polymer package and the Polymer element you want to use.
# npm install @vaadin/angular2-polymer@1.0.0-beta5
# npm install @vaadin/angular2-polymer@1.0.0-rc2

# sudo bower install --save paper-elements#^1.0.7 iron-icons#^1.1.3 vaadin-combo-box#^1.1.5 vaadin-date-picker#^1.2.0 app-layout#^0.10.6 --allow-root

npm install @vaadin/angular2-polymer@1.0.0-beta5

sudo bower install --save paper-elements#1.0.7 iron-icons#1.1.3 vaadin-combo-box#1.1.5 vaadin-date-picker#1.2.0 app-layout#0.10.6 --allow-root

### sudo bower install --save vaadin-combo-box#^1.3.3 --allow-root
### sudo npm install --save @vaadin/angular2-polymer@1.0.0-beta5

# sudo bower install --save vaadin-combo-box#^1.3.3

npm view vaadin-combo-box 
npm view vaadin-combo-box versions

# ComboBox lanza dos veces el onchange
https://github.com/vaadin/vaadin-combo-box/issues/405

sudo bower uninstall vaadin-combo-box paper-elements iron-icons vaadin-date-picker app-layout --allow-root
sudo bower uninstall iron-overlay-behavior polymer  --allow-root
sudo npm  uninstall @vaadin/angular2-polymer


sudo bower install --save  --allow-root PolymerElements/app-layout#^2.0.0 Vaadin/vaadin-grid#^1.1.0 PolymerElements/iron-flex-layout#^1.3.1 vaadin/tree-grid#^0.7.4 iron-list#^2.0.1 StartPolymer/s-moment#^0.1.1 cloudily/iron-time#^0.1.0 d2l-loading-spinner#^6.0.0 paper-elements#1.0.7

xsudo bower install --save --allow-root paper-elements#1.0.7  app-layout#0.10.6 Vaadin/vaadin-grid#^1.1.0 

sudo npm install -g angular-cli@1.0.0-beta.21 --no-bin-links

  "dependencies": {
    "paper-elements": "^1.0.7",
    "app-layout": "PolymerElements/app-layout#^2.0.0",
    "vaadin-grid": "Vaadin/vaadin-grid#^1.1.0",
    "iron-flex-layout": "PolymerElements/iron-flex-layout#^1.3.1",
    "tree-grid": "vaadin/tree-grid#^0.7.4",
    "iron-list": "^2.0.1",
    "s-moment": "StartPolymer/s-moment#^0.1.1",
    "iron-time": "cloudily/iron-time#^0.1.0",
    "d2l-loading-spinner": "^6.0.0"
  }


sudo bower install --save --allow-root PolymerElements/iron-pages#^1.0.8