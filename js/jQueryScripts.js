var dNor = 600;
var dLong = 1000;
var pause = 1000;
var respColumn = 5;
var windowWidth = 0;

/* User Input For Scales */
var assessSelect = [
  ["struggleValue", "struggleText"],
  ["successValue", "successText"],
  ["worryValue", "worryText"]
];
var assessCounter = 0;


/* Question Sets for assessment */
var questionSets = [
  ["adapability",
    "I can learn effectively in many different formats.",
    "I struggle to adapt to changes in my preferred software and hardware.",
    "I will use the same workflow for as long as I can, even if it’s not the most efficient way to complete my work.",
    "I deliberately learn different workflows to complete a task."
  ],
  ["locations",
    "I struggle to effectively use learning resources if I’m not in my preferred workspace.",
    "I don’t have any problem learning in new places.",
    "I seek out workplaces with specific qualities that I know will help me focus.",
    "Once I start working, I find myself regretting where I’ve chosen to work."
  ],
  ["desire-based-motivations",
    "I make an effort to practice to improve my abilities outside of when I am working.",
    "I learn tools before I need to use them to complete work.",
    "I keep track upcoming trends in my field and make an effort to learn about them.",
    "I put off learning new tools until I need to use them."
  ],
  ["need-based-motivations",
    "I only start learning a tool or skill when it becomes relevant to a task I am currently working on.",
    "When I need to use unfamiliar tools, I try to learn more than I need to about it to complete my task.",
    "I only learn the techniques needed to complete my work.",
    "I learn the techniques I need to complete a project while I work on it."
  ],
  ["external-factors",
    "I easily lose focus when activities are happening around me while I work.",
    "I can easily tune out sounds and movement in my environment when working",
    "A busy environment helps me focus on my work.",
    "An active environment prevents me from completing work."
  ]
]

/* User Input For Answers */
var answerSets = [
  ["adapability", 0, 0, 0, 0],
  ["locations", 0, 0, 0, 0],
  ["desire-based-motivations", 0, 0, 0, 0],
  ["need-based-motivations", 0, 0, 0, 0, 0],
  ["external-factors", 0, 0, 0, 0]
];

/* System Key for Calculating Answers */
var answerKey = [
  ["adapability", true, false, false, true],
  ["locations", false, true, false, false],
  ["desire-based-motivations", true, true, true, false],
  ["need-based-motivations", true, false, true, true],
  ["external-factors", true, false, false, true]
];

/* System Totals For Calculating Answers */

var assessResult = [
  ["struggleSet", 0],
  ["successSet", 0],
  ["worrySet", 0]
];


var assessContent = [
  ["adapability", "Adaptability is a constant battle for many self-directed learners. The pace of innovation across many fields and disciplines means that keeping up to date with evolving techniques, software, or training is often beyond the scope of day-to-day work and can often perpetually pushed aside. The increased pace of innovation also means there may be many different learning resources detailing many different approaches, which may result in more than a few learners deciding to stick with their own methods rather than face the overload of choices available to them."],
  ["locations", "Related to 'Just in time learning', Need-based learning occurs when the learner is required (due to an external cause) to learn something to complete a specific task with limited prior knowledge of how to complete it. This leads the learner to begin seeking out learning resources and because of the lack of prior knowledge, often results in the learner spending large amounts of time seeking learning resources out instead of actually learning how to complete the task."],
  ["desire-based-motivations", "Desire-based learning occurs when the learner has an intrinsic motivation or interest in learning about a specific topic, tool, or discipline. Making time for this type of learning can result in great strides in mastery of the chosen topic. Learners generally have a backlog of desire-based learning they want to accomplish and only be actively pursuing 1-2 at a time. Desire-based learning may not always have the clearest practical application to a learner's day-to-day activities but instead might be based on hobbies or future goals. "],
  ["need-based-motivations", "Self-directed learning often takes place in a variety of different locations all with their own benefits and drawbacks that impact every learner differently. Some learners prefer specific locations that help them focus and make them feel comfortable. Many different attributes of the environment can impact how effectively a learner can focus. Learning to be aware of what kind of environmental factors impact your own learning and limiting or avoiding exposure to them will improve the effectiveness of self-directed learning"],
  ["external-factors", "The digital age has revolutionized how learners can engage in self-directed learning, but has also introduced countless distracting elements as well.  Being able to tune out, or eliminate these barriers often results in more effective learning. Learners who take inventory of these distractions and take solid steps to remove them will be able to more effectively self-direct their learning."]
];

