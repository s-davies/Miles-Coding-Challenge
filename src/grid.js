export default class Grid {
  constructor() {
    let that = this;
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
        //re-enable the droppable that was previously occupied 
        if (ui.draggable[0].dataset.parent !== "r1-drop0") {
          $(`#${ui.draggable[0].dataset.parent}`).droppable("option", "disabled", false);
        }
        // disable new droppable
        if (event.target.id !== "r1-drop0") {
          $(`#${event.target.id}`).droppable("option", "disabled", true);
        }
        //reset the draggable parent to the new droppable
        ui.draggable[0].dataset.parent = event.target.id;
      }
    });
    $(".drop2").droppable({
      accept: ".reward-2",
      drop: function (event, ui) {
        //re-enable the droppable that was previously occupied 
        if (ui.draggable[0].dataset.parent !== "r2-drop0") {
          $(`#${ui.draggable[0].dataset.parent}`).droppable("option", "disabled", false);
        }
        // disable new droppable
        if (event.target.id !== "r2-drop0") {
          $(`#${event.target.id}`).droppable("option", "disabled", true);
        }
        //reset the draggable parent to the new droppable
        ui.draggable[0].dataset.parent = event.target.id;
      }
    });
    $(".drop3").droppable({
      accept: ".reward-3",
      drop: function (event, ui) {
        //re-enable the droppable that was previously occupied 
        if (ui.draggable[0].dataset.parent !== "r3-drop0") {
          $(`#${ui.draggable[0].dataset.parent}`).droppable("option", "disabled", false);
        }
        // disable new droppable
        if (event.target.id !== "r3-drop0") {
          $(`#${event.target.id}`).droppable("option", "disabled", true);
        }
        //reset the draggable parent to the new droppable
        ui.draggable[0].dataset.parent = event.target.id;
      }
    });
    $(".drop4").droppable({
      accept: ".reward-4",
      drop: function (event, ui) {
        //re-enable the droppable that was previously occupied 
        if (ui.draggable[0].dataset.parent !== "r4-drop0") {
          $(`#${ui.draggable[0].dataset.parent}`).droppable("option", "disabled", false);
        }
        // disable new droppable
        if (event.target.id !== "r4-drop0") {
          $(`#${event.target.id}`).droppable("option", "disabled", true);
        }
        //reset the draggable parent to the new droppable
        ui.draggable[0].dataset.parent = event.target.id;
      }
    });
    $(".drop5").droppable({
      accept: ".reward-5",
      drop: function (event, ui) {
        //re-enable the droppable that was previously occupied 
        if (ui.draggable[0].dataset.parent !== "r5-drop0") {
          $(`#${ui.draggable[0].dataset.parent}`).droppable("option", "disabled", false);
        }
        // disable new droppable
        if (event.target.id !== "r5-drop0") {
          $(`#${event.target.id}`).droppable("option", "disabled", true);
        }
        //reset the draggable parent to the new droppable
        ui.draggable[0].dataset.parent = event.target.id;
      }
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
    $(`#${el.dataset.parent}`).droppable("option", "disabled", false);
    $(el).remove();
  }

}
