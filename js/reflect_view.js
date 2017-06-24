//----------------------------------------------------------------
//
//    Project: Reflect: A chrome extension journal
//
//    Author/s: Miguel Gutierrez
//    Date: June 2017
//
//    Copyright: blah blah blah
//
//
//----------------------------------------------------------------

/**
 * @fileoverview Defines the view for Reflect - it listens to user-triggered
 *                events and data changes in order to update the DOM accordingly
 */

/**
 * Defines and creates elements for Reflect
 * @param ReflectModel - the view needs to listen to events in the model (data)
 * @constructor
 */
var ReflectView = function(reflect_model){
  //@TODO variables declared here, some may be a sidebar object
  //            and a modal object for previous entries

  //@TODO events declared here
}
// the .prototype is where the functions for an object are defined
ReflectView.prototype = {

};
/**
 * Defines the data in the sidebar menu and has functionality for displaying, updating,
 *  and listening to user events
 *
 */
var ReflectMenu = function(){
  this.profile_picture = null;
  this.available_themes = [];

}
ReflectMenu.prototype = {
  /**
   * loadAvailableThemesList - pass in a list of themes objects
   * @param {Object[]} theme_list [{name: string, url: string}, {}]
   */
  loadAvailableThemesList: function(theme_list){
    
  },
  setUserTheme: function(){

  },
  changeUserTheme: function(){

  },
  getCurrentUserTheme: function(){

  }
};
