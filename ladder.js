  const users = [
    { name: 'ABC', sex: 'female', checked: false },
    { name: 'ABC', sex: 'female', checked: false },
    { name: 'ABC', sex: 'female', checked: false },
    { name: 'ABC', sex: 'female', checked: false },
    { name: 'ABC', sex: 'male', checked: false },
    { name: 'ABC', sex: 'male', checked: false },
    { name: 'ABC', sex: 'male', checked: false },
    { name: 'ABC', sex: 'male', checked: false },
    { name: 'ABC', sex: 'male', checked: false },
    { name: 'ABC', sex: 'male', checked: false },
    { name: 'ABC', sex: 'male', checked: false },
    { name: 'ABC', sex: 'male', checked: false },
    { name: 'ABC', sex: 'male', checked: false },
    { name: 'ABC', sex: 'male', checked: false },
    { name: 'ABC', sex: 'male', checked: false }
];

const CheckNum=document.getElementById('checknum');
let num=0;

init(); //함수 호출

function init(){
  //인원수와 체크박스 합쳐줄 최종 컨테이너 판
  const Container=document.getElementById('checkboxes'); 
  const checkNum=document.getElementById('checknum');
  const reset=document.getElementById('reset-btn');
  checkNum.innerText = `체크된 인원 : ${num} 명`;
   users.forEach((person) => {
    const userElement = document.createElement('div');
    userElement.classList.add('my-class');
  
    const label = document.createElement('label');
    label.textContent = person.name;
  
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `user_${++num}`;
    checkbox.checked = person.checked;
    checkbox.addEventListener('click', () => checkNumber(checkbox, person));
    reset.addEventListener('click', () => reset_checkbox(checkbox, person));
  
    label.appendChild(checkbox);
    userElement.appendChild(label);
    Container.appendChild(userElement);
});
  num=0;
}

function checkNumber(checkbox, person) {
  person.checked = checkbox.checked;
  if(person.checked) num++;
  else num--
  CheckNum.innerText = `체크된 인원 : ${num} 명`;
}

function reset_checkbox(checkbox, person) {
  users.forEach((person) => {
    person.checked=false;
    checkbox.checked=false
  });
  num=0;
  CheckNum.innerText = `체크된 인원 : ${num} 명`;
}

///////////////////////////////////////////////////////////////
//this 쓸 수 있는 곳 어디 없나....

//Q.전역 빼기

function settingPlayer(){
  const players_btn = document.getElementById('numOfplayers');
  const numOfPlayers = document.getElementById('numOfplayers').value;
  if (numOfPlayers < 3 || numOfPlayers > 10) {
    alert('3에서 10 사이의 숫자만 입력해주세요.');
    return;
  }
  const userInputs = createPlayersInputs(numOfPlayers);
  const destInputs = createDestInputs(numOfPlayers);
  players_btn.disabled = true;
}

function createPlayersInputs(numOfPlayers) {
  const container = document.getElementById("input_players");
  const inputs = Array.from({ length: Number(numOfPlayers) });
  inputs.forEach((_, i) => {
    const input = document.createElement('input');
    input.type = "text";
    input.placeholder = "user" + (i + 1);
    input.setAttribute('id', `user${i + 1}`);
    container.appendChild(input);
  });
  return inputs;
}

function createDestInputs(numOfPlayers) {
  const container = document.getElementById("input_destinations");
  const inputs = Array.from({ length: Number(numOfPlayers) });
  inputs.forEach((_, i) => {
    const input = document.createElement('input');
    input.type = "text";
    input.placeholder = "dest" + (i + 1); 
    input.setAttribute('id', `dest${i + 1}`);
    container.appendChild(input);
  });
  return inputs;
}

//Q.쿼리셀렉터만쓰기

function createLadder() {
  const playerInputs = document.querySelectorAll('#input_players input');
  const destInputs = document.querySelectorAll('#input_destinations input');
  // id가 "input_players"인 요소의 하위 요소인 input 요소를 선택하는 CSS 선택자임
  
  playerInputs.forEach((playerInput, i) => {
    const destInput = destInputs[i];
    const user = playerInput.value.trim(); //공백을 제거해주는 함수
    const dest = destInput.value.trim();
  
    if (!user || !dest) { // user.length<1과 같은 역할
      alert('빈칸이 존재합니다.');
      return;
    }
  });
  
  playerInputs.forEach((playerInput) => {
    playerInput.disabled = true;
  });
  destInputs.forEach((destInput) => {
    destInput.disabled = true;
  });

  const rows = numOfPlayers * 2;
  const cols = numOfPlayers * 2 - 1;
  const array = new Array(rows).fill().map(() => new Array(cols).fill(""));
  
  // 초기 세팅해주기
  for (let i = 0; i < numOfPlayers; i++) {
    array[0][i * 2] = playerInputs[i].value;
    array[rows - 1][i * 2] = destInputs[i].value;

    for(let j = 1; j <rows-1; j++){
      array[i*2][j] = "|";
    }
  }

  let standard = Math.round(Math.random()); // ** 0 또는 1 중 하나를 랜덤으로 할당
  if(standard%2!=0){
    standard = 1;
  }
  else standrad = 0;

  for(standard; standard<cols; standard+=2){ //악 이거 아니었네
    for(let j = 0; j<rows; j++){
      const random=Math.round(Math.random());
      if(random==1) arr[stan][j]="___";
      else continue;
    }
  }


  // 나머지 사다리 채워주기
  // 사다리 채워주기 - 랜덤 시작  
  
  
}

//**
//Math.round() 함수는 소수점 이하의 값을 반올림하여 정수로 만드는 함수입니다.
//Math.random() 함수는 0 이상 1 미만의 부동소수점 값을 반환하기 때문에, 
//소수점 이하의 값이 0.5보다 작으면 0, 0.5보다 크면 1을 할당하는 것으로 해석됩니다.






// 사다리 출력
// const ladder = document.getElementById('ladder');
// ladder.innerHTML = '';
// for (let i = 0; i < rows; i++) {
//   for (let j = 0; j < cols; j++) {
//     const element = document.createElement('div');
//     element.classList.add('ladder-item');
//     element.innerHTML = array[i][j];
//     ladder.appendChild(element);
//   }
//   const lineBreak = document.createElement('br');
//   ladder.appendChild(lineBreak);
// }

// 나머지 사다리 채워주기
// for (let i = 1; i < rows - 1; i += 2) { // 1, 3, 5, ...
//   let j = 1; // 시작점
//   while (j < cols - 1) {
//     if (array[i][j] === '') {
//       if (Math.random() > 0.5 && array[i][j - 2] !== '_') { 
//         array[i][j] = '_';
//         array[i][j - 1] = '|';
//         j -= 2;
//       } else if (j < cols - 3 && array[i][j + 2] !== '_') { 
//         array[i][j] = '_';
//         array[i][j + 1] = '|';
//         j += 2;
//       } else { // 
//         j = 1;
//       }
//     } else { // 
//       j += 2;
//     }
//   }
// }

