class Point{
	x;
	y;

	constructor(x, y) {
		this.x = x;
		this.y = Math.abs(y - 800);
	}
}

const canvas = document.getElementById('pic1');
const ctx = canvas.getContext('2d');

function DPSK() {
	ctx.strokeStyle = "black";
	ctx.beginPath();

	ctx.lineWidth = "10";
	ctx.moveTo(0, 800);
	ctx.lineTo(0, 50);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(0, 800);
	ctx.lineTo(1000, 800);
	ctx.stroke();

	ctx.lineWidth = "2";

	for (let i = 0, j = 0; j < 1050; i++, j+=50) {
		ctx.beginPath();
		ctx.moveTo(50 * i, 50);
		ctx.lineTo(50 * i, 800);
		ctx.stroke();
	}

	for (let i = 1, j = 0; j < 1000; i++, j+=50) {
		ctx.beginPath();
		ctx.moveTo(0, 50 * i);
		ctx.lineTo(1000, 50 * i);
		ctx.stroke();
	}
}

DPSK();

let points = [];
let counter = 0;
let allowed = true;
let previousPoint = new Point();

canvas.addEventListener('click', function (e) {

	if (e.pageX >= 50 && e.pageY >= 50 && e.pageX <= 1050 && e.pageY <= 850){

        ctx.lineWidth = '5';

		if (allowed){

			if (counter === 0){
				points.push(new Point(e.offsetX, e.offsetY));

				previousPoint.x = e.offsetX;
				previousPoint.y = e.offsetY;

				counter++;

				drawPoint(e.offsetX, e.offsetY);

				return ;
			}

			points.push(new Point(e.offsetX, e.offsetY));

			if (check(points[0], points[points.length - 1]) && counter > 2){
				allowed = false;

				points.pop();

				ctx.beginPath();
				ctx.strokeStyle = "red";
				ctx.moveTo(points[0].x, Math.abs(points[0].y - 800));
				ctx.lineTo(points[points.length - 1].x, Math.abs(points[points.length - 1].y - 800));
				ctx.stroke();

				return ;
			}

			points.forEach(point => console.log("(" + point.x + ", " + point.y + ")"));

			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.moveTo(previousPoint.x, previousPoint.y);
			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();

			previousPoint.x = e.offsetX;
			previousPoint.y = e.offsetY;

			counter++;

			document.getElementById("point_A").innerHTML = "(" + e.offsetX / 50 + "; " + getY(e.offsetY) / 50  + ")";
        }
	}
});

function check(firstPoint, lastPoint){
	return (Math.pow(lastPoint.x - firstPoint.x, 2) + Math.pow(lastPoint.y - firstPoint.y, 2)) <= 400;
}

function drawPoint(x, y){
	let point = canvas.getContext('2d');

	point.beginPath();
	point.arc(x, y, 4, 0, 2*Math.PI, false);
	point.fillStyle = 'red';
	point.fill();
	point.lineWidth = 1;
	point.strokeStyle = 'red';
	point.stroke();
}