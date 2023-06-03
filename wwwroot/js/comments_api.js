const url_comments = "api/comments";

var activeDotId = -1;

function setActiveDotId(id) {
    activeDotId = id;
}

function addComment() {

    if (activeDotId == -1) {
        alert("You didn't choose a point");
    }

    const addItemText = document.getElementById("text");
    const addItemColor = document.getElementById("color_comment");

    const comment =
    {
        Text: addItemText.value,
        Color: addItemColor.value,
        DotId: activeDotId,
    };

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        if (activeDotId != -1) {
            resetCommentForm();
            activeDotId = -1;
        }
        getAllDots()
    }

    xhttp.open("POST", url_comments);
    xhttp.setRequestHeader('accept', 'application/json');
    xhttp.setRequestHeader('content-type', 'application / json');
    xhttp.send(JSON.stringify(comment));
}

function getAllComments(layer, data, dotId) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var dataComment = JSON.parse(this.responseText).value;
        drawAllComments(layer, data, dataComment)
    }

    xhttp.open("GET", `${url_comments}/${dotId}`);
    xhttp.send();
}

function deleteCommentsFromDb(dotId) {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `${url_comments}/${dotId}`);
    xhttp.send();
}

function resetCommentForm() {
    document.getElementById("text").value = "";
    document.getElementById("color_comment").value = "#000000";
}