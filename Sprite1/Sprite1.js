/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 48,
        y: 50
      }),
      new Costume("costume2", "./Sprite1/costumes/costume2.svg", {
        x: 46,
        y: 53
      })
    ];

    this.sounds = [new Sound("Meow", "./Sprite1/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.costume = "costume1";
    this.goto(0, 0);
    this.direction = 90;
    while (
      !(
        this.touching(Color.rgb(135, 255, 102)) ||
        this.touching(Color.rgb(222, 102, 255))
      )
    ) {
      this.stage.vars.randomNumber = this.random(0.1, 100);
      yield* this.askAndWait(
        "" +
          "What is half of " +
          ("" + this.stage.vars.randomNumber + "(to the nearest whole number")
      );
      this.stage.vars.roundedAnswer = this.answer;
      if (
        this.stage.vars.roundedAnswer ==
        Math.round(this.stage.vars.randomNumber / 2)
      ) {
        yield* this.sayAndWait("Correct", 2);
        yield* this.getFly();
      } else {
        yield* this.sayAndWait("Incorrect", 2);
        yield* this.eatGrass();
      }
      yield;
    }
    if (this.touching(Color.rgb(174, 255, 151))) {
      yield* this.sayAndWait("You lose!", 2);
    }
    if (this.touching(Color.rgb(239, 178, 255))) {
      yield* this.sayAndWait("You win!", 2);
    }
  }

  *getFly() {
    this.direction = 0;
    while (!this.touching(Color.rgb(222, 102, 255))) {
      this.costume = "costume1";
      this.move(10);
      yield* this.wait(0.2);
      this.costume = "costume2";
      this.move(10);
      yield* this.wait(0.2);
      return;
      yield;
    }
    while (!this.touching(Color.rgb(222, 102, 255))) {
      yield;
    }
    this.costume = "costume2";
  }

  *eatGrass() {
    this.direction = 180;
    while (!this.touching(Color.rgb(135, 255, 102))) {
      this.costume = "costume1";
      this.move(10);
      yield* this.wait(0.2);
      this.costume = "costume2";
      this.move(10);
      yield* this.wait(0.2);
      return;
      yield;
    }
    while (!this.touching(Color.rgb(135, 255, 102))) {
      yield;
    }
    this.costume = "costume1";
  }
}
