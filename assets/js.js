var rock = $("#Rock");
var paper = $("#Paper");
var scissors = $("#Scissors");
var rock2 = $("#Rock2");
var paper2 = $("#Paper2");
var scissors2 = $("#Scissors2");
var sit = $("#sit");
var choice = $('#choice');
var standing = $("#sitting");
var standing2 = $("#sitting2");
var sit2 = $("#sit2");
var choice2 = $('#choice2');
var sitRef = firebase.database().ref('users/' + 1 + '/Sitting');
var sitRef2 = firebase.database().ref('users/' + 2 + '/Sitting');
var sitdown  = $('#sitdown');
var choiceRef =  firebase.database().ref('users/' + 1 + '/choice');
var choiceRef2 =  firebase.database().ref('users/' +  2 + '/choice');
var message =  $("#message");
var message2 =  $("#message2");

function checkWinner(results){
    switch(results){
        case 'Rock vs Rock':
        message2.text('Tie Game');
        break;
        case 'Rock vs Paper':
        message2.text('Player 2 Wins');
        break;
        case 'Rock vs Scissors':
        message2.text('Player 1 Wins');
        break;
        case 'Paper vs Rock':
        message2.text('Player 1 Wins');
        break;
        case 'Paper vs Paper':
        message2.text('Tie Game');
        break;
        case 'Paper vs Scissors':
        message2.text('Player 2 Wins');
        break;
        case 'Scissors vs Rock':
        message2.text('Player 2 Wins');
        break;
        case 'Scissors vs Paper':
        message2.text('Player 1 Wins');
        break;
        case 'Scissors vs Scissors':
        message2.text('Tie Game');
        break;

    }
}

function sendChoice(choice){
    firebase.database().ref('users/' + 1).set({
        choice: choice,
        Sitting: true
      });
}

function checkWin(){
    choiceRef.once('value', function(snapshot) {
        if(snapshot.val()!=''){
          var one = snapshot.val();
          choiceRef2.once('value', function(snapshot2){
              if(snapshot2.val()!=''){
                  var two = snapshot2.val();
                  var result = one+' vs '+two;
                  firebase.database().ref('users/' + 1).set({
                      choice:  '',
                      Sitting: true
                    });
                    firebase.database().ref('users/' + 2).set({
                      choice:  '',
                      Sitting: true
                    });
                    message.text(result);
                    checkWinner(result);

              }

          }
          )
        }

    });
}

function checkWin2(){
    choiceRef.once('value', function(snapshot2) {
        if(snapshot2.val()!=''){
          var two = snapshot2.val();
          choiceRef2.once('value', function(snapshot){
              if(snapshot2.val()!=''){
                  var one = snapshot.val();
                  var result = two+' vs '+one;
                  firebase.database().ref('users/' + 1).set({
                      choice:  '',
                      Sitting: true
                    });
                    firebase.database().ref('users/' + 2).set({
                      choice:  '',
                      Sitting: true
                    });
                    message.text(result);
                    checkWinner(result);

              }

          }
          )
        }

    });
}
function sendChoice2(choice){
    firebase.database().ref('users/' + 2).set({
        choice: choice,
        Sitting: true

      });
}

function  sitting(){
    if  (sit.text()==='Sit Down'){
    choice.removeClass('hidden');
    sit.html('Stand Up');
    standing.text('Player 1 Standup to Stop Playing:');
    firebase.database().ref('users/' + 1).set({
        choice:  '',
        Sitting: true
      });
    }
    else{
        choice.addClass('hidden');
        sit.html('Sit Down');
        standing.text('Player 1 Sitdown to Play:')
        firebase.database().ref('users/' + 1).set({
            choice:  '',
            Sitting: false
          });
    }
}

function  sitting2(){
    if  (sit2.text()==='Sit Down'){
    choice2.removeClass('hidden');
    sit2.html('Stand Up');
    standing2.text('Player 2 Standup to Stop Playing:');
    firebase.database().ref('users/' + 2).set({
        choice:  '',
        Sitting: true
      });
    }
    else{
        choice2.addClass('hidden');
        sit2.html('Sit Down');
        standing2.text('Player 2 Sitdown to Play:')
        firebase.database().ref('users/' + 2).set({
            choice:  '',
            Sitting: false
          });
    }
}


$( document ).ready(function() {
    rock.click(function(){sendChoice("Rock"); checkWin();});
    paper.click(function(){sendChoice("Paper");checkWin();});
    scissors.click(function(){sendChoice("Scissors");checkWin();});
    rock2.click(function(){sendChoice2("Rock");checkWin2();});
    paper2.click(function(){sendChoice2("Paper");checkWin2();});
    scissors2.click(function(){sendChoice2("Scissors");checkWin2();});
    choice.addClass('hidden');
    choice2.addClass('hidden');
    sit.click(sitting);
    sit2.click(sitting2);
    sitRef.once('value', function(snapshot) {
        if(snapshot.val()===true){
            standing.text("Player 1 is ready to play");
            sit.text("Kick Out Player 1")
        };
        if(snapshot.val()===false){
            standing.text("Player 1 Sitdown to Play:");
            sit.text("Sit Down")
        };
      });
      sitRef2.once('value', function(snapshot) {
        if(snapshot.val()===true){
            standing2.text("Player 2 is ready to play");
            sit2.text("Kick Out Player 2")
        };
        if(snapshot.val()===false){
            standing2.text("Player 2 Sitdown to Play:");
            sit2.text("Sit Down")
        };
      });


});
