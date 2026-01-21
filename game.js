const hopBtn = document.getElementById("hop");
const maltBtn = document.getElementById("malt");
const foamBtn = document.getElementById("foam");
const resultDiv = document.getElementById("result");
const sparklesDiv = document.getElementById("sparkles");

let score = 0;
let gameOver = false;

// Echte Bardcore/Meme Loops
const loops = {
    hop: new Audio("https://freesound.org/data/previews/64/64559_634166-lq.mp3"), // Bard Pluck
    malt: new Audio("https://freesound.org/data/previews/56/56712_634166-lq.mp3"), // Bass
    foam: [
        new Audio("https://freesound.org/data/previews/41/41589_634166-lq.mp3"),
        new Audio("https://freesound.org/data/previews/45/45545_634166-lq.mp3"),
        new Audio("https://freesound.org/data/previews/50/50321_634166-lq.mp3")
    ],
    achievement: new Audio("https://freesound.org/data/previews/341/341695_5260872-lq.mp3")
};

// Sparkle Effekt
function sparkle(x, y) {
    const s = document.createElement('div');
    s.classList.add('sparkle');
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    sparklesDiv.appendChild(s);
    setTimeout(()=> s.remove(), 500);
}

// Flash Effekt
function flash(button) {
    button.classList.add('flash');
    setTimeout(()=>button.classList.remove('flash'),150);
}

// Klick Logik
function handleClick(button, points, sound){
    if(gameOver) return;
    score += points;
    sound.play();
    flash(button);
    resultDiv.textContent = `Current Score: ${score}`;

    // Pixel sparkles random around button
    const rect = button.getBoundingClientRect();
    for(let i=0;i<3;i++){
        const x = rect.left + Math.random()*rect.width;
        const y = rect.top + Math.random()*rect.height;
        sparkle(x,y);
    }
}

hopBtn.addEventListener("click", ()=>handleClick(hopBtn, 2+Math.floor(Math.random()*2), loops.hop));
maltBtn.addEventListener("click", ()=>handleClick(maltBtn, -1, loops.malt));
foamBtn.addEventListener("click", ()=>{
    let points = Math.floor(Math.random()*4)-1;
    let sound = loops.foam[Math.floor(Math.random()*loops.foam.length)];
    handleClick(foamBtn, points, sound);
});

// Game Timer 15 Sekunden
setTimeout(()=>{
    gameOver = true;
    let tier="";
    let xp={Charisma:0,Bardcraft:0,Yeast:0,Meme:0};

    if(score>=7){tier="SSR: Grand Brewmaster"; xp={Charisma:10,Bardcraft:10,Yeast:10,Meme:10};}
    else if(score>=5){tier="SR: Yeast Conductor"; xp={Charisma:8,Bardcraft:8,Yeast:8,Meme:6};}
    else if(score>=3){tier="R: Foam Sorcerer"; xp={Charisma:6,Bardcraft:4,Yeast:4,Meme:4};}
    else if(score>=1){tier="N: Tavern Adept"; xp={Charisma:4,Bardcraft:2,Yeast:2,Meme:2};}
    else{tier="C: Overmalted Disaster"; xp={Charisma:2,Bardcraft:1,Yeast:1,Meme:1};}

    resultDiv.innerHTML=`🎉 Game Over! 🎉<br>Your Result: ${tier}<br>XP Gained:<br>
        Charisma: ${xp.Charisma}<br>Bardcraft: ${xp.Bardcraft}<br>Yeast Magic: ${xp.Yeast}<br>Meme Arts: ${xp.Meme}<br><br>
        🔁 <b>Scan next deckel to remix!</b>`;

    loops.achievement.play();

},15000);
