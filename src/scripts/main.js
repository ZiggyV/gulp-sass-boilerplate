//bind $ to jquery in this scope
(function($) {
    //initiate variables
    var hello,
        smiley;
    
    //simple example function
    function handleBodyClick() {
        console.log('Click that body!');
    }

    //event bindings
    function bindings() {
        $('body').on('click', handleBodyClick);
    }

    $(document).ready(function() {
        //assign variables
        hello = 'Hi';
        smiley = ' :)';
        
        //say hi
        console.log(hello + smiley);

        bindings();
    });
})(jQuery);

