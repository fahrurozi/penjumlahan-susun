let text = {
  data: [
    {
      var1: 12,
      var2: 9,
    },
    {
      var1: 29,
      var2: 3,
    },
    {
      var1: 15,
      var2: 17,
    },
    {
      var1: 17,
      var2: 18,
    },
    {
      var1: 25,
      var2: 26,
    },
  ],
};

var audioCorrect = new Audio("/static/sound/correct.mp4");
var audioIncorrect = new Audio("/static/sound/incorrect.mp4");

let data = text.data;
currentNumber = 1;
initQUestion();
// 0 = mid; 1 = right; 2 = left
statusAnswer = 0;

Swal.fire({
  imageUrl: "/static/img/1.png",
  imageWidth: 300,
  imageHeight: 500,
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      imageUrl: "/static/img/2.png",
      imageWidth: 300,
      imageHeight: 500,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          imageUrl: "/static/img/3.png",
          imageWidth: 300,
          imageHeight: 500,
        })
      }
    });
  }
});



function disabledBtnQuestion() {
  number = [1, 2, 3, 4, 5];
  number.forEach((element) => {
    if (element == currentNumber) {
      $("#btn-q" + element).removeClass("btn-next");
      $("#btn-q" + element).addClass("btn-current");
    } else if (element > currentNumber) {
      $("#btn-q" + element).attr("disabled", true);
    } else if (element < currentNumber) {
      $("#btn-q" + element).addClass("btn-done");
      $("#btn-q" + element).attr("disabled", true);
    }
  });
}

function initQUestion() {
  // reset all css
  $("#mid-answer").removeClass("badge-correct");
  $("#mid-answer").addClass("bg-black");
  $("#mid-answer").html("?");
  $("#mid-answer-hidden").addClass("d-none");
  $("#right-answer").removeClass("badge-correct");
  $("#right-answer").addClass("bg-black");
  $("#right-answer").html("?");
  $("#left-answer").removeClass("badge-correct");
  $("#left-answer").addClass("bg-black");
  $("#left-answer").html("?");
  statusAnswer = 0;

  data_var1 = data[currentNumber - 1].var1;
  data_var2 = data[currentNumber - 1].var2;

  document.getElementById("soal-var1").innerHTML = data_var1;
  document.getElementById("soal-var2").innerHTML = data_var2;

  data_var1_split = data_var1.toString().split("").map(Number);
  if (data_var2.toString().length == 1) {
    data_var2_split = [0, data_var2];
  } else {
    data_var2_split = data_var2.toString().split("").map(Number);
  }

  $("#var1-1").html(data_var1_split[0]);
  $("#var1-2").html(data_var1_split[1]);

  if (data_var2_split[0] == 0) {
    $("#var2-1").html("&nbsp&nbsp");
  } else {
    $("#var2-1").html(data_var2_split[0]);
  }
  $("#var2-2").html(data_var2_split[1]);

  $("#mid-answer").css({
    position: "",
    top: "",
    animation: "",
  });
  $("#mid-answer-hidden").addClass("d-none");
  $("#mid-answer").addClass("blink-me");

  currentNumberResultKey =
    data[currentNumber - 1].var1 + data[currentNumber - 1].var2;
  disabledBtnQuestion();
}

function selectNumber(number) {
  currentNumber = number;
  initQUestion();
}

function answer(number_answer) {
  console.log("number_answer", number_answer);
  console.log(number_answer);
  if (statusAnswer == 0) {
    val_mid_right = data_var1_split[1] + data_var2_split[1];
    console.log("val_mid_right", val_mid_right);
    val_mid_right_split = val_mid_right.toString().split("").map(Number);
    if (number_answer != val_mid_right_split[0]) {
      incorrectSound();
      $("#btn-answer-" + number_answer).addClass("bg-red");
    } else {
      correctSound();
      $("#mid-answer").html(number_answer);
      $("#mid-answer").addClass("badge-correct");
      $("#mid-answer").removeClass("bg-black");
      $("#mid-answer").removeClass("blink-me");
      removeRedBgButton();
      statusAnswer++;
      $("#right-answer").addClass("blink-me");
    }
  } else if (statusAnswer == 1) {
    if (number_answer != val_mid_right_split[1]) {
      incorrectSound();
      console.log("wrong");
      $("#btn-answer-" + number_answer).addClass("bg-red");
    } else {
      correctSound();
      $("#right-answer").removeClass("blink-me");
      $("#right-answer").html(number_answer);
      $("#right-answer").addClass("badge-correct");
      $("#right-answer").removeClass("bg-black");
      removeRedBgButton();

      disableAnswerButton();
      setTimeout(function () {
        $("#mid-answer-hidden").removeClass("d-none");
        $("#mid-answer")
          .css({
            position: "absolute",
            animation: "moveFirst 5s linear .2s normal forwards",
          })
          .promise()
          .done(function () {
            setTimeout(function () {
              $("#mid-answer")
                .css({
                  top: "4%",
                  position: "absolute",
                  animation: "moveLeft 3s linear .2s normal forwards",
                })
                .promise()
                .done(function () {
                  $("#left-answer").addClass("blink-me");
                  enableAnswerButton();
                  statusAnswer++;
                });
            }, 5000);
          });
      }, 3000);
    }
  } else if (statusAnswer == 2) {
    sisa = val_mid_right_split[0];
    val_result_left = data_var1_split[0] + data_var2_split[0] + sisa;
    if (number_answer != val_result_left) {
      incorrectSound();
      console.log("wrong");
      $("#btn-answer-" + number_answer).addClass("bg-red");
    } else {
      correctSound();
      $("#left-answer").removeClass("blink-me");
      $("#left-answer").html(number_answer);
      $("#left-answer").addClass("badge-correct");
      $("#left-answer").removeClass("bg-black");
      removeRedBgButton();
      statusAnswer++;
      showAlert();
    }
  }
}

function showAlert() {
  setTimeout(function () {
    if (currentNumber == data.length) {
      Swal.fire({
        title: "Selamat Anda Telah Menyelesaikan Soal",
        text: data_var1 + " + " + data_var2 + " = " + currentNumberResultKey,
        icon: "success",
        confirmButtonText: "Selesai",
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    } else {
      Swal.fire({
        title: "Jawaban Anda Benar",
        text: data_var1 + " + " + data_var2 + " = " + currentNumberResultKey,
        icon: "success",
        confirmButtonText: "Lanjut Soal Berikutnya",
      }).then((result) => {
        if (result.isConfirmed) {
          currentNumber++;
          selectNumber(currentNumber);
        }
      });
    }
  }, 3000);
}

function disableAnswerButton() {
  console.log("disableAnswerButton");
  for (let i = 0; i <= 9; i++) {
    $("#btn-answer-" + i).attr("disabled", true);
  }
}

function enableAnswerButton() {
  for (let i = 0; i <= 9; i++) {
    $("#btn-answer-" + i).attr("disabled", false);
  }
}

function removeRedBgButton() {
  for (let i = 0; i <= 9; i++) {
    $("#btn-answer-" + i).removeClass("bg-red");
  }
}

function correctSound() {
  audioCorrect.playbackRate = 1.5;
  audioCorrect.play();
}

function incorrectSound() {
  audioIncorrect.playbackRate = 1.5;
  audioIncorrect.play();
}
