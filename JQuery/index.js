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