export default class Grid {
  constructor() {
    
    //bind removeReward function
    this.removeReward = this.removeReward.bind(this);

    // change cursor on click and unclick of draggable
    $(".rewards-col div").on('mousedown', (e) => {
      $(".rewards-col div").css("cursor", "grabbing");
    });
    $(".rewards-col div").on('mouseup', (e) => {
      $(".rewards-col div").css("cursor", "grab");
    });
    
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
    const el = event.target.parentElement;
    //set the correct information for the new draggable that will be created
    //and placed back at the beginning of the row
    let eventPic;
    let eventText;
    switch (event.data.param1) {
      case "1":
        eventPic = "fas fa-pizza-slice";
        eventText = "Pizza $";
        break;
      case "2":
        eventPic = "fas fa-skiing";
        eventText = "Ski Trip";
        break;
      case "3":
        eventPic = "fas fa-paw";
        eventText = "Pet Box";
        break;
      case "4":
        eventPic = "far fa-credit-card";
        eventText = "Gift Card";
        break;
      case "5":
        eventPic = "fas fa-football-ball";
        eventText = "Tickets";
        break;
      default:
        break;
    }
    //re-add element to starting position of row
    $(el.parentElement).append(
      `<div class='reward-${event.data.param1}'><b>X</b><i class='${eventPic}'></i><h3>${eventText}</h3></div>`
    );
    //add click handler for new element's x
    $(`.drop${event.data.param1} b`).click({ param1: `${event.data.param1}` }, this.removeReward);
    //make new element draggable
    $(`.reward-${event.data.param1}`).draggable({
      revert: "invalid",
      snap: `.drop${event.data.param1}`,
      snapMode: "inner",
      snapTolerance: 30
    });
    //reenable the previously disabled droppable element
    $(`#${el.dataset.parent}`).droppable("option", "disabled", false);
    //remove the element whose x was clicked
    $(el).remove();
  }

}
