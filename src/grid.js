export default class Grid {
  constructor() {
    let that = this;
    this.gridState = {
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0,
      "15": 0,
      "21": 0,
      "22": 0,
      "23": 0,
      "24": 0,
      "25": 0,
      "31": 0,
      "32": 0,
      "33": 0,
      "34": 0,
      "35": 0,
      "41": 0,
      "42": 0,
      "43": 0,
      "44": 0,
      "45": 0,
      "51": 0,
      "52": 0,
      "53": 0,
      "54": 0,
      "55": 0,
    };
    // draggables snap to droppables
    $(".reward-1").draggable({
      revert: "invalid",
      snap: ".drop1",
      snapMode: "inner",
      snapTolerance: 30
    });
    $(".reward-2").draggable({
      revert: "invalid",
      snap: ".drop2",
      snapMode: "inner",
      snapTolerance: 30
    });
    $(".reward-3").draggable({
      revert: "invalid",
      snap: ".drop3",
      snapMode: "inner"
    });
    $(".reward-4").draggable({
      revert: "invalid",
      snap: ".drop4",
      snapMode: "inner"
    });
    $(".reward-5").draggable({
      revert: "invalid",
      snap: ".drop5",
      snapMode: "inner"
    });
    // change cursor on click and unclick of draggable
    $(".rewards-col div").on('mousedown', (e) => {
      $(".rewards-col div").css("cursor", "grabbing");
    });
    $(".rewards-col div").on('mouseup', (e) => {
      $(".rewards-col div").css("cursor", "grab");
    });
    //create droppables that draggables will stick to
    $(".drop1").droppable({
      accept: ".reward-1",
      drop: function (event, ui) {
        that.gridState[ui.draggable[0].id] = 1;
      },
    });
    $(".drop2").droppable({
      accept: ".reward-2"
    });
    $(".drop3").droppable({
      accept: ".reward-3"
    });
    $(".drop4").droppable({
      accept: ".reward-4"
    });
    $(".drop5").droppable({
      accept: ".reward-5"
    });

    this.removeReward = this.removeReward.bind(this);
    $(".drop1 b").click({ param1: '1'}, this.removeReward);
    $(".drop2 b").click({ param1: '2'}, this.removeReward);
    $(".drop3 b").click({ param1: '3'}, this.removeReward);
    $(".drop4 b").click({ param1: '4'}, this.removeReward);
    $(".drop5 b").click({ param1: '5'}, this.removeReward);
    
  }
  //////////////////////////////////////////////////////////////////////////////
  removeReward (event) {
    const el = event.target.parentElement;
    $(el.parentElement).append(
      `<div class='reward-${event.data.param1}'><b>X</b><h3>R${event.data.param1}</h3></div>`
    );
    $(`.drop${event.data.param1} b`).click({ param1: '1' }, this.removeReward);
    $(`.reward-${event.data.param1}`).draggable({
      revert: "invalid",
      snap: `.drop${event.data.param1}`,
      snapMode: "inner",
      snapTolerance: 30
    });
    $(el).remove();
  }

}
