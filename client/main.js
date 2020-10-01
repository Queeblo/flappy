import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
let gameStarted = false;
let gameOver = false;
let y = 325;

const Game = {
   canvas: null,
   ctx: null,
   gravity: 5,
   draw: function(){
      Game.ctx.clearRect(0, 0, 500, 650);
      if (gameStarted === true){
         y += Game.gravity;
         console.log(y);
         if (y >= 605){
            gameStarted = false;
            gameOver = true;
         }
      }
      Game.ctx.fillRect(175, y, 50, 45);
      requestAnimationFrame(Game.draw);
   },
   reset: function(){
      y = 325;
      gameStarted = false;
      gameOver = false;
   },

   flap: function(){
      //y = y - 25;
      Game.gravity = -4;
      setTimeout(function (){
         Game.gravity = 5;
      }, 200)
   }
};

Template.body.onRendered(function(){
   Game.canvas = this.find('canvas');
   Game.ctx = Game.canvas.getContext("2d");
   Game.ctx.fillRect(175, y, 50, 45);
   requestAnimationFrame(Game.draw);
});

Template.body.events({
   'click'(){
      if(gameOver){
         Game.reset();
      } else{
         gameStarted = true;
      }

      if(gameStarted){
        Game.flap();
      }
   }
})