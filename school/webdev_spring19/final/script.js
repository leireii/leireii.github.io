$(document).ready(function(){

  $("#home").fadeIn();
  // $("#links").hide();
  // $("#lyrics").hide();

  $("#nav-home").click(function(){
    $("#home").fadeIn();
    $("#links").fadeOut();
    $("#lyrics").fadeOut();
  });

  $("#nav-links").click(function(){
    $("#home").fadeOut();
    $("#links").fadeIn();
    $("#lyrics").fadeOut();
  });

  $("#nav-lyrics").click(function(){
    $("#home").fadeOut();
    $("#links").fadeOut();
    $("#lyrics").fadeIn();
  });
  
  // lyrics

  $("#whyz").click(function(){
    $("#whyz-img").fadeIn();
    $(".crb-img").fadeOut();
    $(".trust-img").fadeOut();
    $(".around-img").fadeOut();
    $(".pz-img").fadeOut();
    $(".target-img").fadeOut();
  });
  $("#crb").click(function(){
    $("#whyz-img").fadeOut();
    $(".crb-img").fadeIn();
    $(".trust-img").fadeOut();
    $(".around-img").fadeOut();
    $(".pz-img").fadeOut();
    $(".target-img").fadeOut();
  });
  $("#trust").click(function(){
    $("#whyz-img").fadeOut();
    $(".crb-img").fadeOut();
    $(".trust-img").fadeIn();
    $(".around-img").fadeOut();
    $(".pz-img").fadeOut();
    $(".target-img").fadeOut();
  });
  $("#around").click(function(){
    $("#whyz-img").fadeOut();
    $(".crb-img").fadeOut();
    $(".trust-img").fadeOut();
    $(".around-img").fadeIn();
    $(".pz-img").fadeOut();
    $(".target-img").fadeOut();
  });
  $("#pz").click(function(){
    $("#whyz-img").fadeOut();
    $(".crb-img").fadeOut();
    $(".trust-img").fadeOut();
    $(".around-img").fadeOut();
    $(".pz-img").fadeIn();
    $(".target-img").fadeOut();
  });
  $("#target").click(function(){
    $("#whyz-img").fadeOut();
    $(".crb-img").fadeOut();
    $(".trust-img").fadeOut();
    $(".around-img").fadeOut();
    $(".pz-img").fadeOut();
    $(".target-img").fadeIn();

  });


});
