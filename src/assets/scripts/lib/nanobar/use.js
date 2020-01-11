//id <String>: (optional) id for nanobar div
//classname <String>: (optional) class for nanobar div
//target <DOM Element>: (optional) Where to put the progress bar, nanobar will be fixed to top of document if no target is passed

var options = {
    classname: 'my-class',
  id: 'my-id',
    target: document.getElementById('myDivId')
};

var nanobar = new Nanobar( options );

//move bar
nanobar.go( 30 ); // size bar 30%
nanobar.go( 76 ); // size bar 76%

// size bar 100% and and finish
nanobar.go(100);