var selAssessContent = [
  ["set", "CONTENT"],
  ["set", "CONTENT"],
  ["set", "CONTENT"]
];

var contentCounter = 0;
/* PRE ASSESSMENT USERFLOW */
/* PRE ASSESSMENT USERFLOW */
/* PRE ASSESSMENT USERFLOW */


/* Function to get collect responses and populate review */
function responseCollect() {
  console.log("Collecting Responses...");
  $("#struggle").text("I struggle with " + assessSelect[0][1]);
  $("#success").text("I'm find success with " + assessSelect[1][1]);
  $("#worry").text("I'm a little concerned about " + assessSelect[2][1]);
}


$(document).ready(function () {

  //Call To Action Fade Event
  $("#ctaBtn").on("click keydown", function () {
    $("#callToAction").fadeOut(function () {
      $("#assessIntro").fadeIn();
      setTimeout(assessStart, pause);
    });
  });
  //Assessment Fade In
  function assessStart() {
    $("#assessIntro").fadeOut(function () {
      $("#prompt1").fadeIn().css("display", "grid");
    });
  }
  //Assessment Transitions
  $("#prompt1").on("click keydown", ".responseCard", function () {
    /* Store value from response */
    assessSelect[assessCounter][0] = ($(this).attr("value"));
    assessSelect[assessCounter][1] = ($(this).text());
    
    assessCounter++;
    for (i = 0; i < 5; i++) {
      if ( ($(this).attr("value") == assessContent[i][0])) {
        console.log( $(this).attr("value") + " is the content");
        selAssessContent[contentCounter][0] = ($(this).attr("value"))
        selAssessContent[contentCounter][1] = assessContent[i][1];
        contentCounter++;
        
      } else {
        console.log("gonna keep looking");
      }
    }
    /* Check between mobile / desktop window sizes, then adjust grid accordingly */
    windowWidth = $(window).width();
    if (windowWidth <= 959) {
      $(".responseContainer").css("grid-template-rows", "repeat(4, 18%)");
    } else {
      $(".responseContainer").css("grid-template-columns", "repeat(4, 18%)");
    }
    /* remove selection from future responses */
    var el = ($(this).attr('class').split(' ').pop());
    console.log(el);
    $("." + el).remove();
    /* fade to next stage */
    $("#prompt1").fadeOut(function () {

      $("#prompt2").fadeIn().css("display", "grid");
    });
  });

  $("#prompt2").on("click keydown", ".responseCard", function () {
    /* Store value from response */
    assessSelect[assessCounter][0] = ($(this).attr("value"));
    assessSelect[assessCounter][1] = ($(this).text());
    assessCounter++;

    for (i = 0; i < 5; i++) {
      if ( ($(this).attr("value") == assessContent[i][0])) {
        console.log("found the content");
        selAssessContent[contentCounter][0] = ($(this).attr("value"))
        selAssessContent[contentCounter][1] = assessContent[i][1];
        contentCounter++;
      } else {
        console.log("gonna keep looking");
      }
    }
    /* Check between mobile / desktop window sizes, then adjust grid accordingly */
    windowWidth = $(window).width();
    if (windowWidth <= 959) {
      $(".responseContainer").css("grid-template-rows", "repeat(3, 18%)");
    } else {
      $(".responseContainer").css("grid-template-columns", "repeat(3, 18%)");
    }
    /* remove selection from future responses */
    var el = ($(this).attr('class').split(' ').pop());
    console.log(el);
    $("." + el).remove();
    /* fade to next stage */
    $("#prompt2").fadeOut(function () {
      $("#prompt3").fadeIn().css("display", "grid");
    });
  });

  $("#prompt3").on("click keydown", ".responseCard", function () {
    /* Store value from response */
    assessSelect[assessCounter][0] = ($(this).attr("value"));
    assessSelect[assessCounter][1] = ($(this).text());
    assessCounter++;


    for (i = 0; i < 5; i++) {
      if ( ($(this).attr("value") == assessContent[i][0])) {
        console.log("found the content");
        selAssessContent[contentCounter][0] = ($(this).attr("value"))
        selAssessContent[contentCounter][1] = assessContent[i][1];
      } else {
        console.log("gonna keep looking");
      }
    }
    /* remove selection from future responses */
    var el = ($(this).attr('class').split(' ').pop());
    console.log(el);
    $("." + el).remove();
    /* fade to next stage */
    $("#prompt3").fadeOut(function () {
      responseCollect();
      $("#promptReview").fadeIn().css("display", "grid");
    });

  });


  $("#reviewConfirm").on("click keydown", function () {
    $("#promptReview").fadeOut(function () {
      $("#assessmentContainer").fadeIn().css("display", "grid");
      assessment();

    });
  });

  /* ASSESSMENT USERFLOW */
  /* ASSESSMENT USERFLOW */
  /* ASSESSMENT USERFLOW */


  function assessment() {
    var nextQuestSet = 0
    var currentQuest = 1;
    var currentQuestSet = 0;
    var totalQuests = 1;
    /* Stores the selected question sets and their contents */
    var selQuestSets = [
      ["set", "Q1", "Q2", "Q3", "Q4", ],
      ["set", "Q1", "Q2", "Q3", "Q4", ],
      ["set", "Q1", "Q2", "Q3", "Q4", ]
    ]

    var selAnswerSets = [
      ["set", 0, 0, 0, 0],
      ["set", 0, 0, 0, 0],
      ["set", 0, 0, 0, 0]
    ]

    var selAnswerKey = [
      ["set", true, false, false, true],
      ["set", false, true, false, false],
      ["set", true, true, true, false],
    ];


    /* Iterates through the question sets and individual questions as user progresses */

    /* Min Value Of 0 / Max Value Of 3 */
    var disQuestSet = 0;
    /* Min Value of 1 / Max Value of 4 */
    var disQuest = 1;

    /* LOADING SELECTED QUESTION SETS */
    function loadQuests(n) {
      /* Finds a question set to load and loads 
         the values of the set and the content of the questions. */
      var q = questionSets;
      var setQ = selQuestSets[nextQuestSet];
      var a = answerKey;
      var c = assessContent;
      var setA = selAnswerKey[nextQuestSet];
      var setQA = selAnswerSets[nextQuestSet];
      var setC = selAssessContent[nextQuestSet];
      for (i = 0; i < 5; i++) {
        if (n == q[i][0]) {
          console.log("found it");
          for (e = 0; e < 5; e++) {
            setQ[e] = q[i][e];
            setA[e] = a[i][e];
          }
        } else {
          console.log("gonna keep looking");
        }
      }
      console.log("Question Set Logged");
      console.log("Answer Set Logged");
      selAnswerSets[nextQuestSet][0] = selQuestSets[nextQuestSet][0];
      nextQuestSet++;

    }
    /* Get the question, iterate for the next questions or question sets and then tell your friend to show the current question */
    function displayQuest() {
      if (disQuestSet == 3) {
        console.log("Assessment Completed")
      } else {
        if (disQuest > 4) {
          disQuestSet++;
          disQuest = 1;
        }
        $("#question").text(selQuestSets[disQuestSet][disQuest]);
        $("#question").attr("value", selAnswerKey[disQuestSet][disQuest])

        // $('#question').value();
        disQuest++;
        setTimeout(nextQuest, 500);
      }
    }
    /* Wait for your friend displayQuest to grab the next question, then fade it in */
    function nextQuest() {
      $("#question").fadeIn();
      $("#bubbleCard").fadeIn();
      $("#answerCard").fadeIn();
    }

    /* Checking value of question and answer */
    function checkValue(answerVal, questVal) {
      var AV = parseFloat(answerVal)
      console.log(" The question is weighted " + questVal);
      console.log("The weighted answer is " + answerVal);

      if (currentQuest < 5) {} else {
        currentQuestSet++;
        currentQuest = 1;
      }
      if (questVal == "false") {
        console.log("false");
        switch (AV) {
          case 0.25:
            AV = 1.25;
            break;
          case 0.5:
            AV = 1;
            break;
          case 1:
            AV = 0.5;
            break;
          case 1.25:
            AV = 0.25;
            break;
        }
      }
      console.log(AV);
      selAnswerSets[currentQuestSet][currentQuest] = AV;
      currentQuest++;


    }


    /* Check between mobile / desktop window sizes, then do approriate functions */
    windowWidth = $(window).width();

    if (windowWidth <= 959) {
      /* set answerCard value based on first assessSelect array variable */
      $("#answerCard").attr("value", assessSelect[0][0]);
    } else {
      /* set answerCard value based on first assessSelect array variable */
      $("#bubbleCard").attr("value", assessSelect[0][0]);

    }


    /* get array of questions based on answerCard value  */
    loadQuests(assessSelect[0][0]);
    loadQuests(assessSelect[1][0]);
    loadQuests(assessSelect[2][0]);
    /* load question from that specific questionSet  */
    displayQuest();

    /* Check between mobile / desktop window sizes, then do approriate functions */
    windowWidth = $(window).width();
    if (windowWidth <= 959) {
      /* wait for user input  */
      $(".singleA").on("click keydown", function () {
        console.log("answer selected");
        /* when user selects answer, run checkValue function to determine content of answer  */
        checkValue($(this).attr("value"), $("#question").attr("value"));
        /* load new question until all questions for answerCard value have been answered  */
        $("#bubbleCard").fadeOut();
        $("#answerCard").fadeOut();
        $("#question").fadeOut();
        console.log(currentQuestSet);
        if (totalQuests < 12) {
          totalQuests++;
          setTimeout(displayQuest, 1000);
        /* Load Next Question */
        } else {
          console.log("Assessment Complete")
          /* Calculate Total Scores */
          var struggleScore = 0;
          var successScore = 0;
          var worryScore = 0;
          for (i = 1; i < 5; i++) {
            struggleScore += selAnswerSets[0][i];
          }
          for (i = 1; i < 5; i++) {
            successScore += selAnswerSets[1][i];
          }
          for (i = 1; i < 5; i++) {
            worryScore += selAnswerSets[2][i];
          }

          assessResult[0][0] = selAnswerSets[0][0];
          assessResult[0][1] = struggleScore;
          assessResult[1][0] = selAnswerSets[1][0];
          assessResult[1][1] = successScore;
          assessResult[2][0] = selAnswerSets[2][0];
          assessResult[2][1] = worryScore;

          console.log(assessResult);
          $("#struggleScore").text(struggleScore);
          $("#successScore").text(successScore);
          $("#worryScore").text(worryScore);
          $("#struggleSet").text(assessResult[0][0]);
          $("#successSet").text(assessResult[1][0]);
          $("#worrySet").text(assessResult[2][0]);

          console.log(selAnswerSets);
          
          /* DISPLAY RESULTS PAGE */
          $("#assessmentContainer").fadeOut().css("display", "none");
          $("#resultsContainer").fadeIn().css("display", "grid");
        }
      });
    } else {
      /* wait for user input  */
      $(".bubble").on("click keydown", function () {
        console.log("answer selected");
        /* when user selects answer, run checkValue function to determine content of answer  */
        checkValue($(this).attr("value"), $("#question").attr("value"));
        /* load new question until all questions for answerCard value have been answered  */
        $("#bubbleCard").fadeOut();
        $("#answerCard").fadeOut();
        $("#question").fadeOut();
        console.log(currentQuestSet);
        if (totalQuests < 12) {
          totalQuests++;
          setTimeout(displayQuest, 1000);
        /* Load Next Question */
        } else {
          console.log("Assessment Complete")
          /* Calculate Total Scores */
          var struggleScore = 0;
          var successScore = 0;
          var worryScore = 0;
          for (i = 1; i < 5; i++) {
            struggleScore += selAnswerSets[0][i];
          }
          for (i = 1; i < 5; i++) {
            successScore += selAnswerSets[1][i];
          }
          for (i = 1; i < 5; i++) {
            worryScore += selAnswerSets[2][i];

          }
          assessResult[0][0] = selAnswerSets[0][0];
          assessResult[0][1] = struggleScore;
          assessResult[1][0] = selAnswerSets[1][0];
          assessResult[1][1] = successScore;
          assessResult[2][0] = selAnswerSets[2][0];
          assessResult[2][1] = worryScore;

          console.log(assessResult);
          $("#struggleScore").text(struggleScore);
          $("#successScore").text(successScore);
          $("#worryScore").text(worryScore);
          $("#struggleSet").text(assessResult[0][0]);
          $("#successSet").text(assessResult[1][0]);
          $("#worrySet").text(assessResult[2][0]);
          $("#struggleContent").text(selAssessContent[0][1]);
          $("#successContent").text(selAssessContent[1][1]);
          $("#worryContent").text(selAssessContent[2][1]);
          

          console.log(selAnswerSets);

          /* DISPLAY RESULTS PAGE */
          $("#assessmentContainer").fadeOut().css("display", "none");
          $("#resultsContainer").fadeIn().css("display", "grid");
        }
      });
    }
    /* repeat this process until all questionSets based on the values from assessSelect array have been completed  */
  }



  /* calculate total scores based on the values of the answerSet array  */
  /* display results and show content.  */

  /* OLD STORING FUNCTION */
  /* onClick event to store user's responses 

  $("#site_Content").on("click", ".responseCard", function (event) {
    event.preventDefault();
    assessSelect[assessCounter][0] = ($(this).attr("value"));
    assessSelect[assessCounter][1] = ($(this).text());
    assessCounter++;
    /* console.log(typeof ($(this).attr("value")));
  });
*/
  //document.ready 
});