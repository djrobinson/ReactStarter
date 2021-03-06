var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://todos-djrobinson.firebaseIO.com/';
var Header = require('./header');
var List = require('./list');

var Hello = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function(){
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function(){
    var fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(fb, 'items');
    fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          Todo App
        </h2>
        <Header itemsStore={ this.firebaseRefs.items } />
        <div className={'content ' + (this.state.loaded ? 'loaded' : '')}>
          <List items={ this.state.items } />
        </div>
      </div>
    </div>
  },
  handleDataLoaded: function(){
    this.setState({loaded: true});
  }
});

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
