var questions = null;
var current_question = 0;
var current_category = 0;
var show_category_title = 1;

function run_quiz(data)
{
    questions = data;
    display_category(questions[current_category])
    $(document).keypress(function(e) {
      if (e.which == 32) {
          if (!show_category_title)
          {
            current_question++;
          }

          show_category_title = 0;

          if (current_category >= questions.length)
          {
            current_category = questions.length
            $("#question").text("The End!")
            $("#question").show()
            $("#category").hide()
            $("#answer").hide()
            return;
          }

          if (current_question >= questions[current_category]['questions'].length)
          {
            current_category++;
            show_category_title = 1
            current_question = 0;
          }

          if (current_category >= questions.length)
          {
            current_category = questions.length
            $("#question").text("The End!")
            $("#question").show()
            $("#category").hide()
            $("#answer").hide()
            return;
          }
      }
      if (e.which == 98) {
        current_question--;
        if (current_question < 0)
        {
          current_category--;
          if (current_category < 0)
            current_category = 0;
          current_question = questions[current_category]['questions'].length - 1
        }
      }

      console.log(current_question)
      console.log(current_category)
      if (show_category_title == 0)
      {
        display_question(questions[current_category]['questions'][current_question])
      }
      else {
        display_category(questions[current_category])
      }
    });
};

function display_category(category)
{
  $("#answer").hide("fade", {}, 500);
  $("#questionpicture").hide("fade", {}, 500);
  $("#question").hide("fade", {}, 500, function() {
        $("#category").text(category.name);
        $("#category").show("fade", {}, 500);
      });
}

function display_question(question)
{
  $("#category").hide("fade", {}, 500, function () {
    $("#answer").hide("fade", {}, 500);
    $("#questionpicture").hide("fade", {}, 500);
    $("#question").hide("fade", {}, 500, function() {
      $("#answer").text(question.answer);
      if ("question" in question)
      {
        $("#question").html(question.question);
        $("#question").show("fade", {}, 500);
      }
      if ("picture" in question)
      {
        $("#questionpicture").attr("src", question.picture);
        $("#questionpicture").show("fade", {}, 500)
      }
      if ($.QueryString.show)
      {
        $("#answer").show("fade", {}, 500);
      }
    });
  });
}

$(document).ready(function() {
  if ($.QueryString.category)
  {
    current_category = $.QueryString.category;
  }
  $.getJSON("questions.json", run_quiz);
});

(function($) {
    $.QueryString = (function(paramsArray) {
        let params = {};

        for (let i = 0; i < paramsArray.length; ++i)
        {
            let param = paramsArray[i]
                .split('=', 2);

            if (param.length !== 2)
                continue;

            params[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
        }

        return params;
    })(window.location.search.substr(1).split('&'))
})(jQuery);
