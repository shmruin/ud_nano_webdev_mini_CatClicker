$(document).ready(function() {

    var catNames = ["meow", "rose", "clara", "bob", "pertu"];
    var catClicks = [0, 0, 0, 0, 0];
    var catImgs = [
        "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
        "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
        "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
        "https://static.pexels.com/photos/20787/pexels-photo.jpg",
        "https://news.nationalgeographic.com/content/dam/news/photos/000/755/75552.ngsversion.1422285553360.adapt.1900.1.jpg"
    ];

    for (var i = 0; i < catNames.length; i++) {

        var nameUlElem = document.getElementsByClassName("cat-name-list")[0];
        var nameLiElem = document.createElement("li");
        nameLiElem.appendChild(document.createTextNode(catNames[i]));
        nameUlElem.appendChild(nameLiElem);

        var num = catClicks[i];

        nameLiElem.addEventListener("click", (function(index, nameCopy, imgCopy) {
            return function() {
                //alert(nameCopy + clickCopy + imgCopy);
                $(".cat-container img").remove();
                $('#click-board').text(catClicks[index].toString());

                $(".cat-container").prepend('<img src="' + imgCopy + '">');
                $(".cat-container img").width(500);
                $(".cat-container img").height(300);

                $("#selected-cat-name").text(nameCopy);

                $(".cat-container img")[0].addEventListener("click", function() {
                    catClicks[index] += 1;
                    $('#click-board').text(catClicks[index].toString());
                });
            }
        })(i, catNames[i], catImgs[i]));
    }
})
