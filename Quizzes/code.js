const btn = document.querySelector('.btn');
const btnreload = document.querySelector('.reloadbtn');
const output = document.querySelector('.output');
document.getElementById("loadingscreen").style.display = "none";


btn.textContent = 'Start Quiz';

btn.onclick = startGame;

const game = {data:{},que:0,score:0,ans:[]};

function startGame() {
	btn.style.display = 'none';
    document.getElementById("loadingscreen").style.display = "";
    output.textContent = 'Loading...';
	btnreload.style.display='';


	fetch(url)
	.then(res => res.json())
	.then(data =>{
		game.data = data;
		buildGame();
	})

	
}

function buildGame(){
	console.log(game.data);
	loadQuestion();

}

function loadQuestion(){
    document.getElementById("loadingscreen").style.display = "none";

	const q = game.data[game.que];
	output.innerHTML = '';
	const main = maker('div',output,'main','');
	const que = maker('div',main,'question',`Q: ${q.question}?`);
	q.opts.sort(()=>{
		return Math.random() - 0.5;
	});
	q.opts.forEach((el)=>{
		const span = maker('button',main,'box','➡ '+el);
		span.correct = q.answer;
		span.selOpt = el;
		span.classList.add('box1');
		span.addEventListener('click',checker);
	})
	console.log(q);
}



function checker(e){
	const el = e.target;
	game.ans.push(el.selOpt);
	const boxs = document.querySelectorAll('.box');
	boxs.forEach((ele)=>{
		ele.removeEventListener('click',checker);
		ele.style.color = '#bbb';
		ele.classList.remove('box1');
		ele.disabled = true;
	})
	if(el.correct==el.selOpt){
		game.score++;
	    const main = maker('div',output,'main','Correct! ✅');
	    el.style.color = 'white';
	    el.style.backgroundColor = 'green';

	}else{
		const main = maker('div',output,'main',`Wrong! ❌<br> Answer was: ${el.correct}`);
	    el.style.color = 'white';
	    el.style.backgroundColor = 'red';

	}
	const btn1 = maker('button',output,'btn1',`Next Question ⏩`);
	game.que++;
	const total = game.data.length-game.que;
	console.log(`remaining ${total}`);
	if(total == 0){
		btn1.textContent = 'Show Result 📄';
		btn1.onclick = endGame;

	}else{
		btn1.onclick = loadQuestion;
	}


	console.log(el.correct,el.selOpt);

}

function endGame(){
	//output.textContent = JSON.stringify(game);
	output.innerHTML = ``;
	game.ans.forEach((ele,ind)=>{
		let html = `Question:${game.data[ind].question} <br>Answer: ${game.data[ind].answer}<br>Your response: ${ele}`;
		const div = maker('div',output,'main',html);
		const bg = (game.data[ind].answer == ele) ? 'green' : 'red';
		div.style.color = bg;
	})
    document.getElementById("score_display").style.display = "";
	document.getElementById('score_display').innerHTML = `Score: 🎉 ${game.score} / ${game.data.length}`;
    document.getElementById("tq_display").style.display = "";
	document.getElementById('tq_display').innerHTML = `Total Questions: ${game.data.length}`;
	console.log(game);

}

function maker(t,p,c,h){
	const el = document.createElement(t);
	el.classList.add(c);
	el.innerHTML = h;
	return p.appendChild(el);

}

function reloadgame(){
	location.reload()
}

