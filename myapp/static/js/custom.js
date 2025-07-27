let text = {
  data: [
    {
      var1: 14,
      var2: 9,
    },
    {
      var1: 16,
      var2: 7,
    },
    {
      var1: 27,
      var2: 8,
    },
    {
      var1: 18,
      var2: 16,
    },
    {
      var1: 29,
      var2: 17,
    },
  ],
};

var audioCorrect = new Audio("sound/correct.mp4");
var audioIncorrect = new Audio("sound/incorrect.mp4");

let data = text.data;
currentNumber = 1;
initQUestion();
// 0 = mid; 1 = right; 2 = left
statusAnswer = 0;
  


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
  $("#mid-answer").html("?");
  $("#right-answer").removeClass("badge-correct");
  $("#right-answer").html("?");
  $("#left-answer").removeClass("badge-correct");
  $("#left-answer").html("?");
  statusAnswer = 0;
  $("#nomor-soal").html(currentNumber + ".");

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
  

  $("#var1-1").attr("src", `img/soal/${data_var1_split[0]}-blue.png`);
  $("#var1-2").attr("src", `img/soal/${data_var1_split[1]}-red.png`);

  if (data_var2_split[0] == 0) {
    $("#var2-1").attr("src", `img/soal/0.png`);
  } else {
    $("#var2-1").attr("src", `img/soal/${data_var2_split[0]}-blue.png`);
  }
  $("#var2-2").attr("src", `img/soal/${data_var2_split[1]}-red.png`);

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
      removeRedBgButton();

      disableAnswerButton();
      setTimeout(function () {
        $("#mid-answer")
          .css({
            position: "absolute",
            animation: "moveFirst 5s linear .1s normal forwards",
          })
          .promise()
          .done(function () {
            setTimeout(function () {
              $("#mid-answer")
                .css({
                  top: "12%",
                  position: "absolute",
                  animation: "moveLeft 3s linear .1s normal forwards",
                })
                .promise()
                .done(function () {
                  $("#left-answer").addClass("blink-me");
                  enableAnswerButton();
                  statusAnswer++;
                });
            }, 5000);
          });
      }, 1000);
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
      // 1. Swal pertama: jawaban benar
      Swal.fire({
        title: "Jawaban Anda Benar",
        text: data_var1 + " + " + data_var2 + " = " + currentNumberResultKey,
        confirmButtonText: "Lanjut",
        position: 'bottom-end',
        customClass: {
          popup: 'swal-small',
          icon: 'swal-small-icon',
          title: 'swal-title-small',
          confirmButton: 'swal-button-small'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // 2. Swal kedua: soal selesai
          Swal.fire({
            title: "👏 Kamu sudah menyelesaikan semua soal!",
            html: `
              <b>⭐ Semangat belajar ya!</b><br/><br/>
              <div style="display:flex; justify-content: space-around; gap: 10px; margin-top: 20px;">
                <button id="ulang-btn" class="swal2-confirm swal2-styled" style="background-color:#4caf50;">🔁 Ulangi Latihan</button>
                <button id="menu-btn" class="swal2-cancel swal2-styled" style="background-color:#2196F3;">🏠 Kembali ke Menu</button>
              </div>
            `,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              document.getElementById("ulang-btn").addEventListener("click", function () {
                location.reload();
              });
              document.getElementById("menu-btn").addEventListener("click", function () {
                window.location.href = "/"; // ganti sesuai link menu utama kamu
              });
            }
          });
        }
      });
    } else {
      // Soal belum selesai
      Swal.fire({
        title: "Jawaban Anda Benar",
        text: data_var1 + " + " + data_var2 + " = " + currentNumberResultKey,
        position: 'bottom-end',
        confirmButtonText: "Lanjut Soal Berikutnya",
        customClass: {
          popup: 'swal-small',
          icon: 'swal-small-icon',
          title: 'swal-title-small',
          confirmButton: 'swal-button-small'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          currentNumber++;
          selectNumber(currentNumber);
        }
      });
    }
  }, 1000);
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

  if ("vibrate" in navigator) {
    console.log("Vibrate supported");
    navigator.vibrate([200, 100, 200]);
  } else {
    console.log("Vibrate NOT supported");
  }
}
