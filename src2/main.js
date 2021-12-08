var canvas = new Canvas(undefined, new CameraOrtho(0,0,0,0,0,0));
var snapPoint = SnapPointEntity.create(0,20,0);
var workplace = new Workplace([snapPoint],canvas);

workplace.render();
