(async function main() { 
  // api
  function getTitle(){
    const response = fetch("https://petner.kr/api/v6/publics");
    return response.then(res => res.json());
  }
  let intervalPet; // 전역으로 변수 선언해야 하는게 조금 맘에 걸리긴 한다..
  async function mainContent() {
    let info;
    let mainInfo = [];
    const contentBox = document.querySelector(".contentBox");
    const leftButton = document.querySelector(".leftButton");
    const rightButton = document.querySelector(".rightButton");
    try {
      info = await getTitle();
      mainInfo.push(...info);
    }
    catch(error){
      console.log(error);
    }
    // HTML Plus
    for(let i = 0; i < mainInfo.length; i++) {
      contentBox.innerHTML += `
      <div class="petnerContent">
        <div class="contentHeader">
          <div class="contentHeaderLeft">
            <img class="petners" src="${mainInfo[i].petner.image}" alt="펫시터님">
          </div>
          <div class="contentHeaderRight">
            <h5 class="petnerName">${mainInfo[i].petner.name}<h5>
            <div>😀 전문펫시터</div>
          </div>
        </div>
        <div class="cutePet">
          <img class="cutePetImg" src="${mainInfo[i].image}" alt="반려동물들">
        </div>
        <footer class="contentFooter">
          <div class="times">~시간 전</div>
          <div class="petName">${mainInfo[i].companion.name}</div>
        </footer>
      </div>`;
    }
    // Move
    let clickWidth = 0;
    const leftMove = () => {
      if(clickWidth !== 0) {
        clickWidth = clickWidth + 128;
        contentBox.style.transform = `translate(${clickWidth}px,0)`;
      }else {
        clickWidth = -1280;
        contentBox.style.transform = `translate(${clickWidth}px,0)`;
      }
    }
    const rightMove = () => {
      if(clickWidth <= -1280) {
        clickWidth = 0;
        contentBox.style.transform = `translate(${clickWidth},0)`;
      }else {
        clickWidth = clickWidth - 128;
        contentBox.style.transform = `translate(${clickWidth}px,0)`;
      }
    }
    rightButton.addEventListener("click",()=>{
      rightMove();
    })
    leftButton.addEventListener("click",()=>{
      leftMove();
    })
    // auto Move
    intervalPet = setInterval(() => {
      rightMove();
    }, 2000);
  }
  // html end
  window.onload = mainContent();
  const contentBox = document.querySelector(".contentBox");
  const reload = document.querySelector(".reload");
  reload.addEventListener('click',()=>{
    contentBox.innerHTML = "";
    clearInterval(intervalPet);
    contentBox.style.transform = `translate(0,0)`;
    mainContent();
  })
  // reload
})();