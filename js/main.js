let ghostData = [];
let goodData = [];
let badData = [];

// removes first instance of item from an array
function removeItem(arr, item) {
    let index = arr.indexOf(item);
    if(index > -1) {
        arr.splice(index, 1);
    }
}

// adds or removes an item from an array based on the boolean add
function addOrRemove(arr, item, add) {
    if(add) {
        arr.push(item);
    } else {
        removeItem(arr, item);
    }
}

function addOption(text) {
    let good = $(".checkbox-options-good");
    let el = $("<div>").addClass("option").appendTo(good);
    $("<input type='checkbox'>").addClass("display-option").appendTo(el).on("click", function () {
        addOrRemove(goodData, text, $(this).is(":checked"));
        updateResult();
    });
    $("<div>").addClass("option").text(text).appendTo(el);

    let bad = $(".checkbox-options-bad");
    el = $("<div>").addClass("option").appendTo(bad);
    $("<input type='checkbox'>").addClass("display-option").appendTo(el).on("click", function () {
        addOrRemove(badData, text, $(this).is(":checked"));
        updateResult();
    });
    $("<div>").addClass("option").text("NOT " + text).appendTo(el);
}

function addGhost(name, e1, e2, e3, strength, weakness) {
    ghostData.push({
        name: name,
        evidence: [e1, e2, e3],
        strength: strength,
        weakness: weakness
    });
}

function updateResult() {
    let result = $(".result-list").empty();
    for(let ghost of ghostData) {
        if(isGhostValid(ghost)) {
            displayGhost(ghost).appendTo(result);
        }

    }
}

// cannot have any ruled out attributes
// must have good attributes
function isGhostValid(ghost) {
    let evidence = ghost.evidence;

    for(let bad of badData) {
        if(evidence.includes(bad)) {
            return false;
        }
    }

    if(goodData.length > 0) {
        for(let good of goodData) {
            if(!evidence.includes(good)) {
                return false;
            }
        }
    }

    return true;
}

function displayGhost(info) {
    let container = $("<div>").addClass("ghost-container");
    let e = info.evidence;
    $("<h3>").addClass("ghost-name").text(info.name).appendTo(container);
    $("<div>").addClass("evidence-container").html("<strong>Evidence</strong>: <u>" + e[0] + "</u>, <u>" + e[1] + "</u>, <u>" + e[2] + "</u>").appendTo(container);
    $("<div>").addClass("ghost-strength").html("<strong>Strength</strong>: " + info.strength).appendTo(container);
    $("<div>").addClass("ghost-weakness").html("<strong>Weakness</strong>: " + info.weakness).appendTo(container);
    return container;
}

$(function () {
    addOption("EMF Level 5");
    addOption("Fingerprints");
    addOption("Freezing Temperatures");
    addOption("Ghost Writing");
    addOption("Spirit Box");
    addOption("Ghost Orbs");

    addGhost("Banshee", "EMF Level 5", "Fingerprints", "Freezing Temperatures", "Only targets one player at a time, giving them a really bad night.", "Hates the Crucifix, making it especially effective.");
    addGhost("Demon", "Freezing Temperatures", "Ghost Writing", "Spirit Box", "Once of the most dangerous ghosts. Extremely aggressive with attacks.", "Using the Ouija board to ask questions doesn’t drain sanity.");
    addGhost("Jinn", "EMF Level 5", "Ghost Orbs", "Spirit Box", "The Jinn moves faster the further away you are from it.", "Cutting off the location’s power supply will limit the Jinn’s speed.");
    addGhost("Mare", "Freezing Temperatures", "Ghost Orbs", "Spirit Box", "Attacks more frequently in the dark, tends to switch off lights.", "Keeping the lights on.");
    addGhost("Oni", "EMF Level 5", "Ghost Writing", "Spirit Box", "Extremely active and moves objects quickly.", "Extreme activity with lots of players nearby makes it easy to identify.");
    addGhost("Phantom", "EMF Level 5", "Freezing Temperatures", "Ghost Orbs", "Looking at the Phantom will reduce your sanity.", "Scared of photos, capturing a photo will cause it to disappear, though not during a hunt.");
    addGhost("Poltergeist", "Fingerprints", "Ghost Orbs", "Spirit Box", "Throws multiple objects about at once.", "Rooms without any stuff in to throw.");
    addGhost("Revenant", "EMF Level 5", "Fingerprints", "Ghost Writing", "Attacks anyone, regardless of sanity levels.", "Moves extremely slowly when players hide.");
    addGhost("Shade", "EMF Level 5", "Ghost Orb", "Ghost Writing", "Extremely shy, making it hard to find and detect.", "Won’t hunt if players are in a group.");
    addGhost("Spirit", "Fingerprints", "Ghost Writing", "Spirit Box", "A basic ghost with no strengths.", "Using smudge sticks stops from starting for a long time.");
    addGhost("Wraith", "Fingerprints", "Freezing Temperatures", "Spirit Box", "One of the most dangerous ghosts. Can fly through walls and doesn’t leave footprints.", "Has a strong reaction to salt.");
    addGhost("Yurei", "Freezing Temperatures", "Ghost Orbs", "Ghost Writing", "Drains player sanity especially quickly.", "Using a smudge stick in the same room will stop the Yurei from moving.");

    updateResult();
});