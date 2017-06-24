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
  this.reflect_view_menu = new ReflectMenu();
  //@TODO events declared here

}
// the .prototype is where the functions for an object are defined
ReflectView.prototype = {

};
/**
 * Defines the data in the sidebar menu and has functionality for displaying, updating,
 *  and listening to user events
 * @constructor
 */
var ReflectMenu = function(){
  this.profile_picture = null;
  this.available_themes = [];

  //variables begining with document reference the DOM elements using jQuery
  this.$document_menu = $('#menu-contents');
  this.$documenet_menu_themes_available = $('#menu-themes-available');
  this.$document_menu_profile_picture = null;

}
ReflectMenu.prototype = {
  /**
   * loadAvailableThemesList - populates the themes accordion in the sidebar,
   *                            adds click listener to each theme
   * @param {Object[]} theme_list [{name: string, url: string}, {}]
   */
  loadAvailableThemesList: function(theme_list){
    theme_list.forEach((theme) => {
      var $new_theme = $('<li>', {'id': theme.name, 'class':'list-group-item'});
      var $theme_link = $('<a>', {'href':'#'});
      $theme_link.text(theme.name);
      $theme_link.click((event)=>{
        this.setUserTheme(theme.url);
      });
      $new_theme.append($theme_link);
      this.$documenet_menu_themes_available.append($new_theme);
    });
    console.log('model-view-menu: available themes loaded');
  },
  /**
   * setUserTheme - changes the extension background image
   * @param  {string} image_url url locatiton of image_url
   */
  setUserTheme: function(image_url){
    document.body.style.backgroundImage = image_url;
    console.log('model-view-menu: changing user theme');
  },
  /**
   * getCurrentUserTheme
   * @return {string} current theme's url location
   */
  getCurrentUserTheme: function(){
    return document.body.style.backgroundImage;
  }
};
