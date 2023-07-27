var imgArray = ['seven'];
var textArray = [
 "How long is forever?",
 "Souvenez-vous de ce que vous vivez. <br/>C'est important.",
 "LAHWF.",
];
var num = (Math.floor(Math.random()*imgArray.length));
var elem = document.getElementById('Cassie');
elem.classList.add(imgArray[num]);
document.getElementById('CassieText').innerHTML=textArray[num];
