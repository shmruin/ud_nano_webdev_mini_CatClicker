
/* ======== model ======== */

var model = {
    currentCat: null,
    adminVar: false,
    cats: [
        {
            clickCount : 0,
            name : "meow",
            imgSrc : "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
        },
        {
            clickCount : 0,
            name : "rose",
            imgSrc : "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
        },
        {
            clickCount : 0,
            name : "clara",
            imgSrc : "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
        },
        {
            clickCount : 0,
            name : "bob",
            imgSrc : "https://static.pexels.com/photos/20787/pexels-photo.jpg",
        },
        {
            clickCount : 0,
            name : "pertu",
            imgSrc : "https://news.nationalgeographic.com/content/dam/news/photos/000/755/75552.ngsversion.1422285553360.adapt.1900.1.jpg",
        }
    ]
};


/* ======== octopus ======== */

var octopus = {
    init: function() {
        model.currentCat = model.cats[0];

        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    incrementCounter: function() {
        model.currentCat.clickCount += 1;
        catView.render();
    },

    toggleAdmin: function() {
        if(model.adminVar === false) {
            model.adminVar = true;
            adminView.init();
            document.getElementsByClassName('admin-container')[0].setAttribute('style', 'display:table-row');
        } else {
            document.getElementsByClassName('admin-container')[0].setAttribute('style', 'display:none');
            model.adminVar = false;
        }
    },

    enrollCat: function(name, img, clicks) {
        var temp = {};
        temp['clickCount'] = Number(clicks);
        temp['name'] = name;
        temp['imgSrc'] = img;

        console.log(temp);

        model.cats.push(temp);
        this.toggleAdmin();
        catListView.render();
    }
};


/* ======== View ======== */

var catView = {
    init: function() {
        this.catNameElem = document.getElementById('selected-cat-name');
        this.catImageElem = document.getElementById('cat-container');
        this.countElem = document.getElementById('click-board');
        this.adminElem = document.getElementById('admin');

        this.catImageElem.addEventListener('click', function() {
            octopus.incrementCounter();
        });

        this.adminElem.addEventListener('click', function() {
            octopus.toggleAdmin();
        })

        this.render();
    },

    render: function() {
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {
    init: function() {
        this.catListElem = document.getElementById('cat-name-list');

        this.render();
    },

    render: function() {
        var cat, elem, i;

        var cats = octopus.getCats();

        this.catListElem.innerHTML = '';

        for(i = 0; i < cats.length; i++) {
            cat = cats[i];

            elem = document.createElement('li');
            elem.textContent = cats[i].name;

            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                }
            })(cat))

            this.catListElem.appendChild(elem);
        }
    }
};

var adminView = {
    init: function() {
        this.adminCatNameElem = document.getElementById('admin-cat-name');
        this.adminCatImgElem = document.getElementById('admin-cat-img');
        this.adminCatClickElem = document.getElementById('admin-cat-clicks');
        this.adminCancelElem = document.getElementById('cancel-btn');
        this.adminSaveElem = document.getElementById('save-btn');

        this.adminCancelElem.addEventListener('click', function() {
            octopus.toggleAdmin();
        });

        this.adminSaveElem.addEventListener('click', function() {
            var name = adminView.adminCatNameElem.value;
            var img = adminView.adminCatImgElem.value;
            var click = adminView.adminCatClickElem.value;
            octopus.enrollCat(name, img, click);
        });

        this.render();
    },

    render: function() {
        this.adminCatNameElem.value = '';
        this.adminCatImgElem.value = '';
        this.adminCatClickElem.value = '';
    }
}

octopus.init();