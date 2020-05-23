export default class Grid {
  constructor() {
    //keep track of previous moves
    this.allMoves = [];
    this.allMovesIdx = -1;
    //bind undo/redo
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    //add click event to undo/redo
    $(`#undo`).on("click", this.undo);
    $(`#redo`).on("click", this.redo);
    //bind removeReward function
    this.removeReward = this.removeReward.bind(this);

    // change cursor on click and unclick of draggable
    $(".rewards-col div").on('mousedown', (e) => {
      $(".rewards-col div").css("cursor", "grabbing");
    });
    $(".rewards-col div").on('mouseup', (e) => {
      $(".rewards-col div").css("cursor", "grab");
    });
    let that = this;//preserve context inside drop
    for (let i = 1; i < 6; i++) {
      // draggables snap to droppables
      $(`.reward-${i}`).draggable({
        revert: "invalid",
        snap: `.drop${i}`,
        snapMode: "inner",
        snapTolerance: 30
      });
      //create droppables that draggables will stick to
      $(`.drop${i}`).droppable({
        accept: `.reward-${i}`,
        drop: function (event, ui) {
          //re-enable the droppable that was previously occupied 
          if (ui.draggable[0].dataset.parent !== `r${i}-drop0`) {
            $(`#${ui.draggable[0].dataset.parent}`).droppable("option", "disabled", false);
          }
          // disable new droppable
          if (event.target.id !== `r${i}-drop0`) {
            $(`#${event.target.id}`).droppable("option", "disabled", true);
          }
          //save move to array
          that.allMoves = that.allMoves.slice(0, that.allMovesIdx+1);
          that.allMoves.push({ draggable: ui.draggable[0].id, prevDrop: ui.draggable[0].dataset.parent, curDrop: event.target.id});
          that.allMovesIdx += 1;
          //reset the draggable parent to the new droppable
          ui.draggable[0].dataset.parent = event.target.id;
        }
      });
      //add click handler to upper right x to remove reward
      $(`.drop${i} b`).click({ param1: `${i}` }, this.removeReward);
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  removeReward (event) {
    //get the draggable element to be removed
    const draggable = event.target.parentElement;
    //reenable the previously disabled droppable element
    $(`#${draggable.dataset.parent}`).droppable("option", "disabled", false);
    //move the draggable element back to starting position
    $(draggable).position({
      of: $(`#r${event.data.param1}-drop0`)
    });
    //save move to array
    this.allMoves = this.allMoves.slice(0, this.allMovesIdx + 1);
    this.allMoves.push({ draggable: draggable.id, prevDrop: draggable.dataset.parent, curDrop: `r${event.data.param1}-drop0` });
    this.allMovesIdx += 1;
    //reset parent info
    draggable.dataset.parent = `r${event.data.param1}-drop0`;
  }

  undo (event) {
    const moveData = this.allMoves[this.allMovesIdx];
    //decrease the all moves index rather than pop array in case we need to redo
    this.allMovesIdx -= 1;
    const dropToEnable = $(`#${moveData.curDrop}`);
    const dropToDisable = $(`#${moveData.prevDrop}`);
    const draggable = $(`#${moveData.draggable}`);
    dropToEnable.droppable("option", "disabled", false);
    dropToDisable.droppable("option", "disabled", true);
    draggable.position({
      of: dropToDisable
    });
    //reset parent data for draggable element
    draggable[0].dataset.parent = moveData.prevDrop;
  }

  redo (event) {
    this.allMovesIdx += 1;
    const moveData = this.allMoves[this.allMovesIdx];
    const dropToEnable = $(`#${moveData.prevDrop}`);
    const dropToDisable = $(`#${moveData.curDrop}`);
    const draggable = $(`#${moveData.draggable}`);
    dropToEnable.droppable("option", "disabled", false);
    dropToDisable.droppable("option", "disabled", true);
    draggable.position({
      of: dropToDisable
    });
    //reset parent data for draggable element
    draggable[0].dataset.parent = moveData.curDrop;
  }

}
