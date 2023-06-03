var height = document.getElementById('konvaHandler').offsetHeight;
var width = document.getElementById('konvaHandler').offsetWidth;

function drawAllDots(data) {
    var stage = new Konva.Stage({
        container: 'konvaHandler',
        width: width,
        height: height,
    });

    var layer = new Konva.Layer();

    for (let i = 0; i < data.length; i++) {

        var circle = new Konva.Circle({
            id: (data[i].id).toString(),
            x: data[i].xCenter,
            y: data[i].yCenter,
            radius: data[i].radius,
            fill: data[i].color,
        });

        circle.on('pointerdblclick', function () {
            let id = Number(this.attrs.id);
            deleteDot(id);
        });

        circle.on('pointerclick', function () {
            var shapes = stage.find('Circle');
            shapes.forEach(function (shape) { shape.strokeWidth(0); });

            this.stroke("yellow");
            this.strokeWidth(4);
            setActiveDotId(data[i].id)
        });

        layer.add(circle);

        getAllComments(layer, data[i], data[i].id);
    }

    stage.add(layer);
}

function drawAllComments(layer, dataCircle, dataComment) {
    console.log(dataComment);

    for (let i = 0; i < dataComment.length; i++) {

        let currentWidth = dataComment[i].text.length * 10
        let currentHeight = 25;
        let offsetCoef = 1.2;

        var rect = new Konva.Rect({
            x: dataCircle.xCenter - currentWidth / 2,
            y: dataCircle.yCenter + dataCircle.radius * 1.3 + currentHeight * offsetCoef * i,
            width: currentWidth,
            height: currentHeight,
            fill: dataComment[i].color,
            stroke: '#555',
            strokeWidth: 2,
        });

        var text = new Konva.Text({
            x: dataCircle.xCenter - currentWidth / 2,
            y: dataCircle.yCenter + dataCircle.radius * 1.3 + currentHeight * offsetCoef * i,
            text: dataComment[i].text,
            fontSize: 18,
            fontFamily: 'Calibri',
            height: currentHeight,
            width: currentWidth,
            align: 'center',
            verticalAlign: 'center',
        });

        layer.add(rect);
        layer.add(text);
    }
}