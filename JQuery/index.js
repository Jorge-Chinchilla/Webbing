/*  When placing the jQuery script on the head, this ready implementation is required

$(document).ready(function (){
   $("h1").css("color","red"); //$ jQuery
});*/

//css
$("h1").css("color","blue"); //$ jQuery

$("button");
//classes
$("h1").addClass("big-title margin");
$("h1").removeClass("big-title");
$("h1").hasClass("margin");

//atributes
$("h1").text("Bye");
$("button").text("Don't click me");
$("button").html("<em>Hey</em>")
//console.log($("a").attr("href", "https://www.yahoo.com"));

// event listener
$("h1").click(function (){
    $("h1").css("color","purple");
})

//add a property to multiple html elements
$("button").click(function (){
    $("h1").css("color","purple");
})

//keypress
$(document).keypress(function (){
    $("h1").text(event.key);
})
//more events
$("h1").on("mouseover",function (){
    $("h1").css("color", "green");
})

// adding and removing html elements with jQuery
$("h1").before("<button>before</button>");
$("h1").after("<button>after</button>");
$("h1").prepend("<button>prepend</button>");
$("h1").append("<button>append</button>");
// YOU CAN REMOVE AN ELEMENT WITH:
    //$("button").remove();

//some animations
//h1 will desappear, currently wont work
$("button").on("click", function (){
    //hide
    //$("h1").hide();
    //toggle it to hide and show
    // $("h1").toggle();
    // $("h1").fadeOut();
    // $("h1").fadeIn();
    // $("h1").slideUp();
    // $("h1").slideDown();
    // $("h1").slideToggle();

    //$("h1").animate({opacity: 0.5});

    $("h1").slideUp().slideDown().animate({opacity: 0.5});

})
