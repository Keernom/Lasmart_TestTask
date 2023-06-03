const url = "api/dots";

function addDot() {
    const addItemXCenter = document.getElementById("xCenter");
    const addItemYCenter = document.getElementById("yCenter");
    const addItemRadius = document.getElementById("radius");
    const addItemColor = document.getElementById("color");

    const dot =
    {
        XCenter : addItemXCenter.value,
        YCenter: addItemYCenter.value,
        Radius: addItemRadius.value,
        Color: addItemColor.value
    };

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        resetDotForm();
        getAllDots();
    }

    xhttp.open("POST", url);
    xhttp.setRequestHeader('accept', 'application/json');
    xhttp.setRequestHeader('content-type', 'application / json');
    xhttp.send(JSON.stringify(dot));
}

function getAllDots() {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        var data = JSON.parse(this.responseText).value;
        drawAllDots(data);
    }

    xhttp.open("GET", url);
    xhttp.send();
}

function getDot(id) {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        console.log(JSON.parse(this.responseText).value);
    }

    xhttp.open("GET", `${url}/${id}`);
    xhttp.send();
}

function deleteDot(id) {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        activeDotId = -1;
        getAllDots();
    }

    xhttp.open("DELETE", `${url}?id=${id}`);
    xhttp.send();
}

function resetDotForm() {
    document.getElementById("xCenter").value = 0;
    document.getElementById("yCenter").value = 0;
    document.getElementById("radius").value = 0;
    document.getElementById("color").value = "#000000";
}