//bind $ to jquery in this scope
(function($) {
    //initiate variables
    var hello,
        smiley,
        count,
        $body; //i tend to use '$' before a variable name when it's a selector
    
    //simple example function
    function handleBodyClick() {
        count += 1;
        console.log('You clicked ' + count + ((count != 1)?' times':' time') + '!');
    }

    //event bindings
    function bindings() {
        $body.on('click', handleBodyClick);
    }

    $(document).ready(function() {
        //assign variables when DOM is ready
        hello = 'Hi';
        smiley = ' :)';
        count = 0;
        $body = $('body');
        
        //say hi
        console.log(hello + smiley);

        //execute bindings 
        bindings();
    });
})(jQuery);

