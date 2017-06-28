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
    //@TODO events declared here
  this.settingsChangedEvent = new Event(this);

  //@TODO variables declared here, some may be a sidebar object
  //            and a modal object for previous entries
  this.reflect_view_menu = new ReflectMenu(this.settingsChangedEvent);

}
// the .prototype is where the functions for an object are defined
ReflectView.prototype = {

};
/**
 * Defines the data in the sidebar menu and has functionality for displaying, updating,
 *  and listening to user events
 * @constructor
 */
var ReflectMenu = function(settingsChangedEvent){
  this.profile_picture = null;
  this.available_themes = [];

  //event listener to pass user actions to view
  //the events in this class only notify and don't listen
  this.settingsChangedEvent = settingsChangedEvent;

  //variables begining with document reference the DOM elements using jQuery
  this.$document_menu = $('#menu-contents');
  this.$documenet_menu_themes_available = $('#menu-themes-available');
  this.$document_menu_profile_picture = null;
  this.$document_menu_user_journals = $('#menu-user-journals');
}
ReflectMenu.prototype = {
  /**
   * loadUserJournalList - populates the joural list in the sidebar menu
   * @param  {Object[]} journal_list [{name: string}, {name:string},{},...]
   */
  loadUserJournalList: function(journal_list){
    journal_list.forEach((journal)=>{
      var $item = $('<li>', {'id': journal.name, 'class':'list-group-item'});
      var $link = $('<a>', {'href':'#'});
      $link.text(journal.name);
      // @TODO add click listener to load the journal
      $item.append($link);
      this.$document_menu_user_journals.append($item);
      console.log('model-view-menu: user journals loaded');
    });
  },
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
